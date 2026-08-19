export interface TimelineEvent {
  year: string
  title: string
  description: string
  category: 'text' | 'grammar' | 'philosophy'
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  { year: '1500-1200 BCE', title: 'Ṛgveda Composition', description: 'Earliest extant Sanskrit texts, hymns to deities', category: 'text' },
  { year: '~1000 BCE', title: 'Brāhmaṇas & Āraṇyakas', description: 'Ritual manuals and forest treatises', category: 'text' },
  { year: '~700 BCE', title: 'Early Upaniṣads', description: 'Philosophical speculations on Brahman and Ātman', category: 'philosophy' },
  { year: '~500 BCE', title: 'Pāṇini — Aṣṭādhyāyī', description: 'Systematization of Sanskrit grammar into 8 chapters', category: 'grammar' },
  { year: '~300 BCE', title: 'Nyāya & Vaiśeṣika Sūtras', description: 'Foundational texts of logic and atomism', category: 'philosophy' },
  { year: '~200 BCE', title: 'Yoga Sūtra & Bhagavad Gītā', description: 'Classical yoga system and the Gītā synthesis', category: 'philosophy' },
  { year: '~4th CE', title: 'Kālidāsa — Abhijñānaśākuntalam', description: 'Classical Sanskrit drama at its zenith', category: 'text' },
  { year: '~7th CE', title: 'Bhartṛhari — Vākyapadīya', description: 'Philosophy of language and sentence meaning', category: 'grammar' },
]