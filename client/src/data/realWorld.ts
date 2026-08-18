export interface Concept {
  word: string
  iast: string
  meaning: string
  today: string
  example: string
  exampleEn: string
  emoji: string
}

export const CONCEPTS: Concept[] = [
  {
    word: 'अहिंसा', iast: 'ahiṃsā', meaning: 'non-violence', emoji: '🕊️',
    today: 'From Gandhi’s marches to veganism and anti-bullying campaigns — अहिंसा is the world’s most exported Sanskrit idea. You practice it every time you choose words carefully.',
    example: 'अहिंसा परमो धर्मः', exampleEn: 'Non-violence is the highest duty.',
  },
  {
    word: 'कर्म', iast: 'karma', meaning: 'action', emoji: '🔄',
    today: '“Karma” is now English slang for cause-and-effect (“that’s karma!”). In offices it shows up as: your output today becomes your reputation tomorrow.',
    example: 'कर्मण्येवाधिकारस्ते', exampleEn: 'Your right is to action alone.',
  },
  {
    word: 'गुरु', iast: 'guru', meaning: 'teacher', emoji: '🧑‍🏫',
    today: 'From tech “gurus” to YouTube educators — anyone who removes your darkness (गु + रु) is a guru. Your school teachers, mentors and even good books qualify.',
    example: 'गुरुर्ब्रह्मा गुरुर्विष्णुः', exampleEn: 'The guru is Brahmā, the guru is Viṣṇu.',
  },
  {
    word: 'मन्त्र', iast: 'mantra', meaning: 'sacred formula', emoji: '🔊',
    today: 'Affirmations, company mission “mantras”, meditation apps — a mantra is simply a phrase you repeat to change your mind. Sanskrit gave the word to the world.',
    example: 'मननात् त्रायते इति मन्त्रः', exampleEn: 'What protects by reflection is a mantra.',
  },
  {
    word: 'योग', iast: 'yoga', meaning: 'union', emoji: '🧘',
    today: 'Yoga studios on every corner — but the real योग is joining your scattered mind to a single point. The UN now celebrates International Yoga Day (June 21), a gift of Sanskrit.',
    example: 'योगः चित्तवृत्ति निरोधः', exampleEn: 'Yoga is the stilling of the mind’s movements.',
  },
  {
    word: 'नमस्ते', iast: 'namaste', meaning: 'I bow to you', emoji: '🙏',
    today: 'The default hello in yoga classes worldwide — and the perfect video-call greeting: “the divine in me bows to the divine in you.”',
    example: 'नमस्ते, कुशलं ते?', exampleEn: 'Namaste, are you well?',
  },
  {
    word: 'माया', iast: 'māyā', meaning: 'illusion', emoji: '🎭',
    today: 'Virtual reality, deepfakes, social media filters — the ancient worry about माया is now a modern industry. “The Matrix” is माया with better graphics.',
    example: 'माया एषा न सत्यम्', exampleEn: 'This is māyā, not truth.',
  },
  {
    word: 'शून्य', iast: 'śūnya', meaning: 'zero, void', emoji: '0️⃣',
    today: 'The concept of zero — your calculator, your phone number, and every digital price tag — was born in Sanskrit mathematics (Āryabhaṭa, Brahmagupta). “Zero” comes from śūnya.',
    example: 'शून्यं विना गणितं न सम्भवति', exampleEn: 'Without zero, mathematics is not possible.',
  },
  {
    word: 'ध्यान', iast: 'dhyāna', meaning: 'meditation', emoji: '🪷',
    today: 'Mindfulness apps, focus timers, “deep work” — all rest on the Sanskrit science of ध्यान. Your phone’s “Do Not Disturb” mode is a tiny dhyāna.',
    example: 'ध्यानेन सर्वम् साध्यम्', exampleEn: 'Through meditation everything is achievable.',
  },
  {
    word: 'अनुवाद', iast: 'anuvāda', meaning: 'translation', emoji: '🌐',
    today: 'Google Translate works in Sanskrit — and अनुवाद (anuvāda) is literally “saying after”. Every subtitle you watch is an anuvāda.',
    example: 'अनुवादः भाषान्तरम् उच्यते', exampleEn: 'Anuvāda means rendering into another language.',
  },
  {
    word: 'विद्या', iast: 'vidyā', meaning: 'knowledge', emoji: '🎓',
    today: 'EdTech, online courses, your school itself — विद्या is “what illumines”. Sanskrit’s most famous graduation speech line is about her.',
    example: 'विद्या ददाति विनयम्', exampleEn: 'Knowledge gives humility.',
  },
  {
    word: 'सत्य', iast: 'satya', meaning: 'truth', emoji: '⚖️',
    today: 'Fact-checking, India’s national motto “Satyameva Jayate”, and honest conversations — सत्य is the operating system of trust.',
    example: 'सत्यमेव जयते नानृतम्', exampleEn: 'Truth alone triumphs, not falsehood.',
  },
  {
    word: 'प्रेम', iast: 'prema', meaning: 'love', emoji: '❤️',
    today: '“Prem” is Bollywood’s favourite word, and प्रेम is love without expectation — the kind friendships and families are built on.',
    example: 'प्रेम्णा सर्वम् सहते', exampleEn: 'Through love, one endures everything.',
  },
  {
    word: 'धर्म', iast: 'dharma', meaning: 'duty, law, nature', emoji: '🧭',
    today: 'From “dharma” in corporate values decks to global ethics debates — dharma is doing what your role demands: a doctor heals, a friend listens.',
    example: 'धर्मो रक्षति रक्षितः', exampleEn: 'Dharma protects those who protect it.',
  },
  {
    word: 'स्वर', iast: 'svara', meaning: 'sound, vowel', emoji: '🎵',
    today: 'Voice assistants wake to your स्वर, music scales (सप्त स्वर) run every song you hear, and “svara” is the name of Indian music notes.',
    example: 'स्वरे स्वरे माधुर्यम्', exampleEn: 'In every note there is sweetness.',
  },
  {
    word: 'समाधि', iast: 'samādhi', meaning: 'deep absorption', emoji: '🎯',
    today: 'Athletes call it “the zone”, developers call it “flow” — Sanskrit named it समाधि 3000 years ago. It is total focus on one thing.',
    example: 'समाधौ सिद्धिः सम्भवति', exampleEn: 'Success arises in samādhi.',
  },
]