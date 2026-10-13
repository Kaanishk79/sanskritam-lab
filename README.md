<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/bs21082010/sanskrit/master/client/public/favicon.svg">
</picture>

# संस्कृतम् — SanskritLab

**Bridging deep historical research with modern education, powered by high-performance native backend technology and offline-first linguistic engines.**

SanskritLab is an interactive, full-stack platform for Sanskrit studies spanning manuscript digitization, 3D visualization, adaptive learning, and AI-powered assessment — from **child-friendly play modes** to **PhD-level critical edition tools**.

---

## Key Features

### 🔍 Sanskrit Khoj (संस्कृत खोज — Universal Search)
- **Offline-First Multi-Entity Engine**: Instant cross-domain search across lexicons, literature, grammar, and philosophy without requiring cloud connectivity.
- **Monier-Williams Lexicon**: Over ~60,000 entries with exact and fuzzy matching across Devanāgarī, IAST transliteration, and English definitions.
- **Categorized Discovery**:
  - 📖 **शब्दकोश (Dictionary)**: Comprehensive Sanskrit-English lexical entries.
  - 🎓 **पाठाः (Lessons)**: Graded curriculum lessons, vocabulary, and grammar concepts.
  - 🕉️ **श्लोकाः (Shlokas)**: Sacred verses, meter, translations, and word-by-word breakdowns.
  - 📜 **ग्रन्थाः (Texts)**: Classical literature including the Bhagavad Gītā, Rāmāyaṇa, Hitopadeśa, and Meghadūta.
  - ⚡ **धातवः (Dhātus)**: Sanskrit verbal roots with gaṇa (class) and meaning.
  - 🧠 **सङ्कल्पनाः (Concepts)**: Key philosophical terms and darśana concepts.
- **Quick Query Chips & Category Filters**: One-click filters and suggestions for rapid exploration.

### 📖 Sanskrit Dictionary & Varna Lexicon (वर्णाक्रमेण सम्पूर्ण शब्दकोशः)
- **All 59,995 Words Accessible**: Full offline browsing across the complete Monier-Williams Sanskrit-English lexicon without artificial truncation.
- **Categorization by Starting Varn (वर्ण)**:
  - **स्वराः (Vowels)**: `अ` (10.9k), `आ` (2.8k), `इ`, `ई`, `उ` (3.4k), `ऊ`, `ऋ`, `ऌ`, `ए`, `ऐ`, `ओ`, `औ`
  - **क-वर्गः (Velars)**: `क` (4.5k), `ख`, `ग` (1.3k), `घ`, `ङ`
  - **च-वर्गः (Palatals)**: `च` (1.1k), `छ`, `ज`, `झ`, `ञ`
  - **ट-वर्गः (Retroflex)**: `ट`, `ठ`, `ड`, `ढ`, `ण`
  - **त-वर्गः (Dentals)**: `त` (1.4k), `थ`, `द` (1.2k), `ध`, `न` (1.6k)
  - **प-वर्गः (Labials)**: `प` (5.1k), `फ`, `ब`, `भ` (1.1k), `म` (2.4k)
  - **अन्तःस्थाः (Semivowels)**: `य`, `र` (1.1k), `ल`, `व` (5.1k)
  - **ऊष्माणः (Sibilants & Aspirate)**: `श` (2.4k), `ष`, `स` (6.8k), `ह` (1.0k)
- **High-Performance Navigation**: Instant phonetic group tabs, letter pill buttons with live word counts, responsive pagination (30/60/120/240 per page), direct sub-search within letters, and audio pronunciation.

### 🕉️ Dedicated Shloka Tool Page: संस्कृत श्लोकाः (`/tools/shloka`)
- **70+ Authenticated Verses with Full Meanings**: Classical shlokas with Devanāgarī, Roman IAST transliteration, English translation, Hindi translation, word-by-word padachheda, and audio recitation.
- **Dedicated "By Book" (ग्रन्थानुरूपम्) Browser**:
  - 📜 **श्रीमद्भगवद्गीता (Bhagavad Gītā)** (14 verses on karma, atman, dharma, and devotion)
  - 🏹 **वाल्मीकि रामायणम् (Vālmīki Rāmāyaṇa)** (6 verses including the Ādi-śloka, virtue of Rama, and patriotism)
  - ☀️ **उपनिषदः (The Upaniṣads)** (10 verses from Īśā, Bṛhadāraṇyaka, Kaṭha, Muṇḍaka, and Taittirīya)
  - 🕊️ **वेदाः (The Vedas)** (6 sacred hymns from Ṛgveda and Yajurveda including Gāyatrī, Mahāmṛtyuñjaya, and Saṃjñāna)
  - 🌿 **हितोपदेशः (Hitopadeśa)** (5 verses on humility, knowledge, true friendship, and enterprise)
  - 🦁 **पञ्चतन्त्रम् (Pañcatantra)** (5 verses on intellect, prudence, deliberate action, and friendship)
  - 👑 **नीतिशतकम् (Bhartṛhari's Nītiśatakam)** (6 verses on learning, modesty, speech as eternal ornament, and perseverance)
  - ⚖️ **चाणक्यनीतिः (Cāṇakya Nīti)** (7 verses on scholarship, equality, discipline, and daily wisdom)
  - 🏛️ **महाभारतम् एवं विदुरनीतिः (Mahābhārata & Vidura Nīti)** (5 verses on non-violence, sage qualities, and virtue)
  - 🌸 **स्तोत्राणि सुभाषितानि च (Classical Stotras & Prayers)** (7 daily verses including Gaṇeśa, Sarasvatī, and Guru invocations)
- **Interactive Sanskrit Exploration**: Click any word in any verse to inspect its root, grammar, and Monier-Williams definition in the Explore Panel.



### 🔬 Research & Digitization Suite
- **Manuscript OCR** — Convert scanned Devanāgarī & Grantha manuscripts to Unicode text.
- **Smart Corpus** — Searchable library of texts by historical period with semantic exploration.
- **Layered Annotation** — Multi-level notes (grammar, translation, commentary) on classical passages.
- **PhD Research Workspace** — Side-by-side manuscript collation, critical apparatus generation, and paleographic script comparison.

### 🏺 3D Interactive Visualization
- **3D Palm-Leaf Manuscript Viewer** — Rotate, inspect, and read textured palm-leaf manuscript models with interactive overlays.
- **Grammar Maps** — Pāṇini's Aṣṭādhyāyī rules displayed as branching rule networks.
- **Philosophy Networks** — Visual connections across Nyāya, Vedānta, and Mīmāṃsā traditions.
- **Evolutionary Timeline** — 3,000 years of Sanskrit linguistic and literary development.

### 📚 Adaptive Learning (Child → PhD)
| Track | Target Audience | Levels | Focus |
|-------|-----------------|--------|-------|
| **Child** | Ages 5–12 | 0–1 | Alphabet flashcards, picture-word matching, games |
| **Teen** | Ages 13–17 | 1–3 | Declensions, verb conjugations, sandhi, exam prep |
| **Undergrad** | Ages 18–22 | 2–4 | Classical texts, darśanas, advanced grammar |
| **Graduate** | MA / MPhil | 3–5 | Textual criticism, paleography, philosophical systems |
| **PhD** | Researchers | 5–6 | Critical editions, variant apparatus, publication |

- **Skill Tree** — XP tracking, streaks, prerequisites, and milestone unlockables.
- **Interactive Lesson Reader** — Step-by-step units with Devanāgarī, transliteration, and audio pronunciation.
- **Jeopardy & Quiz Arena** — Real-time interactive quizzes with instant explanations.

### 🏫 Teaching & Assessment
- **Teacher Dashboard** — Lesson planning, student progress tracking, and classroom management.
- **Assessment Engine** — Auto-generated drills for vibhakti declensions, sandhi splitting, and vocabulary.
- **Viva Simulator** — AI oral examiner for speech and text practice.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, JavaScript (JSX), Vite, React Router, Lucide Icons |
| **Lexical Engine** | Client-side indexed 60,000-word Monier-Williams JSON database |
| **Backend (Rust)** | Actix-web 4, Serde, Tokio, CORS |
| **Desktop** | PySide6 (Python 3.10+) |
| **Hosting** | Netlify (Static SPA) + Local / Hosted Rust Engine |

---

## Quick Start

### Prerequisites
- **Node.js 20+**
- **Rust & Cargo** (for native backend engine)
- **Python 3.10+** (optional, for PySide6 desktop app)

### One-Click Windows Startup
Simply run:
```cmd
run.bat
```
This automatically sets up frontend dependencies if needed, launches the high-performance Rust backend on `http://127.0.0.1:8080`, starts the Vite frontend on `http://localhost:5173`, and opens your default browser.

### Running Manually

#### Backend (Rust Actix-Web Server)
```bash
cd backend/rust
cargo run          # starts native REST API on http://127.0.0.1:8080
```

#### Frontend (React + Vite)
```bash
cd client
npm install
npm run dev        # starts local dev server at http://localhost:5173
npm run test       # runs unit test suite
npm run build      # creates production bundle in client/dist/
```

### Deploying to Netlify
The frontend is configured for zero-config Netlify SPA hosting:
1. Connect your repository to Netlify.
2. **Build command**: `npm run build`
3. **Publish directory**: `client/dist`
4. The included `netlify.toml` automatically handles client-side routing (`/* -> /index.html 200`).

---

## Project Structure

```
SanskritLab/
├── Assets/                    # Institutional hero banners and graphic assets
├── client/                    # React + JavaScript (JSX) + Vite frontend
│   ├── public/                # Favicons, web manifest, static PDFs/books
│   ├── src/
│   │   ├── components/        # Shared components (Header, Footer, ExplorePanel, Layout)
│   │   ├── pages/             # Pages (SearchPage, LessonPage, Jeopardy, Tools, Dashboard)
│   │   ├── services/          # Multi-entity searchAll engine, API client, Supabase
│   │   ├── data/              # Monier-Williams lexicon (~60k words), lessons, books, shlokas
│   │   └── __tests__/         # Vitest unit test suite (54+ automated tests)
├── backend/
│   └── rust/                  # High-performance native Rust engine (Actix-Web)
├── desktop/                   # PySide6 desktop application
├── run.bat                    # One-click Windows development launcher
├── ARCHITECTURE.md            # Comprehensive system architecture & technical stack
└── README.md                  # Project documentation
```

For complete technical specifications, data pipelines, and component diagrams, see **[ARCHITECTURE.md](file:///d:/Projects/sanskrit/ARCHITECTURE.md)**.


---

## Affiliations & Learning Resources

- 🏫 **[Sainik School Ambikapur](https://sainikschoolambikapur.org.in)** — Educational collaboration & institutional outreach.
- 📺 **[Sanskrit Online Pathshala](https://www.youtube.com/@sourabhjain32)** — Video lectures, shloka tutorials, and grammar walk-throughs.

---

## License

MIT

