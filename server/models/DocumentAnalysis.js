const mongoose = require('mongoose');
const { Schema } = mongoose;

const RedFlagSchema = new Schema(
  {
    clause: { type: String, required: true },
    explanation: { type: String, required: true },
    relevantLaw: { type: String, default: null },
    severity: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  },
  { _id: false }
);

const CautionPointSchema = new Schema(
  {
    clause: { type: String, required: true },
    explanation: { type: String, required: true },
  },
  { _id: false }
);

const AnalysisResultSchema = new Schema(
  {
    overallRisk: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
    },
    summary: { type: String, required: true },
    redFlags: { type: [RedFlagSchema], default: [] },
    cautionPoints: { type: [CautionPointSchema], default: [] },
    standardClauses: { type: [String], default: [] },
    userAdvice: { type: String, required: true },
    documentType: { type: String, default: 'unknown' },
  },
  { _id: false }
);

const DocumentAnalysisSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    originalFileName: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    cloudinaryPublicId: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      enum: ['pdf', 'jpg', 'png', 'webp'],
      required: true,
    },
    fileSizeBytes: {
      type: Number,
    },
    extractedText: {
      type: String,
      default: null,
    },
    extractedCharCount: {
      type: Number,
      default: 0,
    },
    processingStatus: {
      type: String,
      enum: ['queued', 'processing', 'complete', 'failed', 'manual_input_required'],
      default: 'queued',
    },
    analysisResult: {
      type: AnalysisResultSchema,
      default: null,
    },
    processingError: {
      type: String,
      default: null,
    },
    manualTextInput: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.DocumentAnalysis || mongoose.model('DocumentAnalysis', DocumentAnalysisSchema);
