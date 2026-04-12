const { getOpenAI } = require('./openaiClient');
const { LEXBOT_SYSTEM_PROMPT, JSON_RETRY_SUFFIX, EMERGENCY_HELPLINES } = require('./prompts');

const LEGAL_DOMAINS = new Set([
  'criminal',
  'civil',
  'family',
  'consumer',
  'property',
  'cyber',
  'labour',
  'constitutional',
  'general',
  'unknown',
]);

const SEVERITY_LEVELS = new Set(['low', 'medium', 'high', 'emergency']);

function stripMarkdownCodeFence(raw) {
  let s = raw.trim();
  if (s.startsWith('```')) {
    s = s.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  }
  return s.trim();
}

function normalizeDomain(value) {
  if (!value || typeof value !== 'string') return 'unknown';
  const v = value.toLowerCase().trim();
  return LEGAL_DOMAINS.has(v) ? v : 'unknown';
}

function normalizeSeverity(value) {
  if (!value || typeof value !== 'string') return 'low';
  const v = value.toLowerCase().trim();
  return SEVERITY_LEVELS.has(v) ? v : 'low';
}

function buildOpenAiMessages({ history, message }) {
  const safeHistory = Array.isArray(history) ? history : [];
  const mapped = safeHistory
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant'))
    .map((m) => ({
      role: m.role,
      content: String(m.content || '').slice(0, 8000),
    }));

  return [
    { role: 'system', content: LEXBOT_SYSTEM_PROMPT },
    ...mapped,
    { role: 'user', content: String(message) },
  ];
}

async function callLexBotModel(messages, strictRetry) {
  const openai = getOpenAI();
  if (strictRetry && messages[0]?.role === 'system') {
    messages = [
      { ...messages[0], content: messages[0].content + JSON_RETRY_SUFFIX },
      ...messages.slice(1),
    ];
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    temperature: 0.3,
    max_tokens: 1500,
    response_format: { type: 'json_object' },
    messages,
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) throw new Error('Empty model response');

  const text = stripMarkdownCodeFence(raw);
  const parsed = JSON.parse(text);

  if (!parsed.reply || !parsed.metadata || typeof parsed.metadata !== 'object') {
    throw new Error('Invalid LexBot JSON shape');
  }

  const metadata = { ...parsed.metadata };
  metadata.legalDomain = normalizeDomain(metadata.legalDomain);
  metadata.severityLevel = normalizeSeverity(metadata.severityLevel);
  if (!Array.isArray(metadata.citedLaws)) metadata.citedLaws = [];

  if (metadata.severityLevel === 'emergency') {
    metadata.emergencyHelplines = EMERGENCY_HELPLINES;
  } else if (metadata.emergencyHelplines == null) {
    metadata.emergencyHelplines = null;
  }

  return { reply: String(parsed.reply), metadata };
}

/**
 * @param {{ history: Array<{role:string,content:string}>, message: string }} params
 */
async function runLexBotCompletion(params) {
  let messages = buildOpenAiMessages(params);
  try {
    return await callLexBotModel(messages, false);
  } catch (firstErr) {
    try {
      messages = buildOpenAiMessages(params);
      return await callLexBotModel(messages, true);
    } catch {
      throw firstErr;
    }
  }
}

module.exports = {
  runLexBotCompletion,
  normalizeDomain,
  normalizeSeverity,
};
