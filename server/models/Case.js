const mongoose = require('mongoose');
const { Schema } = mongoose;

const TimelineEventSchema = new Schema(
  {
    date: { type: Date, required: true },
    event: { type: String, required: true },
    addedBy: {
      type: String,
      enum: ['user', 'lawyer', 'system'],
      default: 'user',
    },
    addedById: {
      type: Schema.Types.ObjectId,
      default: null,
    },
  },
  { _id: true }
);

const EvidenceSchema = new Schema(
  {
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    cloudinaryPublicId: { type: String, required: true },
    fileType: { type: String, required: true },
    category: {
      type: String,
      enum: ['receipt', 'screenshot', 'photo', 'document', 'audio', 'video', 'other'],
      default: 'other',
    },
    description: { type: String, default: null },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const CaseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    lawyerId: {
      type: Schema.Types.ObjectId,
      ref: 'Lawyer',
      default: null,
    },
    title: {
      type: String,
      required: [true, 'Case title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Case description is required'],
    },
    legalDomain: {
      type: String,
      enum: ['criminal', 'civil', 'family', 'consumer', 'property', 'cyber', 'labour', 'constitutional'],
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'active', 'hearing', 'decided', 'closed'],
      default: 'open',
    },
    caseNumber: {
      type: String,
      trim: true,
      default: null,
    },
    courtName: {
      type: String,
      trim: true,
      default: null,
    },
    timeline: {
      type: [TimelineEventSchema],
      default: [],
    },
    evidence: {
      type: [EvidenceSchema],
      default: [],
    },
    nextHearingDate: {
      type: Date,
      default: null,
    },
    hearingReminderSent: {
      type: Boolean,
      default: false,
    },
    sourceSessionId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

CaseSchema.index({ userId: 1, status: 1 });
CaseSchema.index({ nextHearingDate: 1 });

module.exports = mongoose.models.Case || mongoose.model('Case', CaseSchema);
