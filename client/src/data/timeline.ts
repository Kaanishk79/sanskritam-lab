export interface TimelineEvent {
  year: string
  title: string
  titleHi?: string
  description: string
  descriptionHi?: string
  category: 'text' | 'grammar' | 'philosophy'
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  { year: '1500-1200 BCE', title: 'Ṛgveda Composition', titleHi: 'ऋग्वेद की रचना', description: 'Earliest extant Sanskrit texts, hymns to deities', descriptionHi: 'प्राचीनतम संस्कृत ग्रंथ, देवताओं के स्तोत्र', category: 'text' },
  { year: '~1000 BCE', title: 'Brāhmaṇas & Āraṇyakas', titleHi: 'ब्राह्मण और आरण्यक', description: 'Ritual manuals and forest treatises', descriptionHi: 'अनुष्ठान नियम और वन ग्रंथ', category: 'text' },
  { year: '~700 BCE', title: 'Early Upaniṣads', titleHi: 'प्रारंभिक उपनिषद्', description: 'Philosophical speculations on Brahman and Ātman', descriptionHi: 'ब्रह्म और आत्मा पर दार्शनिक चिंतन', category: 'philosophy' },
  { year: '~500 BCE', title: 'Pāṇini — Aṣṭādhyāyī', titleHi: 'पाणिनि — अष्टाध्यायी', description: 'Systematization of Sanskrit grammar into 8 chapters', descriptionHi: 'संस्कृत व्याकरण का आठ अध्यायों में संकलन', category: 'grammar' },
  { year: '~300 BCE', title: 'Nyāya & Vaiśeṣika Sūtras', titleHi: 'न्याय और वैशेषिक सूत्र', description: 'Foundational texts of logic and atomism', descriptionHi: 'तर्कशास्त्र और परमाणुवाद के आधारभूत ग्रंथ', category: 'philosophy' },
  { year: '~200 BCE', title: 'Yoga Sūtra & Bhagavad Gītā', titleHi: 'योगसूत्र और भगवद्गीता', description: 'Classical yoga system and the Gītā synthesis', descriptionHi: 'शास्त्रीय योग दर्शन और गीता का समन्वय', category: 'philosophy' },
  { year: '~4th CE', title: 'Kālidāsa — Abhijñānaśākuntalam', titleHi: 'कालिदास — अभिज्ञानशाकुन्तलम्', description: 'Classical Sanskrit drama at its zenith', descriptionHi: 'शास्त्रीय संस्कृत नाटक का उत्कर्ष', category: 'text' },
  { year: '~7th CE', title: 'Bhartṛhari — Vākyapadīya', titleHi: 'भर्तृहरि — वाक्यपदीय', description: 'Philosophy of language and sentence meaning', descriptionHi: 'भाषा का दर्शन और वाक्यार्थ', category: 'grammar' },
]