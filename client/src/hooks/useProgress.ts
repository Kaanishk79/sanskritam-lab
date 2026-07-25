import { useState, useCallback } from 'react'
import type { UserProgress, Track } from '../types/curriculum'
import { loadProgress, saveProgress, updateProgress, getRecommendedTrack } from '../services/learning'
import { lessons } from '../data/lessons'

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress)

  const completeLesson = useCallback((lessonId: string, score: number, difficulty: number) => {
    setProgress((p) => updateProgress(p, lessonId, score, difficulty))
  }, [])

  const switchTrack = useCallback((track: Track) => {
    setProgress((p) => {
      const next = { ...p, currentTrack: track }
      saveProgress(next)
      return next
    })
  }, [])

  const resetProgress = useCallback(() => {
    const fresh = loadProgress()
    fresh.currentLevel = 0 as const
    fresh.currentTrack = 'child' as Track
    fresh.completedLessons = []
    fresh.quizScores = {}
    fresh.xp = 0
    fresh.streak = 0
    for (const s of Object.values(fresh.skills)) {
      s.unlocked = s.id === 'skill-alphabet' || s.id === 'skill-syntax'
      s.completed = false
      s.progress = 0
    }
    saveProgress(fresh)
    setProgress(fresh)
  }, [])

  const recommendedTrack = getRecommendedTrack(progress.xp)

  const availableLessons = lessons.filter((l) => {
    const trackLevels: Record<Track, number[]> = {
      child: [0, 1],
      teen: [1, 2, 3],
      undergrad: [2, 3, 4],
      graduate: [3, 4, 5],
      phd: [5, 6],
    }
    return trackLevels[progress.currentTrack]?.includes(l.level)
  })

  return { progress, completeLesson, switchTrack, resetProgress, recommendedTrack, availableLessons }
}