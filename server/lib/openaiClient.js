const OpenAI = require('openai');

function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('CRITICAL: OpenAI API Key Missing in .env');
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

module.exports = { getOpenAI };
