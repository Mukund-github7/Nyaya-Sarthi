const mongoose = require('mongoose');
const { Schema } = mongoose;

const CoordinatesSchema = new Schema(
  {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] },
  },
  { _id: false }
);

const LawyerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    barCouncilId: {
      type: String,
      required: [true, 'Bar Council ID is required'],
      trim: true,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    specializations: {
      type: [String],
      enum: [
        'criminal',
        'civil',
        'family',
        'consumer',
        'property',
        'cyber',
        'labour',
        'constitutional',
        'corporate',
        'tax',
        'immigration',
        'human_rights',
      ],
      required: true,
    },
    languages: {
      type: [String],
      enum: ['en', 'hi', 'bn', 'te', 'mr', 'ta', 'gu', 'kn', 'ml', 'pa'],
      default: ['en'],
    },
    location: {
      city: { type: String, required: true },
      state: { type: String, required: true },
      coordinates: CoordinatesSchema,
    },
    consultationFee: {
      type: Number,
      required: true,
      min: [0, 'Fee cannot be negative'],
    },
    isProBono: {
      type: Boolean,
      default: false,
    },
    isEmergencyAvailable: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    bio: {
      type: String,
      maxlength: [1000, 'Bio cannot exceed 1000 characters'],
    },
    experience: {
      type: Number,
      min: 0,
    },
    education: {
      type: String,
      trim: true,
    },
    profilePhotoUrl: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

LawyerSchema.index({ 'location.coordinates': '2dsphere' });
LawyerSchema.index({ specializations: 1, rating: -1 });

module.exports = mongoose.models.Lawyer || mongoose.model('Lawyer', LawyerSchema);
