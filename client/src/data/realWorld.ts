export interface Concept {
  word: string
  iast: string
  meaning: string
  meaningHi?: string
  today: string
  todayHi?: string
  example: string
  exampleEn: string
  exampleHi?: string
  emoji: string
}

export const CONCEPTS: Concept[] = [
  {
    word: 'अहिंसा', iast: 'ahiṃsā', meaning: 'non-violence', meaningHi: 'अहिंसा', emoji: '🕊️',
    today: 'From Gandhi’s marches to veganism and anti-bullying campaigns — अहिंसा is the world’s most exported Sanskrit idea. You practice it every time you choose words carefully.',
    todayHi: 'गांधी के मार्चों से लेकर वीगनवाद और एंटी-बुलिंग अभियानों तक — अहिंसा विश्व की सबसे अधिक निर्यात हुई संस्कृत अवधारणा है। जब भी आप शब्द चुनने में सावधानी बरतते हैं, आप अहिंसा का पालन करते हैं।',
    example: 'अहिंसा परमो धर्मः', exampleEn: 'Non-violence is the highest duty.', exampleHi: 'अहिंसा ही सर्वोच्च धर्म है।',
  },
  {
    word: 'कर्म', iast: 'karma', meaning: 'action', meaningHi: 'कर्म', emoji: '🔄',
    today: '“Karma” is now English slang for cause-and-effect (“that’s karma!”). In offices it shows up as: your output today becomes your reputation tomorrow.',
    todayHi: '“कर्म” (Karma) अब अंग्रेजी में कारण-फल का पर्याय बन गया है (वही तो कर्म है!)। कार्यालयों में भी यही दिखता है — आज का आपका परिश्रम कल आपकी पहचान बनता है।',
    example: 'कर्मण्येवाधिकारस्ते', exampleEn: 'Your right is to action alone.', exampleHi: 'तुम्हारा अधिकार केवल कर्म पर है।',
  },
  {
    word: 'गुरु', iast: 'guru', meaning: 'teacher', meaningHi: 'गुरु', emoji: '🧑‍🏫',
    today: 'From tech “gurus” to YouTube educators — anyone who removes your darkness (गु + रु) is a guru. Your school teachers, mentors and even good books qualify.',
    todayHi: 'टेक “गुरुओं” से लेकर यूट्यूब शिक्षकों तक — जो आपका अंधकार दूर करता है (गु + रु) वही गुरु है। आपके विद्यालय के शिक्षक, मार्गदर्शक और अच्छी पुस्तकें भी इसी श्रेणी में आती हैं।',
    example: 'गुरुर्ब्रह्मा गुरुर्विष्णुः', exampleEn: 'The guru is Brahmā, the guru is Viṣṇu.', exampleHi: 'गुरु ही ब्रह्मा हैं, गुरु ही विष्णु हैं।',
  },
  {
    word: 'मन्त्र', iast: 'mantra', meaning: 'sacred formula', meaningHi: 'पवित्र मंत्र', emoji: '🔊',
    today: 'Affirmations, company mission “mantras”, meditation apps — a mantra is simply a phrase you repeat to change your mind. Sanskrit gave the word to the world.',
    todayHi: 'आत्म-पुष्टि, कंपनी के मिशन “मंत्र”, ध्यान ऐप्स — मंत्र केवल वह वाक्यांश है जिसे आप मन बदलने के लिए दोहराते हैं। यह शब्द संस्कृत ने ही विश्व को दिया।',
    example: 'मननात् त्रायते इति मन्त्रः', exampleEn: 'What protects by reflection is a mantra.', exampleHi: 'मनन से जो रक्षा करता है, वह मंत्र है।',
  },
  {
    word: 'योग', iast: 'yoga', meaning: 'union', meaningHi: 'योग', emoji: '🧘',
    today: 'Yoga studios on every corner — but the real योग is joining your scattered mind to a single point. The UN now celebrates International Yoga Day (June 21), a gift of Sanskrit.',
    todayHi: 'हर गली में योग स्टूडियो — परंतु वास्तविक योग अपने बिखरे हुए मन को एक बिंदु पर एकाग्र करना है। संयुक्त राष्ट्र अब अंतरराष्ट्रीय योग दिवस (21 जून) मनाता है — यह संस्कृत का ही उपहार है।',
    example: 'योगः चित्तवृत्ति निरोधः', exampleEn: 'Yoga is the stilling of the mind’s movements.', exampleHi: 'योग चित्त की वृत्तियों का निरोध है।',
  },
  {
    word: 'नमस्ते', iast: 'namaste', meaning: 'I bow to you', meaningHi: 'मैं आपको प्रणाम करता हूँ', emoji: '🙏',
    today: 'The default hello in yoga classes worldwide — and the perfect video-call greeting: “the divine in me bows to the divine in you.”',
    todayHi: 'दुनिया भर के योग वर्गों में सामान्य अभिवादन — और वीडियो-कॉल के लिए एक उत्तम प्रणाम: “मेरे भीतर का दिव्य अंश आपके भीतर के दिव्य अंश को प्रणाम करता है।”',
    example: 'नमस्ते, कुशलं ते?', exampleEn: 'Namaste, are you well?', exampleHi: 'नमस्ते, क्या आप कुशल हैं?',
  },
  {
    word: 'माया', iast: 'māyā', meaning: 'illusion', meaningHi: 'माया', emoji: '🎭',
    today: 'Virtual reality, deepfakes, social media filters — the ancient worry about माया is now a modern industry. “The Matrix” is माया with better graphics.',
    todayHi: 'वर्चुअल रियलिटी, डीपफेक, सोशल मीडिया फिल्टर — माया की प्राचीन चिंता अब एक आधुनिक उद्योग बन गई है। “द मैट्रिक्स” बेहतर ग्राफिक्स वाली माया ही है।',
    example: 'माया एषा न सत्यम्', exampleEn: 'This is māyā, not truth.', exampleHi: 'यह माया है, सत्य नहीं।',
  },
  {
    word: 'शून्य', iast: 'śūnya', meaning: 'zero, void', meaningHi: 'शून्य', emoji: '0️⃣',
    today: 'The concept of zero — your calculator, your phone number, and every digital price tag — was born in Sanskrit mathematics (Āryabhaṭa, Brahmagupta). “Zero” comes from śūnya.',
    todayHi: 'शून्य की अवधारणा — आपका कैलकुलेटर, फोन नंबर और हर डिजिटल मूल्य — संस्कृत गणित (आर्यभट, ब्रह्मगुप्त) में जन्मी। “ज़ीरो” शून्य से ही आया है।',
    example: 'शून्यं विना गणितं न सम्भवति', exampleEn: 'Without zero, mathematics is not possible.', exampleHi: 'शून्य के बिना गणित संभव नहीं।',
  },
  {
    word: 'ध्यान', iast: 'dhyāna', meaning: 'meditation', meaningHi: 'ध्यान', emoji: '🪷',
    today: 'Mindfulness apps, focus timers, “deep work” — all rest on the Sanskrit science of ध्यान. Your phone’s “Do Not Disturb” mode is a tiny dhyāna.',
    todayHi: 'माइंडफुलनेस ऐप्स, फोकस टाइमर, “डीप वर्क” — सब ध्यान के संस्कृत विज्ञान पर आधारित हैं। आपके फोन का “डू नॉट डिस्टर्ब” मोड भी एक छोटा ध्यान ही है।',
    example: 'ध्यानेन सर्वम् साध्यम्', exampleEn: 'Through meditation everything is achievable.', exampleHi: 'ध्यान से सब कुछ साध्य है।',
  },
  {
    word: 'अनुवाद', iast: 'anuvāda', meaning: 'translation', meaningHi: 'अनुवाद', emoji: '🌐',
    today: 'Google Translate works in Sanskrit — and अनुवाद (anuvāda) is literally “saying after”. Every subtitle you watch is an anuvāda.',
    todayHi: 'गूगल ट्रांसलेट संस्कृत में भी काम करता है — और अनुवाद का शाब्दिक अर्थ है “पीछे कहना”। आप जो भी सबटाइटल देखते हैं, वह एक अनुवाद ही है।',
    example: 'अनुवादः भाषान्तरम् उच्यते', exampleEn: 'Anuvāda means rendering into another language.', exampleHi: 'अनुवाद अर्थात दूसरी भाषा में उतारना।',
  },
  {
    word: 'विद्या', iast: 'vidyā', meaning: 'knowledge', meaningHi: 'विद्या', emoji: '🎓',
    today: 'EdTech, online courses, your school itself — विद्या is “what illumines”. Sanskrit’s most famous graduation speech line is about her.',
    todayHi: 'एडटेक, ऑनलाइन कोर्स, आपका विद्यालय ही — विद्या वह है “जो प्रकाशित करती है”। संस्कृत की सबसे प्रसिद्ध विदाई-पंक्ति उसी के बारे में है।',
    example: 'विद्या ददाति विनयम्', exampleEn: 'Knowledge gives humility.', exampleHi: 'विद्या विनय देती है।',
  },
  {
    word: 'सत्य', iast: 'satya', meaning: 'truth', meaningHi: 'सत्य', emoji: '⚖️',
    today: 'Fact-checking, India’s national motto “Satyameva Jayate”, and honest conversations — सत्य is the operating system of trust.',
    todayHi: 'तथ्य-जांच, भारत का राष्ट्रीय आदर्श-वाक्य “सत्यमेव जयते”, और ईमानदार वार्तालाप — सत्य विश्वास की कार्य-प्रणाली है।',
    example: 'सत्यमेव जयते नानृतम्', exampleEn: 'Truth alone triumphs, not falsehood.', exampleHi: 'सत्य की ही जीत होती है, असत्य की नहीं।',
  },
  {
    word: 'प्रेम', iast: 'prema', meaning: 'love', meaningHi: 'प्रेम', emoji: '❤️',
    today: '“Prem” is Bollywood’s favourite word, and प्रेम is love without expectation — the kind friendships and families are built on.',
    todayHi: '“प्रेम” बॉलीवुड का प्रिय शब्द है, और प्रेम वह है जो बिना अपेक्षा के होता है — जिस पर मित्रता और परिवार टिके हैं।',
    example: 'प्रेम्णा सर्वम् सहते', exampleEn: 'Through love, one endures everything.', exampleHi: 'प्रेम से व्यक्ति सब कुछ सह लेता है।',
  },
  {
    word: 'धर्म', iast: 'dharma', meaning: 'duty, law, nature', meaningHi: 'कर्तव्य, धर्म, स्वभाव', emoji: '🧭',
    today: 'From “dharma” in corporate values decks to global ethics debates — dharma is doing what your role demands: a doctor heals, a friend listens.',
    todayHi: 'कॉर्पोरेट मूल्यों की “धर्म” सूची से लेकर वैश्विक नैतिकता की बहसों तक — धर्म वह करना है जो आपकी भूमिका मांगती है: डॉक्टर उपचार करता है, मित्र सुनता है।',
    example: 'धर्मो रक्षति रक्षितः', exampleEn: 'Dharma protects those who protect it.', exampleHi: 'धर्म उनकी रक्षा करता है जो उसकी रक्षा करते हैं।',
  },
  {
    word: 'स्वर', iast: 'svara', meaning: 'sound, vowel', meaningHi: 'ध्वनि, स्वर', emoji: '🎵',
    today: 'Voice assistants wake to your स्वर, music scales (सप्त स्वर) run every song you hear, and “svara” is the name of Indian music notes.',
    todayHi: 'वॉयस असिस्टेंट आपके स्वर से जागते हैं, संगीत की सप्त स्वर श्रृंखला हर गाने को चलाती है, और “स्वर” ही भारतीय संगीत के सुरों का नाम है।',
    example: 'स्वरे स्वरे माधुर्यम्', exampleEn: 'In every note there is sweetness.', exampleHi: 'हर स्वर में माधुर्य है।',
  },
  {
    word: 'समाधि', iast: 'samādhi', meaning: 'deep absorption', meaningHi: 'गहन समाधि', emoji: '🎯',
    today: 'Athletes call it “the zone”, developers call it “flow” — Sanskrit named it समाधि 3000 years ago. It is total focus on one thing.',
    todayHi: 'खिलाड़ी इसे “ज़ोन” कहते हैं, डेवलपर “फ्लो” — संस्कृत ने 3000 साल पहले इसका नाम समाधि रखा था। यह एक ही वस्तु पर पूर्ण एकाग्रता है।',
    example: 'समाधौ सिद्धिः सम्भवति', exampleEn: 'Success arises in samādhi.', exampleHi: 'समाधि में सिद्धि संभव है।',
  },
]