import { supabase, SUPABASE_URL, SUPABASE_ANON_KEY } from "./supabase";
async function api(path, opts = {}) {
  const { data: sessionData } = await supabase.auth.getSession();
  const res = await fetch(`${SUPABASE_URL}/functions/v1/schools${path}`, {
    method: opts.method || "GET",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      ...sessionData?.session?.access_token ? { Authorization: `Bearer ${sessionData.session.access_token}` } : {}
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
  list: (params = {}) => api(
    "/?" + new URLSearchParams({ size: "100", ...params }).toString()
  ),
  findMy: (ownerEmail) => schoolsApi.list({ owner_email: ownerEmail }).then((r) => r.data[0] || null),
  get: (id) => api(`/${id}`).then((r) => r.data),
  create: (body) => api("/", { method: "POST", body }).then((r) => r.data),
  update: (id, body) => api(`/${id}`, { method: "PATCH", body }).then((r) => r.data),
  deactivate: (id) => api(`/${id}`, { method: "DELETE" }),
  claim: (id) => api(`/${id}`, { method: "POST" }).then((r) => r.data),
  listClasses: (schoolId) => api(`/${schoolId}/classes`).then((r) => r.data),
  createClass: (schoolId, name) => api(`/${schoolId}/classes`, { method: "POST", body: { name } }).then((r) => r.data),
  deactivateClass: (schoolId, classId) => api(`/${schoolId}/classes/${classId}`, { method: "DELETE" }),
  createSection: (schoolId, classId, name) => api(`/${schoolId}/classes/${classId}/sections`, { method: "POST", body: { name } }).then((r) => r.data),
  deactivateSection: (schoolId, classId, sectionId) => api(`/${schoolId}/classes/${classId}/sections/${sectionId}`, { method: "DELETE" }),
  listStudents: (schoolId, params = {}) => api(`/${schoolId}/students?` + new URLSearchParams(params).toString()),
  createStudent: (schoolId, body) => api(`/${schoolId}/students`, { method: "POST", body }).then((r) => r.data),
  updateStudent: (schoolId, studentId, body) => api(`/${schoolId}/students/${studentId}`, { method: "PATCH", body }).then((r) => r.data),
  deactivateStudent: (schoolId, studentId) => api(`/${schoolId}/students/${studentId}`, { method: "DELETE" }),
  listTeachers: (schoolId) => api(`/${schoolId}/teachers`).then((r) => r.data),
  createTeacher: (schoolId, body) => api(`/${schoolId}/teachers`, { method: "POST", body }).then((r) => r.data),
  deactivateTeacher: (schoolId, teacherId) => api(`/${schoolId}/teachers/${teacherId}`, { method: "DELETE" }),
  joinLab: (schoolCode, labCode) => api("/join-lab", { method: "POST", body: { school_code: schoolCode, lab_code: labCode } }).then((r) => r.data),
  resolveLogin: (login) => api("/resolve-login", { method: "POST", body: { login } }).then((r) => r.data),
  teacherRegister: (schoolId, body) => api(`/${schoolId}/teacher-register`, { method: "POST", body }).then((r) => r.data),
  getSettings: (schoolId) => api(`/${schoolId}/settings`).then((r) => r.data),
  putSettings: (schoolId, body) => api(`/${schoolId}/settings`, { method: "PUT", body }).then((r) => r.data)
};
export {
  schoolsApi
};
