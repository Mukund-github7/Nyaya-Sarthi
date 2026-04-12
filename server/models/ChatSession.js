const crypto = require('crypto');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    role: {
      type: String,
      enum: ['user', 'assistant', 'system'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      default: 'en',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    audioUrl: {
      type: String,
      default: null,
    },
  },
  { _id: false }
);

const ChatSessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    sessionId: {
      type: String,
      unique: true,
      default: () => crypto.randomUUID(),
    },
    legalDomain: {
      type: String,
      enum: [
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
      ],
      default: 'unknown',
    },
    severityLevel: {
      type: String,
      enum: ['low', 'medium', 'high', 'emergency'],
      default: 'low',
    },
    messages: {
      type: [MessageSchema],
      default: [],
    },
    resolvedByLawyerId: {
      type: Schema.Types.ObjectId,
      ref: 'Lawyer',
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    summary: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

ChatSessionSchema.index({ userId: 1, createdAt: -1 });
ChatSessionSchema.index({ sessionId: 1 });

module.exports = mongoose.models.ChatSession || mongoose.model('ChatSession', ChatSessionSchema);
