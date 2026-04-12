const { PDFParse } = require('pdf-parse');
const Tesseract = require('tesseract.js');

async function extractTextFromPDF(buffer) {
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  return (result.text || '').trim();
}

async function extractTextFromImage(buffer) {
  const {
    data: { text },
  } = await Tesseract.recognize(buffer, 'eng+hin', {
    logger: () => {},
  });
  return (text || '').trim();
}

module.exports = { extractTextFromPDF, extractTextFromImage };
