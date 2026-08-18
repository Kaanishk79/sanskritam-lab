export interface Festival {
  id: string
  name: string
  emoji: string
  month: number
  day: number
  approx: string
  tithi: string
  meaning: string
  how: string
  phrase: string
  phraseEn: string
}

export const FESTIVALS: Festival[] = [
  { id: 'makar', name: 'Makar Sankranti', emoji: '🪁', month: 1, day: 14, approx: 'Jan 14', tithi: 'Sūrya’s entry into Makara', meaning: 'The sun begins its northward journey (Uttarāyaṇa).', how: 'Kite flying, til-gul sweets, river dips — the harvest festival of thanks.', phrase: 'तिलगुड घ्या गोड गोड बोला', phraseEn: 'Take the til-gud and speak sweetly.' },
  { id: 'vasant', name: 'Vasant Panchami', emoji: '🌸', month: 2, day: 2, approx: 'Jan/Feb', tithi: 'Śukla Pañcamī, Māgha', meaning: 'The arrival of spring and the worship of Sarasvatī, goddess of learning.', how: 'Yellow clothes, first alphabet for children, books placed at the feet of Sarasvatī.', phrase: 'सरस्वती नमस्तुभ्यम्', phraseEn: 'Salutations to Sarasvatī.' },
  { id: 'shivaratri', name: 'Mahā Śivarātri', emoji: '🕉️', month: 2, day: 26, approx: 'Feb/Mar', tithi: 'Kṛṣṇa Caturdaśī, Phālguna', meaning: 'The great night of Śiva — the night of stillness and meditation.', how: 'Night-long vigil, ओम् नमः शिवाय, bilva leaves, fasting.', phrase: 'ॐ नमः शिवाय', phraseEn: 'Om, salutations to Śiva.' },
  { id: 'holi', name: 'Holi', emoji: '🎨', month: 3, day: 15, approx: 'Mar', tithi: 'Pūrṇimā, Phālguna', meaning: 'The festival of colours — victory of devotion (Prahlāda) over arrogance (Hiraṇyakaśipu).', how: 'Colour play, Holika bonfire, sweets like gujiya.', phrase: 'होलिका दहनम् शुभम् भवतु', phraseEn: 'May the Holika fire bring auspiciousness.' },
  { id: 'ugadi', name: 'Ugadi / Gudi Padwa', emoji: '🌱', month: 4, day: 2, approx: 'Mar/Apr', tithi: 'Śukla Pratipadā, Caitra', meaning: 'The Sanskrit New Year — the first day of the first month.', how: 'Neem-jaggery (sweet-bitter life taste), new beginnings, rangoli.', phrase: 'नववर्षम् शुभम् भवतु', phraseEn: 'Happy New Year!' },
  { id: 'ramanavami', name: 'Rāma Navamī', emoji: '🏹', month: 4, day: 15, approx: 'Apr', tithi: 'Śukla Navamī, Caitra', meaning: 'The birth of Rāma, the ideal king of the Rāmāyaṇa.', how: 'Temple readings of the Rāmāyaṇa, bhajans, processions.', phrase: 'श्रीराम जय राम जय जय राम', phraseEn: 'Glory to Rāma.' },
  { id: 'akshaya', name: 'Akshaya Tritīyā', emoji: '💰', month: 5, day: 3, approx: 'Apr/May', tithi: 'Śukla Tṛtīyā, Vaiśākha', meaning: 'The never-diminishing third — the most auspicious day to begin anything.', how: 'Gold purchases, new ventures, charity, marriages.', phrase: 'अक्षयं वः सुखम् भवतु', phraseEn: 'May your happiness be inexhaustible.' },
  { id: 'guru', name: 'Guru Pūrṇimā', emoji: '🧘', month: 7, day: 10, approx: 'Jul', tithi: 'Āṣāḍha Pūrṇimā', meaning: 'Honouring the guru — the one who dispels darkness.', how: 'Pūjā of teachers, gift-giving, remembering Vyāsa who compiled the Vedas.', phrase: 'गुरुर्ब्रह्मा गुरुर्विष्णुः', phraseEn: 'The guru is Brahmā, the guru is Viṣṇu.' },
  { id: 'raksha', name: 'Rakṣābandhana', emoji: '🎀', month: 8, day: 16, approx: 'Aug', tithi: 'Śrāvaṇa Pūrṇimā', meaning: 'The bond of protection — tying the sacred thread of love.', how: 'Sisters tie rākhī, brothers promise protection, sweets.', phrase: 'रक्षा बन्धनम् शुभम्', phraseEn: 'Auspicious bond of protection.' },
  { id: 'janmashtami', name: 'Kṛṣṇa Janmāṣṭamī', emoji: '🪈', month: 8, day: 28, approx: 'Aug/Sep', tithi: 'Kṛṣṇa Aṣṭamī, Bhādrapada', meaning: 'The birth of Kṛṣṇa — the playful god of the Bhāgavata.', how: 'Dahī-handi, night vigils, bhajans, fasting till midnight.', phrase: 'नमो भगवते वासुदेवाय', phraseEn: 'Salutations to Lord Vāsudeva.' },
  { id: 'ganesh', name: 'Gaṇeśa Caturthī', emoji: '🐘', month: 9, day: 5, approx: 'Sep', tithi: 'Śukla Caturthī, Bhādrapada', meaning: 'The arrival of Gaṇeśa — remover of obstacles, lord of beginnings.', how: 'Clay idols, modak sweets, immersion processions.', phrase: 'गणेशाय नमः', phraseEn: 'Salutations to Gaṇeśa.' },
  { id: 'navaratri', name: 'Navarātri', emoji: '🪔', month: 10, day: 4, approx: 'Sep/Oct', tithi: 'Śukla Pratipadā – Navamī, Āśvina', meaning: 'Nine nights of the Goddess — power, wealth and wisdom.', how: 'Garba, dandiya, nine forms of Durgā, fasting.', phrase: 'दुर्गा माता की जय', phraseEn: 'Victory to Mother Durgā.' },
  { id: 'dussehra', name: 'Vijayā Daśamī', emoji: '🏹', month: 10, day: 14, approx: 'Oct', tithi: 'Śukla Daśamī, Āśvina', meaning: 'The victory of Rāma over Rāvaṇa — good over evil.', how: 'Rāvaṇa effigies burnt, weapons worshipped (Ayudha Pūjā), children start learning.', phrase: 'सत्यमेव जयते', phraseEn: 'Truth alone triumphs.' },
  { id: 'diwali', name: 'Dīpāvalī', emoji: '🪔', month: 11, day: 1, approx: 'Oct/Nov', tithi: 'Kṛṣṇa Amāvasyā, Kārtika', meaning: 'The festival of lights — the return of Rāma to Ayodhyā, light over darkness.', how: 'Diyas and rangoli, Lakṣmī pūjā, fireworks, sweets.', phrase: 'दीपावली शुभेच्छाः', phraseEn: 'Warm wishes for Dīpāvalī.' },
  { id: 'kartik', name: 'Kārtika Pūrṇimā', emoji: '🕯️', month: 11, day: 16, approx: 'Nov', tithi: 'Kārtika Pūrṇimā', meaning: 'The holiest full moon — lamp festival on the Ganges.', how: 'Floating lamps, river rituals, Guru Nānak Jayantī.', phrase: 'दीपम् प्रज्वालयामि', phraseEn: 'I light the lamp.' },
  { id: 'dhanteras', name: 'Dhanteras', emoji: '🥘', month: 10, day: 30, approx: 'Oct/Nov', tithi: 'Kṛṣṇa Trayodaśī, Kārtika', meaning: 'The beginning of Dīpāvalī — the day of Dhanvantari, god of medicine.', how: 'Buying utensils and gold, lighting the first diya.', phrase: 'धन्वन्तरये नमः', phraseEn: 'Salutations to Dhanvantari.' },
]

export interface Ritu {
  name: string
  months: string
  season: string
  emoji: string
  verse: string
}

export const RITUS: Ritu[] = [
  { name: 'वसन्त', months: 'Mar–May', season: 'Spring', emoji: '🌸', verse: 'वसन्ते वसन्ते च समासमस्य रसाः' },
  { name: 'ग्रीष्म', months: 'May–Jul', season: 'Summer', emoji: '☀️', verse: 'ग्रीष्मे ग्रीष्मे च तपति भानुः' },
  { name: 'वर्षा', months: 'Jul–Sep', season: 'Monsoon', emoji: '🌧️', verse: 'वर्षा वर्षति मेघः' },
  { name: 'शरद्', months: 'Sep–Nov', season: 'Autumn', emoji: '🍂', verse: 'शरदि शरदि च विमलाः निशाः' },
  { name: 'हेमन्त', months: 'Nov–Jan', season: 'Pre-winter', emoji: '❄️', verse: 'हेमन्ते हेमन्ते च हिमम् पतति' },
  { name: 'शिशिर', months: 'Jan–Mar', season: 'Winter', emoji: '🧣', verse: 'शिशिरे शिशिरे च शीतम् भवति' },
]

export function nextFestival(now = new Date()): { f: Festival; days: number } {
  let best = FESTIVALS[0]
  let bestDays = 9999
  for (const f of FESTIVALS) {
    const d = new Date(now.getFullYear(), f.month - 1, f.day)
    let days = Math.round((d.getTime() - now.getTime()) / 86400000)
    if (days < 0) {
      const nextYr = new Date(now.getFullYear() + 1, f.month - 1, f.day)
      days = Math.round((nextYr.getTime() - now.getTime()) / 86400000)
    }
    if (days < bestDays) {
      bestDays = days
      best = f
    }
  }
  return { f: best, days: bestDays }
}

export function currentRitu(now = new Date()): Ritu {
  const m = now.getMonth()
  if (m >= 2 && m <= 4) return RITUS[0]
  if (m >= 4 && m <= 6) return RITUS[1]
  if (m >= 6 && m <= 8) return RITUS[2]
  if (m >= 8 && m <= 10) return RITUS[3]
  if (m >= 10 || m === 0) return m === 0 ? RITUS[5] : RITUS[4]
  return RITUS[4]
}