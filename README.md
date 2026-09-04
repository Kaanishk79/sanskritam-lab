<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/bs21082010/sanskrit/master/client/public/favicon.svg">
</picture>

# संस्कृतम् — SanskritLab

**Bridging deep historical research with modern education, powered by high-performance WebAssembly technology.**

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
| **Frontend** | React 19, JavaScript (JSX), Vite, React Router |
| **WASM Core** | Rust (`wasm-bindgen`), compiled to `wasm32-unknown-unknown` |
| **Backend (Rust)** | Actix-web, Serde, Tesseract OCR |
| **Desktop** | PySide6 (Python) |
| **Hosting** | Netlify (Static SPA + WebAssembly) |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Rust & `wasm32-unknown-unknown` target (for compiling WASM engine)
- Python 3.10+ & PySide6 (for desktop app)

### Frontend (React + WASM)

```bash
cd client
npm install
npm run dev        # starts local dev server at http://localhost:5173
npm run build      # production build → dist/ (Netlify ready)
```

### Compiling Rust to WebAssembly

To compile the high-performance Rust grammar and dictionary engine to WebAssembly:

```bash
cd backend/rust
rustup target add wasm32-unknown-unknown
cargo build --target wasm32-unknown-unknown
copy target\wasm32-unknown-unknown\debug\sanskrit_lab_backend.wasm ..\..\client\public\wasm\
```

### Deploying to Netlify

SanskritLab is fully pre-configured for **Netlify static hosting**:
1. Connect your repository to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. The included `netlify.toml` handles SPA routing (`/* -> /index.html 200`) automatically.

---

## 📁 Project Structure

```
SanskritLab/
├── client/                    # React + JavaScript (JSX) + Vite
├── netlify.toml               # Netlify hosting configuration
├── public/
│   └── wasm/                  # Compiled Rust WebAssembly binaries
├── src/
│   ├── components/            # Shared UI (Layout, etc.)
│   ├── pages/                 # UI Views (Dashboard, Tools, Viva, Research)
│   ├── services/              # WASM Engine, Supabase, Sanskrit logic
│   └── data/                  # Lessons & curriculum data
├── backend/
│   └── rust/                  # Rust engine (Server mode & WASM target)
├── desktop/                   # PySide6 multi-window desktop app
├── run.bat                    # One-click Windows launcher
└── README.md
```

---

## 📄 License

MIT
