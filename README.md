# ⚖️ Nyaya Sarthi: AI Legal Companion for 1.4B Indians

**Nyaya Sarthi** (Justice Guide) is a comprehensive AI-powered legal assistance platform designed to democratize access to justice in India. By combining state-of-the-art LLMs with specialized OCR pipelines, we bridge the gap between complex Indian statutes and the common citizen.

---

## 🚀 The Core Pillars

### 🤖 1. NyayaBot (AI Legal Triage)
A specialized chat interface that uses **GPT-4o** to analyze user grievances in natural language (including Hinglish). It classifies legal domains, detects severity levels, and provides immediate actionable advice based on Indian Penal Code (IPC) and Bharatiya Nyaya Sanhita (BNS).

### 🔍 2. Document Health Check (OCR + Risk Analysis)
Upload any legal document (PDF or Image). Our pipeline uses **Tesseract.js** for localized OCR and AI to extract "Red Flags," assess risk scores, and simplify complex jargon into plain language.

### 🏛️ 3. Integrated Lawyer Marketplace
Once a user understands their rights, Nyaya Sarthi connects them with a network of **verified lawyers**. Features include smart-matching based on the identified legal domain and a 15-minute consultation booking system.

### 🛡️ 4. Women’s Safety & Awareness Hub
A dedicated portal for high-priority legal rights (POSH, Domestic Violence) featuring a one-click **SOS emergency system** and summaries of 5+ landmark Indian Supreme Court cases.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS (High-performance UI)
- **Backend:** Node.js, Express.js (Scalable API Orchestration)
- **Database:** MongoDB Atlas (M0 Tier)
- **AI/ML:** OpenAI GPT-4o, Tesseract.js (OCR), Web Speech API (Voice Access)
- **Tools:** Axios, Mongoose, Multer, Dotenv

---

## 🤖 AI Usage Disclosure (ByteVerse-26 Compliance)

In accordance with the **ByteVerse-26 Rulebook**, we transparently disclose the use of the following AI tools in the development of Nyaya Sarthi:

1.  **Stitch:** Used for rapid UI/UX prototyping and generating initial React component structures.
2.  **Cursor (Composer):** Utilized as the primary Backend Architect for orchestrating Express.js routes, Mongoose schemas, and API integration logic.
3.  **Antigravity (Agent Manager):** Used for frontend-backend "handshake" synchronization, implementing voice-to-text hooks, and final MVP logic refinement.
4.  **Generative AI (GPT-4o):** Powers the core LexBot logic and the Document Risk Analysis engine.

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account
- OpenAI API Key

### Running Locally

1. **Clone & Install:**
   ```bash
   git clone <repo-url>
   npm install
   cd server && npm install

2. **Environment Variables:**
Create a .env in the root directory:


MONGODB_URI=your_mongodb_atlas_uri
OPENAI_API_KEY=your_openai_key


3. **Initialize Database:**


cd server && npm run seed


4. **Start the Engine:**

Backend: cd server && npm start (Runs on Port 5001)

Frontend: npm run dev (Runs on Port 5173)


