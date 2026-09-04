const STORAGE_KEY = "sanskrit-jeopardy-custom";
function loadCustomQuizzes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
  }
  return [];
}
function persistCustomQuizzes(quizzes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
  } catch {
  }
}
function makeCustomQuizId() {
  return "qz-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);
}
function validateQuiz(q) {
  if (!q.name.trim()) return "name";
  if (q.categories.length < 3) return "categories-min";
  for (const cat of q.categories) {
    if (!cat.name.trim()) return "category-name";
    if (cat.clues.length < 3) return "clues-min";
    for (const c of cat.clues) {
      if (!c.clue.trim() || !c.answer.trim()) return "clue-empty";
    }
  }
  return null;
}
export {
  loadCustomQuizzes,
  makeCustomQuizId,
  persistCustomQuizzes,
  validateQuiz
};
