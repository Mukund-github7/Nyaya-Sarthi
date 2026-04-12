# ⚖️ NyayaSarthi
## India's End-to-End AI Legal Ecosystem for Every Citizen

> **"न्याय हर किसी का अधिकार है। Justice is Every Citizen's Right."**

---

| Field | Details |
|---|---|
| **Document Type** | Product Requirements Document (PRD) |
| **Product Name** | NyayaSarthi |
| **Version** | 1.0 — Hackathon MVP |
| **Event** | ByteVerse-26, NIT Patna |
| **Date** | April 11, 2026 |
| **Theme** | Law & Justice × Artificial Intelligence |
| **Status** | Active — In Development |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Product Vision & Goals](#3-product-vision--goals)
4. [Target Audience & Personas](#4-target-audience--personas)
5. [Feature Requirements](#5-feature-requirements)
6. [User Flows](#6-user-flows)
7. [MVP Scope Definition](#7-mvp-scope-definition-36-hour-hackathon-sprint)
8. [Post-MVP Roadmap](#8-post-mvp-production-roadmap)
9. [Monetisation Strategy](#9-monetisation-strategy)
10. [Success Metrics & KPIs](#10-success-metrics--kpis)
11. [Constraints & Assumptions](#11-constraints--assumptions)
12. [Open Questions](#12-open-questions)
- [Appendix A: Tech Stack](#appendix-a-tech-stack-recommendation)
- [Appendix B: Regulatory Framework](#appendix-b-regulatory--compliance-framework)

---

## 1. Executive Summary

### 1.1 Vision
To democratise legal access across India — making every citizen legally empowered, irrespective of income, language, or geography.

### 1.2 Mission
NyayaSarthi delivers an AI-powered, end-to-end legal ecosystem that guides the common Indian citizen from raw legal curiosity all the way to verified legal representation — in their own language, at a fraction of the traditional cost.

### 1.3 Product Overview
NyayaSarthi is India's first A-to-Z legal platform for the common citizen. It unifies six interconnected pillars: an AI Legal Navigator (NyayaBot), a Document Intelligence Suite, a Smart Lawyer Marketplace, AI-driven Case Management, Specialised Safety Portals for vulnerable populations, and a Legal Awareness Hub.

The core design philosophy is: **"Legal help should feel like talking to a knowledgeable friend — not navigating a bureaucratic maze."**

Built for ByteVerse-26 under the theme *Law & Justice × Artificial Intelligence*, the MVP demonstrates a complete user journey from describing a legal problem in plain language to booking a verified lawyer — all within a single, accessible interface.

### 1.4 The Six Pillars at a Glance

| # | Pillar | Description |
|---|---|---|
| 1 | **NyayaBot** | AI Legal Navigator — conversational triage, voice-first, multilingual |
| 2 | **Document Intelligence Suite** | OCR + LLM document analysis, risk reports, document generator |
| 3 | **Smart Lawyer Marketplace** | Verified profiles, AI matching, bookings, community forum |
| 4 | **Case Management & Tracking** | Case timeline, evidence vault, eCourts integration |
| 5 | **Specialised Safety Portals** | Women's Safety Wing, Emergency SOS |
| 6 | **Legal Awareness Hub** | Case studies, law search, quizzes, legal news |

---

## 2. Problem Statement

### 2.1 The Legal Accessibility Crisis in India

India's legal system — despite being one of the most comprehensive in the world — remains practically inaccessible to the majority of its 1.4 billion citizens. The gap is not legislative; it is structural, linguistic, and economic.

### 2.2 Key Data Points

| # | Problem | Impact / Data |
|---|---|---|
| 1 | Lawyer-to-citizen ratio | 1 lawyer per 1,400 citizens; most concentrated in metros |
| 2 | Consultation cost | Average ₹40,000+ for a single initial consultation |
| 3 | Women & DV awareness | 76% of women facing domestic violence unaware of their legal rights |
| 4 | Legal document literacy | Legal notices, contracts, FIRs written in dense legalese — incomprehensible to most |
| 5 | No unified platform | Zero platforms in India covering the full journey: awareness → understanding → representation |
| 6 | Rural legal deserts | Districts in Bihar, UP, MP have fewer than 1 lawyer per 5,000 citizens |
| 7 | Pending case backlog | 4.5 crore+ pending cases in Indian courts; partly due to uninformed self-representation |

### 2.3 Pain Points by Persona

- Fresh graduates receive legal notices they cannot parse and cannot afford to contest.
- Working women face workplace harassment but are unaware of POSH Act protections.
- Farmers in land disputes have no affordable, trustworthy legal guidance channel.
- Law students lack accessible, plain-language study resources for landmark cases.
- Lawyers in Tier-2/3 cities struggle to build digital client pipelines.

### 2.4 Market Opportunity
India's legal tech market is projected to reach **$1.3 billion by 2027**, growing at 22% CAGR. Yet consumer-facing legal guidance platforms remain almost entirely absent — the market is dominated by B2B contract management tools. NyayaSarthi targets the underserved **95% of the market: individual citizens**.

---

## 3. Product Vision & Goals

### 3.1 Short-Term Goals (ByteVerse-26 MVP — 36 Hours)

1. Demonstrate a complete end-to-end user journey: problem description → AI triage → document analysis → lawyer booking.
2. Showcase all 6 pillars as functional, interactive features (even if partially seeded with demo data).
3. Win ByteVerse-26 under the Law & Justice × AI theme with a technically impressive and socially impactful product.
4. Generate evaluator confidence that the platform is production-ready with additional engineering effort.

### 3.2 Long-Term Goals (12-Month Production Roadmap)

1. Onboard 500+ verified lawyers across 10+ specialisations and all major Indian states within 6 months.
2. Serve 50,000+ citizen users with AI-powered legal guidance by Month 6.
3. Generate ₹10L+ monthly recurring revenue through subscriptions, commissions, and document fees by Month 8.
4. Expand to 8+ regional languages with offline voice support for rural users by Month 9.
5. Establish B2B institutional partnerships with 5+ NGOs and 3+ corporates by Month 12.

### 3.3 Product Principles

| Principle | Description |
|---|---|
| **Accessibility First** | Works on 2G networks; progressive enhancement for low-end devices |
| **Language Parity** | Hindi and English are first-class citizens; regional languages follow |
| **Trust by Design** | Every AI output is disclaimed, cited, and auditable |
| **Zero Jargon** | Legal content is always translated into plain language |
| **Safety by Default** | Emergency features are always one tap away |

---

## 4. Target Audience & Personas

### Persona 1: Aman — The Confused Notice Recipient

| Field | Detail |
|---|---|
| **Profile** | 24, Fresh Graduate, Delhi |
| **Core Pain** | Received a legal notice from landlord. Cannot understand the notice. Cannot afford ₹40,000 consultation. Fears being evicted. |
| **Job-to-be-Done** | Understand what the notice means, know his rights, and get an affordable lawyer if needed. |
| **Key Features Used** | NyayaBot triage · Document Health Check on the notice · Smart Marketplace (free consult) |

### Persona 2: Priya — The Harassed Professional

| Field | Detail |
|---|---|
| **Profile** | 31, Working Professional, Bengaluru |
| **Core Pain** | Facing workplace harassment. Unaware of POSH Act. Worried about job security if she complains. Needs discreet guidance. |
| **Job-to-be-Done** | Understand her rights under POSH Act, know exactly what to do next, and get legal support confidentially. |
| **Key Features Used** | Women's Safety Wing · NyayaBot (POSH-aware response) · Emergency SOS · Document Generator (complaint letter) |

### Persona 3: Raju — The Farmer in Dispute

| Field | Detail |
|---|---|
| **Profile** | 45, Farmer, Varanasi |
| **Core Pain** | Land encroachment by neighbour. Cannot read legal documents. Cannot travel to Allahabad for consultation. Speaks Bhojpuri. |
| **Job-to-be-Done** | Understand his land rights in Bhojpuri, file a complaint, and find a local affordable lawyer. |
| **Key Features Used** | Voice-first NyayaBot in Bhojpuri · Pro Bono lawyer filter · RTI/FIR template generator |

### Persona 4: Neha — The Law Student

| Field | Detail |
|---|---|
| **Profile** | 20, LLB Year 2, Patna |
| **Core Pain** | Landmark case law is dense and hard to study. Wants plain-language summaries for exam prep. |
| **Job-to-be-Done** | Study landmark Indian cases in simple language with real-world impact highlighted. |
| **Key Features Used** | Legal Awareness Hub · Case Studies module · Gamified quizzes · IPC/CrPC study materials |

### Persona 5: Advocate Sharma — The Digital-Native Lawyer

| Field | Detail |
|---|---|
| **Profile** | 38, Practising Advocate, Patna |
| **Core Pain** | Limited digital presence. Most clients come by word-of-mouth. Wants to scale his practice beyond Patna. |
| **Job-to-be-Done** | Build a verified digital profile, attract new clients, and answer community questions to build reputation. |
| **Key Features Used** | Lawyer profile & verification · Community Forum · Booking management dashboard · Profile analytics |

---

## 5. Feature Requirements

> **Priority Legend:** `P0` = MVP Must-Have · `P1` = Important / Next Sprint · `P2` = Nice-to-Have

---

### Pillar 1 — NyayaBot (AI Legal Navigator)

The brain of the platform. A conversational AI legal triage system — not just a chatbot, but a system that identifies problem severity and intelligently routes users to the right resources or lawyers.

---

#### 5.1 Conversational Legal Triage `P0`

**Description:** User describes their situation in plain language. NyayaBot identifies the legal domain (criminal, civil, consumer, family, property, cyber, labour, constitutional) and assigns a severity level (Low / Medium / High / Emergency).

**User Stories:**

| As a… | I want to… | So that… |
|---|---|---|
| citizen | describe my legal situation in plain language | NyayaBot can identify the relevant legal domain and guide me appropriately |
| citizen | receive a severity assessment of my problem | I understand how urgent my situation is and what my next step should be |
| citizen | get cited Indian law sections (IPC / CrPC / etc.) relevant to my issue | I can understand the legal basis of my rights |

**Acceptance Criteria:**
- NyayaBot correctly classifies legal domain for >85% of test prompts covering 8 legal domains.
- Severity levels (Low/Medium/High/Emergency) are displayed with a colour-coded badge.
- Every AI response cites at least one relevant Indian law section where applicable.
- AI disclaimer ("This is not legal advice — consult a lawyer for serious matters") appears on every response.
- Emergency routing (helplines surfaced within the chat) triggers automatically when severity = Emergency.

---

#### 5.2 Voice-First Multilingual Interface `P0`

**Description:** Real-time voice input and output in English, Hindi, and regional languages (Bhojpuri, Bengali, Tamil). Uses Web Speech API for STT and ElevenLabs/gTTS for TTS. Designed for rural and semi-urban India.

**User Stories:**

| As a… | I want to… | So that… |
|---|---|---|
| rural citizen | speak my problem in Hindi or Bhojpuri | I can access legal guidance even if I cannot type |
| citizen | hear NyayaBot's response read aloud | I can use the platform without needing to read complex text |
| citizen | switch language at any point in the session | I can use my most comfortable language |

**Acceptance Criteria:**
- Microphone button is visible on the NyayaBot chat UI at all times.
- Web Speech API transcription works for Hindi and English in Chrome/Edge.
- Text-to-Speech output is available in English and Hindi via gTTS or ElevenLabs.
- Language selector (EN / HI / BH / BN / TA) is visible and switches UI language.
- Voice input falls back gracefully to text input if microphone permission is denied.

---

#### 5.3 Know Your FIR Module `P0`

**Description:** User enters FIR details or charges. AI explains each charge in plain Hindi/English, the maximum penalty, and their immediate rights under Indian law.

**User Stories:**

| As a… | I want to… | So that… |
|---|---|---|
| arrested citizen | paste or type FIR charges and get plain-language explanations | I understand exactly what I am being accused of and what my rights are |
| citizen | learn the maximum penalty for each charge | I can assess the seriousness of my situation |
| citizen | see my immediate rights (e.g., right to bail, right to counsel) | I can protect myself from unlawful detention |

**Acceptance Criteria:**
- User can input FIR text (free-form) and receive a structured explanation.
- Output includes: charge name, section number, plain-language explanation, max penalty, and immediate rights.
- Output is rendered in both English and Hindi as togglable tabs.
- A "Find a criminal lawyer" CTA button appears at the end of the FIR explainer.

---

#### 5.4 Plain-Language Legal Explainer `P0`

**Description:** Handles everyday legal queries such as "Can my landlord do this?" or "My employer hasn't paid me in 3 months — what can I do?" with relevant Indian laws cited.

**User Stories:**

| As a… | I want to… | So that… |
|---|---|---|
| citizen | ask everyday legal questions in natural language | I get actionable, jargon-free answers immediately |
| citizen | see which specific Indian law protects me | I can reference the law in future communications |

**Acceptance Criteria:**
- NyayaBot handles queries across all 8 legal domains in the MVP.
- Responses are <300 words and written at a Grade 8 reading level.
- Each response includes a "What You Should Do Next" section.

---

### Pillar 2 — Document Intelligence Suite

The highest-complexity, highest-differentiation feature set. Turns opaque legal documents into clear, actionable risk reports — and generates new legal documents in minutes.

---

#### 5.5 AI Document Health Check (OCR + LLM Pipeline) `P0`

**Description:** User uploads a PDF or image of any legal document. OCR extracts the text; GPT-4o analyses it with a legal-specialist prompt and returns a colour-coded risk report.

**Risk Report Output:**
- 🔴 **Red Flags** — Dangerous or predatory clauses with the relevant Indian law cited.
- 🟡 **Caution Points** — Unusual or non-standard terms explained simply.
- 🟢 **Standard Clauses** — Confirmed as normal and safe.
- 📋 **Plain-language Summary** of the entire document.
- ➡️ **"What should you do next?"** — Personalised next-step advice.

**User Stories:**

| As a… | I want to… | So that… |
|---|---|---|
| citizen | upload a legal notice or contract PDF | I get a plain-language risk report without paying ₹40,000 to a lawyer |
| citizen | see red-flagged dangerous clauses highlighted | I know exactly what to be worried about |
| citizen | receive a "What should you do next?" recommendation | I have a clear action plan after reading the report |
| citizen | be connected to a specialist lawyer from the report | I can take immediate professional action on high-risk documents |

**Acceptance Criteria:**
- Platform accepts PDF and JPEG/PNG uploads up to 10 MB.
- OCR extracts text with >90% accuracy for printed documents.
- GPT-4o analysis returns all five report components.
- Each flagged clause cites the relevant Indian law or regulation.
- Report is generated within 30 seconds for a standard 5-page document.
- CTA button "Find a Lawyer for This Document Type" appears at the bottom of every report.
- User can download the risk report as a PDF.

---

#### 5.6 Document Generator (Template Engine) `P0`

**Description:** User fills a guided wizard form. Platform auto-generates Legal Notices, RTI Applications, FIR Templates, Rental Agreements, NDAs, Affidavits, and Consumer Complaint Letters.

**User Stories:**

| As a… | I want to… | So that… |
|---|---|---|
| citizen | select a document type and fill a simple form | I get a professionally drafted legal document in minutes, for free |
| citizen | send my generated document for lawyer review | I get a validated document at a fraction of the traditional cost |
| citizen | download my generated document as a PDF or DOCX | I can use it immediately in the real world |

**Acceptance Criteria:**
- MVP supports: Legal Notice, RTI Application, FIR Template, Rental Agreement, Consumer Complaint Letter.
- Each document type has a guided form with <15 fields and in-context help text.
- Generated document is downloadable as PDF.
- Optional paid add-on: "Send for Lawyer Review (₹299)" button is visible after generation.

---

#### 5.7 AI Pre-Drafter (Guided RTI / FIR Builder) `P1`

**Description:** AI asks structured questions and assembles the final RTI application or FIR template draft. Designed for users who don't know what information is required.

**User Stories:**

| As a… | I want to… | So that… |
|---|---|---|
| citizen | be guided step-by-step through the information needed for an RTI | I can file an RTI without any prior knowledge of the process |
| citizen | have AI draft the final document from my answers | I get a legally sound draft without writing anything myself |

**Acceptance Criteria:**
- Pre-Drafter guides user through 5–10 structured questions per document type.
- Final draft is assembled and shown for review before download.
- User can edit the draft inline before downloading.

---

### Pillar 3 — Smart Lawyer Marketplace

Think Practo + LinkedIn, purpose-built for the Indian legal market. Solves both citizen access and lawyer discoverability simultaneously.

---

#### 5.8 Verified Lawyer Profiles `P0`

**Description:** Bar Council ID verification badge, specialisation tags, years of experience, languages spoken, transparent fee display.

**User Stories:**

| As a… | I want to… | So that… |
|---|---|---|
| lawyer | create and publish a verified profile with my Bar Council ID | citizens can trust my credentials and find me based on my specialisation |
| citizen | filter lawyers by specialisation, location, language, and fee range | I can find the right lawyer for my specific situation quickly |

**Acceptance Criteria:**
- Lawyer profile includes: Name, Photo, Bar Council ID (badge), Specialisations, Languages, Location, Fee, Rating.
- Bar Council ID field is mandatory; profile shows "Verification Pending" until admin approves.
- Profile is searchable and filterable by all listed attributes.

---

#### 5.9 AI-Powered Smart Matching `P0`

**Description:** After NyayaBot identifies the user's legal domain, the marketplace automatically surfaces the top 3 matched lawyers by specialisation, location, and rating.

**User Stories:**

| As a… | I want to… | So that… |
|---|---|---|
| citizen | automatically see 3 matched lawyers after NyayaBot triages my problem | I don't have to manually search — I get relevant recommendations instantly |

**Acceptance Criteria:**
- After NyayaBot triage, a "Matched Lawyers for You" panel appears with 3 profiles.
- Matching algorithm weights: Specialisation match (50%) + Rating (30%) + Location proximity (20%).
- Each matched lawyer card shows: photo, name, specialisation, rating, fee, "Book Free Consult" button.

---

#### 5.10 Booking System `P0`

**Description:** Free 15-minute consultation as the funnel entry point. Paid follow-up consultations thereafter. Calendar-based slot selection.

**User Stories:**

| As a… | I want to… | So that… |
|---|---|---|
| citizen | book a free 15-minute consultation with a matched lawyer | I can get initial legal guidance without any financial risk |
| citizen | see the lawyer's available slots and pick one that suits me | I have control over when the consultation happens |

**Acceptance Criteria:**
- Lawyer can set available time slots in their dashboard.
- Citizen can view available slots and book with one click.
- Booking confirmation is shown in the UI immediately.
- Booked consultation appears in both citizen's and lawyer's dashboards.

---

#### 5.11 Community Forum — Legal Commons `P1`

**Description:** Lawyers voluntarily answer anonymised public legal questions to build profile visibility. Upvote system. Searchable archive. Solves the marketplace cold-start problem.

**User Stories:**

| As a… | I want to… | So that… |
|---|---|---|
| citizen | post an anonymised legal question to the community | I can get free guidance from real lawyers without revealing my identity |
| lawyer | publicly answer legal questions | I build my reputation and attract potential clients organically |
| citizen | search the archive of answered questions | I can find answers to my problem without posting a new question |

**Acceptance Criteria:**
- Citizens can post questions (anonymised by default).
- Questions are auto-tagged by legal domain.
- Lawyers can post answers; users can upvote answers.
- Forum is searchable by keyword and filterable by legal domain.
- Top 3 most-upvoted answers appear first for each question.

---

#### 5.12 Pro Bono Filter & Admin Panel `P1`

**Description:** Lawyers can opt into Pro Bono for free consultations for low-income users. Admin panel for profile approval and content moderation.

**User Stories:**

| As a… | I want to… | So that… |
|---|---|---|
| low-income citizen | filter lawyers who offer free consultations | I can get legal help even without money |
| admin | approve or reject new lawyer profile registrations | I ensure only verified professionals join the platform |

**Acceptance Criteria:**
- Lawyer profile has a "Pro Bono Available" toggle.
- Citizens can filter marketplace results by "Pro Bono Only".
- Admin dashboard lists all pending lawyer registrations with Approve/Reject actions.
- Rejected profiles receive a reason in a notification.

---

### Pillar 4 — Case Management & Tracking

Transforms NyayaSarthi from a one-time tool into a persistent, ongoing platform — creating long-term retention.

---

#### 5.13 AI Case Tracker `P1`

**Description:** Timeline-based dashboard showing case milestones (FIR Filed → Chargesheet → First Hearing → Verdict). Both user and assigned lawyer can add updates.

**User Stories:**

| As a… | I want to… | So that… |
|---|---|---|
| citizen | track my case milestones on a visual timeline | I always know where my case stands without calling my lawyer daily |
| lawyer | add notes and updates to an assigned case | I keep my client informed in a structured, professional way |

**Acceptance Criteria:**
- Case tracker shows a visual horizontal timeline with named milestone markers.
- Both citizen and assigned lawyer can add updates with timestamps.
- Case status is editable by the lawyer; read-only for the citizen.
- Automated notification triggers when a new update is posted.

---

#### 5.14 Evidence Vault `P1`

**Description:** Secure, categorised document storage for case-related files — receipts, screenshots, chat logs, photos. Organised by date and category.

**User Stories:**

| As a… | I want to… | So that… |
|---|---|---|
| citizen | upload and store evidence files securely in one place | I can share them with my lawyer instantly and never lose important documents |

**Acceptance Criteria:**
- User can upload files up to 25 MB; supported formats: PDF, JPG, PNG, MP4, DOCX.
- Files are categorised (Receipt / Screenshot / Photo / Document / Other) and sorted by date.
- Vault is visible to the assigned lawyer on the case.
- Files are stored with access control (only case participants).

---

#### 5.15 eCourts API Integration & Hearing Reminders `P2`

**Description:** Live case status lookup by case number from India's public eCourts API. Automated notifications for upcoming hearing dates.

**User Stories:**

| As a… | I want to… | So that… |
|---|---|---|
| citizen | enter my case number and see live court status | I get real-time updates without calling the court or my lawyer |
| citizen | receive a push notification before every hearing date | I never miss a court date |

**Acceptance Criteria:**
- eCourts API lookup returns: court name, judge, case status, next hearing date.
- Hearing reminder notifications are sent 24 hours and 2 hours before the scheduled date.
- API integration shows "Data from eCourts.gov.in" attribution.

---

### Pillar 5 — Specialised Safety Portals

High social-impact features serving the most vulnerable users. Zero tolerance for failure — these must be simple, fast, and always available.

---

#### 5.16 Women's Safety Wing `P0`

**Description:** Dedicated portal for domestic violence (PWDVA 2005), workplace harassment (POSH Act 2013), dowry harassment (IPC 498A), and matrimonial disputes. Step-by-step action cards and embedded emergency helplines.

**User Stories:**

| As a… | I want to… | So that… |
|---|---|---|
| woman in crisis | find an immediate action guide for domestic violence | I know exactly what steps to take right now to protect myself |
| woman | see relevant helplines without searching | I can call for help with a single tap |
| woman | locate the nearest police station or one-stop crisis centre | I can access physical support if digital help is not enough |

**Acceptance Criteria:**
- Women's Safety Wing is accessible from the main navigation in one click.
- Four dedicated sub-sections: Domestic Violence, Workplace Harassment, Dowry/498A, Matrimonial Disputes.
- Each sub-section has a "What to Do RIGHT NOW" step-by-step action card (max 5 steps).
- Helplines embedded: NCW (7827170170), Police (100), Women Helpline (1091) — each as a tappable call link.
- Nearest police station locator uses browser geolocation (with permission).

---

#### 5.17 Emergency Legal SOS `P0`

**Description:** One-tap "I Need Help NOW" button visible across the platform. Surfaces on-call duty lawyers. Auto-generates a situation summary for the lawyer from the user's NyayaBot session.

**User Stories:**

| As a… | I want to… | So that… |
|---|---|---|
| citizen in emergency | tap one button to get immediate legal help | I don't have to navigate menus in a crisis situation |
| citizen in custody | have my session context automatically shared with an on-call lawyer | The lawyer already knows my situation before we speak |

**Acceptance Criteria:**
- Emergency SOS button ("I Need Help NOW") is visible in the site header on all pages.
- Tapping SOS shows: on-call duty lawyers, emergency helplines, and a situation summary.
- Situation summary is auto-generated from the last NyayaBot session (if available).
- Duty lawyer list refreshes in real time based on lawyer availability status.
- If no duty lawyers are available, system falls back to helplines only (no blank state).

---

### Pillar 6 — Legal Awareness Hub (The Geek Corner)

Education and curiosity engine. Converts casual visitors into engaged, return community members — and serves as the platform's top-of-funnel.

---

#### 5.18 "Is There a Law For This?" AI Search `P0`

**Description:** AI-powered search for quirky and everyday legal questions — e.g., "Can my housing society ban pets?", "Is it illegal to fly a kite in Delhi?"

**User Stories:**

| As a… | I want to… | So that… |
|---|---|---|
| curious citizen | type any everyday question and get an instant plain-language legal answer | I learn about laws that affect my daily life in an engaging way |

**Acceptance Criteria:**
- Search bar accepts natural language questions up to 500 characters.
- AI returns a 100–200 word plain-language answer with relevant law cited.
- 5 seeded "popular questions" displayed as clickable chips below the search bar.
- Response time < 5 seconds.

---

#### 5.19 Landmark Case Studies `P0`

**Description:** Famous Indian cases (Vishaka Guidelines 1997, Shah Bano 1985, Kesavananda Bharati 1973, Maneka Gandhi 1978, Puttaswamy 2017, etc.) — each summarised by AI into a readable explainer with real-world impact explained.

**User Stories:**

| As a… | I want to… | So that… |
|---|---|---|
| law student | read a case study in plain language with real-world context | I understand both the legal ruling and why it matters to ordinary citizens |
| curious citizen | browse landmark cases by category or year | I can explore Indian legal history in an accessible way |

**Acceptance Criteria:**
- MVP has 5 seeded landmark cases (Vishaka, Shah Bano, Kesavananda Bharati, Maneka Gandhi, Puttaswamy).
- Each case study includes: Case name, Year, Court, Issue (plain language), Ruling (plain language), Real-world impact, Key takeaway.
- Cases are tagged and filterable by legal domain.

---

#### 5.20 Gamified "Know Your Rights" Quiz `P1`

**Description:** Score-based interactive quiz on Indian legal rights. Shareable results for social engagement and awareness spread.

**User Stories:**

| As a… | I want to… | So that… |
|---|---|---|
| citizen | take a quiz about my legal rights | I learn in a fun, low-pressure way and share my score to spread awareness |

**Acceptance Criteria:**
- Quiz has 10 questions per set; MCQ and True/False formats.
- Score is calculated and displayed at the end with explanations for wrong answers.
- Share button generates a pre-formatted social share card with user's score.
- Quizzes are tagged by legal domain (criminal law, consumer rights, women's rights, etc.).

---

## 6. User Flows

### Flow A: New Citizen → NyayaBot → Document Health Check → Lawyer Booking

| Step | Actor | Action | System Response |
|---|---|---|---|
| 1 | Citizen | Lands on NyayaSarthi homepage | Hero section with NyayaBot CTA and "Describe your problem" prompt |
| 2 | Citizen | Types: "I got a notice from my landlord saying I must vacate in 7 days" | NyayaBot activates; typing indicator shows |
| 3 | NyayaBot | — | Classifies: Domain = Property/Tenancy Law; Severity = Medium; cites Rent Control Act |
| 4 | Citizen | Clicks "Upload Document" prompt in NyayaBot response | Document upload modal opens (PDF/image) |
| 5 | Citizen | Uploads notice PDF | Upload confirmation; OCR + LLM pipeline starts; progress spinner shows |
| 6 | System | — | Returns colour-coded risk report: 2 Red Flags, 1 Caution Point, 3 Standard Clauses, plain-language summary |
| 7 | Citizen | Reads report; clicks "Find a Lawyer for This Document" | Smart Marketplace opens with top 3 property/tenancy lawyers matched |
| 8 | Citizen | Selects Lawyer A; clicks "Book Free 15-min Consult" | Available time slots shown |
| 9 | Citizen | Selects a slot; confirms booking | Booking confirmed screen shown; appears in citizen dashboard and lawyer dashboard |

---

### Flow B: Woman in Crisis → Safety Wing → Emergency SOS → Duty Lawyer

| Step | Actor | Action | System Response |
|---|---|---|---|
| 1 | Woman | Taps "Emergency SOS" (red button, visible in header) | Emergency overlay opens immediately |
| 2 | System | — | Shows: Women's Safety Wing link, Police (100), NCW helpline (7827170170), and list of on-call duty lawyers |
| 3 | Woman | Clicks "Women's Safety Wing" | Dedicated portal opens with 4 sub-sections |
| 4 | Woman | Selects "Domestic Violence" | "What to Do RIGHT NOW" action card appears: 5 clear steps |
| 5 | Woman | Clicks "Connect to Duty Lawyer NOW" | NyayaBot session context auto-generates a situation summary |
| 6 | System | — | Shows duty lawyer profile, situation summary, and "Call Now" / "Chat Now" options |
| 7 | Duty Lawyer | — | Receives notification with situation summary; accepts the session |
| 8 | Woman | Connects with lawyer | Real-time chat or voice session begins |

---

### Flow C: Lawyer Registration → Admin Approval → First Booking

| Step | Actor | Action | System Response |
|---|---|---|---|
| 1 | Lawyer | Clicks "Join as a Lawyer" on homepage | Lawyer registration form opens |
| 2 | Lawyer | Fills: Name, Bar Council ID, Specialisations, Languages, Location, Fee, Bio, Photo | Multi-step form with progress indicator |
| 3 | Lawyer | Submits form | "Profile Under Review" status shown; email confirmation sent |
| 4 | Admin | Logs into Admin Panel | Pending approvals list shows new lawyer profile |
| 5 | Admin | Reviews profile; clicks "Approve" | Lawyer receives "Profile Approved" notification; profile goes live on marketplace |
| 6 | Lawyer | Sets available consultation slots in dashboard | Slots are now visible to citizens on booking page |
| 7 | Citizen | Books a free consultation with the lawyer | Lawyer receives booking notification in dashboard |
| 8 | Lawyer | Views booking details and citizen's case context | Accepts booking; consultation is confirmed for both parties |

---

## 7. MVP Scope Definition (36-Hour Hackathon Sprint)

### 7.1 IN Scope — Must Demo End-to-End

| # | Feature / Journey | Pillar | Notes |
|---|---|---|---|
| 1 | User sign-up and basic auth (email or Google OAuth) | Platform | JWT-based |
| 2 | NyayaBot conversational interface with AI triage (domain + severity) | P1 | GPT-4o via OpenAI/Anthropic API |
| 3 | Voice input (Hindi/English) via Web Speech API | P1 | Chrome/Edge browser-dependent |
| 4 | Know Your FIR module | P1 | Demo with 2–3 sample FIR charge sets |
| 5 | Document upload → OCR → AI risk report generation | P2 | Tesseract OCR + GPT-4o |
| 6 | Document Generator (Legal Notice + RTI templates via form wizard) | P2 | PDF generation via pdfkit/puppeteer |
| 7 | Smart Lawyer Marketplace (3 seeded lawyer profiles with matching) | P3 | Seeded data; booking flow end-to-end |
| 8 | Free 15-min consultation booking flow | P3 | No payment gateway; booking confirmation only |
| 9 | Women's Safety Wing with action cards and helplines | P5 | Static content; geolocation for station finder |
| 10 | Emergency SOS button (visible on all pages) | P5 | Routes to Safety Wing + seeded duty lawyers |
| 11 | Legal Awareness Hub — 5 landmark case studies + AI law search | P6 | GPT-4o for law search; 5 seeded case studies |
| 12 | Basic admin panel — lawyer approval workflow | P3 | Admin role with Approve/Reject UI |

### 7.2 OUT of Scope for MVP

| Feature | Reason |
|---|---|
| Razorpay / payment gateway | Requires business registration & KYC — post-hackathon |
| Real lawyer onboarding (production verification) | Seeded data sufficient for demo |
| Live eCourts API integration | API access approval takes time; mock data in MVP |
| Evidence Vault (full cloud storage) | S3/GCS setup out of scope; basic file upload UI only |
| React Native mobile app | Web-first for hackathon; mobile in Phase 3 |
| Offline voice support | Requires service workers + model caching; Phase 3 |
| Blockchain evidence vault | Phase 4 — requires significant engineering effort |
| AI case outcome prediction | Phase 4 — requires training data |
| Real-time lawyer chat/call infrastructure | Phase 2 — requires WebRTC/Twilio integration |
| 8+ regional languages | Phase 3; Hindi + English + basic Bhojpuri TTS for MVP |

---

## 8. Post-MVP Production Roadmap

| Phase | Timeline | Key Deliverables | Goal |
|---|---|---|---|
| **Phase 1** | Hackathon (36 hrs) | Full MVP as defined in §7.1 | Win ByteVerse-26; validate core UX |
| **Phase 2** | Month 1–2 | Razorpay integration, real lawyer onboarding (Bar Council verification), live eCourts API, WebRTC lawyer-client chat | Launch paid monetisation; first real users |
| **Phase 3** | Month 3–4 | React Native mobile app (iOS + Android), offline voice support, 8+ regional languages, Evidence Vault (S3) | Mobile-first for rural India |
| **Phase 4** | Month 5–6 | Blockchain evidence vault (IPFS/Ethereum for tamper-proof storage), AI case outcome prediction model | Premium differentiator; institutional credibility |
| **Phase 5** | Month 7–12 | B2B institutional sales: NGO packages, corporate employee benefit packages, legal aid society licensing; Tier-2/3 lawyer acquisition drive | Scale ARR; diversify revenue beyond consumer |

---

## 9. Monetisation Strategy

### 9.1 Revenue Streams

| Revenue Stream | Model | Price Point | Target Segment |
|---|---|---|---|
| Lawyer Monthly Listing Fee | Recurring subscription | ₹999/month | All verified lawyers |
| Platform Commission on Paid Consultations | 15% per session | ~₹150–750 per consult | Lawyers + citizens |
| Per-Document Generation Fee | Per-transaction | ₹49–199/document | Citizens |
| Lawyer Document Review Add-On | Per-transaction | ₹299–499/review | Citizens + lawyers |
| Premium User Subscription | Recurring subscription | ₹199/month | Power users (unlimited AI + vault storage) |
| B2B Institutional Package | Annual contract | ₹15,000–50,000/month | NGOs, corporates, legal aid societies |

### 9.2 Unit Economics (Month 6 Projection)

| Metric | Target | Revenue Impact |
|---|---|---|
| Active verified lawyers | 500 | ₹4,99,500/month (listing fees) |
| Paid consultations per month | 2,000 | ₹3,00,000/month (15% of ₹1,000 avg) |
| Documents generated per month | 5,000 | ₹4,99,500/month (avg ₹99) |
| Premium subscribers | 1,000 | ₹1,99,000/month |
| B2B institutional clients | 3 | ₹75,000–1,50,000/month |
| **Total MRR (Month 6)** | — | **~₹15–20 lakh/month** |

### 9.3 Growth Flywheel

```
More citizens use NyayaBot
        ↓
More lawyers join for visibility
        ↓
Lawyers answer forum questions
        ↓
Forum answers drive organic SEO traffic
        ↓
More citizens discover NyayaSarthi
        ↓
        ↑ (cycle accelerates)
```

---

## 10. Success Metrics & KPIs

| Pillar | KPI | Target (Month 3) | Target (Month 6) |
|---|---|---|---|
| Platform Health | Daily Active Users (DAU) | 500 | 5,000 |
| Platform Health | Monthly Active Users (MAU) | 2,000 | 20,000 |
| Platform Health | User Retention (D30) | 25% | 40% |
| NyayaBot | NyayaBot sessions per day | 300 | 2,500 |
| NyayaBot | Domain classification accuracy | 85% | 90% |
| NyayaBot | Voice input usage rate | 15% | 30% |
| Document Intelligence | Documents analysed per month | 200 | 1,500 |
| Document Intelligence | Document generation completions | 150 | 1,000 |
| Lawyer Marketplace | Verified lawyers onboarded | 50 | 500 |
| Lawyer Marketplace | Free consultations booked/month | 100 | 800 |
| Lawyer Marketplace | Consult-to-paid-session conversion | 10% | 20% |
| Community Forum | Questions posted per month | 50 | 400 |
| Community Forum | Questions answered by lawyers | 60% | 75% |
| Safety Wing | Women's Safety Wing visits/month | 100 | 500 |
| Safety Wing | Emergency SOS activations/month | 10 | 50 |
| Legal Hub | Case study page views/month | 500 | 3,000 |
| Legal Hub | Quiz completions/month | 200 | 1,500 |
| Legal Hub | Quiz social shares/month | 50 | 300 |

---

## 11. Constraints & Assumptions

### 11.1 Technical Constraints

- **API rate limits:** OpenAI/Anthropic free tier limits may throttle responses under high demo load — a caching layer is recommended.
- **OCR accuracy:** Tesseract performs poorly on handwritten documents; MVP scope is limited to typed/printed documents.
- **Voice support:** Web Speech API requires Chrome or Edge; Firefox/Safari fallback is text-only.
- **eCourts API:** Production eCourts data access requires NIC partnership; MVP uses mocked case data.
- **Geolocation:** Police station locator requires browser geolocation permission; falls back to manual pin-code input.
- **File storage:** MVP uses local server storage or Cloudinary free tier; production requires S3/GCS.

### 11.2 Legal & Ethical Constraints

- **AI Disclaimer:** Every NyayaBot response must include a visible disclaimer that AI-generated content is not legal advice and does not create a lawyer-client relationship.
- **Bar Council Rules:** Platform cannot constitute "legal practice" by AI. All AI responses are framed as informational, not advisory.
- **Data Privacy:** User legal queries and uploaded documents are sensitive personal data — PDPB-compliant storage and processing is mandatory in production.
- **Lawyer Verification:** Platform cannot guarantee the accuracy of Bar Council ID submissions in hackathon MVP — admin manual verification is the fallback.

### 11.3 ByteVerse-26 Hackathon Compliance

- All code must be written during the 36-hour window (April 11–12, 2026).
- Pre-trained AI models (GPT-4o, ElevenLabs) and open-source libraries are permitted.
- Seeded demo data (lawyer profiles, case studies) is explicitly permitted for demonstration.
- No paid APIs may be used if they require active billing; free-tier or hackathon credits only.

### 11.4 Assumptions

- Users have access to a smartphone or computer with a modern browser (Chrome/Edge preferred).
- Demo environment has stable internet for API calls; no offline functionality required for MVP.
- Seeded lawyer profiles and case study content are legally accurate for demonstration purposes.
- Evaluators have access to a test user account and a test admin account during judging.

---

## 12. Open Questions

| # | Question | Owner | Priority | Notes |
|---|---|---|---|---|
| 1 | Which AI provider (OpenAI vs Anthropic) gives better Indian legal domain performance? | Tech Lead | High | Test both with sample FIR / property queries before committing |
| 2 | Should NyayaBot conversations be stored for personalisation, or deleted for privacy? | Product + Legal | High | PDPB compliance requires explicit user consent for storage |
| 3 | How do we handle truly dangerous emergency situations where AI is clearly insufficient? | Product | High | Hard escalation to helplines + duty lawyer must be fail-safe |
| 4 | What is the legal liability exposure if a generated document has errors? | Legal | High | AI disclaimer scope; may need Advocate endorsement flow |
| 5 | Should Pro Bono lawyers be vetted differently from paid lawyers? | Product | Medium | Separate onboarding track or just a profile toggle? |
| 6 | What is the content moderation strategy for the Community Forum? | Product | Medium | Human mod queue, keyword filters, or lawyer-only posting? |
| 7 | How do we prevent fake lawyer registrations at scale? | Product + Ops | Medium | Bar Council API (if available) or photo-ID cross-check |
| 8 | Regional language expansion priority order after Hindi/English? | Market | Low | Suggested: Bhojpuri → Bengali → Tamil → Telugu → Marathi |
| 9 | Mobile app: React Native vs Flutter vs PWA? | Tech | Low | PWA first for speed; native app if traction justifies cost |
| 10 | Blockchain evidence vault: Ethereum vs Polygon vs Hyperledger? | Tech | Low | Evaluate gas costs; Polygon likely most practical |

> **Note:** Questions marked High should be resolved within the first 2 weeks post-hackathon. Medium by end of Phase 2. Low-priority questions by Phase 3.

---

## Appendix A: Tech Stack Recommendation

| Layer | Technology | Justification |
|---|---|---|
| Frontend | React.js + Tailwind CSS | Fast development; component reuse; responsive by default |
| AI / NLP | OpenAI GPT-4o via API | Best-in-class legal text understanding; function calling for structured output |
| OCR | Tesseract.js (client) or Google Vision API | Tesseract for MVP speed; Vision for production accuracy |
| Voice | Web Speech API (STT) + ElevenLabs/gTTS (TTS) | Free STT in browser; ElevenLabs for natural Hindi TTS |
| Backend | Node.js + Express.js | Fast setup; JS full-stack consistency |
| Database | PostgreSQL (Supabase) | Relational data (users, lawyers, bookings); Supabase for real-time + auth |
| File Storage | Cloudinary (MVP) → AWS S3 (Production) | Free tier sufficient for hackathon |
| PDF Generation | Puppeteer / pdfkit | Server-side PDF generation for Document Generator |
| Auth | Supabase Auth / Firebase Auth | JWT; Google OAuth; email/password |
| Deployment | Vercel (frontend) + Railway (backend) | Free-tier deployment; CI/CD in minutes |

---

## Appendix B: Regulatory & Compliance Framework

| Regulation | Applicability | Compliance Action Required |
|---|---|---|
| IT Act 2000 & IT Rules 2021 | User data processing, intermediary liability | Privacy policy, grievance officer appointment, 72-hr breach disclosure |
| PDPB (Personal Data Protection Bill) | Processing of sensitive legal data | Explicit consent for data storage, data minimisation, right to erasure |
| Bar Council Rules | AI providing legal guidance | All AI responses disclaimed as informational only; not constituting legal practice |
| Consumer Protection Act 2019 | Platform acting as intermediary for legal services | Liability framework for platform vs. independent lawyer services |
| POSH Act 2013 | Internal committee for platform employees | Appoint IC once team exceeds 10 employees |

---

*NyayaSarthi PRD v1.0 · ByteVerse-26 · NIT Patna · April 11, 2026*
*"न्याय हर किसी का अधिकार है। Justice is Every Citizen's Right."*
