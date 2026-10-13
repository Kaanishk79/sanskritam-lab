// Local-first persistent storage engine for SanskritLab
// Resolves auth, schools, classes, teachers, and learning progress completely locally.

const PREFIX = "sanskritlab-local-";

function getStorage() {
  if (typeof window !== "undefined" && window.localStorage) {
    return window.localStorage;
  }
  return null;
}

export function localGet(key, fallback = null) {
  try {
    const storage = getStorage();
    if (!storage) return fallback;
    const raw = storage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn(`[localStore] Failed to read ${key}:`, e);
    return fallback;
  }
}

export function localSet(key, value) {
  try {
    const storage = getStorage();
    if (!storage) return false;
    storage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn(`[localStore] Failed to write ${key}:`, e);
    return false;
  }
}

export function localRemove(key) {
  try {
    const storage = getStorage();
    if (!storage) return;
    storage.removeItem(PREFIX + key);
  } catch (e) {
    console.warn(`[localStore] Failed to remove ${key}:`, e);
  }
}

export function generateId(prefix = "id") {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// ---------------- USER & AUTH STORE ----------------

export const userStore = {
  list: () => localGet("users", []),
  getById: (id) => userStore.list().find((u) => u.id === id) || null,
  getByEmail: (email) => {
    if (!email) return null;
    const clean = email.toLowerCase().trim();
    return userStore.list().find((u) => u.email?.toLowerCase().trim() === clean) || null;
  },
  save: (user) => {
    const users = userStore.list();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx >= 0) {
      users[idx] = { ...users[idx], ...user, updated_at: new Date().toISOString() };
    } else {
      users.push({
        ...user,
        created_at: user.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
    localSet("users", users);
    return user;
  },
  getSession: () => localGet("session", null),
  setSession: (user) => {
    if (user) {
      localSet("session", user);
    } else {
      localRemove("session");
    }
  }
};

// ---------------- SCHOOLS & CLASSES STORE ----------------

export const schoolStore = {
  list: () => localGet("schools", []),
  get: (id) => schoolStore.list().find((s) => s.id === id) || null,
  findMy: (ownerEmail) => {
    if (!ownerEmail) return null;
    const clean = ownerEmail.toLowerCase().trim();
    return schoolStore.list().find((s) => s.owner_email?.toLowerCase().trim() === clean) || null;
  },
  create: (data) => {
    const schools = schoolStore.list();
    const id = generateId("school");
    const code = "SCH" + Math.random().toString(36).substring(2, 6).toUpperCase();
    const lab_code = "LAB" + Math.random().toString(36).substring(2, 6).toUpperCase();
    const newSchool = {
      id,
      name: data.name || "Sanskrit Vidyalaya",
      city: data.city || "",
      state: data.state || "",
      school_type: data.school_type || "Senior Secondary School",
      owner_email: data.owner_email || "",
      school_code: code,
      lab_code,
      created_at: new Date().toISOString(),
      settings: { pronunciation_feedback: true, allow_student_recording: true }
    };
    schools.push(newSchool);
    localSet("schools", schools);
    return newSchool;
  },
  update: (id, updates) => {
    const schools = schoolStore.list();
    const idx = schools.findIndex((s) => s.id === id);
    if (idx >= 0) {
      schools[idx] = { ...schools[idx], ...updates, updated_at: new Date().toISOString() };
      localSet("schools", schools);
      return schools[idx];
    }
    return null;
  },
  classes: {
    list: (schoolId) => localGet(`classes-${schoolId}`, []),
    create: (schoolId, name) => {
      const list = schoolStore.classes.list(schoolId);
      const newClass = {
        id: generateId("cls"),
        school_id: schoolId,
        name,
        created_at: new Date().toISOString(),
        sections: [{ id: generateId("sec"), name: "A" }]
      };
      list.push(newClass);
      localSet(`classes-${schoolId}`, list);
      return newClass;
    }
  },
  teachers: {
    list: (schoolId) => localGet(`teachers-${schoolId}`, []),
    create: (schoolId, data) => {
      const list = schoolStore.teachers.list(schoolId);
      const newTeacher = {
        id: generateId("tch"),
        school_id: schoolId,
        name: data.name || "Acharya",
        email: data.email || "",
        auth_username: data.auth_username || null,
        status: "active",
        created_at: new Date().toISOString()
      };
      list.push(newTeacher);
      localSet(`teachers-${schoolId}`, list);
      return newTeacher;
    }
  },
  students: {
    list: (schoolId) => localGet(`students-${schoolId}`, []),
    create: (schoolId, data) => {
      const list = schoolStore.students.list(schoolId);
      const newStudent = {
        id: generateId("stu"),
        school_id: schoolId,
        name: data.name || "Shishya",
        roll_number: data.roll_number || "",
        class_id: data.class_id || null,
        status: "active",
        created_at: new Date().toISOString()
      };
      list.push(newStudent);
      localSet(`students-${schoolId}`, list);
      return newStudent;
    }
  }
};
