<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/bs21082010/sanskrit/master/client/public/favicon.svg">
</picture>

# संस्कृतम् — SanskritLab

**Bridging deep historical research with modern education, powered by high-performance technology.**

SanskritLab is a full-stack platform for Sanskrit studies spanning manuscript digitization, 3D visualization, adaptive learning, and AI-powered assessment — from **child-friendly play modes** to **PhD-level critical edition tools**.

---

## ✨ Features

### 📚 Research & Digitization Suite
- **Manuscript OCR** — Convert scanned Devanāgarī & Grantha manuscripts to Unicode text
- **Smart Corpus** — Searchable library of texts by time period with semantic search
- **Layered Annotation** — Multi-level notes (grammar, translation, commentary) on texts

### 🎨 3D Interactive Visualization
- **3D Manuscript Viewer** — Rotate & inspect palm-leaf models with text overlays
- **Grammar Maps** — Pāṇini's rules displayed as branching diagrams
- **Philosophy Networks** — Nyāya, Vedānta, Mīmāṃsā connections visualized
- **Evolutionary Timeline** — 3000 years of Sanskrit development

### 🌳 Adaptive Learning (Child → PhD)
| Track | Age | Levels | Focus |
|-------|-----|--------|-------|
| 🧒 **Child** | 5–12 | 0–1 | Alphabet, vocabulary, picture games |
| 📚 **Teen** | 13–17 | 1–3 | Declensions, verbs, sandhi, exam prep |
| 🎓 **Undergrad** | 18–22 | 2–4 | Classical texts, philosophy, advanced grammar |
| 🔬 **Graduate** | MA/MPhil | 3–5 | Textual criticism, paleography, darśanas |
| 🏛️ **PhD** | PhD+ | 5–6 | Critical editions, apparatus, publication |

- **Skill Tree** — XP, streaks, prerequisites, unlockable skills
- **Lesson Viewer** — Section-by-section with Devanāgarī, transliteration, examples
- **Quiz Engine** — Auto-graded with explanations
- **Kid Mode** — Alphabet flashcards, picture-word matching game

### 🎓 Teaching & Assessment
- **Teacher Dashboard** — Lesson plans, student progress, class management
- **Student Workspace** — Guided learning with interactive texts
- **Assessment Engine** — Auto-generated drills for declensions, sandhi, vocabulary
- **Curriculum Builder** — Create & export custom lessons

### 🎙️ AI Viva & Exam Practice
- **Viva Simulator** — AI oral examiner with speech/text responses
- **Analytics Engine** — Performance tracking, weak area detection, study path recommendations

### 🏛️ PhD Research Workspace
- **Collation** — Compare manuscript witnesses side-by-side
- **Apparatus Criticus** — Build critical apparatus with variant readings
- **Paleography** — Script comparison (Devanāgarī / Grantha)

---

## 🏗 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, TypeScript, Vite, React Router |
| **Backend (Rust)** | Actix-web, Serde, Tesseract OCR |
| **Backend (Go)** | Gorilla/Mux, CORS |
| **Desktop** | PySide6 (Python) |
| **Storage** | localStorage (client), in-memory (backend stubs) |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Rust (for backend)
- Go 1.21+ (for Go backend)
- Python 3.10+ & PySide6 (for desktop app)

### Frontend (React)

```bash
cd client
npm install
npm run dev        # starts at http://localhost:5173
npm run build      # production build → dist/
```

### Rust Backend

```bash
cd backend/rust
cargo run          # starts API at http://127.0.0.1:8080
```

### Go Backend

```bash
cd backend/go
go run main.go     # starts API at http://127.0.0.1:9090
```

### Desktop App (PySide6)

```bash
cd desktop
pip install PySide6
python main.py
```

---

## 📁 Project Structure

```
SanskritLab/
├── client/                    # React + TypeScript + Vite
│   ├── public/
│   └── src/
│       ├── components/        # Shared UI (Layout, etc.)
│       ├── pages/
│       │   ├── dashboard/     # Overview
│       │   ├── research/      # Corpus, OCR, Annotation
│       │   ├── visualization/ # 3D Viewer, Grammar Maps, Timeline
│       │   ├── teaching/      # Teacher, Student, Assessment
│       │   ├── viva/          # Viva Simulator, Analytics
│       │   └── learning/      # Skill Tree, Lessons, Child Mode,
│       │                       # Research Workspace, Curriculum Builder
│       ├── hooks/             # useProgress (learning engine)
│       ├── services/          # API client, learning engine
│       ├── types/             # TypeScript definitions
│       └── data/              # Lessons & tracks curriculum data
├── backend/
│   ├── rust/                  # Actix-web API (OCR, grammar, corpus, dict)
│   └── go/                    # Gorilla/mux API (analytics, assessment, viva)
├── desktop/                   # PySide6 multi-window app
└── README.md
```

---

## 🔌 API Endpoints

### Rust (port 8080)
| Route | Method | Description |
|-------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/ocr/recognize` | POST | OCR image → text |
| `/api/grammar/parse` | POST | Parse Sanskrit text |
| `/api/grammar/sandhi` | POST | Split sandhi |
| `/api/grammar/declensions` | GET | Declension paradigms |
| `/api/corpus/search` | GET | Search texts |
| `/api/corpus/texts` | GET | List texts |
| `/api/corpus/texts/{id}` | GET | Get text by ID |
| `/api/dictionary/lookup` | GET | Word lookup |
| `/api/dictionary/compound-split` | POST | Split compounds |

### Go (port 9090)
| Route | Method | Description |
|-------|--------|-------------|
| `/api/analytics/evaluate` | POST | Evaluate performance |
| `/api/assessment/generate` | POST | Generate quiz |
| `/api/viva/session` | POST | Start viva session |
| `/api/tts/synthesize` | POST | Text-to-speech |

---

## 📄 License

MIT
