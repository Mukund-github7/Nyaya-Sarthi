const mongoose = require('mongoose');
const { Schema } = mongoose;

const CaseStudySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Case study title is required'],
      trim: true,
      maxlength: [300, 'Title cannot exceed 300 characters'],
    },
    year: {
      type: Number,
      required: true,
    },
    court: {
      type: String,
      required: true,
      trim: true,
    },
    legalDomain: {
      type: String,
      enum: ['criminal', 'civil', 'family', 'consumer', 'property', 'cyber', 'labour', 'constitutional'],
      required: true,
    },
    summary: {
      type: String,
      required: true,
      maxlength: [500, 'Summary cannot exceed 500 characters'],
    },
    fullExplainer: {
      type: String,
      required: true,
    },
    impact: {
      type: String,
      required: true,
    },
    relatedLaws: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    aiGeneratedSummary: {
      type: String,
      default: null,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    thumbnailUrl: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

CaseStudySchema.index({ legalDomain: 1, isPublished: 1 });
CaseStudySchema.index({ tags: 1 });
CaseStudySchema.index({ title: 'text', summary: 'text' });

module.exports = mongoose.models.CaseStudy || mongoose.model('CaseStudy', CaseStudySchema);
