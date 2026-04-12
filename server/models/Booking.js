const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    lawyerId: {
      type: Schema.Types.ObjectId,
      ref: 'Lawyer',
      required: true,
    },
    caseId: {
      type: Schema.Types.ObjectId,
      ref: 'Case',
      default: null,
    },
    scheduledAt: {
      type: Date,
      required: [true, 'Scheduled time is required'],
    },
    duration: {
      type: Number,
      default: 15,
      enum: [15, 30, 60, 90, 120],
    },
    type: {
      type: String,
      enum: ['free_consult', 'paid_consult', 'emergency'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no_show'],
      default: 'pending',
    },
    meetingLink: {
      type: String,
      default: null,
    },
    fee: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
      default: null,
    },
    emergencySummary: {
      type: String,
      default: null,
    },
    cancellationReason: {
      type: String,
      default: null,
    },
    cancelledBy: {
      type: String,
      enum: ['user', 'lawyer', 'system', null],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

BookingSchema.index({ userId: 1, status: 1 });
BookingSchema.index({ lawyerId: 1, scheduledAt: 1 });

module.exports = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
