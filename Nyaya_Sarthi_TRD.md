# Nyaya Sarthi — Technical Requirements Document (TRD)
###  | NIT Patna |

---

> **Document Version:** 1.0  
> **Last Updated:** April 11, 2026  
> **Classification:** Public (Open-Source, MIT License)  


---

## Table of Contents

1. [System Architecture Overview](#1-system-architecture-overview)
2. [Tech Stack Justification](#2-tech-stack-justification)
3. [Database Schema](#3-database-schema)
4. [API Reference](#4-api-reference)
5. [AI Integration Specifications](#5-ai-integration-specifications)
6. [Document Analysis Pipeline](#6-document-analysis-pipeline)
7. [Authentication & Authorization Architecture](#7-authentication--authorization-architecture)
8. [Frontend Architecture](#8-frontend-architecture)
9. [Third-Party Integrations](#9-third-party-integrations)
10. [Security Considerations](#10-security-considerations)
11. [Performance Considerations](#11-performance-considerations)
12. [36-Hour Execution Roadmap](#12-36-hour-execution-roadmap)
13. [README Structure](#13-readme-structure)
14. [ByteVerse-26 Rulebook Compliance Checklist](#14-byteverse-26-rulebook-compliance-checklist)

---

## 1. System Architecture Overview

### 1.1 Platform Summary

**Nyaya Sarthi** (meaning "Guide to Justice" in Hindi) is a comprehensive, A-to-Z legal ecosystem for Indian citizens. It is a full-stack SaaS platform that democratises access to legal knowledge and services by combining conversational AI, document intelligence, a verified lawyer marketplace, and case management tooling — all in a single, mobile-responsive web application.

### 1.2 High-Level Architecture Diagram (Description)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER / MOBILE                          │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  ┌────────────┐ │
│  │  Next.js 14  │  │ Web Speech   │  │  ElevenLabs   │  │  Cloudinary│ │
│  │  App Router  │  │ API (STT)    │  │  TTS Widget   │  │  File CDN  │ │
│  │  + Tailwind  │  └──────────────┘  └───────────────┘  └────────────┘ │
│  └──────┬──────┘                                                        │
└─────────┼───────────────────────────────────────────────────────────────┘
          │ HTTPS / REST
┌─────────▼───────────────────────────────────────────────────────────────┐
│                    NEXT.JS 14 APP ROUTER (VERCEL)                       │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                     API ROUTES (/api/*)                         │   │
│  │  /lexbot   /documents   /lawyers   /bookings   /cases   /forum  │   │
│  │  /hub      /admin       /ecourts   /auth                        │   │
│  └──────────────────────────────┬──────────────────────────────────┘   │
│                                  │                                      │
│  ┌───────────────┐  ┌────────────▼──────────┐  ┌──────────────────┐   │
│  │  NextAuth.js  │  │   Business Logic +     │  │  Mongoose ODM    │   │
│  │  v5 (JWT)     │  │   Service Layer        │  │  (10 schemas)    │   │
│  └───────────────┘  └────────────┬──────────┘  └────────┬─────────┘   │
└───────────────────────────────────┼─────────────────────┼─────────────┘
                                    │                      │
              ┌─────────────────────┼──────────────────────┤
              │                     │                      │
   ┌──────────▼──────┐  ┌──────────▼──────┐  ┌──────────▼──────────┐
   │  Google Gemini  │  | MongoDB Atlas   │  │  External Services  │
   │  (LexBot +      │  │  (Primary DB)   │  │  • Cloudinary       │
   │   Doc Analysis  │  │                 │  │  • ElevenLabs       │
   │   + Law Search) │  │                 │  │  • eCourts API      │
   └─────────────────┘  └─────────────────┘  └─────────────────────┘
```

### 1.3 Component Interaction Map

| Component | Communicates With | Protocol | Auth Required |
|-----------|-------------------|----------|---------------|
| Next.js Pages | Next.js API Routes | Internal (same process) | NextAuth session cookie |
| API Routes | MongoDB Atlas | Mongoose (TCP) | DB credentials via env |
| API Routes | GOOGLE GEMINI | HTTPS REST | `GEMINII_API_KEY` |
| API Routes | Cloudinary | HTTPS REST | `CLOUDINARY_*` env vars |
| API Routes | ElevenLabs | HTTPS REST | `ELEVENLABS_API_KEY` |
| API Routes | eCourts API | HTTPS REST | `ECOURTS_API_KEY` |
| Client Browser | Web Speech API | Browser Native API | None (microphone permission) |
| Vercel Edge | GitHub | Git push trigger | GitHub OAuth App |

### 1.4 Data Flow Summary

1. **User Request** → Next.js App Router page (SSR or CSR)
2. **Client Action** → `fetch()` call to `/api/*` route
3. **API Route** → NextAuth session verification via `getServerSession()`
4. **API Route** → Mongoose query to MongoDB Atlas
5. **If AI Feature** → GOOGLE Gemini API call with structured prompt
6. **If File Feature** → Cloudinary upload + OCR processing
7. **Response** → Structured JSON returned to client
8. **Client** → React state update → UI re-render

---

## 2. Tech Stack Justification

| Technology | Role | Justification |
|------------|------|---------------|
| **Next.js 14 (App Router)** | Full-stack framework | Unified SSR + API routes eliminates the need for a separate backend. Vercel deployment is zero-config. App Router enables server components for performance. |
| **Tailwind CSS** | Styling | Utility-first CSS enables rapid, consistent UI development — critical for a 36-hour hackathon. No context-switching between CSS files and JSX. |
| **MongoDB Atlas** | Primary database | Schema-flexible NoSQL suits the varied data shapes (chat sessions, legal documents, case timelines). Atlas free tier supports hackathon scale. Mongoose provides schema enforcement. |
| **Mongoose** | ODM | Strong schema validation and middleware hooks (e.g., pre-save password hashing) with TypeScript-friendly typing. |
| **NextAuth.js v5** | Authentication | Native Next.js integration. Supports credentials provider (email/password) and JWT sessions. Three-role enforcement is trivial via session callbacks. |
| **Google Gemini-API ** | Core AI engine | State-of-the-art reasoning for legal text. Superior JSON mode output for structured document analysis. Multilingual by default — critical for the Indian market. |
| **Tesseract.js** | Client-side OCR | Browser-native OCR eliminates an additional microservice. Supports Devanagari script for Hindi documents. |
| **pdf-parse** | PDF text extraction | Lightweight, server-side, no binary dependencies — critical for Vercel serverless. |
| **Web Speech API** | Voice STT | Zero cost, browser-native, no additional API keys. Sufficient quality for MVP voice input. |
| **ElevenLabs API** | Voice TTS | High-quality, natural-sounding Indian-accented Hindi and English TTS. Free tier supports hackathon demo volume. |
| **Cloudinary** | File storage | Reliable CDN for uploaded documents and evidence. Free tier generous. Signed URL support for secure access. Transform API for image optimisation. |
| **Vercel** | Deployment | Instant GitHub-integrated deployment. Preview URLs for every commit. Native Next.js support. |
| **eCourts API** | Court case data | Official Indian government public API for live case status — adds real legal data to the platform. |

---

## 3. Database Schema

### 3.1 Connection Setup

```javascript
// lib/db/mongoose.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
```

---

### 3.2 Schema 1: User

```javascript
// models/User.js
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // Never return password in queries by default
    },
    role: {
      type: String,
      enum: ['user', 'lawyer', 'admin'],
      default: 'user',
    },
    preferredLanguage: {
      type: String,
      enum: ['en', 'hi', 'bn', 'te', 'mr', 'ta', 'gu', 'kn', 'ml', 'pa'],
      default: 'en',
    },
    avatar: {
      type: String, // Cloudinary URL
      default: null,
    },
    phone: {
      type: String,
      trim: true,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method: compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
```

---

### 3.3 Schema 2: Lawyer

```javascript
// models/Lawyer.js
import mongoose, { Schema } from 'mongoose';

const CoordinatesSchema = new Schema(
  {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }, // [longitude, latitude]
  },
  { _id: false }
);

const LawyerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // One lawyer profile per user account
    },
    barCouncilId: {
      type: String,
      required: [true, 'Bar Council ID is required'],
      trim: true,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false, // Must be approved by admin before marketplace listing
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Admin who approved
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
      coordinates: CoordinatesSchema, // For proximity-based matching
    },
    consultationFee: {
      type: Number,
      required: true,
      min: [0, 'Fee cannot be negative'],
    },
    isProBono: {
      type: Boolean,
      default: false, // Offers free services
    },
    isEmergencyAvailable: {
      type: Boolean,
      default: false, // Available for emergency SOS bookings
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
      type: Number, // Years of experience
      min: 0,
    },
    education: {
      type: String,
      trim: true,
    },
    profilePhotoUrl: {
      type: String, // Cloudinary URL
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// 2dsphere index for geolocation-based queries
LawyerSchema.index({ 'location.coordinates': '2dsphere' });
LawyerSchema.index({ specializations: 1, rating: -1 }); // Compound for smart matching

export default mongoose.models.Lawyer || mongoose.model('Lawyer', LawyerSchema);
```

---

### 3.4 Schema 3: ChatSession

```javascript
// models/ChatSession.js
import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

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
      type: String, // ElevenLabs TTS audio URL for this message
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
      default: null, // null for anonymous/guest sessions
    },
    sessionId: {
      type: String,
      unique: true,
      default: () => uuidv4(),
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
      type: String, // Auto-generated session summary for Emergency SOS
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

ChatSessionSchema.index({ userId: 1, createdAt: -1 });
ChatSessionSchema.index({ sessionId: 1 });

export default mongoose.models.ChatSession || mongoose.model('ChatSession', ChatSessionSchema);
```

---

### 3.5 Schema 4: DocumentAnalysis

```javascript
// models/DocumentAnalysis.js
import mongoose, { Schema } from 'mongoose';

const RedFlagSchema = new Schema(
  {
    clause: { type: String, required: true },
    explanation: { type: String, required: true },
    relevantLaw: { type: String, default: null }, // e.g., "Indian Contract Act, 1872 - Section 23"
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
      type: String, // Cloudinary secure URL
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
      type: String, // Full OCR/parse output
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
      type: String, // Error message if status = 'failed'
      default: null,
    },
    manualTextInput: {
      type: String, // User-provided text if OCR failed
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.DocumentAnalysis || mongoose.model('DocumentAnalysis', DocumentAnalysisSchema);
```

---

### 3.6 Schema 5: GeneratedDocument

```javascript
// models/GeneratedDocument.js
import mongoose, { Schema } from 'mongoose';

const GeneratedDocumentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    documentType: {
      type: String,
      enum: [
        'legal_notice',
        'rti_application',
        'fir_template',
        'rental_agreement',
        'nda',
        'affidavit',
        'consumer_complaint',
      ],
      required: true,
    },
    formData: {
      type: Schema.Types.Mixed, // Flexible: stores all wizard form inputs
      required: true,
    },
    generatedContent: {
      type: String, // Full text of the generated document
      required: true,
    },
    generatedContentHtml: {
      type: String, // HTML version for browser preview
      default: null,
    },
    pdfCloudinaryUrl: {
      type: String, // Cloudinary URL of generated PDF
      default: null,
    },
    isReviewedByLawyer: {
      type: Boolean,
      default: false,
    },
    reviewingLawyerId: {
      type: Schema.Types.ObjectId,
      ref: 'Lawyer',
      default: null,
    },
    reviewNotes: {
      type: String,
      default: null,
    },
    version: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.GeneratedDocument || mongoose.model('GeneratedDocument', GeneratedDocumentSchema);
```

---

### 3.7 Schema 6: Case

```javascript
// models/Case.js
import mongoose, { Schema } from 'mongoose';

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
    fileUrl: { type: String, required: true }, // Cloudinary signed URL
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
      default: null, // eCourts case number
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
      type: String, // LexBot session that initiated this case
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

CaseSchema.index({ userId: 1, status: 1 });
CaseSchema.index({ nextHearingDate: 1 }); // For reminder queries

export default mongoose.models.Case || mongoose.model('Case', CaseSchema);
```

---

### 3.8 Schema 7: Booking

```javascript
// models/Booking.js
import mongoose, { Schema } from 'mongoose';

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
      type: Number, // Duration in minutes
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
      type: String, // Video call URL
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
      type: String, // Auto-generated from LexBot session for emergency bookings
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

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
```

---

### 3.9 Schema 8: Review

```javascript
// models/Review.js
import mongoose, { Schema } from 'mongoose';

const ReviewSchema = new Schema(
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
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
      unique: true, // One review per completed booking
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    comment: {
      type: String,
      maxlength: [1000, 'Comment cannot exceed 1000 characters'],
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: true, // All reviews tied to bookings are considered verified
    },
  },
  {
    timestamps: true,
  }
);

// After a new review is saved, update the Lawyer's rating and totalReviews
ReviewSchema.post('save', async function () {
  const Lawyer = mongoose.model('Lawyer');
  const Review = mongoose.model('Review');
  
  const stats = await Review.aggregate([
    { $match: { lawyerId: this.lawyerId } },
    { $group: { _id: '$lawyerId', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]);
  
  if (stats.length > 0) {
    await Lawyer.findByIdAndUpdate(this.lawyerId, {
      rating: Math.round(stats[0].avgRating * 10) / 10,
      totalReviews: stats[0].count,
    });
  }
});

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
```

---

### 3.10 Schema 9: ForumPost

```javascript
// models/ForumPost.js
import mongoose, { Schema } from 'mongoose';

const AnswerSchema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    authorRole: {
      type: String,
      enum: ['user', 'lawyer', 'admin'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    upvotes: {
      type: [Schema.Types.ObjectId], // Array of User IDs who upvoted
      ref: 'User',
      default: [],
    },
    upvoteCount: {
      type: Number,
      default: 0,
    },
    isVerifiedLawyerAnswer: {
      type: Boolean,
      default: false, // True if authorRole is 'lawyer' and lawyer isVerified
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const ForumPostSchema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    authorRole: {
      type: String,
      enum: ['user', 'lawyer', 'admin'],
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Post content is required'],
      maxlength: [5000, 'Content cannot exceed 5000 characters'],
    },
    legalDomain: {
      type: String,
      enum: ['criminal', 'civil', 'family', 'consumer', 'property', 'cyber', 'labour', 'constitutional', 'general'],
      default: 'general',
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    upvotes: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    upvoteCount: {
      type: Number,
      default: 0,
    },
    answers: {
      type: [AnswerSchema],
      default: [],
    },
    answerCount: {
      type: Number,
      default: 0,
    },
    isResolved: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

ForumPostSchema.index({ legalDomain: 1, createdAt: -1 });
ForumPostSchema.index({ upvoteCount: -1 }); // For "trending" sort

export default mongoose.models.ForumPost || mongoose.model('ForumPost', ForumPostSchema);
```

---

### 3.11 Schema 10: CaseStudy

```javascript
// models/CaseStudy.js
import mongoose, { Schema } from 'mongoose';

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
      trim: true, // e.g., "Supreme Court of India"
    },
    legalDomain: {
      type: String,
      enum: ['criminal', 'civil', 'family', 'consumer', 'property', 'cyber', 'labour', 'constitutional'],
      required: true,
    },
    summary: {
      type: String,
      required: true,
      maxlength: [500, 'Summary cannot exceed 500 characters'], // Short overview
    },
    fullExplainer: {
      type: String,
      required: true, // Detailed explanation in plain language
    },
    impact: {
      type: String,
      required: true, // What changed because of this case
    },
    relatedLaws: {
      type: [String], // e.g., ["IPC Section 302", "CrPC Article 161"]
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    aiGeneratedSummary: {
      type: String, // GPT-4o simplified explanation
      default: null,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Admin who published
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
CaseStudySchema.index({ $text: { $search: 'text' } }); // Full-text search

export default mongoose.models.CaseStudy || mongoose.model('CaseStudy', CaseStudySchema);
```

---

## 4. API Reference

### 4.1 Authentication Routes

#### `GET|POST /api/auth/[...nextauth]`
**Auth Guard:** Public  
**Handler:** NextAuth.js catch-all route  
**Logic:** Handles sign-in, sign-out, session retrieval, and CSRF token management.

---

### 4.2 LexBot Routes

#### `POST /api/lexbot/chat`
**Auth Guard:** Public (guest sessions allowed; user sessions save history)  
**Request Body:**
```json
{
  "message": "My landlord is refusing to return my security deposit.",
  "sessionId": "uuid-v4-string | null",
  "language": "en",
  "history": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```
**Response Shape:**
```json
{
  "reply": "Under the Rent Control Act...",
  "sessionId": "uuid-v4-string",
  "metadata": {
    "legalDomain": "civil",
    "severityLevel": "medium",
    "citedLaws": ["Transfer of Property Act 1882", "Specific Relief Act 1963"],
    "emergencyHelplines": null
  }
}
```
**Key Logic Steps:**
1. Validate `message` (non-empty, ≤2000 chars).
2. If `sessionId` provided, load existing `ChatSession`; else create new.
3. Append user message to `messages` array.
4. Construct GPT-4o request with full `history` + LexBot system prompt.
5. Call OpenAI with `temperature: 0.3`, `response_format: { type: "json_object" }`.
6. Parse JSON response; extract `reply` and `metadata`.
7. If `severityLevel === 'emergency'`, append helpline data to metadata.
8. Save updated session to MongoDB (update `legalDomain`, `severityLevel`).
9. Return structured response to client.

---

#### `POST /api/lexbot/voice`
**Auth Guard:** User only  
**Request Body:** `multipart/form-data` with field `audio` (WebM/OGG blob from Web Speech API)  
**Response Shape:**
```json
{
  "transcript": "My landlord...",
  "reply": "Under the Rent Control Act...",
  "audioUrl": "https://api.elevenlabs.io/...",
  "sessionId": "uuid",
  "metadata": { "legalDomain": "civil", "severityLevel": "medium" }
}
```
**Key Logic Steps:**
1. Receive audio blob (note: Web Speech API handles STT client-side; this route receives the *transcript* text + optional audio).
2. Pass transcript to LexBot chat logic (same as `/api/lexbot/chat`).
3. Receive text reply.
4. POST reply text to ElevenLabs API with voice ID.
5. Return both text reply and ElevenLabs audio URL.

---

#### `GET /api/lexbot/sessions/[sessionId]`
**Auth Guard:** User only (session must belong to requesting user)  
**Response Shape:**
```json
{
  "session": {
    "sessionId": "uuid",
    "legalDomain": "civil",
    "severityLevel": "medium",
    "messages": [ ... ],
    "createdAt": "ISO date"
  }
}
```
**Key Logic Steps:**
1. Verify session ownership: `session.userId === req.user._id`.
2. Return full ChatSession document.

---

### 4.3 Document Routes

#### `POST /api/documents/analyze`
**Auth Guard:** User only  
**Request Body:** `multipart/form-data` — field: `file` (PDF, JPG, PNG, WEBP; max 10MB)  
**Response Shape:**
```json
{
  "documentId": "mongo-object-id",
  "processingStatus": "complete",
  "analysisResult": {
    "overallRisk": "high",
    "summary": "This rental agreement contains several clauses...",
    "redFlags": [
      {
        "clause": "Clause 7: Landlord may terminate with 24 hours notice",
        "explanation": "This is unlawful under the Rent Control Act.",
        "relevantLaw": "Rent Control Act 1948 - Section 14",
        "severity": "high"
      }
    ],
    "cautionPoints": [ ... ],
    "standardClauses": [ ... ],
    "userAdvice": "We strongly recommend..."
  }
}
```
**Key Logic Steps:** See Section 6 (Document Analysis Pipeline).

---

#### `POST /api/documents/generate`
**Auth Guard:** User only  
**Request Body:**
```json
{
  "documentType": "rti_application",
  "formData": {
    "applicantName": "Rajesh Kumar",
    "applicantAddress": "...",
    "publicAuthority": "...",
    "informationSought": "...",
    "dateOfEvent": "2024-01-15"
  }
}
```
**Response Shape:**
```json
{
  "documentId": "mongo-object-id",
  "generatedContent": "TO THE PUBLIC INFORMATION OFFICER...",
  "documentType": "rti_application"
}
```
**Key Logic Steps:**
1. Validate `documentType` against enum.
2. Load appropriate template prompt for the document type.
3. Call GPT-4o with template system prompt + `formData` as JSON.
4. Parse generated document text.
5. Save to `GeneratedDocument` collection.
6. Return document ID and content.

---

#### `GET /api/documents/[id]`
**Auth Guard:** User only (must be owner)  
**Response:** Full `DocumentAnalysis` or `GeneratedDocument` by ID.

#### `DELETE /api/documents/[id]`
**Auth Guard:** User only (must be owner)  
**Logic:** Soft-delete (set `isDeleted: true`) + remove Cloudinary asset via Cloudinary destroy API.

---

### 4.4 Lawyer Routes

#### `GET /api/lawyers`
**Auth Guard:** Public  
**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `specialization` | string | Filter by legal domain |
| `city` | string | Filter by city |
| `isProBono` | boolean | Show only pro-bono lawyers |
| `isEmergencyAvailable` | boolean | Show only emergency-available |
| `minRating` | number | Minimum rating (0–5) |
| `language` | string | Filter by supported language |
| `page` | number | Pagination (default: 1) |
| `limit` | number | Results per page (default: 10) |

**Response Shape:**
```json
{
  "lawyers": [ { ...lawyerProfile } ],
  "total": 42,
  "page": 1,
  "totalPages": 5
}
```

#### `POST /api/lawyers`
**Auth Guard:** User only (role must be `lawyer` or transition to lawyer role)  
**Request Body:** Lawyer registration fields (barCouncilId, specializations, languages, location, consultationFee, bio, experience)  
**Logic:** Create Lawyer document with `isVerified: false`. Notify admin.

---

#### `GET /api/lawyers/[id]`
**Auth Guard:** Public  
**Response:** Full lawyer profile with populated `userId` (name, avatar) but NOT password.

---

#### `GET /api/lawyers/[id]/reviews`
**Auth Guard:** Public  
**Response:** Paginated reviews for a lawyer.

#### `POST /api/lawyers/[id]/reviews`
**Auth Guard:** User only  
**Validation:** User must have a `Booking` with `status: 'completed'` for this lawyerId. No duplicate reviews (bookingId unique constraint).

---

#### `POST /api/lawyers/match`
**Auth Guard:** User only  
**Request Body:**
```json
{
  "legalDomain": "family",
  "city": "Patna",
  "isEmergency": false
}
```
**Response Shape:**
```json
{
  "matches": [
    { "rank": 1, "lawyer": { ...profile }, "matchScore": 0.95 },
    { "rank": 2, "lawyer": { ...profile }, "matchScore": 0.87 },
    { "rank": 3, "lawyer": { ...profile }, "matchScore": 0.72 }
  ]
}
```
**Key Logic Steps:**
1. Query `{ specializations: legalDomain, isVerified: true, 'location.city': city }`.
2. Sort by: specialization match weight (1.0) + rating weight (0.3) + isEmergencyAvailable bonus (0.2).
3. Return top 3.

---

### 4.5 Booking Routes

#### `GET /api/bookings`
**Auth Guard:** User only  
**Query Params:** `status`, `page`, `limit`  
**Response:** Paginated bookings for the authenticated user, populated with lawyer name.

#### `POST /api/bookings`
**Auth Guard:** User only  
**Request Body:**
```json
{
  "lawyerId": "objectId",
  "scheduledAt": "2026-04-15T10:00:00Z",
  "duration": 15,
  "type": "free_consult",
  "caseId": "objectId | null",
  "notes": "..."
}
```
**Key Logic Steps:**
1. Check for scheduling conflicts (overlapping bookings for that lawyer).
2. If `type === 'emergency'`: fetch user's most recent LexBot session, auto-generate `emergencySummary`.
3. Create Booking with `status: 'pending'`.
4. Add timeline event to associated Case if `caseId` provided.

---

#### `PATCH /api/bookings/[id]`
**Auth Guard:** User or Lawyer (only parties to the booking)  
**Body:** `{ status: 'confirmed' | 'cancelled', meetingLink?, cancellationReason? }`

#### `DELETE /api/bookings/[id]`
**Auth Guard:** User only (within 24 hours of creation)  
**Logic:** Set `status: 'cancelled'`, record `cancelledBy: 'user'`.

---

### 4.6 Case Routes

#### `GET /api/cases`
**Auth Guard:** User only  
**Query Params:** `status`, `legalDomain`, `page`  
**Response:** Paginated cases for authenticated user.

#### `POST /api/cases`
**Auth Guard:** User only  
**Body:** `{ title, description, legalDomain, caseNumber?, courtName? }`

#### `GET /api/cases/[id]`
**Auth Guard:** User or assigned Lawyer  
**Response:** Full case with populated timeline, evidence list, and lawyer info.

#### `PATCH /api/cases/[id]`
**Auth Guard:** User or assigned Lawyer  
**Body:** Partial case update (status, nextHearingDate, courtName, lawyerId).

#### `DELETE /api/cases/[id]`
**Auth Guard:** User only (case owner)  
**Logic:** Soft-delete. Detach from any active bookings.

---

#### `POST /api/cases/[id]/evidence`
**Auth Guard:** User or assigned Lawyer  
**Body:** `multipart/form-data` — `file` + `category` + `description`  
**Logic:**
1. Validate file type and size (max 20MB).
2. Upload to Cloudinary under folder `nyaya-sarthi/evidence/[caseId]`.
3. Push evidence object to `case.evidence` array.
4. Return updated evidence list.

---

#### `POST /api/cases/[id]/timeline`
**Auth Guard:** User or assigned Lawyer  
**Body:** `{ date, event }`  
**Logic:** Push to `case.timeline` array with `addedBy` set to session user's role.

---

### 4.7 eCourts Route

#### `GET /api/ecourts/status`
**Auth Guard:** User only  
**Query Params:** `caseNumber` (required)  
**Response Shape:**
```json
{
  "caseNumber": "CRL-1234/2024",
  "status": "Hearing Scheduled",
  "court": "District Court, Patna",
  "nextDate": "2026-05-10",
  "parties": { "petitioner": "...", "respondent": "..." },
  "judge": "Hon. Justice ...",
  "lastUpdated": "2026-04-10"
}
```
**Key Logic Steps:**
1. Validate `caseNumber` format.
2. Proxy request to eCourts API with `ECOURTS_API_KEY`.
3. Transform response to above structure.
4. Cache result in MongoDB for 1 hour (store in Case document `eCourtsCachedStatus`).

---

### 4.8 Forum Routes

#### `GET /api/forum`
**Auth Guard:** Public  
**Query Params:** `legalDomain`, `sort` (latest | trending), `page`  
**Response:** Paginated forum posts. `isAnonymous: true` posts show "Anonymous User" as author.

#### `POST /api/forum`
**Auth Guard:** User only  
**Body:** `{ title, content, legalDomain, isAnonymous, tags[] }`

#### `GET /api/forum/[id]`
**Auth Guard:** Public  
**Response:** Single post with all answers.

#### `POST /api/forum/[id]/answers`
**Auth Guard:** User only  
**Body:** `{ content }`  
**Logic:** If author is a verified Lawyer, set `isVerifiedLawyerAnswer: true`.

#### `PATCH /api/forum/[id]/answers` (upvote)
**Auth Guard:** User only  
**Body:** `{ answerId }`  
**Logic:** Toggle upvote (add/remove userId from `upvotes` array; update `upvoteCount`).

---

### 4.9 Hub Routes

#### `GET /api/hub/casestudies`
**Auth Guard:** Public  
**Query Params:** `legalDomain`, `tags`, `search` (text), `page`  
**Filter:** Only return `{ isPublished: true }` to public.

#### `GET /api/hub/casestudies/[id]`
**Auth Guard:** Public  
**Logic:** Increment `viewCount` on access.

#### `POST /api/hub/lawsearch`
**Auth Guard:** Public (rate-limited to 10/hour per IP for anonymous users)  
**Request Body:**
```json
{
  "query": "Can my employer deduct salary without notice?"
}
```
**Response Shape:**
```json
{
  "query": "Can my employer deduct salary without notice?",
  "answer": "Under Indian labour law, employers are prohibited from...",
  "relevantLaws": [
    { "name": "Payment of Wages Act, 1936", "section": "Section 7", "summary": "..." },
    { "name": "Industrial Disputes Act, 1947", "section": "Section 25F", "summary": "..." }
  ],
  "disclaimer": "This is for informational purposes only..."
}
```

---

### 4.10 Admin Routes

#### `GET /api/admin/lawyers/verify`
**Auth Guard:** Admin only  
**Query Params:** `status` (pending | approved | rejected), `page`  
**Response:** Lawyer profiles with `isVerified: false` pending review.

#### `PATCH /api/admin/lawyers/verify`
**Auth Guard:** Admin only  
**Body:** `{ lawyerId, action: 'approve' | 'reject', rejectionReason? }`  
**Logic:**
1. Set `isVerified: true/false`, `verifiedAt`, `verifiedBy`.
2. Update associated User role to `lawyer` if approved.
3. (MVP) Log action in audit trail.

---

#### `POST /api/admin/content`
**Auth Guard:** Admin only  
**Body:** CaseStudy creation fields.  
**Logic:** Create `CaseStudy` with `isPublished: false`. Auto-generate `aiGeneratedSummary` via GPT-4o.

#### `PATCH /api/admin/content/[id]`
**Auth Guard:** Admin only  
**Body:** Partial CaseStudy update including `isPublished`.

#### `DELETE /api/admin/content/[id]`
**Auth Guard:** Admin only  
**Logic:** Hard-delete CaseStudy.

---

## 5. AI Integration Specifications

### 5.1 LexBot System Prompt

**Model:** `gpt-4o`  
**Temperature:** `0.3`  
**Max Tokens:** `1500`  
**Response Format:** `{ type: "json_object" }`

```
You are Nyaya Sarthi's LexBot — a compassionate, highly knowledgeable AI legal guide specializing in Indian law. You help ordinary Indian citizens understand their legal rights and options.

CORE BEHAVIOUR:
- Mirror the user's language. If the user writes in Hindi, respond in Hindi. If in English, respond in English. If mixed, use Hinglish.
- Always be empathetic, clear, and non-judgmental. Many users face serious distress.
- Never provide definitive legal advice. You provide legal *information* and recommend professional counsel.
- Always cite specific Indian laws, IPC sections, CrPC articles, or Acts with section numbers.
- Include a brief disclaimer at the end of every response.

DOMAIN DETECTION:
Identify the user's legal situation and classify it into exactly ONE of these domains:
- criminal | civil | family | consumer | property | cyber | labour | constitutional | general

SEVERITY CLASSIFICATION:
Assess the urgency and classify into exactly ONE of:
- low: informational query, no immediate threat
- medium: legal issue exists but not urgent
- high: significant legal risk, action needed soon
- emergency: immediate physical threat, domestic violence, illegal detention, medical emergency with legal dimension

EMERGENCY ROUTING:
If severityLevel is "emergency", IMMEDIATELY include these helplines in your response:
- National Emergency: 112
- Women Helpline: 1091
- National Legal Services Authority (NALSA): 15100
- Cyber Crime: 1930
- Child Helpline: 1098

LAW CITATION FORMAT:
Always cite laws in this format: "[Act Name, Year] – Section/Article [Number]: [Brief description]"
Example: "Indian Penal Code, 1860 – Section 498A: Husband or relative of husband of a woman subjecting her to cruelty."

RESPONSE FORMAT:
Your entire response MUST be a valid JSON object with this exact structure:
{
  "reply": "<Your full conversational response to the user in their language. Include legal information, cite relevant laws, and practical next steps.>",
  "metadata": {
    "legalDomain": "<one of: criminal|civil|family|consumer|property|cyber|labour|constitutional|general>",
    "severityLevel": "<one of: low|medium|high|emergency>",
    "citedLaws": ["<Law 1 citation>", "<Law 2 citation>"],
    "suggestedActions": ["<Action 1>", "<Action 2>"],
    "emergencyHelplines": null | [{ "name": "...", "number": "..." }],
    "disclaimer": "यह जानकारी केवल शैक्षिक उद्देश्यों के लिए है और कानूनी सलाह नहीं है। कृपया एक योग्य अधिवक्ता से परामर्श करें। | This information is for educational purposes only and does not constitute legal advice. Please consult a qualified advocate."
  }
}

IMPORTANT: Do not include any text outside the JSON object. The entire output must be parseable as JSON.
```

---

### 5.2 Document Analysis System Prompt

**Model:** `gpt-4o`  
**Temperature:** `0.2`  
**Max Tokens:** `2000`  
**Response Format:** `{ type: "json_object" }`

```
You are an expert Indian legal analyst for Nyaya Sarthi. Your role is to review legal documents on behalf of ordinary citizens who may not have legal expertise and provide a clear, structured risk assessment.

DOCUMENT TYPES YOU HANDLE:
rental_agreement | employment_contract | sale_deed | power_of_attorney | loan_agreement | partnership_deed | affidavit | court_notice | consumer_complaint | nda | general_legal_document

ANALYSIS FRAMEWORK:
1. RED FLAGS (overallRisk: high): Clauses that are potentially illegal, grossly unfair, or could cause significant legal or financial harm. Must cite the Indian law that is being violated or exploited.
2. CAUTION POINTS (overallRisk: medium): Unusual or one-sided clauses that are technically legal but disadvantageous to the party reading this document.
3. STANDARD CLAUSES (overallRisk: low): Normal, expected clauses that pose no special concern.

PLAIN LANGUAGE REQUIREMENT:
All explanations must be written for a layperson with no legal background. Use simple Hindi/English sentences. Avoid legal jargon unless you immediately explain it.

LAW CITATION FORMAT:
"[Act Name, Year] – Section [Number]: [Brief description of what this section says and why it's relevant here]"

RESPONSE FORMAT:
Your entire response MUST be a valid JSON object with this exact structure:
{
  "documentType": "<identified document type>",
  "overallRisk": "<low|medium|high>",
  "summary": "<2-3 sentence plain language summary of what this document is and its main purpose>",
  "redFlags": [
    {
      "clause": "<Quoted or paraphrased clause text>",
      "explanation": "<Plain language explanation of why this is a red flag>",
      "relevantLaw": "<Specific Indian law citation>",
      "severity": "<high|medium>"
    }
  ],
  "cautionPoints": [
    {
      "clause": "<Quoted or paraphrased clause text>",
      "explanation": "<Plain language explanation of why to be cautious>"
    }
  ],
  "standardClauses": ["<List of clause summaries that are normal and expected>"],
  "userAdvice": "<Concrete, actionable advice for the person. Should include: whether to sign, what to negotiate, whether to seek a lawyer, and any time-sensitive actions.>"
}

HANDLING POOR QUALITY TEXT:
If the extracted text is garbled, incomplete, or appears to be from a non-legal document, still return valid JSON with overallRisk: "low" and a note in userAdvice explaining the limitation.

IMPORTANT: Do not include any text outside the JSON object.
```

---

### 5.3 Law Search System Prompt

**Model:** `gpt-4o`  
**Temperature:** `0.5`  
**Max Tokens:** `1200`  
**Response Format:** `{ type: "json_object" }`

```
You are Nyaya Sarthi's Legal Awareness Assistant — an expert educator on Indian law. Your mission is to help ordinary Indian citizens discover what laws protect them and how to understand those laws in simple terms.

YOUR ROLE:
- Identify all relevant Indian laws, Acts, constitutional provisions, and landmark case precedents for any situation the user describes.
- Explain each law in plain, simple language that a 10th-grade student can understand.
- Be encouraging and empowering — help people understand that the law is on their side when it is.
- Be honest when the law is unclear, contested, or when you are not certain.

SCOPE:
Focus exclusively on Indian law: IPC, CrPC, Constitution of India, Central Acts, Consumer Protection Act, RTI Act, Domestic Violence Act, IT Act, Labour laws, and relevant Supreme Court / High Court precedents.

HANDLING UNCERTAINTY:
If the query is ambiguous or you're not certain which law applies, say so clearly and explain the range of possibilities. Never fabricate law citations.

RESPONSE FORMAT:
Your entire response MUST be a valid JSON object:
{
  "query": "<Restate the user's query>",
  "answer": "<A friendly, thorough 2-4 paragraph plain-language explanation of the legal landscape for this situation>",
  "relevantLaws": [
    {
      "name": "<Full Act name and year>",
      "section": "<Specific section or article, if applicable>",
      "summary": "<1-2 sentence plain language summary of what this law says>",
      "howItHelps": "<How this specific law applies to the user's situation>"
    }
  ],
  "landmarkCases": [
    {
      "caseName": "<Case name, year, court>",
      "significance": "<What was decided and why it matters>"
    }
  ],
  "practicalSteps": ["<Step 1>", "<Step 2>"],
  "disclaimer": "यह जानकारी केवल जागरूकता के लिए है। | This is for legal awareness only and does not constitute legal advice."
}

IMPORTANT: Return only valid JSON. If no relevant Indian law exists for the query, explain that clearly in the answer field with an empty relevantLaws array.
```

---

## 6. Document Analysis Pipeline

### 6.1 Complete Step-by-Step Implementation

```
FILE UPLOAD REQUEST
      │
      ▼
┌─────────────────────────────┐
│  Step 1: File Validation     │
│  - Check MIME type:          │
│    PDF | JPG | PNG | WEBP    │
│  - Check file size: ≤ 10MB   │
│  - Sanitize filename         │
│  - Generate unique fileId    │
└──────────────┬──────────────┘
               │ Pass
               ▼
┌─────────────────────────────┐
│  Step 2: Cloudinary Upload   │
│  - Upload to Cloudinary      │
│    folder: nyaya-sarthi/docs │
│  - Get secure_url +          │
│    public_id                 │
│  - Create DocumentAnalysis   │
│    record (status: queued)   │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│  Step 3: Branch on File Type │
└──────┬──────────────┬────────┘
       │ PDF           │ Image (JPG/PNG/WEBP)
       ▼               ▼
┌──────────────┐  ┌───────────────────────────┐
│ pdf-parse    │  │  Tesseract.js (server-side) │
│ (server-side)│  │  Language models: eng+hin   │
│              │  │  (Devanagari support)       │
│ extractedText│  │  extractedText              │
└──────┬───────┘  └──────────────┬────────────┘
       └──────────────┬──────────┘
                      ▼
        ┌─────────────────────────────┐
        │  Step 4: Text Quality Check  │
        │  if extractedText.length <  │
        │  100 chars:                 │
        │  → Update status:           │
        │    'manual_input_required'  │
        │  → Return 422 with          │
        │    manualInputRequired:true │
        └──────────────┬──────────────┘
                       │ Pass (≥100 chars)
                       ▼
        ┌─────────────────────────────┐
        │  Step 5: Text Chunking       │
        │  Target chunk: ≤3000 tokens  │
        │  (~12,000 chars)             │
        │  - Split on paragraph        │
        │    boundaries               │
        │  - For multi-chunk docs,    │
        │    only send first 3 chunks │
        │  - Prepend: "Document Part  │
        │    X of Y:"                 │
        └──────────────┬──────────────┘
                       ▼
        ┌─────────────────────────────┐
        │  Step 6: GPT-4o API Call     │
        │  model: gpt-4o              │
        │  temperature: 0.2           │
        │  max_tokens: 2000           │
        │  response_format:           │
        │   { type: "json_object" }   │
        │  messages: [                │
        │   { role: "system",         │
        │     content: DOC_PROMPT },  │
        │   { role: "user",           │
        │     content: extractedText }│
        │  ]                          │
        └──────────────┬──────────────┘
                       ▼
        ┌─────────────────────────────┐
        │  Step 7: JSON Validation     │
        │  try JSON.parse(response)   │
        │                             │
        │  Validate required fields:  │
        │  documentType, overallRisk, │
        │  summary, userAdvice        │
        │                             │
        │  if parse fails →           │
        │  RETRY ONCE with stricter   │
        │  prompt suffix:             │
        │  "Return ONLY valid JSON.   │
        │   No markdown. No text."    │
        │                             │
        │  if 2nd fail →              │
        │  status: 'failed'           │
        │  return 500 with error      │
        └──────────────┬──────────────┘
                       │ Parse success
                       ▼
        ┌─────────────────────────────┐
        │  Step 8: MongoDB Update      │
        │  - Update DocumentAnalysis: │
        │    status: 'complete'        │
        │    extractedText: text       │
        │    analysisResult: parsed    │
        │    extractedCharCount: n     │
        └──────────────┬──────────────┘
                       ▼
        ┌─────────────────────────────┐
        │  Step 9: Response to Client  │
        │  200 OK + full analysis      │
        │  result JSON                 │
        └─────────────────────────────┘
```

### 6.2 Code Implementation

```javascript
// app/api/documents/analyze/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db/mongoose';
import DocumentAnalysis from '@/models/DocumentAnalysis';
import cloudinary from '@/lib/cloudinary';
import { extractTextFromPDF, extractTextFromImage } from '@/lib/ocr';
import { analyzeDocumentWithGPT } from '@/lib/ai/documentAnalysis';

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await dbConnect();

  const formData = await request.formData();
  const file = formData.get('file');

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  // Step 1: Validate
  const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type. Allowed: PDF, JPG, PNG, WEBP' }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large. Maximum 10MB.' }, { status: 400 });
  }

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const fileType = file.type === 'application/pdf' ? 'pdf' : file.type.split('/')[1];

  // Step 2: Upload to Cloudinary
  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'nyaya-sarthi/docs', resource_type: 'auto' },
      (error, result) => (error ? reject(error) : resolve(result))
    ).end(fileBuffer);
  });

  // Create initial DB record
  const docAnalysis = await DocumentAnalysis.create({
    userId: session.user.id,
    originalFileName: file.name,
    fileUrl: uploadResult.secure_url,
    cloudinaryPublicId: uploadResult.public_id,
    fileType,
    fileSizeBytes: file.size,
    processingStatus: 'processing',
  });

  // Steps 3 & 4: Extract text
  let extractedText = '';
  try {
    if (fileType === 'pdf') {
      extractedText = await extractTextFromPDF(fileBuffer);
    } else {
      extractedText = await extractTextFromImage(fileBuffer, fileType);
    }
  } catch (err) {
    await DocumentAnalysis.findByIdAndUpdate(docAnalysis._id, {
      processingStatus: 'failed',
      processingError: `OCR extraction failed: ${err.message}`,
    });
    return NextResponse.json({ error: 'Text extraction failed', documentId: docAnalysis._id }, { status: 500 });
  }

  // Step 4: Quality check
  if (extractedText.length < 100) {
    await DocumentAnalysis.findByIdAndUpdate(docAnalysis._id, {
      processingStatus: 'manual_input_required',
      extractedCharCount: extractedText.length,
    });
    return NextResponse.json(
      { error: 'Text extraction insufficient', documentId: docAnalysis._id, manualInputRequired: true },
      { status: 422 }
    );
  }

  // Step 5: Chunking (first 12000 chars ≈ 3000 tokens)
  const textForAnalysis = extractedText.slice(0, 12000);

  // Steps 6, 7, 8: GPT Analysis + validation + DB update
  try {
    const analysisResult = await analyzeDocumentWithGPT(textForAnalysis);
    await DocumentAnalysis.findByIdAndUpdate(docAnalysis._id, {
      processingStatus: 'complete',
      extractedText,
      extractedCharCount: extractedText.length,
      analysisResult,
    });
    return NextResponse.json({ documentId: docAnalysis._id, processingStatus: 'complete', analysisResult });
  } catch (err) {
    await DocumentAnalysis.findByIdAndUpdate(docAnalysis._id, {
      processingStatus: 'failed',
      processingError: err.message,
    });
    return NextResponse.json({ error: 'AI analysis failed', documentId: docAnalysis._id }, { status: 500 });
  }
}
```

### 6.3 Client-Side Risk Dashboard Rendering

The frontend renders the analysis result as a color-coded dashboard:

| Risk Level | Color | Tailwind Classes |
|------------|-------|-----------------|
| `high` (Red Flag) | Red | `bg-red-50 border-red-400 text-red-800` |
| `medium` (Caution) | Amber | `bg-amber-50 border-amber-400 text-amber-800` |
| `low` (Standard) | Green | `bg-green-50 border-green-400 text-green-800` |
| Overall Risk: high | Red badge | `bg-red-600 text-white` |
| Overall Risk: medium | Amber badge | `bg-amber-500 text-white` |
| Overall Risk: low | Green badge | `bg-green-600 text-white` |

---

## 7. Authentication & Authorization Architecture

### 7.1 NextAuth Configuration

```javascript
// lib/auth.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/db/mongoose';
import User from '@/models/User';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email }).select('+password');
        if (!user) throw new Error('No account found with this email.');
        const isValid = await user.comparePassword(credentials.password);
        if (!isValid) throw new Error('Invalid password.');
        if (!user.isActive) throw new Error('Account is deactivated.');
        return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

### 7.2 Middleware — Route Group Protection

```javascript
// middleware.js
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Admin routes
    if (path.startsWith('/admin') && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Lawyer-only routes
    if (path.startsWith('/lawyer') && token?.role !== 'lawyer' && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Require auth for all protected routes
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/lawyer/:path*', '/admin/:path*'],
};
```

### 7.3 API Route Auth Guards

```javascript
// lib/auth/guards.js
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function requireAuth(allowedRoles = ['user', 'lawyer', 'admin']) {
  const session = await getServerSession(authOptions);
  if (!session) return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  if (!allowedRoles.includes(session.user.role)) {
    return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) };
  }
  return { session };
}

// Usage in API route:
// const { session, error } = await requireAuth(['admin']);
// if (error) return error;
```

### 7.4 Role Matrix

| Route Group | `user` | `lawyer` | `admin` |
|-------------|--------|----------|---------|
| `/api/lexbot/*` | ✅ | ✅ | ✅ |
| `/api/documents/*` | ✅ | ✅ | ✅ |
| `/api/lawyers` (GET) | ✅ | ✅ | ✅ |
| `/api/lawyers` (POST) | ✅ | — | ✅ |
| `/api/bookings` | ✅ | ✅ | ✅ |
| `/api/cases` | ✅ | ✅(assigned) | ✅ |
| `/api/forum` | ✅ | ✅ | ✅ |
| `/api/hub/*` | ✅ | ✅ | ✅ |
| `/api/admin/*` | ❌ | ❌ | ✅ |
| `/lawyer/*` (pages) | ❌ | ✅ | ✅ |
| `/admin/*` (pages) | ❌ | ❌ | ✅ |

---

## 8. Frontend Architecture

### 8.1 Next.js App Router Page Structure

```
app/
├── layout.js                          # Root layout (fonts, providers)
├── globals.css
│
├── (public)/                          # No auth required
│   ├── layout.js                      # Public navbar + footer
│   ├── page.js                        # Landing page
│   ├── about/page.js
│   ├── login/page.js
│   └── signup/page.js                 # Role selection: User / Lawyer
│
├── (dashboard)/                       # Auth required: user + lawyer + admin
│   ├── layout.js                      # Sidebar + top bar + notification banner
│   ├── dashboard/page.js              # Home dashboard (role-aware widgets)
│   │
│   ├── lexbot/
│   │   ├── page.js                    # LexBot chat interface
│   │   └── sessions/[sessionId]/page.js  # Past session viewer
│   │
│   ├── documents/
│   │   ├── page.js                    # Document list
│   │   ├── analyze/page.js            # Upload + analysis dashboard
│   │   ├── generate/page.js           # Document type selector
│   │   ├── generate/[type]/page.js    # Multi-step wizard for each type
│   │   └── [id]/page.js               # Single document result
│   │
│   ├── lawyers/
│   │   ├── page.js                    # Lawyer marketplace with filters
│   │   └── [id]/page.js               # Lawyer profile + booking
│   │
│   ├── bookings/
│   │   └── page.js                    # User's bookings list
│   │
│   ├── cases/
│   │   ├── page.js                    # Case list
│   │   ├── new/page.js                # Create case form
│   │   └── [id]/page.js               # Case detail: timeline + evidence + ecourts
│   │
│   ├── hub/
│   │   ├── page.js                    # Legal Awareness Hub home
│   │   ├── casestudies/page.js        # Case studies browser
│   │   ├── casestudies/[id]/page.js   # Single case study
│   │   ├── lawsearch/page.js          # "Is There a Law For This?"
│   │   └── quiz/page.js               # Gamified legal quiz
│   │
│   ├── forum/
│   │   ├── page.js                    # Forum post list
│   │   ├── new/page.js                # Create post
│   │   └── [id]/page.js               # Single post + answers
│   │
│   └── safety/
│       └── page.js                    # Women's Safety Wing + Emergency SOS
│
├── (lawyer)/                          # Auth required: lawyer role only
│   ├── layout.js                      # Lawyer-specific sidebar
│   ├── lawyer/dashboard/page.js
│   ├── lawyer/profile/page.js         # Edit profile
│   ├── lawyer/bookings/page.js        # Incoming bookings
│   └── lawyer/cases/page.js           # Assigned cases
│
├── (admin)/                           # Auth required: admin role only
│   ├── layout.js
│   ├── admin/dashboard/page.js
│   ├── admin/lawyers/page.js          # Verification queue
│   └── admin/content/page.js          # Case study management
│
└── api/                               # All API routes (see Section 4)
```

### 8.2 Component Hierarchy

```
components/
├── ui/                                # Reusable primitive UI components
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Modal.jsx
│   ├── Badge.jsx
│   ├── Card.jsx
│   ├── Spinner.jsx
│   ├── FileUploader.jsx
│   └── RiskBadge.jsx                  # Color-coded risk level badge
│
├── layout/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── Footer.jsx
│   └── HearingReminderBanner.jsx      # 48-hour hearing alert
│
├── lexbot/
│   ├── ChatWindow.jsx                 # Message list + scroll management
│   ├── ChatInput.jsx                  # Text input + voice button
│   ├── MessageBubble.jsx              # User/AI message with metadata
│   ├── VoiceButton.jsx                # Web Speech API trigger
│   ├── DomainBadge.jsx                # Legal domain tag
│   └── EmergencyAlert.jsx            # Emergency helplines display
│
├── documents/
│   ├── DocumentUploader.jsx
│   ├── AnalysisResult.jsx             # Full risk dashboard
│   ├── RedFlagCard.jsx
│   ├── CautionCard.jsx
│   ├── DocumentWizard.jsx             # Multi-step form wrapper
│   └── GeneratedDocumentPreview.jsx
│
├── lawyers/
│   ├── LawyerCard.jsx                 # Marketplace listing card
│   ├── LawyerProfile.jsx              # Full profile view
│   ├── FilterBar.jsx                  # Marketplace filters
│   ├── BookingModal.jsx               # Schedule booking
│   └── ReviewForm.jsx
│
├── cases/
│   ├── CaseCard.jsx
│   ├── Timeline.jsx                   # Visual case timeline
│   ├── EvidenceVault.jsx              # File list with upload
│   └── eCourtsStatus.jsx              # Live court status widget
│
├── forum/
│   ├── PostCard.jsx
│   ├── AnswerList.jsx
│   └── VerifiedBadge.jsx              # "Verified Lawyer" badge
│
└── hub/
    ├── CaseStudyCard.jsx
    ├── LawSearchResult.jsx
    └── QuizWidget.jsx
```

### 8.3 State Management

Nyaya Sarthi uses **React's built-in state + SWR** for most data fetching needs, avoiding the overhead of Redux or Zustand for the MVP.

| State Type | Solution |
|------------|----------|
| Server data (GET requests) | `SWR` with revalidation |
| Form state | `React useState` + `react-hook-form` |
| Chat session | `React useReducer` (local message history) |
| User session | `NextAuth useSession` hook |
| Toast notifications | `React Context` + custom `useToast` hook |
| File upload progress | `React useState` with XHR `onprogress` |

---

## 9. Third-Party Integrations

### 9.1 Cloudinary Integration

```javascript
// lib/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

// Folder structure:
// nyaya-sarthi/docs/       — legal documents for analysis
// nyaya-sarthi/evidence/   — case evidence files
// nyaya-sarthi/avatars/    — user/lawyer profile photos
// nyaya-sarthi/generated/  — generated document PDFs

// Signed URL generation (for evidence):
export function generateSignedUrl(publicId, expiresInSeconds = 3600) {
  return cloudinary.url(publicId, {
    sign_url: true,
    expires_at: Math.floor(Date.now() / 1000) + expiresInSeconds,
  });
}
```

---

### 9.2 ElevenLabs Integration

```javascript
// lib/ai/tts.js
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID_EN = 'EXAVITQu4vr4xnSDxMaL'; // English voice
const VOICE_ID_HI = 'pNInz6obpgDQGcFmaJgB'; // Hindi voice

export async function generateSpeech(text, language = 'en') {
  const voiceId = language === 'hi' ? VOICE_ID_HI : VOICE_ID_EN;
  
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    }
  );

  if (!response.ok) {
    // Fallback: return null; client-side browser TTS will be used
    console.error('ElevenLabs TTS failed:', response.status);
    return null;
  }

  const audioBuffer = await response.arrayBuffer();
  // Upload to Cloudinary for persistent URL
  const uploadResult = await uploadAudioToCloudinary(audioBuffer);
  return uploadResult.secure_url;
}

// gTTS Fallback (Python microservice or browser SpeechSynthesis)
export function browserTTSFallback(text) {
  // Called client-side when ElevenLabs returns null
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'hi-IN'; // or 'en-IN'
  window.speechSynthesis.speak(utterance);
}
```

---

### 9.3 Web Speech API (STT)

```javascript
// hooks/useVoiceInput.js
'use client';
import { useState, useRef, useCallback } from 'react';

export function useVoiceInput(onTranscript, language = 'hi-IN') {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Voice input is not supported in this browser. Please use Chrome.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = language; // 'hi-IN', 'en-IN', 'te-IN', etc.
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setError(`Voice recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [language, onTranscript]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsListening(false);
  }, []);

  return { isListening, error, startListening, stopListening };
}
```

---

### 9.4 eCourts API Integration

```javascript
// lib/ecourts.js
const ECOURTS_BASE_URL = 'https://api.ecourts.gov.in/v1'; // Actual endpoint TBC
const ECOURTS_API_KEY = process.env.ECOURTS_API_KEY;

export async function getCaseStatus(caseNumber) {
  const response = await fetch(
    `${ECOURTS_BASE_URL}/case/status?cnr=${encodeURIComponent(caseNumber)}`,
    {
      headers: {
        'Authorization': `Bearer ${ECOURTS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour (Next.js fetch caching)
    }
  );

  if (!response.ok) {
    throw new Error(`eCourts API returned ${response.status}`);
  }

  const data = await response.json();
  
  // Transform eCourts response to Nyaya Sarthi schema
  return {
    caseNumber: data.cnr_number || caseNumber,
    status: data.case_status || 'Unknown',
    court: data.court_name || 'Unknown',
    nextDate: data.next_hearing_date || null,
    parties: {
      petitioner: data.petitioner_name || null,
      respondent: data.respondent_name || null,
    },
    judge: data.judge_name || null,
    lastUpdated: data.last_updated || new Date().toISOString(),
  };
}
```

---

## 10. Security Considerations

### 10.1 Input Validation

All API routes validate inputs using the following approach:

```javascript
// lib/validation/schemas.js (using Zod)
import { z } from 'zod';

export const chatMessageSchema = z.object({
  message: z.string().min(1).max(2000),
  sessionId: z.string().uuid().optional(),
  language: z.enum(['en', 'hi', 'bn', 'te', 'mr', 'ta', 'gu', 'kn', 'ml', 'pa']).default('en'),
});

export const bookingSchema = z.object({
  lawyerId: z.string().regex(/^[0-9a-fA-F]{24}$/), // MongoDB ObjectId
  scheduledAt: z.string().datetime(),
  duration: z.enum([15, 30, 60, 90, 120]),
  type: z.enum(['free_consult', 'paid_consult', 'emergency']),
});
```

### 10.2 File Upload Security

| Check | Implementation |
|-------|---------------|
| MIME type validation | Check `file.type` against allowlist server-side |
| File size limit | Reject > 10MB before Cloudinary upload |
| Filename sanitisation | `path.basename()` + replace special chars |
| Malware scanning | Cloudinary's built-in scanning (enterprise; for MVP: accept risk) |
| Signed URLs for evidence | Cloudinary signed URLs with 1-hour expiry |
| Access control | Verify `userId === session.user.id` before serving document |

### 10.3 API Rate Limiting

```javascript
// middleware.js — add to API routes
import rateLimit from 'express-rate-limit'; // or use Vercel's built-in

// Custom rate limiter for AI endpoints
const aiRateLimiter = {
  '/api/lexbot/chat': { windowMs: 60000, max: 20 },     // 20 requests/minute
  '/api/documents/analyze': { windowMs: 3600000, max: 10 }, // 10/hour
  '/api/hub/lawsearch': { windowMs: 3600000, max: 10 },  // 10/hour (anonymous)
};
```

### 10.4 Data Privacy

- Passwords hashed with bcrypt (12 rounds) — never stored in plain text.
- JWT tokens expire in 24 hours.
- MongoDB Atlas IP allowlist restricted to Vercel's IP ranges.
- `NEXTAUTH_SECRET` rotated per environment.
- Anonymous forum posts: `authorId` is stored in DB (for moderation) but never exposed via API when `isAnonymous: true`.
- Extracted document text is stored encrypted at rest (MongoDB Atlas encryption at rest enabled).

### 10.5 OWASP Top 10 Mitigations

| Threat | Mitigation |
|--------|-----------|
| Injection (NoSQL) | Mongoose type coercion + Zod validation |
| Broken Auth | NextAuth JWT + bcrypt + role checks |
| Sensitive Data Exposure | `select: false` on password, HTTPS only |
| XXE | Not applicable (no XML processing) |
| Security Misconfiguration | Environment variables, no secrets in code |
| XSS | Next.js JSX auto-escaping, no `dangerouslySetInnerHTML` |
| CSRF | NextAuth CSRF token built-in |

---

## 11. Performance Considerations

### 11.1 Caching Strategy

| Data | Cache Method | TTL |
|------|-------------|-----|
| Lawyer listing (GET /api/lawyers) | SWR client cache | 5 minutes |
| Case studies | SWR + ISR (Next.js) | 1 hour |
| eCourts case status | MongoDB embedded cache | 1 hour |
| LexBot session (client) | `useReducer` state | Session lifetime |
| Static hub pages | Next.js SSG | Build time |

### 11.2 GPT Streaming

For LexBot chat, use OpenAI's streaming API to improve perceived response time:

```javascript
// Stream GPT-4o response to client
const stream = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [...],
  stream: true,
});

// In Next.js App Router:
const encoder = new TextEncoder();
const readable = new ReadableStream({
  async start(controller) {
    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || '';
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
    }
    controller.close();
  },
});

return new Response(readable, {
  headers: { 'Content-Type': 'text/event-stream' },
});
```

### 11.3 OCR Timeout Handling

Tesseract.js can be slow for large images. Set a 30-second timeout:

```javascript
const OCR_TIMEOUT = 30000; // 30 seconds

const ocrPromise = Tesseract.recognize(imageBuffer, 'eng+hin');
const timeoutPromise = new Promise((_, reject) =>
  setTimeout(() => reject(new Error('OCR timeout')), OCR_TIMEOUT)
);

const result = await Promise.race([ocrPromise, timeoutPromise]);
```

### 11.4 Lazy Loading

- Dynamic import for `Tesseract.js` (heavy WASM module): `const Tesseract = await import('tesseract.js')`
- Next.js `dynamic()` for heavy page components (Document Wizard, Chat Window)
- Images: Next.js `<Image>` component with `lazy` loading
- Forum answers: paginated with "Load more" button (not infinite scroll for MVP)

### 11.5 Database Indexes

All schemas include appropriate indexes (defined in schemas above). Key composite indexes:

```javascript
// Added to schemas for performance:
LawyerSchema.index({ specializations: 1, 'location.city': 1, rating: -1, isVerified: 1 });
CaseSchema.index({ userId: 1, status: 1, legalDomain: 1 });
ChatSessionSchema.index({ userId: 1, createdAt: -1 });
BookingSchema.index({ lawyerId: 1, scheduledAt: 1, status: 1 });
```

---

## 12. 36-Hour Execution Roadmap

**Timeline:** April 11, 10:00 IST → April 12, 20:00 IST  
**Team:**
- **Person A** — Full-Stack Lead (Next.js setup, auth, MongoDB, API routes)
- **Person B** — AI/ML Engineer (GPT-4o integrations, OCR pipeline, prompts)
- **Person C** — Frontend/UI (all pages, Tailwind design, voice interface, mobile)
- **Person D** — Features/Integration (marketplace, doc generator, eCourts, case tracker, admin)

---

### Phase 1: Foundation (Hours 1–6) | April 11: 10:00–16:00

| Time | Person A | Person B | Person C | Person D |
|------|----------|----------|----------|----------|
| 10:00–11:00 | **GitHub repo setup** (fresh creation, MIT license, README skeleton, branch strategy) | Same: Review all GPT prompt specs, set up OpenAI API keys, test GPT-4o access | Same: Create Figma/paper wireframes for 5 core screens | Same: Review feature list, create personal task checklist |
| 11:00–12:30 | **Next.js 14 init** (App Router, Tailwind, ESLint), folder structure, env setup, Vercel deployment connected | **OpenAI SDK setup** (`lib/openai.js`), test GPT-4o call, implement LexBot system prompt v1 | **Design system** (Tailwind config: colors, fonts, spacing), global layout components (Navbar, Footer, Sidebar skeleton) | **MongoDB Atlas** cluster creation, IP whitelist, connection string, `lib/db/mongoose.js` |
| 12:30–14:00 | **NextAuth.js v5** setup: credentials provider, bcrypt, JWT callbacks, 3-role session, `middleware.js` | **LexBot API route** (`/api/lexbot/chat`): full implementation with history, domain detection, severity, session save | **Landing page** (Hero, Features, CTA) — mobile-responsive | **All 10 Mongoose schemas** (copy from TRD, review, test with dummy data) |
| 14:00–14:30 | 🍽️ **Lunch Break** (everyone) | | | |
| 14:30–16:00 | **User/Lawyer/Admin models** seeded, auth API routes tested with Postman, login/signup pages working end-to-end | **ChatSession schema** integration with LexBot, test full chat flow (input → GPT → save → response) | **Login/Signup pages** with role selector, form validation, NextAuth integration | **Lawyer + Booking schemas** finalized, `GET /api/lawyers` with filters implemented |

**Phase 1 Checkpoint (16:00):** ✅ App deploys to Vercel. ✅ Login/signup working. ✅ LexBot sends/receives GPT-4o messages. ✅ Database connected.

---

### Phase 2: Core Features (Hours 7–18) | April 11: 16:00 → April 12: 04:00

| Time | Person A | Person B | Person C | Person D |
|------|----------|----------|----------|----------|
| 16:00–18:00 | **Dashboard layout** (sidebar, role-aware nav, HearingReminderBanner), route group layouts | **Document Analysis API** (`/api/documents/analyze`): Cloudinary upload + pdf-parse + Tesseract.js + GPT-4o chain | **LexBot UI** — ChatWindow, MessageBubble, ChatInput with voice button (Web Speech API integration) | **Lawyer registration + profile** API routes (`POST /api/lawyers`, `GET /api/lawyers/[id]`), lawyer profile page |
| 18:00–20:00 | **Case API routes** (CRUD + timeline + evidence), eCourts proxy route | **Document generator** (`/api/documents/generate`): 7 document type prompts + GPT generation + save | **Document upload UI** — FileUploader, AnalysisResult risk dashboard (color-coded cards) | **Smart matching** (`/api/lawyers/match`), lawyer marketplace page with filters |
| 20:00–21:00 | 🍽️ **Dinner Break** (everyone) | | | |
| 21:00–23:00 | **Booking API** (create, patch, delete, scheduling conflict check, emergency flow) | **ElevenLabs TTS** integration (`lib/ai/tts.js`), voice output for LexBot, fallback to browser SpeechSynthesis | **Document Generator wizard** UI (multi-step form, 7 types, progress bar, preview) | **Case management pages** (list, create, detail with Timeline component, Evidence Vault) |
| 23:00–01:00 | **Reviews API** (post-booking gate, rating aggregation post-save hook), forum API routes | **Law Search API** (`/api/hub/lawsearch`) with law search system prompt, test accuracy on 10 queries | **Lawyer marketplace UI** complete (LawyerCard, FilterBar, booking modal, reviews), LexBot voice output rendering | **Admin panel** pages: lawyer verification queue, approve/reject flow |
| 01:00–02:00 | 😴 **Rest (Light — 1 hour)** | | | |
| 02:00–04:00 | **Forum + Hub API routes** (casestudies CRUD, forum posts + answers + upvotes) | **OCR edge cases** (timeout handling, <100 char fallback, JSON parse retry logic), test with 10 real documents | **Cases pages** (detail: timeline, evidence upload, eCourts status widget), forum pages | **Hub pages** (case studies list/detail), law search page, seed 10 case studies in MongoDB |

**Phase 2 Checkpoint (04:00):** ✅ All major APIs functional. ✅ LexBot voice works. ✅ Document analysis pipeline end-to-end. ✅ Lawyer marketplace filterable. ✅ Case management CRUD complete.

---

### Phase 3: Integration & Polish (Hours 19–30) | April 12: 04:00–14:00

| Time | Person A | Person B | Person C | Person D |
|------|----------|----------|----------|----------|
| 04:00–06:00 | **Bug fixes** from Phase 2 APIs, **hearing reminder** logic (48h check), emergency SOS booking flow | **Multilingual testing**: Hindi input/output end-to-end, prompt refinement for mixed-language responses | **Women's Safety Wing page** (static, action guides, helplines, police station locator), **Emergency SOS UI** | **eCourts status** integration in case detail page, **Forum** (create post, answers, Verified Lawyer badge) |
| 06:00–07:00 | 😴 **Rest** | 😴 **Rest** | 😴 **Rest** | 😴 **Rest** |
| 07:00–09:00 | **Security audit**: input validation (Zod), file upload guards, auth guards on all routes | **Quiz page** (load 25-question JSON, client-side scoring, score display), LexBot → Lawyer Marketplace handoff (domain pre-filter) | **Mobile responsiveness pass** on all pages, Tailwind breakpoint fixes, touch gestures for LexBot | **Admin content panel** (add/edit/publish case studies), seed admin user, test full admin flow |
| 09:00–10:00 | 🍽️ **Breakfast Break** | | | |
| 10:00–12:00 | **Performance**: SWR integration, Next.js Image optimization, API response time profiling | **GPT prompt fine-tuning**: test edge cases (emergency, multilingual, ambiguous queries), improve JSON reliability | **UI polish**: animations (Framer Motion lightweight), empty states, loading skeletons, error boundaries | **End-to-end user journey** test: signup → LexBot → marketplace → booking → case → document |
| 12:00–14:00 | **Vercel deployment** final config, env vars verified, domain setup, preview URL tested | **README AI disclosure section** written, API keys documented | **Final UI polish**: consistent spacing, color palette, accessibility (aria-labels, keyboard nav) | **Data seeding**: 10 case studies, 5 lawyer profiles, 3 forum posts for demo |

**Phase 3 Checkpoint (14:00):** ✅ Full user journey works end-to-end. ✅ Mobile responsive. ✅ Admin panel functional. ✅ Deployed on Vercel.

---

### Phase 4: Submission Prep (Hours 31–36) | April 12: 14:00–20:00

| Time | All Team — Collaborative |
|------|--------------------------|
| 14:00–15:00 | **Feature Triage Protocol (Hour 28+4):** Review what works, what's broken. Cut anything not demo-ready. Define 5-minute demo script. |
| 15:00–16:30 | **Demo video recording**: Screen record 5-minute walkthrough covering: LexBot chat → voice → emergency routing → document analysis → lawyer booking → case management → admin approval |
| 16:30–17:30 | **Presentation deck**: 8 slides: Problem → Solution → Tech Stack → Key Features → AI Integration → Impact → Team → Demo Link |
| 17:30–18:30 | **Final README**: Complete all sections, add screenshots, verify all env vars documented, AI usage disclosed, MIT license confirmed |
| 18:30–19:00 | **Final commit + push**: Clean up code (remove console.logs), ensure all commits are post-April 11 (ByteVerse-26 compliance), tag `v1.0.0` |
| 19:00–19:30 | **Submission form**: Fill ByteVerse-26 submission form, paste GitHub URL, Vercel demo URL, video link |
| 19:30–20:00 | **Buffer**: Final bug fixes, team debrief, celebration 🎉 |

---

### Feature Triage Protocol (Hour 28 — April 12, 14:00)

**Priority A (Must demo):**
- LexBot chat with domain detection
- Document analysis with risk dashboard
- Lawyer marketplace with smart matching
- User auth (signup/login/roles)

**Priority B (Should work):**
- Voice input/output
- Case management
- Booking flow
- Admin lawyer verification

**Priority C (Cut if broken):**
- eCourts API (if API key unavailable — show mock data)
- ElevenLabs TTS (fall back to browser TTS)
- Forum upvotes
- Quiz game scoring

---

## 13. README Structure

```markdown
# Nyaya Sarthi — न्याय सारथी
### Your AI-Powered Guide to Justice | भारतीय नागरिकों के लिए कानूनी सहायता

> Built for ByteVerse-26 Hackathon | NIT Patna | April 11–12, 2026

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black)](https://nyaya-sarthi.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/your-team/nyaya-sarthi)](https://github.com/your-team/nyaya-sarthi)

---

## 🎥 Demo & Presentation

| Resource | Link |
|----------|------|
| 🌐 Live Demo | [nyaya-sarthi.vercel.app](https://nyaya-sarthi.vercel.app) |
| 📊 Presentation Deck | [Google Slides / Canva Link] |
| 🎬 Demo Video | [YouTube / Drive Link] |
| 📁 GitHub Repository | [github.com/your-team/nyaya-sarthi](https://github.com/your-team/nyaya-sarthi) |

---

## 🇮🇳 The Problem

Over 80% of India's 1.4 billion citizens cannot afford a lawyer. Legal processes are opaque, documents are complex, and justice is inaccessible. Language barriers, geographical limitations, and lack of awareness compound the problem — especially for women, rural citizens, and the economically disadvantaged.

## ✨ The Solution

**Nyaya Sarthi** (न्याय सारथी — "Guide to Justice") is a comprehensive legal ecosystem that puts the power of legal knowledge and verified legal professionals in every Indian citizen's pocket.

---

## 🚀 Key Features

### 🤖 LexBot — AI Legal Navigator
[Screenshot placeholder]
- GPT-4o powered conversational legal guide
- Domain detection + severity classification
- Multilingual: English, Hindi, and 8 regional languages
- Voice input (Web Speech API) + voice output (ElevenLabs)
- Emergency routing with helplines when severity = EMERGENCY

### 📄 Document Intelligence Suite
[Screenshot placeholder]
- Upload any legal document (PDF, JPG, PNG) for AI analysis
- Color-coded Risk Dashboard: Red Flags, Caution Points, Standard Clauses
- OCR-powered: works with scanned paper documents
- AI Document Generator for 7 document types (RTI, FIR, Legal Notice, etc.)

### ⚖️ Smart Lawyer Marketplace
[Screenshot placeholder]
- Verified lawyers with Bar Council ID authentication
- AI-powered matching based on your legal issue domain and location
- Free 15-minute consultation entry point
- Pro-bono and Emergency-available filters
- Verified community forum with lawyer badges

### 📁 Case Management & Tracking
[Screenshot placeholder]
- Full case lifecycle management (open → hearing → decided)
- Timeline tracker with evidence vault (receipts, screenshots, photos)
- Live eCourts API integration for real-time court case status
- 48-hour hearing reminders

### 🆘 Safety Portals
[Screenshot placeholder]
- Women's Safety Wing: DV Act, POSH, 498A action guides
- Emergency Legal SOS: instant emergency lawyer booking
- Nearest police station locator

### 📚 Legal Awareness Hub
[Screenshot placeholder]
- Landmark case studies with AI-generated explainers
- "Is There a Law For This?" plain-language law search
- Gamified legal knowledge quiz

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Database | MongoDB Atlas + Mongoose |
| Authentication | NextAuth.js v5 |
| Primary AI | OpenAI GPT-4o |
| OCR | Tesseract.js + pdf-parse |
| Voice STT | Web Speech API (browser-native) |
| Voice TTS | ElevenLabs API |
| File Storage | Cloudinary |
| Court Data | eCourts API (India) |
| Deployment | Vercel |

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier)
- OpenAI API key
- Cloudinary account (free tier)
- ElevenLabs API key (free tier)

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/your-team/nyaya-sarthi.git
cd nyaya-sarthi
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
# ─── Database ───────────────────────────────────────────
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/nyaya-sarthi

# ─── Authentication ──────────────────────────────────────
NEXTAUTH_SECRET=your-super-secret-key-minimum-32-characters
NEXTAUTH_URL=http://localhost:3000

# ─── OpenAI ──────────────────────────────────────────────
OPENAI_API_KEY=sk-...

# ─── ElevenLabs ──────────────────────────────────────────
ELEVENLABS_API_KEY=...
ELEVENLABS_VOICE_ID_EN=EXAVITQu4vr4xnSDxMaL
ELEVENLABS_VOICE_ID_HI=pNInz6obpgDQGcFmaJgB

# ─── Cloudinary ──────────────────────────────────────────
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# ─── eCourts API ─────────────────────────────────────────
ECOURTS_API_KEY=your-ecourts-api-key
\`\`\`

### 4. Seed the Database (Optional)
\`\`\`bash
npm run seed
\`\`\`

### 5. Run Development Server
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Dependencies

\`\`\`json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "next-auth": "^5.0.0-beta",
    "mongoose": "^8.3.0",
    "bcryptjs": "^2.4.3",
    "openai": "^4.47.0",
    "cloudinary": "^2.2.0",
    "pdf-parse": "^1.1.1",
    "tesseract.js": "^5.1.0",
    "uuid": "^9.0.1",
    "zod": "^3.23.0",
    "swr": "^2.2.5",
    "react-hook-form": "^7.51.0",
    "framer-motion": "^11.1.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.3",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
\`\`\`

---

## 🤖 AI Usage Disclosure

**ByteVerse-26 Required Disclosure — All AI tools used in Nyaya Sarthi:**

| AI Tool | Usage | Provider |
|---------|-------|----------|
| **GPT-4o** | LexBot conversational legal guidance, document risk analysis, law search explanations, document generation | OpenAI |
| **Web Speech API** | Voice-to-text input for LexBot (browser-native, no external API) | Browser / Google |
| **ElevenLabs API** | Text-to-speech voice output for LexBot responses | ElevenLabs |
| **Tesseract.js** | Optical Character Recognition (OCR) for image-format legal documents | Open Source (Apache 2.0) |
| **pdf-parse** | Text extraction from PDF legal documents | Open Source (MIT) |

**AI-Assisted Development Disclosure:**
- GitHub Copilot was used for code completion assistance.
- Claude (Anthropic) was used to review TRD specifications and prompt engineering.

---

## 🔒 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 👥 Team

| Name | Role |
|------|------|
| [Team Member 1] | Full-Stack Lead |
| [Team Member 2] | AI/ML Engineer |
| [Team Member 3] | Frontend/UI Engineer |
| [Team Member 4] | Features & Integration Engineer |

*Built with ❤️ at ByteVerse-26, NIT Patna.*
```

---

## 14. ByteVerse-26 Rulebook Compliance Checklist

| # | Requirement | Status | Implementation Note |
|---|-------------|--------|---------------------|
| 1 | GitHub repository freshly created after hackathon starts (April 11) | ✅ | Repository created at Hour 1 (10:00 IST, April 11) — first commit timestamp verifiable |
| 2 | Repository must be public throughout the event | ✅ | Repository visibility set to **Public** at creation; never set to private |
| 3 | Valid open-source license (MIT) required | ✅ | `LICENSE` file with MIT license text in root directory |
| 4 | All AI tool usage explicitly disclosed in README | ✅ | See README Section "AI Usage Disclosure" — GPT-4o, Web Speech API, ElevenLabs, Tesseract.js all listed |
| 5 | Projects must follow FOSS principles (no proprietary core logic) | ✅ | All business logic is open-source; AI services (OpenAI, ElevenLabs) are external APIs, not proprietary logic |
| 6 | No plagiarism or undisclosed code reuse | ✅ | All code written during hackathon; open-source libraries declared in `package.json` with MIT/Apache licenses |
| 7 | Live demo accessible | ✅ | Deployed to Vercel at `nyaya-sarthi.vercel.app` — public URL in README |
| 8 | AI-generated code/content disclosed | ✅ | README states GitHub Copilot and Claude used for assistance |
| 9 | Project addresses the hackathon theme | ✅ | Legal-tech platform directly addresses access to justice for Indian citizens |
| 10 | Team size within limits | ✅ | 4-person team |
| 11 | No use of pre-built project templates sold commercially | ✅ | Built on Next.js (open-source framework) from scratch |
| 12 | Working prototype demonstrable in 5 minutes | ✅ | Demo video script covers all core features in ≤5 minutes (see Phase 4 roadmap) |

---

## Appendix A: Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | ✅ | MongoDB Atlas connection string |
| `NEXTAUTH_SECRET` | ✅ | JWT signing secret (min 32 chars) |
| `NEXTAUTH_URL` | ✅ | App base URL (e.g., `https://nyaya-sarthi.vercel.app`) |
| `OPENAI_API_KEY` | ✅ | OpenAI API key for GPT-4o |
| `ELEVENLABS_API_KEY` | ✅ | ElevenLabs text-to-speech API key |
| `ELEVENLABS_VOICE_ID_EN` | ⚠️ | ElevenLabs voice ID for English |
| `ELEVENLABS_VOICE_ID_HI` | ⚠️ | ElevenLabs voice ID for Hindi |
| `CLOUDINARY_CLOUD_NAME` | ✅ | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | ✅ | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | ✅ | Cloudinary API secret |
| `ECOURTS_API_KEY` | ⚠️ | eCourts India API key (use mock data if unavailable) |

---

## Appendix B: Quick Start Scripts

```bash
# Start development
npm run dev

# Seed database with sample data
npm run seed

# Run linter
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

---

*End of Technical Requirements Document — Nyaya Sarthi v1.0*  
*ByteVerse-26 | NIT Patna | April 11–12, 2026*
