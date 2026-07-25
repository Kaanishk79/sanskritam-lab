/// <reference types="vitest/globals" />
import { describe, it, expect, beforeEach } from 'vitest'
import { getDefaultProgress, calculateXP, updateProgress, getRecommendedTrack, getLevelLabel, getLevelForTrack } from '../services/learning'
import type { Track, Level, UserProgress } from '../types/curriculum'

beforeEach(() => {
  localStorage.clear()
})

describe('getDefaultProgress', () => {
  it('returns initial progress with 0 XP', () => {
    const p = getDefaultProgress()
    expect(p.xp).toBe(0)
    expect(p.streak).toBe(0)
    expect(p.completedLessons).toEqual([])
    expect(p.currentTrack).toBe('child')
    expect(p.currentLevel).toBe(0)
  })

  it('has all 11 skills defined', () => {
    const p = getDefaultProgress()
    expect(Object.keys(p.skills)).toHaveLength(11)
    expect(p.skills['skill-alphabet']).toBeDefined()
    expect(p.skills['skill-phd-research']).toBeDefined()
  })

  it('starts with alphabet and syntax unlocked', () => {
    const p = getDefaultProgress()
    expect(p.skills['skill-alphabet'].unlocked).toBe(true)
    expect(p.skills['skill-syntax'].unlocked).toBe(true)
    expect(p.skills['skill-declensions'].unlocked).toBe(false)
  })
})

describe('calculateXP', () => {
  it('awards base XP for correct answers', () => {
    expect(calculateXP(1, 1)).toBe(15)
    expect(calculateXP(0.5, 1)).toBe(8)
  })

  it('scales with difficulty', () => {
    const easy = calculateXP(1, 1)
    const hard = calculateXP(1, 5)
    expect(hard).toBeGreaterThan(easy)
    expect(hard).toBe(35)
  })
})

describe('updateProgress', () => {
  function fresh(): UserProgress {
    const p = getDefaultProgress()
    p.skills['skill-alphabet'].unlocked = true
    p.skills['skill-alphabet'].lessonIds = ['l1']
    p.skills['skill-vocab-basics'].unlocked = true
    p.skills['skill-vocab-basics'].lessonIds = ['l2']
    return p
  }

  it('adds lesson to completed list and saves XP', () => {
    const p = fresh()
    const updated = updateProgress(p, 'l1', 1, 1)
    expect(updated.completedLessons).toContain('l1')
    expect(updated.xp).toBe(15)
  })

  it('increments streak when score >= 0.6', () => {
    const p = fresh()
    const u1 = updateProgress(p, 'l1', 0.8, 1)
    expect(u1.streak).toBe(1)
    const u2 = updateProgress(u1, 'l2', 0.9, 1)
    expect(u2.streak).toBe(2)
  })

  it('resets streak on poor score', () => {
    const p = fresh()
    p.streak = 5
    const u = updateProgress(p, 'l1', 0.5, 1)
    expect(u.streak).toBe(0)
  })
})

describe('getRecommendedTrack', () => {
  it('recommends child for under 50 XP', () => {
    expect(getRecommendedTrack(10)).toBe('child')
  })
  it('recommends teen for 50-199 XP', () => {
    expect(getRecommendedTrack(100)).toBe('teen')
  })
  it('recommends undergrad for 200-499 XP', () => {
    expect(getRecommendedTrack(300)).toBe('undergrad')
  })
  it('recommends graduate for 500-999 XP', () => {
    expect(getRecommendedTrack(750)).toBe('graduate')
  })
  it('recommends phd for 1000+ XP', () => {
    expect(getRecommendedTrack(1500)).toBe('phd')
  })
})

describe('getLevelLabel', () => {
  it('returns correct labels', () => {
    expect(getLevelLabel(0)).toBe('Alphabet')
    expect(getLevelLabel(3)).toBe('Advanced Grammar')
    expect(getLevelLabel(6)).toBe('Critical Edition')
  })
})

describe('getLevelForTrack', () => {
  const cases: [Track, Level[]][] = [
    ['child', [0, 1]],
    ['teen', [1, 2, 3]],
    ['undergrad', [2, 3, 4]],
    ['graduate', [3, 4, 5]],
    ['phd', [5, 6]],
  ]
  it.each(cases)('track %s has levels %j', (track, levels) => {
    expect(getLevelForTrack(track)).toEqual(levels)
  })
})