import { supabase, SUPABASE_URL, SUPABASE_ANON_KEY } from "./supabase";
import { schoolStore } from "./localStore";

// Hybrid Schools API: Supabase-first for cross-PC syncing with seamless local fallback

async function remoteApi(path, opts = {}) {
  // If placeholder URL, skip network and go straight to local fallback
  if (!SUPABASE_URL || SUPABASE_URL.includes("placeholder-url")) {
    throw new Error("Supabase URL unconfigured, use local fallback");
  }

  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData?.session?.access_token;
  const res = await fetch(`${SUPABASE_URL}/functions/v1/schools${path}`, {
    method: opts.method || "GET",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: opts.body ? JSON.stringify(opts.body) : void 0
  });

  const payload = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(payload?.detail || payload?.message || `Request failed (${res.status})`);
  }
  return payload;
}

const schoolsApi = {
  list: async (params = {}) => {
    try {
      const res = await remoteApi("/?" + new URLSearchParams({ size: "100", ...params }).toString());
      return res;
    } catch {
      let list = schoolStore.list();
      if (params.owner_email) {
        list = list.filter((s) => s.owner_email?.toLowerCase() === params.owner_email.toLowerCase());
      }
      return { data: list };
    }
  },

  findMy: async (ownerEmail) => {
    try {
      const r = await schoolsApi.list({ owner_email: ownerEmail });
      return r.data?.[0] || null;
    } catch {
      return schoolStore.findMy(ownerEmail);
    }
  },

  get: async (id) => {
    try {
      const res = await remoteApi(`/${id}`);
      return res.data;
    } catch {
      return schoolStore.get(id);
    }
  },

  create: async (body) => {
    try {
      const res = await remoteApi("/", { method: "POST", body });
      if (res?.data) {
        schoolStore.create({ ...res.data, ...body });
        return res.data;
      }
    } catch (e) {
      console.warn("[schoolsApi] Remote create failed, using local store:", e.message);
    }
    return schoolStore.create(body);
  },

  update: async (id, body) => {
    try {
      const res = await remoteApi(`/${id}`, { method: "PATCH", body });
      schoolStore.update(id, body);
      return res.data;
    } catch {
      return schoolStore.update(id, body);
    }
  },

  deactivate: async (id) => {
    try {
      await remoteApi(`/${id}`, { method: "DELETE" });
    } catch {
      // ignore
    }
    return schoolStore.update(id, { status: "inactive" });
  },

  claim: async (id) => {
    try {
      const res = await remoteApi(`/${id}`, { method: "POST" });
      return res.data;
    } catch {
      return schoolStore.get(id);
    }
  },

  listClasses: async (schoolId) => {
    try {
      const res = await remoteApi(`/${schoolId}/classes`);
      return res.data;
    } catch {
      return schoolStore.classes.list(schoolId);
    }
  },

  createClass: async (schoolId, name) => {
    try {
      const res = await remoteApi(`/${schoolId}/classes`, { method: "POST", body: { name } });
      if (res?.data) return res.data;
    } catch {
      // fallback
    }
    return schoolStore.classes.create(schoolId, name);
  },

  deactivateClass: async (schoolId, classId) => {
    try {
      await remoteApi(`/${schoolId}/classes/${classId}`, { method: "DELETE" });
    } catch {
      // fallback
    }
    const list = schoolStore.classes.list(schoolId).filter((c) => c.id !== classId);
    localStorage.setItem(`sanskritlab-local-classes-${schoolId}`, JSON.stringify(list));
    return true;
  },

  createSection: async (schoolId, classId, name) => {
    try {
      const res = await remoteApi(`/${schoolId}/classes/${classId}/sections`, { method: "POST", body: { name } });
      if (res?.data) return res.data;
    } catch {
      // fallback
    }
    return schoolStore.classes.list(schoolId);
  },

  deactivateSection: async (schoolId, classId, sectionId) => {
    try {
      await remoteApi(`/${schoolId}/classes/${classId}/sections/${sectionId}`, { method: "DELETE" });
    } catch {
      // fallback
    }
    return true;
  },

  listStudents: async (schoolId, params = {}) => {
    try {
      const res = await remoteApi(`/${schoolId}/students?` + new URLSearchParams(params).toString());
      return res;
    } catch {
      return { data: schoolStore.students.list(schoolId) };
    }
  },

  createStudent: async (schoolId, body) => {
    try {
      const res = await remoteApi(`/${schoolId}/students`, { method: "POST", body });
      if (res?.data) return res.data;
    } catch {
      // fallback
    }
    return schoolStore.students.create(schoolId, body);
  },

  updateStudent: async (schoolId, studentId, body) => {
    try {
      const res = await remoteApi(`/${schoolId}/students/${studentId}`, { method: "PATCH", body });
      if (res?.data) return res.data;
    } catch {
      // fallback
    }
    return schoolStore.students.list(schoolId).find((s) => s.id === studentId) || null;
  },

  deactivateStudent: async (schoolId, studentId) => {
    try {
      await remoteApi(`/${schoolId}/students/${studentId}`, { method: "DELETE" });
    } catch {
      // fallback
    }
    return true;
  },

  listTeachers: async (schoolId) => {
    try {
      const res = await remoteApi(`/${schoolId}/teachers`);
      return res.data;
    } catch {
      return schoolStore.teachers.list(schoolId);
    }
  },

  createTeacher: async (schoolId, body) => {
    try {
      const res = await remoteApi(`/${schoolId}/teachers`, { method: "POST", body });
      if (res?.data) return res.data;
    } catch {
      // fallback
    }
    return schoolStore.teachers.create(schoolId, body);
  },

  deactivateTeacher: async (schoolId, teacherId) => {
    try {
      await remoteApi(`/${schoolId}/teachers/${teacherId}`, { method: "DELETE" });
    } catch {
      // fallback
    }
    return true;
  },

  joinLab: async (schoolCode, labCode) => {
    try {
      const res = await remoteApi("/join-lab", { method: "POST", body: { school_code: schoolCode, lab_code: labCode } });
      return res.data;
    } catch {
      const school = schoolStore.list().find(
        (s) => s.school_code === schoolCode || s.lab_code === labCode
      );
      if (!school) throw new Error("Invalid school or lab code");
      return school;
    }
  },

  resolveLogin: async (login) => {
    try {
      const res = await remoteApi("/resolve-login", { method: "POST", body: { login } });
      return res.data;
    } catch {
      const school = schoolStore.list().find(
        (s) => s.school_code === login || s.name.toLowerCase() === login.toLowerCase()
      );
      return school || null;
    }
  },

  teacherRegister: async (schoolId, body) => {
    try {
      const res = await remoteApi(`/${schoolId}/teacher-register`, { method: "POST", body });
      return res.data;
    } catch {
      return schoolStore.teachers.create(schoolId, body);
    }
  },

  getSettings: async (schoolId) => {
    try {
      const res = await remoteApi(`/${schoolId}/settings`);
      return res.data;
    } catch {
      const school = schoolStore.get(schoolId);
      return school?.settings || { pronunciation_feedback: true, allow_student_recording: true };
    }
  },

  putSettings: async (schoolId, body) => {
    try {
      const res = await remoteApi(`/${schoolId}/settings`, { method: "PUT", body });
      return res.data;
    } catch {
      const school = schoolStore.get(schoolId);
      if (school) {
        school.settings = { ...(school.settings || {}), ...body };
        schoolStore.update(schoolId, { settings: school.settings });
      }
      return school?.settings;
    }
  }
};

export { schoolsApi };
