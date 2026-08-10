import type { TrackInfo } from '../types/curriculum'

export const tracks: TrackInfo[] = [
  {
    id: 'child',
    label: 'Primary (Class 1-5)',
    icon: '🧒',
    description: 'Playful learning with alphabet, words, simple sentences, colors, and stories',
    color: '#f39c12',
    classRange: 'Class 1-5',
    levels: [0, 1],
  },
  {
    id: 'teen',
    label: 'Secondary (Class 6-10)',
    icon: '📚',
    description: 'NCERT Sanskrit curriculum: Deepakam (6-8), Shemushi (9-10) with grammar and composition',
    color: '#2ecc71',
    classRange: 'Class 6-10',
    levels: [1, 2, 3],
  },
  {
    id: 'undergrad',
    label: 'Senior Secondary & BA (Class 11-BA 3rd)',
    icon: '🎓',
    description: 'NCERT Bhaswati & Shashwati (11-12), UGC university syllabus: literature, drama, grammar, philosophy',
    color: '#3498db',
    classRange: 'Class 11–BA III',
    levels: [2, 3, 4],
  },
  {
    id: 'graduate',
    label: 'Postgraduate (MA 1st-MPhil)',
    icon: '🔬',
    description: 'Vedic literature, linguistics, textual criticism, paleography, research methodology',
    color: '#9b59b6',
    classRange: 'MA–MPhil',
    levels: [3, 4, 5],
  },
  {
    id: 'phd',
    label: 'Doctoral (PhD & Research)',
    icon: '🏛️',
    description: 'Critical editions, advanced poetics, publication ethics, thesis & viva',
    color: '#e74c3c',
    classRange: 'PhD',
    levels: [5, 6],
  },
]
