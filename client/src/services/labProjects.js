const PROJECTS_KEY = "sanskrit-lab-projects";
const PROFILE_KEY = "sanskrit-lab-profile";
const SUBMISSIONS_KEY = "sanskrit-lab-submissions";
const labClasses = [
  "Class 1-2",
  "Class 3-5",
  "Class 6 (NCERT)",
  "Class 7 (NCERT)",
  "Class 8 (NCERT)",
  "Class 9 (NCERT)",
  "Class 10 (NCERT)",
  "Class 11 (NCERT)",
  "Class 12 (NCERT)",
  "BA 1st Year (Govt)",
  "BA 2nd Year (Govt)",
  "BA 3rd Year (Govt)",
  "MA Previous (Govt)",
  "MA Final (Govt)",
  "MPhil (Govt)",
  "PhD (Govt)"
];
const defaultProfile = () => ({ mode: "individual", role: "student", className: "Class 6 (NCERT)", ownerName: "" });
function loadProjects() {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return [];
}
function saveProjects(projects) {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  } catch {
  }
}
function loadProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) return { ...defaultProfile(), ...JSON.parse(raw) };
  } catch {
  }
  return defaultProfile();
}
function saveProfile(p) {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
  } catch {
  }
}
function loadSubmissions() {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return [];
}
function saveSubmissions(s) {
  try {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(s));
  } catch {
  }
}
function newProjectId() {
  return "p-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
function makeProject(title, owner, mode, targetClass, dueDate, content) {
  return { id: newProjectId(), title, owner, mode, targetClass, dueDate, createdAt: (/* @__PURE__ */ new Date()).toISOString(), content };
}
export {
  labClasses,
  loadProfile,
  loadProjects,
  loadSubmissions,
  makeProject,
  newProjectId,
  saveProfile,
  saveProjects,
  saveSubmissions
};
