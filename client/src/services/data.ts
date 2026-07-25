import { supabase } from './supabase'
import { lessons as localLessons } from '../data/lessons'
import { tracks as localTracks } from '../data/tracks'
import type { Lesson, Track, Level, TrackInfo } from '../types/curriculum'

const hasSupabase = () => !!import.meta.env.VITE_SUPABASE_URL

// ─── TRACKS ───
export async function fetchTracks(): Promise<TrackInfo[]> {
  if (!hasSupabase()) return localTracks
  const { data } = await supabase.from('tracks').select('*').order('sort_order')
  if (data && data.length > 0) {
    return data.map((t: Record<string, unknown>) => ({
      id: t.id as Track,
      label: t.label as string,
      icon: t.icon as string,
      description: t.description as string,
      color: t.color as string,
      ageRange: (t.age_range as string) ?? '',
      levels: [t.min_level as Level, t.max_level as Level],
    }))
  }
  return localTracks
}

// ─── LESSONS ───
export async function fetchLessons(level?: number): Promise<Lesson[]> {
  if (!hasSupabase()) {
    return level !== undefined ? localLessons.filter((l) => l.level === level) : localLessons
  }
  let q = supabase.from('lessons').select('*').order('sort_order')
  if (level !== undefined) q = q.eq('level', level)
  const { data } = await q
  if (data && data.length > 0) {
    return data.map((l: Record<string, unknown>) => ({
      id: l.id as string,
      title: l.title as string,
      subtitle: l.subtitle as string,
      level: l.level as Level,
      track: l.track as Track,
      duration: l.duration as string,
      content: l.content as Lesson['content'],
      quiz: l.quiz as Lesson['quiz'],
      unlockables: l.unlockables as string[],
    }))
  }
  return level !== undefined ? localLessons.filter((l) => l.level === level) : localLessons
}

export async function fetchLesson(id: string): Promise<Lesson | null> {
  if (!hasSupabase()) return localLessons.find((l) => l.id === id) ?? null
  const { data } = await supabase.from('lessons').select('*').eq('id', id).single()
  if (data) {
    return {
      id: data.id,
      title: data.title,
      subtitle: data.subtitle,
      level: data.level,
      track: data.track,
      duration: data.duration,
      content: data.content,
      quiz: data.quiz,
      unlockables: data.unlockables,
    }
  }
  return localLessons.find((l) => l.id === id) ?? null
}

// ─── TEXTS ───
export async function fetchTexts() {
  if (!hasSupabase()) {
    return [
      { id: 'rv-1-1', title: 'Ṛgveda 1.1', author: 'Traditional', period: '1500-1200 BCE', content: 'अग्निमीळे पुरोहितं यज्ञस्य देवं रत्वीजम् । होतारं रत्नधातमम् ॥', language: 'Vedic Sanskrit' },
      { id: 'panini-1-1', title: 'Aṣṭādhyāyī 1.1', author: 'Pāṇini', period: '~500 BCE', content: 'वृद्धिरादैच् । अदेङ् गुणः ।', language: 'Classical Sanskrit' },
      { id: 'gita-2-47', title: 'Bhagavad Gītā 2.47', author: 'Vyāsa', period: '~200 BCE', content: 'मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥', language: 'Classical Sanskrit' },
    ]
  }
  const { data } = await supabase.from('texts').select('*').order('id')
  return data ?? []
}

// ─── DICTIONARY ───
export async function lookupWord(word: string) {
  if (!hasSupabase()) return null
  const { data } = await supabase.from('dictionary').select('*').ilike('word', word)
  return data?.[0] ?? null
}

// ─── USER PROGRESS ───
export async function fetchProgress(userId: string) {
  if (!hasSupabase()) return null
  const { data } = await supabase.from('user_progress').select('*').eq('user_id', userId).single()
  return data
}

export async function saveProgress(userId: string, data: Record<string, unknown>) {
  if (!hasSupabase()) return
  await supabase.from('user_progress').upsert({ user_id: userId, ...data })
}