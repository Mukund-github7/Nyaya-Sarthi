const { getOpenAI } = require('./openaiClient');
const {
  DOCUMENT_ANALYSIS_SYSTEM_PROMPT,
  JSON_RETRY_SUFFIX,
} = require('./prompts');

function stripMarkdownCodeFence(raw) {
  let s = raw.trim();
  if (s.startsWith('```')) {
    s = s.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  }
  return s.trim();
}

function validateAnalysisShape(obj) {
  if (!obj || typeof obj !== 'object') return false;
  const { documentType, overallRisk, summary, userAdvice } = obj;
  if (!documentType || !overallRisk || !summary || !userAdvice) return false;
  if (!['low', 'medium', 'high'].includes(overallRisk)) return false;
  return true;
}

function normalizeAnalysisResult(parsed) {
  return {
    documentType: String(parsed.documentType || 'unknown'),
    overallRisk: parsed.overallRisk,
    summary: String(parsed.summary),
    redFlags: Array.isArray(parsed.redFlags) ? parsed.redFlags : [],
    cautionPoints: Array.isArray(parsed.cautionPoints) ? parsed.cautionPoints : [],
    standardClauses: Array.isArray(parsed.standardClauses) ? parsed.standardClauses : [],
    userAdvice: String(parsed.userAdvice),
  };
}

async function callDocumentModel(userContent, strictRetry) {
  const openai = getOpenAI();
  const system =
    DOCUMENT_ANALYSIS_SYSTEM_PROMPT + (strictRetry ? JSON_RETRY_SUFFIX : '');

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    temperature: 0.2,
    max_tokens: 2000,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: userContent },
    ],
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) throw new Error('Empty model response');

  const text = stripMarkdownCodeFence(raw);
  const parsed = JSON.parse(text);
  if (!validateAnalysisShape(parsed)) {
    throw new Error('Model JSON missing required fields');
  }
  return normalizeAnalysisResult(parsed);
}

/**
 * TRD §6 — GPT analysis with single retry on parse/validation failure.
 * @param {string} extractedTextChunk
 */
async function analyzeDocumentWithGPT(extractedTextChunk) {
  const userContent = `Document text to analyze:\n\n${extractedTextChunk}`;

  try {
    return await callDocumentModel(userContent, false);
  } catch (firstErr) {
    try {
      return await callDocumentModel(userContent, true);
    } catch {
      throw firstErr;
    }
  }
}

module.exports = { analyzeDocumentWithGPT, validateAnalysisShape };
