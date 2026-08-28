export interface Festival {
  id: string
  name: string
  nameHi?: string
  emoji: string
  month: number
  day: number
  approx: string
  approxHi?: string
  tithi: string
  tithiHi?: string
  meaning: string
  meaningHi?: string
  how: string
  howHi?: string
  phrase: string
  phraseEn: string
  phraseEnHi?: string
}

export const FESTIVALS: Festival[] = [
  { id: 'makar', name: 'Makar Sankranti', nameHi: 'मकर संक्रांति', emoji: '🪁', month: 1, day: 14, approx: 'Jan 14', approxHi: '14 जनवरी', tithi: 'Sūrya’s entry into Makara', tithiHi: 'मकर राशि में सूर्य का प्रवेश', meaning: 'The sun begins its northward journey (Uttarāyaṇa).', meaningHi: 'सूर्य की उत्तरायण (उत्तर की ओर) यात्रा का आरंभ।', how: 'Kite flying, til-gul sweets, river dips — the harvest festival of thanks.', howHi: 'पतंग उड़ाना, तिल-गुड़ के मीठे, नदी स्नान — धन्यवाद का कृषि पर्व।', phrase: 'तिलगुड घ्या गोड गोड बोला', phraseEn: 'Take the til-gud and speak sweetly.', phraseEnHi: 'तिल-गुड़ लो, मीठा-मीठा बोलो।' },
  { id: 'vasant', name: 'Vasant Panchami', nameHi: 'वसंत पंचमी', emoji: '🌸', month: 2, day: 2, approx: 'Jan/Feb', approxHi: 'जनवरी/फ़रवरी', tithi: 'Śukla Pañcamī, Māgha', tithiHi: 'माघ शुक्ल पंचमी', meaning: 'The arrival of spring and the worship of Sarasvatī, goddess of learning.', meaningHi: 'वसंत का आगमन और विद्या की देवी सरस्वती की पूजा।', how: 'Yellow clothes, first alphabet for children, books placed at the feet of Sarasvatī.', howHi: 'पीले वस्त्र, बच्चों का प्रथम अक्षर लेखन, सरस्वती के चरणों में पुस्तकें।', phrase: 'सरस्वती नमस्तुभ्यम्', phraseEn: 'Salutations to Sarasvatī.', phraseEnHi: 'सरस्वती को नमन।' },
  { id: 'shivaratri', name: 'Mahā Śivarātri', nameHi: 'महा शिवरात्रि', emoji: '🕉️', month: 2, day: 26, approx: 'Feb/Mar', approxHi: 'फ़रवरी/मार्च', tithi: 'Kṛṣṇa Caturdaśī, Phālguna', tithiHi: 'फाल्गुन कृष्ण चतुर्दशी', meaning: 'The great night of Śiva — the night of stillness and meditation.', meaningHi: 'शिव की महानोक्ति — शांति और ध्यान की रात।', how: 'Night-long vigil, ओम् नमः शिवाय, bilva leaves, fasting.', howHi: 'रात्रि-जागरण, ओम् नमः शिवाय, बिल्वपत्र, उपवास।', phrase: 'ॐ नमः शिवाय', phraseEn: 'Om, salutations to Śiva.', phraseEnHi: 'ओम्, शिव को नमन।' },
  { id: 'holi', name: 'Holi', nameHi: 'होली', emoji: '🎨', month: 3, day: 15, approx: 'Mar', approxHi: 'मार्च', tithi: 'Pūrṇimā, Phālguna', tithiHi: 'फाल्गुन पूर्णिमा', meaning: 'The festival of colours — victory of devotion (Prahlāda) over arrogance (Hiraṇyakaśipu).', meaningHi: 'रंगों का त्योहार — भक्ति (प्रह्लाद) की अहंकार (हिरण्यकशिपु) पर विजय।', how: 'Colour play, Holika bonfire, sweets like gujiya.', howHi: 'रंग खेलना, होलिका दहन, गुजिया जैसी मिठाइयाँ।', phrase: 'होलिका दहनम् शुभम् भवतु', phraseEn: 'May the Holika fire bring auspiciousness.', phraseEnHi: 'होलिका की अग्नि मंगलमय हो।' },
  { id: 'ugadi', name: 'Ugadi / Gudi Padwa', nameHi: 'उगादी / गुड़ी पड़वा', emoji: '🌱', month: 4, day: 2, approx: 'Mar/Apr', approxHi: 'मार्च/अप्रैल', tithi: 'Śukla Pratipadā, Caitra', tithiHi: 'चैत्र शुक्ल प्रतिपदा', meaning: 'The Sanskrit New Year — the first day of the first month.', meaningHi: 'संस्कृत नववर्ष — पहले महीने का पहला दिन।', how: 'Neem-jaggery (sweet-bitter life taste), new beginnings, rangoli.', howHi: 'नीम-गुड़ (जीवन का मीठा-कड़वा स्वाद), नई शुरुआत, रंगोली।', phrase: 'नववर्षम् शुभम् भवतु', phraseEn: 'Happy New Year!', phraseEnHi: 'नववर्ष की शुभकामनाएँ!' },
  { id: 'ramanavami', name: 'Rāma Navamī', nameHi: 'राम नवमी', emoji: '🏹', month: 4, day: 15, approx: 'Apr', approxHi: 'अप्रैल', tithi: 'Śukla Navamī, Caitra', tithiHi: 'चैत्र शुक्ल नवमी', meaning: 'The birth of Rāma, the ideal king of the Rāmāyaṇa.', meaningHi: 'राम का जन्म — रामायण के आदर्श राजा।', how: 'Temple readings of the Rāmāyaṇa, bhajans, processions.', howHi: 'रामायण का पाठ, भजन, शोभा यात्राएँ।', phrase: 'श्रीराम जय राम जय जय राम', phraseEn: 'Glory to Rāma.', phraseEnHi: 'राम की जय।' },
  { id: 'akshaya', name: 'Akshaya Tritīyā', nameHi: 'अक्षय तृतीया', emoji: '💰', month: 5, day: 3, approx: 'Apr/May', approxHi: 'अप्रैल/मई', tithi: 'Śukla Tṛtīyā, Vaiśākha', tithiHi: 'वैशाख शुक्ल तृतीया', meaning: 'The never-diminishing third — the most auspicious day to begin anything.', meaningHi: 'अक्षय (कभी न घटने वाला) तृतीया — कुछ भी आरंभ करने का शुभ दिन।', how: 'Gold purchases, new ventures, charity, marriages.', howHi: 'सोना खरीदना, नए कार्य, दान, विवाह।', phrase: 'अक्षयं वः सुखम् भवतु', phraseEn: 'May your happiness be inexhaustible.', phraseEnHi: 'आपका सुख अक्षय रहे।' },
  { id: 'guru', name: 'Guru Pūrṇimā', nameHi: 'गुरु पूर्णिमा', emoji: '🧘', month: 7, day: 10, approx: 'Jul', approxHi: 'जुलाई', tithi: 'Āṣāḍha Pūrṇimā', tithiHi: 'आषाढ़ पूर्णिमा', meaning: 'Honouring the guru — the one who dispels darkness.', meaningHi: 'गुरु का सम्मान — वे जो अज्ञान का अंधकार दूर करते हैं।', how: 'Pūjā of teachers, gift-giving, remembering Vyāsa who compiled the Vedas.', howHi: 'गुरुओं की पूजा, उपहार, वेदों के संकलनकर्ता व्यास का स्मरण।', phrase: 'गुरुर्ब्रह्मा गुरुर्विष्णुः', phraseEn: 'The guru is Brahmā, the guru is Viṣṇu.', phraseEnHi: 'गुरु ब्रह्मा हैं, गुरु विष्णु हैं।' },
  { id: 'raksha', name: 'Rakṣābandhana', nameHi: 'रक्षाबंधन', emoji: '🎀', month: 8, day: 16, approx: 'Aug', approxHi: 'अगस्त', tithi: 'Śrāvaṇa Pūrṇimā', tithiHi: 'श्रावण पूर्णिमा', meaning: 'The bond of protection — tying the sacred thread of love.', meaningHi: 'रक्षा का बंधन — प्रेम का पवित्र धागा बाँधना।', how: 'Sisters tie rākhī, brothers promise protection, sweets.', howHi: 'बहनें राखी बाँधती हैं, भाई रक्षा का वचन देते हैं, मिठाइयाँ।', phrase: 'रक्षा बन्धनम् शुभम्', phraseEn: 'Auspicious bond of protection.', phraseEnHi: 'रक्षा का मंगल बंधन।' },
  { id: 'janmashtami', name: 'Kṛṣṇa Janmāṣṭamī', nameHi: 'कृष्ण जन्माष्टमी', emoji: '🪈', month: 8, day: 28, approx: 'Aug/Sep', approxHi: 'अगस्त/सितंबर', tithi: 'Kṛṣṇa Aṣṭamī, Bhādrapada', tithiHi: 'भाद्रपद कृष्ण अष्टमी', meaning: 'The birth of Kṛṣṇa — the playful god of the Bhāgavata.', meaningHi: 'कृष्ण का जन्म — भागवत के लीला-पुरुष।', how: 'Dahī-handi, night vigils, bhajans, fasting till midnight.', howHi: 'दही-हांडी, रात्रि-जागरण, भजन, आधी रात तक उपवास।', phrase: 'नमो भगवते वासुदेवाय', phraseEn: 'Salutations to Lord Vāsudeva.', phraseEnHi: 'भगवान वासुदेव को नमन।' },
  { id: 'ganesh', name: 'Gaṇeśa Caturthī', nameHi: 'गणेश चतुर्थी', emoji: '🐘', month: 9, day: 5, approx: 'Sep', approxHi: 'सितंबर', tithi: 'Śukla Caturthī, Bhādrapada', tithiHi: 'भाद्रपद शुक्ल चतुर्थी', meaning: 'The arrival of Gaṇeśa — remover of obstacles, lord of beginnings.', meaningHi: 'गणेश का आगमन — विघ्नों के नाशक, शुभ आरंभ के स्वामी।', how: 'Clay idols, modak sweets, immersion processions.', howHi: 'मिट्टी की मूर्तियाँ, मोदक, विसर्जन शोभा यात्राएँ।', phrase: 'गणेशाय नमः', phraseEn: 'Salutations to Gaṇeśa.', phraseEnHi: 'गणेश को नमन।' },
  { id: 'navaratri', name: 'Navarātri', nameHi: 'नवरात्रि', emoji: '🪔', month: 10, day: 4, approx: 'Sep/Oct', approxHi: 'सितंबर/अक्टूबर', tithi: 'Śukla Pratipadā – Navamī, Āśvina', tithiHi: 'आश्विन शुक्ल प्रतिपदा – नवमी', meaning: 'Nine nights of the Goddess — power, wealth and wisdom.', meaningHi: 'देवी की नौ रातें — शक्ति, समृद्धि और विद्या।', how: 'Garba, dandiya, nine forms of Durgā, fasting.', howHi: 'गरबा, डांडिया, दुर्गा के नौ रूप, उपवास।', phrase: 'दुर्गा माता की जय', phraseEn: 'Victory to Mother Durgā.', phraseEnHi: 'माता दुर्गा की जय।' },
  { id: 'dussehra', name: 'Vijayā Daśamī', nameHi: 'विजयादशमी', emoji: '🏹', month: 10, day: 14, approx: 'Oct', approxHi: 'अक्टूबर', tithi: 'Śukla Daśamī, Āśvina', tithiHi: 'आश्विन शुक्ल दशमी', meaning: 'The victory of Rāma over Rāvaṇa — good over evil.', meaningHi: 'रावण पर राम की विजय — बुराई पर अच्छाई।', how: 'Rāvaṇa effigies burnt, weapons worshipped (Ayudha Pūjā), children start learning.', howHi: 'रावण दहन, शस्त्र पूजा (आयुध पूजा), बच्चों का अध्ययन आरंभ।', phrase: 'सत्यमेव जयते', phraseEn: 'Truth alone triumphs.', phraseEnHi: 'सत्य की ही विजय होती है।' },
  { id: 'diwali', name: 'Dīpāvalī', nameHi: 'दीपावली', emoji: '🪔', month: 11, day: 1, approx: 'Oct/Nov', approxHi: 'अक्टूबर/नवंबर', tithi: 'Kṛṣṇa Amāvasyā, Kārtika', tithiHi: 'कार्तिक कृष्ण अमावस्या', meaning: 'The festival of lights — the return of Rāma to Ayodhyā, light over darkness.', meaningHi: 'रोशनी का त्योहार — राम का अयोध्या आगमन, अंधकार पर प्रकाश।', how: 'Diyas and rangoli, Lakṣmī pūjā, fireworks, sweets.', howHi: 'दीप व रंगोली, लक्ष्मी पूजा, आतिशबाजी, मिठाइयाँ।', phrase: 'दीपावली शुभेच्छाः', phraseEn: 'Warm wishes for Dīpāvalī.', phraseEnHi: 'दीपावली की हार्दिक शुभकामनाएँ।' },
  { id: 'kartik', name: 'Kārtika Pūrṇimā', nameHi: 'कार्तिक पूर्णिमा', emoji: '🕯️', month: 11, day: 16, approx: 'Nov', approxHi: 'नवंबर', tithi: 'Kārtika Pūrṇimā', tithiHi: 'कार्तिक पूर्णिमा', meaning: 'The holiest full moon — lamp festival on the Ganges.', meaningHi: 'सबसे पवित्र पूर्णिमा — गंगा तट पर दीपोत्सव।', how: 'Floating lamps, river rituals, Guru Nānak Jayantī.', howHi: 'जल में दीप प्रवाह, घाट-अनुष्ठान, गुरु नानक जयंती।', phrase: 'दीपम् प्रज्वालयामि', phraseEn: 'I light the lamp.', phraseEnHi: 'मैं दीप प्रज्वलित करता हूँ।' },
  { id: 'dhanteras', name: 'Dhanteras', nameHi: 'धनतेरस', emoji: '🥘', month: 10, day: 30, approx: 'Oct/Nov', approxHi: 'अक्टूबर/नवंबर', tithi: 'Kṛṣṇa Trayodaśī, Kārtika', tithiHi: 'कार्तिक कृष्ण त्रयोदशी', meaning: 'The beginning of Dīpāvalī — the day of Dhanvantari, god of medicine.', meaningHi: 'दीपावली का आरंभ — आयुर्वेद के देवता धन्वंतरि का दिन।', how: 'Buying utensils and gold, lighting the first diya.', howHi: 'बर्तन और सोना खरीदना, पहला दीया जलाना।', phrase: 'धन्वन्तरये नमः', phraseEn: 'Salutations to Dhanvantari.', phraseEnHi: 'धन्वंतरि को नमन।' },
]

export interface Ritu {
  name: string
  months: string
  monthsHi?: string
  season: string
  seasonHi?: string
  emoji: string
  verse: string
}

export const RITUS: Ritu[] = [
  { name: 'वसन्त', months: 'Mar–May', monthsHi: 'मार्च–मई', season: 'Spring', seasonHi: 'वसंत', emoji: '🌸', verse: 'वसन्ते वसन्ते च समासमस्य रसाः' },
  { name: 'ग्रीष्म', months: 'May–Jul', monthsHi: 'मई–जुलाई', season: 'Summer', seasonHi: 'ग्रीष्म', emoji: '☀️', verse: 'ग्रीष्मे ग्रीष्मे च तपति भानुः' },
  { name: 'वर्षा', months: 'Jul–Sep', monthsHi: 'जुलाई–सितंबर', season: 'Monsoon', seasonHi: 'वर्षा ऋतु', emoji: '🌧️', verse: 'वर्षा वर्षति मेघः' },
  { name: 'शरद्', months: 'Sep–Nov', monthsHi: 'सितंबर–नवंबर', season: 'Autumn', seasonHi: 'शरद', emoji: '🍂', verse: 'शरदि शरदि च विमलाः निशाः' },
  { name: 'हेमन्त', months: 'Nov–Jan', monthsHi: 'नवंबर–जनवरी', season: 'Pre-winter', seasonHi: 'हेमंत', emoji: '❄️', verse: 'हेमन्ते हेमन्ते च हिमम् पतति' },
  { name: 'शिशिर', months: 'Jan–Mar', monthsHi: 'जनवरी–मार्च', season: 'Winter', seasonHi: 'शिशिर', emoji: '🧣', verse: 'शिशिरे शिशिरे च शीतम् भवति' },
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