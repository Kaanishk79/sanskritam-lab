const STORAGE_KEY = "sanskritlab-progress";
const initialSkills = {
  "skill-alphabet": { id: "skill-alphabet", name: "Alphabet", description: "Master Devan\u0101gar\u012B letters", icon: "alphabet", unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ["alphabet-vowels", "alphabet-consonants"] },
  "skill-vocab-basics": { id: "skill-vocab-basics", name: "Basic Vocabulary", description: "First 50 Sanskrit words \u2014 family, nature, body, food, directions", icon: "vocab", unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ["simple-words", "everyday-vocab", "numbers-colors"] },
  "skill-syntax": { id: "skill-syntax", name: "Sentence Structure", description: "SOV order, adjective agreement, relative clauses", icon: "syntax", unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ["basic-sentences", "relative-clauses"] },
  "skill-conjugation": { id: "skill-conjugation", name: "Verb Conjugation", description: "Tenses: present, imperfect, future, perfect \u2014 9 forms each", icon: "conjugation", unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ["verb-conjugation"] },
  "skill-declensions": { id: "skill-declensions", name: "Declensions", description: "8 cases across 3 genders, 3 numbers", icon: "declensions", unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ["declensions", "declensions-practice"] },
  "skill-sandhi": { id: "skill-sandhi", name: "Sandhi", description: "Sound merger rules: Gu\u1E47a, V\u1E5Bddhi, Ya\u1E47, Visarga", icon: "sandhi", unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ["sandhi-rules"] },
  "skill-compounds": { id: "skill-compounds", name: "Compounds", description: "Sam\u0101sa types: Tatpuru\u1E63a, Bahuvr\u012Bhi, Dvandva, Avyay\u012Bbh\u0101va", icon: "compounds", unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ["compounds", "avyayibhava"] },
  "skill-grammar": { id: "skill-grammar", name: "Advanced Grammar", description: "K\u1E5Bdanta & Taddhita: primary & secondary derivatives", icon: "grammar", unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ["krdanta", "taddhita"] },
  "skill-classical-texts": { id: "skill-classical-texts", name: "Classical Texts", description: "K\u0101lid\u0101sa, Vy\u0101sa, Bhavabh\u016Bti, Da\u1E47\u1E0Din", icon: "manuscript", unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ["kalidasa", "kalidasa-works"] },
  "skill-philosophy": { id: "skill-philosophy", name: "Philosophy", description: "Ny\u0101ya, S\u0101\u1E45khya, Yoga, Ved\u0101nta, M\u012Bm\u0101\u1E43s\u0101", icon: "philosophy", unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ["nyaya-intro", "sankhya", "yoga-sutra", "upanishad"] },
  "skill-critical-edition": { id: "skill-critical-edition", name: "Textual Criticism", description: "Stemmatics, recension, emendation, critical apparatus", icon: "grammar", unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ["textual-criticism", "lexicography"] },
  "skill-paleography": { id: "skill-paleography", name: "Paleography", description: "Br\u0101hm\u012B, Gupta, Siddham\u0101t\u1E5Bk\u0101, N\u0101gar\u012B, Grantha scripts", icon: "paleography", unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ["paleography", "manuscript-studies"] },
  "skill-phd-research": { id: "skill-phd-research", name: "PhD Research", description: "Critical edition preparation, publication ethics, thesis writing", icon: "temple", unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ["critical-edition", "critical-edition-theory", "digital-humanities", "publication"] }
};
function getDefaultProgress() {
  return {
    completedLessons: [],
    quizScores: {},
    currentLevel: 0,
    currentTrack: "child",
    currentGovClass: "class-1-2",
    streak: 0,
    xp: 0,
    skills: { ...initialSkills }
  };
}
function loadProgress() {
  try {
    const storage = typeof window !== "undefined" ? window.localStorage : null;
    const raw = storage?.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return getDefaultProgress();
}
function saveProgress(p) {
  try {
    const storage = typeof window !== "undefined" ? window.localStorage : null;
    storage?.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
  }
}
function getLevelForTrack(track) {
  const map = {
    child: [0, 1],
    teen: [1, 2, 3],
    undergrad: [2, 3, 4],
    graduate: [3, 4, 5],
    phd: [5, 6]
  };
  return map[track];
}
function getLevelLabel(level) {
  const labels = ["Alphabet", "Vocabulary", "Grammar", "Advanced Grammar", "Classical Texts", "Research", "Critical Edition"];
  return labels[level] ?? "Unknown";
}
function calculateXP(quizScore, difficulty) {
  return Math.round(quizScore * 10 * (1 + difficulty * 0.5));
}
function updateProgress(progress, lessonId, quizScore, difficulty) {
  const p = { ...progress };
  const earned = calculateXP(quizScore, difficulty);
  if (!p.completedLessons.includes(lessonId)) {
    p.completedLessons = [...p.completedLessons, lessonId];
  }
  p.quizScores[lessonId] = quizScore;
  p.xp += earned;
  p.streak = quizScore >= 0.6 ? p.streak + 1 : 0;
  for (const skill of Object.values(p.skills)) {
    if (skill.lessonIds.includes(lessonId)) {
      const completed = skill.lessonIds.filter((id) => p.completedLessons.includes(id)).length;
      skill.progress = Math.round(completed / skill.lessonIds.length * 100);
      if (skill.progress >= 80) skill.completed = true;
    }
  }
  for (const skill of Object.values(p.skills)) {
    if (!skill.unlocked && skill.prerequisites.every((pre) => {
      const preSkill = p.skills[pre];
      return preSkill?.completed ?? false;
    })) {
      const preLessons = skill.prerequisites.flatMap((pre) => p.skills[pre]?.lessonIds ?? []);
      if (preLessons.every((id) => p.completedLessons.includes(id))) {
        skill.unlocked = true;
      }
    }
  }
  saveProgress(p);
  return p;
}
function getRecommendedTrack(xp) {
  if (xp < 50) return "child";
  if (xp < 200) return "teen";
  if (xp < 500) return "undergrad";
  if (xp < 1e3) return "graduate";
  return "phd";
}
export {
  calculateXP,
  getDefaultProgress,
  getLevelForTrack,
  getLevelLabel,
  getRecommendedTrack,
  loadProgress,
  saveProgress,
  updateProgress
};
