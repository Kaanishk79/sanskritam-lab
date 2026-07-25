import type { TrackInfo } from '../types/curriculum'

export const tracks: TrackInfo[] = [
  {
    id: 'child',
    label: 'Child',
    icon: '🧒',
    description: 'Playful learning with colors, games, and simple stories',
    color: '#f39c12',
    ageRange: '5-12 years',
    levels: [0, 1],
  },
  {
    id: 'teen',
    label: 'Teen',
    icon: '📚',
    description: 'School curriculum with grammar basics and exam prep',
    color: '#2ecc71',
    ageRange: '13-17 years',
    levels: [1, 2, 3],
  },
  {
    id: 'undergrad',
    label: 'Undergraduate',
    icon: '🎓',
    description: 'Classical texts, advanced grammar, philosophy foundations',
    color: '#3498db',
    ageRange: '18-22 years',
    levels: [2, 3, 4],
  },
  {
    id: 'graduate',
    label: 'Graduate',
    icon: '🔬',
    description: 'Textual criticism, manuscript studies, advanced darśanas',
    color: '#9b59b6',
    ageRange: 'MA/MPhil',
    levels: [3, 4, 5],
  },
  {
    id: 'phd',
    label: 'PhD / Researcher',
    icon: '🏛️',
    description: 'Critical editions, paleography, text-historical analysis',
    color: '#e74c3c',
    ageRange: 'PhD & beyond',
    levels: [5, 6],
  },
]