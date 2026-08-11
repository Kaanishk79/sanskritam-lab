import { supabase, SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase'

export interface School {
  id: string
  name: string
  short_code: string | null
  udise_code: string | null
  cbse_affiliation_no: string | null
  school_type: string | null
  board: string | null
  medium: string | null
  affiliation_status: string | null
  address: string | null
  city: string | null
  district: string | null
  state: string | null
  pincode: string | null
  phone: string | null
  email: string | null
  website: string | null
  principal_name: string | null
  owner_id: string | null
  owner_email: string | null
  source: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Teacher {
  id: string
  school_id: string
  teacher_code: string | null
  name: string
  email: string | null
  phone: string | null
  designation: string | null
  subjects: string[] | string | null
  qualification: string | null
  joining_date: string | null
  status: string | null
  created_at: string
}

export interface Student {
  id: string
  school_id: string
  class_id: string | null
  section_id: string | null
  admission_no: string | null
  roll_no: string | null
  name: string
  gender: string | null
  date_of_birth: string | null
  admission_date: string | null
  father_name: string | null
  mother_name: string | null
  phone: string | null
  address: string | null
  status: string | null
  is_active: boolean
  created_at: string
}

export interface Section {
  id: string
  class_id: string
  name: string
  student_count: number
  is_active: boolean
  created_at: string
  students?: Student[]
}

export interface SchoolClass {
  id: string
  school_id: string
  name: string
  class_teacher_id: string | null
  is_active: boolean
  created_at: string
  sections?: Section[]
}

export interface SchoolSettings {
  school_id: string
  branding: Record<string, unknown> | null
  features: Record<string, unknown> | null
  curriculum: Record<string, unknown> | null
}

export interface SchoolDetail extends School {
  settings: SchoolSettings | null
  teacher_count: number
  student_count: number
  teachers: Teacher[]
  classes: SchoolClass[]
}

async function api<T>(path: string, opts: { method?: string; body?: unknown } = {}): Promise<T> {
  const { data: sessionData } = await supabase.auth.getSession()
  const res = await fetch(`${SUPABASE_URL}/functions/v1/schools${path}`, {
    method: opts.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
      ...(sessionData?.session?.access_token
        ? { Authorization: `Bearer ${sessionData.session.access_token}` }
        : {}),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  })
  const payload = await res.json().catch(() => null)
  if (!res.ok) {
    throw new Error(payload?.detail || payload?.message || `Request failed (${res.status})`)
  }
  return payload as T
}

export const schoolsApi = {
  list: (params: Record<string, string> = {}) =>
    api<{ data: School[]; count: number }>(
      '/?' + new URLSearchParams({ size: '100', ...params }).toString(),
    ),
  findMy: (ownerEmail: string) => schoolsApi.list({ owner_email: ownerEmail }).then((r) => r.data[0] || null),
  get: (id: string) => api<{ data: SchoolDetail }>(`/${id}`).then((r) => r.data),
  create: (body: Record<string, unknown>) =>
    api<{ data: School }>('/', { method: 'POST', body }).then((r) => r.data),
  update: (id: string, body: Record<string, unknown>) =>
    api<{ data: School }>(`/${id}`, { method: 'PATCH', body }).then((r) => r.data),
  deactivate: (id: string) => api<{ data: { id: string } }>(`/${id}`, { method: 'DELETE' }),

  listClasses: (schoolId: string) =>
    api<{ data: SchoolClass[] }>(`/${schoolId}/classes`).then((r) => r.data),
  createClass: (schoolId: string, name: string) =>
    api<{ data: SchoolClass }>(`/${schoolId}/classes`, { method: 'POST', body: { name } }).then((r) => r.data),
  deactivateClass: (schoolId: string, classId: string) =>
    api<{ data: { id: string } }>(`/${schoolId}/classes/${classId}`, { method: 'DELETE' }),

  createSection: (schoolId: string, classId: string, name: string) =>
    api<{ data: Section }>(`/${schoolId}/classes/${classId}/sections`, { method: 'POST', body: { name } }).then((r) => r.data),
  deactivateSection: (schoolId: string, classId: string, sectionId: string) =>
    api<{ data: { id: string } }>(`/${schoolId}/classes/${classId}/sections/${sectionId}`, { method: 'DELETE' }),

  listStudents: (schoolId: string, params: Record<string, string> = {}) =>
    api<{ data: Student[]; count: number }>(`/${schoolId}/students?` + new URLSearchParams(params).toString()),
  createStudent: (schoolId: string, body: Record<string, unknown>) =>
    api<{ data: Student }>(`/${schoolId}/students`, { method: 'POST', body }).then((r) => r.data),
  updateStudent: (schoolId: string, studentId: string, body: Record<string, unknown>) =>
    api<{ data: Student }>(`/${schoolId}/students/${studentId}`, { method: 'PATCH', body }).then((r) => r.data),
  deactivateStudent: (schoolId: string, studentId: string) =>
    api<{ data: { id: string } }>(`/${schoolId}/students/${studentId}`, { method: 'DELETE' }),

  listTeachers: (schoolId: string) =>
    api<{ data: Teacher[] }>(`/${schoolId}/teachers`).then((r) => r.data),
  createTeacher: (schoolId: string, body: Record<string, unknown>) =>
    api<{ data: Teacher }>(`/${schoolId}/teachers`, { method: 'POST', body }).then((r) => r.data),
  deactivateTeacher: (schoolId: string, teacherId: string) =>
    api<{ data: { id: string } }>(`/${schoolId}/teachers/${teacherId}`, { method: 'DELETE' }),

  getSettings: (schoolId: string) =>
    api<{ data: SchoolSettings | null }>(`/${schoolId}/settings`).then((r) => r.data),
  putSettings: (schoolId: string, body: Record<string, unknown>) =>
    api<{ data: SchoolSettings }>(`/${schoolId}/settings`, { method: 'PUT', body }).then((r) => r.data),
}
