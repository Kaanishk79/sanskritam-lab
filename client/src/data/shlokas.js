export const SHLOKA_BOOKS = [
  {
    id: "gita",
    title: "Bhagavad Gītā",
    titleSanskrit: "श्रीमद्भगवद्गीता",
    author: "महर्षि वेदव्यासः",
    desc: "The divine discourse between Śrī Kṛṣṇa and Arjuna on karma, jñāna, bhakti, and cosmic dharma.",
    icon: "scroll"
  },
  {
    id: "ramayana",
    title: "Vālmīki Rāmāyaṇa",
    titleSanskrit: "वाल्मीकि रामायणम्",
    author: "महर्षि वाल्मीकिः",
    desc: "The foundational epic Ādikāvya celebrating truth, noble filial duty, valor, and ideal conduct.",
    icon: "book"
  },
  {
    id: "upanishads",
    title: "The Upaniṣads",
    titleSanskrit: "उपनिषदः",
    author: "वैदिक ऋषयः",
    desc: "The philosophical pinnacle of Vedic wisdom on Brahman, the eternal Ātman, and universal peace.",
    icon: "sun"
  },
  {
    id: "vedas",
    title: "The Vedas",
    titleSanskrit: "वेदाः",
    author: "ऋषयः",
    desc: "The primordial hymns of cosmic harmony, collective unity, divine effulgence, and spiritual awakening.",
    icon: "flame"
  },
  {
    id: "hitopadesha",
    title: "Hitopadeśa",
    titleSanskrit: "हितोपदेशः",
    author: "पण्डित नारायणः",
    desc: "Classic didactic fables imparting practical counsel on friendship, prudence, and virtuous character.",
    icon: "feather"
  },
  {
    id: "panchatantra",
    title: "Pañcatantra",
    titleSanskrit: "पञ्चतन्त्रम्",
    author: "विष्णु शर्मा",
    desc: "Timeless allegories and worldly maxims teaching strategy, intellect, statecraft, and human nature.",
    icon: "compass"
  },
  {
    id: "nitisatakam",
    title: "Nītiśatakam",
    titleSanskrit: "नीतिशतकम्",
    author: "भर्तृहरिः",
    desc: "The centenary of verses on scholarship, perseverance, eloquence, modesty, and righteous living.",
    icon: "award"
  },
  {
    id: "chanakya",
    title: "Cāṇakya Nīti",
    titleSanskrit: "चाणक्यनीतिः",
    author: "आचार्य चाणक्यः",
    desc: "Sharp, realistic maxims on governance, character, true friendship, discipline, and daily life.",
    icon: "shield"
  },
  {
    id: "mahabharata",
    title: "Mahābhārata & Vidura Nīti",
    titleSanskrit: "महाभारतम् / विदुरनीतिः",
    author: "महर्षि वेदव्यासः",
    desc: "Ethical dialogues, statecraft counsel, and timeless wisdom from the world's grandest epic.",
    icon: "scale"
  },
  {
    id: "stotras_subhashita",
    title: "Stotras & Subhāṣitāni",
    titleSanskrit: "स्तोत्राणि सुभाषितानि च",
    author: "विविध आचार्याः",
    desc: "Sacred morning prayers, daily invocations, and lyrical gems for auspicious contemplation.",
    icon: "sparkles"
  }
];

export const SHLOKA_CATEGORIES = [
  {
    id: "all",
    label: "All Shlokas",
    labelHi: "सर्वे श्लोकाः",
    desc: "Complete collection of classical verses"
  },
  {
    id: "devotion",
    label: "Devotion & Prayer",
    labelHi: "भक्तिः प्रार्थना च",
    desc: "Sacred mantras invoking the divine and seeking protection"
  },
  {
    id: "knowledge",
    label: "Knowledge & Education",
    labelHi: "विद्या ज्ञानं च",
    desc: "Verses celebrating learning, intellect, humility, and the guru"
  },
  {
    id: "wisdom",
    label: "Wisdom & Life Lessons",
    labelHi: "सुभाषितानि नीतिश्च",
    desc: "Timeless maxims on perseverance, duty, karma, and brotherhood"
  },
  {
    id: "peace",
    label: "Peace & Meditation",
    labelHi: "शान्तिः ध्यानं च",
    desc: "Upaniṣadic prayers for universal harmony, light, and inner stillness"
  },
  {
    id: "morals",
    label: "Moral Values & Character",
    labelHi: "सदाचारः धर्मश्च",
    desc: "Guiding principles of non-violence, truth, respect, and righteousness"
  },
  {
    id: "daily",
    label: "Morning Prayers & Daily Recitation",
    labelHi: "प्रातःस्मरणम् नित्यप्रार्थना च",
    desc: "Daily morning verses for reverence, gratitude, and grounding"
  }
];

export const SHLOKAS = [
  // ═════════════════════════════════════════════════════════════════
  // 1. BHAGAVAD GĪTĀ (श्रीमद्भगवद्गीता)
  // ═════════════════════════════════════════════════════════════════
  {
    id: "shloka-karmanye",
    book: "gita",
    bookTitle: "Bhagavad Gītā",
    bookTitleSanskrit: "श्रीमद्भगवद्गीता",
    dev: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    iast: "karmaṇyevādhikāraste mā phaleṣu kadācana | mā karmaphalahetur bhūr mā te saṅgo'stvakarmaṇi ||",
    translation: "Your sacred right is to perform your prescribed action alone, never to its fruits. Let not the fruits of action be your motive, nor let there be any attachment to inaction.",
    translationHi: "तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। कर्म के फल की इच्छा से प्रेरित मत होओ, और कर्म न करने में तुम्हारी आसक्ति न हो।",
    source: "Bhagavad Gītā 2.47",
    category: "wisdom",
    categoryLabel: "Wisdom & Life Lessons",
    categoryLabelHi: "सुभाषितानि नीतिश्च",
    words: [
      { word: "कर्मणि", meaning: "In action / duty", meaningHi: "कर्म में" },
      { word: "एव", meaning: "Alone / only", meaningHi: "ही" },
      { word: "अधिकारः", meaning: "Right / entitlement", meaningHi: "अधिकार" },
      { word: "फलेषु", meaning: "In the fruits", meaningHi: "फलों में" },
      { word: "कदाचन", meaning: "Ever / at any time", meaningHi: "कभी भी" },
      { word: "अकर्मणि", meaning: "In inaction", meaningHi: "कर्म त्याग में" }
    ]
  },
  {
    id: "shloka-gita-atma",
    book: "gita",
    bookTitle: "Bhagavad Gītā",
    bookTitleSanskrit: "श्रीमद्भगवद्गीता",
    dev: "न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः। अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥",
    iast: "na jāyate mriyate vā kadācin nāyaṃ bhūtvā bhavitā vā na bhūyaḥ | ajo nityaḥ śāśvato'yaṃ purāṇo na hanyate hanyamāne śarīre ||",
    translation: "The soul is never born, nor does it ever perish; having once existed, it never ceases to be. Unborn, eternal, ever-existing, and primeval, it is not slain when the body is slain.",
    translationHi: "आत्मा न कभी जन्म लेती है और न कभी मरती है; यह न उत्पन्न होकर फिर अभाव को प्राप्त होती है। यह अजन्मा, नित्य, शाश्वत और पुरातन है; शरीर के नष्ट होने पर भी यह नष्ट नहीं होती।",
    source: "Bhagavad Gītā 2.20",
    category: "wisdom",
    categoryLabel: "Wisdom & Life Lessons",
    categoryLabelHi: "सुभाषितानि नीतिश्च",
    words: [
      { word: "न जायते", meaning: "Is not born", meaningHi: "जन्म नहीं लेता" },
      { word: "म्रियते", meaning: "Dies / perishes", meaningHi: "मरता है" },
      { word: "अजः", meaning: "Unborn", meaningHi: "अजन्मा" },
      { word: "नित्यः", meaning: "Eternal", meaningHi: "सदा रहने वाला" },
      { word: "शाश्वतः", meaning: "Everlasting", meaningHi: "शाश्वत" },
      { word: "शरीरे", meaning: "In the physical body", meaningHi: "शरीर में" }
    ]
  },
  {
    id: "shloka-gita-vasamsi",
    book: "gita",
    bookTitle: "Bhagavad Gītā",
    bookTitleSanskrit: "श्रीमद्भगवद्गीता",
    dev: "वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि। तथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही॥",
    iast: "vāsāṃsi jīrṇāni yathā vihāya navāni gṛhṇāti naro'parāṇi | tathā śarīrāṇi vihāya jīrṇāny anyāni saṃyāti navāni dehī ||",
    translation: "Just as a person discards worn-out garments and puts on new ones, likewise the embodied soul casts off worn-out bodies and enters into other new ones.",
    translationHi: "जैसे मनुष्य पुराने वस्त्रों को त्यागकर दूसरे नए वस्त्र धारण करता है, वैसे ही जीवात्मा पुराने शरीरों को त्यागकर दूसरे नए शरीरों को प्राप्त करती है।",
    source: "Bhagavad Gītā 2.22",
    category: "wisdom",
    categoryLabel: "Wisdom & Life Lessons",
    categoryLabelHi: "सुभाषितानि नीतिश्च",
    words: [
      { word: "वासांसि", meaning: "Garments / clothes", meaningHi: "वस्त्र" },
      { word: "जीर्णानि", meaning: "Worn-out / old", meaningHi: "पुराने" },
      { word: "विहाय", meaning: "Discarding / casting off", meaningHi: "त्यागकर" },
      { word: "नवानि", meaning: "New ones", meaningHi: "नवीन" },
      { word: "देही", meaning: "The embodied soul", meaningHi: "जीवात्मा" }
    ]
  },
  {
    id: "shloka-gita-dhyayato",
    book: "gita",
    bookTitle: "Bhagavad Gītā",
    bookTitleSanskrit: "श्रीमद्भगवद्गीता",
    dev: "ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते। सङ्गात्संजायते कामः कामात्क्रोधोऽभिजायते॥",
    iast: "dhyāyato viṣayān puṃsaḥ saṅgas teṣūpajāyate | saṅgāt saṃjāyate kāmaḥ kāmāt krodho'bhijāyate ||",
    translation: "While contemplating the objects of the senses, a person develops attachment for them; from attachment arises longing (desire), and from unfulfilled desire flares anger.",
    translationHi: "विषयों का निरंतर ध्यान करने वाले मनुष्य की उनमें आसक्ति हो जाती है; आसक्ति से कामना उत्पन्न होती है, और कामना में बाधा पड़ने पर क्रोध उत्पन्न होता है।",
    source: "Bhagavad Gītā 2.62",
    category: "morals",
    categoryLabel: "Moral Values & Character",
    categoryLabelHi: "सदाचारः धर्मश्च",
    words: [
      { word: "ध्यायतः", meaning: "While contemplating", meaningHi: "ध्यान करते हुए" },
      { word: "विषयान्", meaning: "Sense objects", meaningHi: "इंद्रिय विषयों को" },
      { word: "सङ्गः", meaning: "Attachment", meaningHi: "आसक्ति" },
      { word: "कामः", meaning: "Desire / craving", meaningHi: "कामना" },
      { word: "क्रोधः", meaning: "Anger / wrath", meaningHi: "क्रोध" }
    ]
  },
  {
    id: "shloka-gita-krodhad",
    book: "gita",
    bookTitle: "Bhagavad Gītā",
    bookTitleSanskrit: "श्रीमद्भगवद्गीता",
    dev: "क्रोधाद्भवति संमोहः संमोहात्स्मृतिविभ्रमः। स्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति॥",
    iast: "krodhād bhavati saṃmohaḥ saṃmohāt smṛtivibhramaḥ | smṛtibhraṃśād buddhināśo buddhināśāt praṇaśyati ||",
    translation: "From anger arises delusion; from delusion comes bewilderment of memory; from confused memory springs ruin of intellect, and with ruin of intellect, a person is completely lost.",
    translationHi: "क्रोध से सम्मोह (अविवेक) उत्पन्न होता है; सम्मोह से स्मृति भ्रमित हो जाती है; स्मृति भ्रम से बुद्धि का नाश होता है और बुद्धि नष्ट होने पर मनुष्य का सर्वनाश हो जाता है।",
    source: "Bhagavad Gītā 2.63",
    category: "morals",
    categoryLabel: "Moral Values & Character",
    categoryLabelHi: "सदाचारः धर्मश्च",
    words: [
      { word: "संमोहः", meaning: "Delusion / confusion", meaningHi: "अविवेक / भ्रम" },
      { word: "स्मृतिविभ्रमः", meaning: "Loss of memory", meaningHi: "स्मृति का नाश" },
      { word: "बुद्धिनाशः", meaning: "Ruin of intellect", meaningHi: "विवेक का नाश" },
      { word: "प्रणश्यति", meaning: "Perishes / is ruined", meaningHi: "नष्ट हो जाता है" }
    ]
  },
  {
    id: "shloka-gita-shrestha",
    book: "gita",
    bookTitle: "Bhagavad Gītā",
    bookTitleSanskrit: "श्रीमद्भगवद्गीता",
    dev: "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः। स यत्प्रमाणं कुरुते लोकस्तदनुवर्तते॥",
    iast: "yad yad ācarati śreṣṭhas tat tad evetaro janaḥ | sa yat pramāṇaṃ kurute lokas tad anuvartate ||",
    translation: "Whatever standard an exemplary person sets by conduct, that alone common people follow. Whatever benchmark they establish, the entire world emulates.",
    translationHi: "श्रेष्ठ पुरुष जैसा आचरण करते हैं, अन्य सामान्य जन भी वैसा ही आचरण करते हैं। वे जो आदर्श स्थापित करते हैं, समस्त संसार उसी का अनुसरण करता है।",
    source: "Bhagavad Gītā 3.21",
    category: "morals",
    categoryLabel: "Moral Values & Character",
    categoryLabelHi: "सदाचारः धर्मश्च",
    words: [
      { word: "आचरति", meaning: "Practices / conducts", meaningHi: "आचरण करता है" },
      { word: "श्रेष्ठः", meaning: "The noble / leader", meaningHi: "श्रेष्ठ पुरुष" },
      { word: "प्रमाणम्", meaning: "Standard / authority", meaningHi: "आदर्श / प्रमाण" },
      { word: "अनुवर्तते", meaning: "Follows suit", meaningHi: "अनुसरण करता है" }
    ]
  },
  {
    id: "shloka-gita-yada-yada",
    book: "gita",
    bookTitle: "Bhagavad Gītā",
    bookTitleSanskrit: "श्रीमद्भगवद्गीता",
    dev: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
    iast: "yadā yadā hi dharmasya glānir bhavati bhārata | abhyutthānam adharmasya tadātmānaṃ sṛjāmy aham ||",
    translation: "Whenever and wherever there is a decline of righteousness (dharma) and a rampant surge of unrighteousness, O Arjuna, at that time I manifest Myself.",
    translationHi: "हे भारत (अर्जुन)! जब-जब धर्म की हानि और अधर्म की वृद्धि होती है, तब-तब मैं अपने रूप को साकार रूप में प्रकट करता हूँ।",
    source: "Bhagavad Gītā 4.7",
    category: "devotion",
    categoryLabel: "Devotion & Prayer",
    categoryLabelHi: "भक्तिः प्रार्थना च",
    words: [
      { word: "यदा यदा", meaning: "Whenever", meaningHi: "जब-जब" },
      { word: "धर्मस्य", meaning: "Of righteousness", meaningHi: "धर्म की" },
      { word: "ग्लानिः", meaning: "Decline / loss", meaningHi: "हानि" },
      { word: "अधर्मस्य", meaning: "Of unrighteousness", meaningHi: "अधर्म का" },
      { word: "सृजामि", meaning: "I manifest / create", meaningHi: "प्रकट करता हूँ" }
    ]
  },
  {
    id: "shloka-gita-paritranaya",
    book: "gita",
    bookTitle: "Bhagavad Gītā",
    bookTitleSanskrit: "श्रीमद्भगवद्गीता",
    dev: "परित्राणाय साधूनां विनाशाय च दुष्कृताम्। धर्मसंस्थापनार्थाय संभवामि युगे युगे॥",
    iast: "paritrāṇāya sādhūnāṃ vināśāya ca duṣkṛtām | dharmasaṃsthāpanārthāya saṃbhavāmi yuge yuge ||",
    translation: "For the protection of the virtuous, for the annihilation of evildoers, and for the re-establishment of righteousness, I appear age after age.",
    translationHi: "सज्जन पुरुषों की रक्षा के लिए, दुराचारियों के विनाश के लिए और धर्म की सुदृढ़ स्थापना के लिए मैं युग-युग में प्रकट होता हूँ।",
    source: "Bhagavad Gītā 4.8",
    category: "devotion",
    categoryLabel: "Devotion & Prayer",
    categoryLabelHi: "भक्तिः प्रार्थना च",
    words: [
      { word: "परित्राणाय", meaning: "For protection", meaningHi: "रक्षा के लिए" },
      { word: "साधूनाम्", meaning: "Of the noble / good", meaningHi: "सज्जनों की" },
      { word: "विनाशाय", meaning: "For destruction", meaningHi: "विनाश के लिए" },
      { word: "धर्मसंस्थापनार्थाय", meaning: "To firmly establish dharma", meaningHi: "धर्म स्थापना के लिए" },
      { word: "युगे युगे", meaning: "In every era", meaningHi: "युग-युग में" }
    ]
  },
  {
    id: "shloka-gita-jnana-pavitram",
    book: "gita",
    bookTitle: "Bhagavad Gītā",
    bookTitleSanskrit: "श्रीमद्भगवद्गीता",
    dev: "न हि ज्ञानेन सदृशं पवित्रमिह विद्यते। तत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति॥",
    iast: "na hi jñānena sadṛśaṃ pavitram iha vidyate | tat svayaṃ yogasaṃsiddhaḥ kālenātmani vindati ||",
    translation: "In this world, there is nothing as purifying as transcendental knowledge. One who has attained perfection in yoga discovers that wisdom within their own self in due course of time.",
    translationHi: "इस संसार में ज्ञान के समान पवित्र करने वाला वास्तव में कुछ भी नहीं है। निष्काम कर्मयोग में सिद्ध हुआ मनुष्य समय आने पर उस ज्ञान को स्वतः अपनी आत्मा में पा लेता है।",
    source: "Bhagavad Gītā 4.38",
    category: "knowledge",
    categoryLabel: "Knowledge & Education",
    categoryLabelHi: "विद्या ज्ञानं च",
    words: [
      { word: "ज्ञानेन", meaning: "By knowledge", meaningHi: "ज्ञान के" },
      { word: "सदृशम्", meaning: "Equal to / comparable", meaningHi: "समान" },
      { word: "पवित्रम्", meaning: "Purifying", meaningHi: "पवित्र" },
      { word: "विन्दति", meaning: "Finds / attains", meaningHi: "प्राप्त करता है" }
    ]
  },
  {
    id: "shloka-shraddhavan",
    book: "gita",
    bookTitle: "Bhagavad Gītā",
    bookTitleSanskrit: "श्रीमद्भगवद्गीता",
    dev: "श्रद्धावाँल्लभते ज्ञानं तत्परः संयतेन्द्रियः। ज्ञानं लब्ध्वा परां शान्तिमचिरेणाधिगच्छति॥",
    iast: "śraddhāvāḻ labhate jñānaṃ tatparaḥ saṃyatendriyaḥ | jñānaṃ labdhvā parāṃ śāntim acireṇādhigacchati ||",
    translation: "One who has sincere faith, dedicated focus, and mastery over senses attains wisdom; having attained that wisdom, they swiftly reach supreme peace.",
    translationHi: "जो श्रद्धावान है, साधन में तत्पर है और जिसकी इंद्रियाँ संयमित हैं, वह ज्ञान प्राप्त करता है; ज्ञान प्राप्त करके वह अविलंब परम शांति को प्राप्त हो जाता है।",
    source: "Bhagavad Gītā 4.39",
    category: "knowledge",
    categoryLabel: "Knowledge & Education",
    categoryLabelHi: "विद्या ज्ञानं च",
    words: [
      { word: "श्रद्धावान्", meaning: "Full of sincere faith", meaningHi: "श्रद्धा रखने वाला" },
      { word: "लभते", meaning: "Attains / obtains", meaningHi: "प्राप्त करता है" },
      { word: "ज्ञानम्", meaning: "Supreme wisdom", meaningHi: "ज्ञान" },
      { word: "संयतेन्द्रियः", meaning: "With controlled senses", meaningHi: "इंद्रिय-संयमी" },
      { word: "शान्तिम्", meaning: "Peace", meaningHi: "शांति" }
    ]
  },
  {
    id: "shloka-gita-uddharet",
    book: "gita",
    bookTitle: "Bhagavad Gītā",
    bookTitleSanskrit: "श्रीमद्भगवद्गीता",
    dev: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्। आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
    iast: "uddhared ātmanātmānaṃ nātmānam avasādayet | ātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ ||",
    translation: "One should uplift oneself by one's own mind and never degrade oneself. For the mind alone is one's friend, and the mind alone can be one's worst enemy.",
    translationHi: "मनुष्य को चाहिए कि वह अपने मन द्वारा अपना उद्धार करे, अपने को पतन की ओर न ले जाए। क्योंकि मनुष्य का मन ही उसका सबसे बड़ा मित्र है और मन ही उसका सबसे बड़ा शत्रु है।",
    source: "Bhagavad Gītā 6.5",
    category: "wisdom",
    categoryLabel: "Wisdom & Life Lessons",
    categoryLabelHi: "सुभाषितानि नीतिश्च",
    words: [
      { word: "उद्धरेत्", meaning: "One should elevate", meaningHi: "उद्धार करना चाहिए" },
      { word: "आत्मना", meaning: "By oneself / mind", meaningHi: "अपने द्वारा" },
      { word: "आत्मानम्", meaning: "Oneself", meaningHi: "स्वयं को" },
      { word: "बन्धुः", meaning: "Friend / ally", meaningHi: "सच्चा मित्र" },
      { word: "रिपुः", meaning: "Enemy / foe", meaningHi: "शत्रु" }
    ]
  },
  {
    id: "shloka-gita-ananya",
    book: "gita",
    bookTitle: "Bhagavad Gītā",
    bookTitleSanskrit: "श्रीमद्भगवद्गीता",
    dev: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते। तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥",
    iast: "ananyāś cintayanto māṃ ye janāḥ paryupāsate | teṣāṃ nityābhiyuktānāṃ yogakṣemaṃ vahāmy aham ||",
    translation: "To those who worship Me with undivided devotion and meditate constantly upon My divine form, I provide what they lack and preserve what they possess.",
    translationHi: "जो अनन्य भक्तजन निरंतर मेरा चिंतन करते हुए मेरी उपासना करते हैं, उन नित्य-युक्त भक्तों के योग (अप्राप्त की प्राप्ति) और क्षेम (प्राप्त की रक्षा) का वहन मैं स्वयं करता हूँ।",
    source: "Bhagavad Gītā 9.22",
    category: "devotion",
    categoryLabel: "Devotion & Prayer",
    categoryLabelHi: "भक्तिः प्रार्थना च",
    words: [
      { word: "अनन्याः", meaning: "Without distraction / unswerving", meaningHi: "अनन्य भाव से" },
      { word: "चिन्तयन्तः", meaning: "Meditating upon", meaningHi: "चिंतन करते हुए" },
      { word: "योगक्षेमम्", meaning: "Acquisition and protection", meaningHi: "प्राप्ति और संरक्षण" },
      { word: "वहामि", meaning: "I carry / bear", meaningHi: "वहन करता हूँ" }
    ]
  },
  {
    id: "shloka-gita-sarva-dharman",
    book: "gita",
    bookTitle: "Bhagavad Gītā",
    bookTitleSanskrit: "श्रीमद्भगवद्गीता",
    dev: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज। अहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
    iast: "sarvadharmān parityajya mām ekaṃ śaraṇaṃ vraja | ahaṃ tvā sarvapāpebhyo mokṣayiṣyāmi mā śucaḥ ||",
    translation: "Abandoning all external varieties of duties, surrender unto Me alone. I shall liberate you from all sins and consequences; grieve not.",
    translationHi: "संपूर्ण धर्मों और कर्तव्यों के अहंकार को त्यागकर केवल मेरी शरण में आ जाओ। मैं तुम्हें समस्त पापों और बंधनों से मुक्त कर दूँगा, शोक मत करो।",
    source: "Bhagavad Gītā 18.66",
    category: "devotion",
    categoryLabel: "Devotion & Prayer",
    categoryLabelHi: "भक्तिः प्रार्थना च",
    words: [
      { word: "परित्यज्य", meaning: "Surrendering / relinquishing", meaningHi: "त्यागकर" },
      { word: "शरणम्", meaning: "Refuge / surrender", meaningHi: "शरण में" },
      { word: "मोक्षयिष्यामि", meaning: "I will liberate", meaningHi: "मुक्त कर दूँगा" },
      { word: "मा शुचः", meaning: "Do not grieve", meaningHi: "शोक मत करो" }
    ]
  },
  {
    id: "shloka-gita-yatra-yogesvara",
    book: "gita",
    bookTitle: "Bhagavad Gītā",
    bookTitleSanskrit: "श्रीमद्भगवद्गीता",
    dev: "यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः। तत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम॥",
    iast: "yatra yogeśvaraḥ kṛṣṇo yatra pārtho dhanurdharaḥ | tatra śrīr vijayo bhūtir dhruvā nītir matir mama ||",
    translation: "Wherever is Kṛṣṇa, the Lord of Yoga, and wherever is Arjuna, the wielder of the bow, there will surely be prosperity, victory, boundless power, and unwavering justice.",
    translationHi: "जहाँ योगेश्वर भगवान श्रीकृष्ण हैं और जहाँ गांडीवधारी अर्जुन हैं, वहीं श्री (ऐश्वर्य), विजय, विभूति और अचल नीति है — ऐसा मेरा दृढ़ मत है।",
    source: "Bhagavad Gītā 18.78",
    category: "wisdom",
    categoryLabel: "Wisdom & Life Lessons",
    categoryLabelHi: "सुभाषितानि नीतिश्च",
    words: [
      { word: "योगेश्वरः", meaning: "Master of Yoga", meaningHi: "योग के स्वामी" },
      { word: "धनुर्धरः", meaning: "Wielder of bow", meaningHi: "धनुर्धारी" },
      { word: "विजयः", meaning: "Victory", meaningHi: "विजय" },
      { word: "भूतिः", meaning: "Prosperity / power", meaningHi: "ऐश्वर्य" }
    ]
  },

  // ═════════════════════════════════════════════════════════════════
  // 2. VĀLMĪKI RĀMĀYAṆA (वाल्मीकि रामायणम्)
  // ═════════════════════════════════════════════════════════════════
  {
    id: "shloka-ramayana-ma-nishada",
    book: "ramayana",
    bookTitle: "Vālmīki Rāmāyaṇa",
    bookTitleSanskrit: "वाल्मीकि रामायणम्",
    dev: "मा निषाद प्रतिष्ठां त्वमगमः शाश्वतीः समाः। यत्क्रौञ्चमिथुनादेकमवधीः काममोहितम्॥",
    iast: "mā niṣāda pratiṣṭhāṃ tvam agamaḥ śāśvatīḥ samāḥ | yat krauñcamithunād ekam avadhīḥ kāmamohitam ||",
    translation: "You shall not attain renown for endless years to come, O Hunter, since you struck down one of the pair of curlews whilst it was in love.",
    translationHi: "हे बहेलिए! तुझे कभी अनंत वर्षों तक प्रतिष्ठा न मिले, क्योंकि तूने प्रेमरत क्रौंच पक्षी के जोड़े में से एक का वध कर दिया। (यह संपूर्ण संस्कृत साहित्य का प्रथम 'आदि-श्लोक' है।)",
    source: "Vālmīki Rāmāyaṇa 1.2.15 (Ādi-śloka)",
    category: "morals",
    categoryLabel: "Moral Values & Character",
    categoryLabelHi: "सदाचारः धर्मश्च",
    words: [
      { word: "निषाद", meaning: "O Hunter", meaningHi: "हे बहेलिए" },
      { word: "प्रतिष्ठाम्", meaning: "Renown / stability", meaningHi: "प्रतिष्ठा" },
      { word: "कौञ्चमिथुनात्", meaning: "From the pair of birds", meaningHi: "क्रौंच पक्षी के जोड़े से" },
      { word: "अवधीः", meaning: "You killed", meaningHi: "तूने वध किया" }
    ]
  },
  {
    id: "shloka-ramayana-tapah-svadhyaya",
    book: "ramayana",
    bookTitle: "Vālmīki Rāmāyaṇa",
    bookTitleSanskrit: "वाल्मीकि रामायणम्",
    dev: "तपःस्वाध्यायनीरतां तपस्वी वाग्विदां वरम्। नारदं परिपप्रच्छ वाल्मीकिर्मुनिपुङ्गवम्॥",
    iast: "tapaḥsvādhyāyanīratāṃ tapasvī vāgvidāṃ varam | nāradaṃ paripapraccha vālmīkir munipuṅgavam ||",
    translation: "Ascetic Vālmīki inquired of Sage Nārada, the master of eloquence, ever devoted to austerity and self-study, seeking to know the ideal human possessing every virtuous trait.",
    translationHi: "तप और स्वाध्याय में निरंतर लीन रहने वाले वाल्मीकि मुनि ने वाकपटु वक्ता और मुनिश्रेष्ठ नारद जी से आदर्श पुरुष के सद्गुणों के विषय में आदरपूर्वक पूछा।",
    source: "Vālmīki Rāmāyaṇa 1.1.1",
    category: "knowledge",
    categoryLabel: "Knowledge & Education",
    categoryLabelHi: "विद्या ज्ञानं च",
    words: [
      { word: "तपःस्वाध्याय", meaning: "Austerity and sacred study", meaningHi: "तपस्या और स्वाध्याय" },
      { word: "वाग्विदां वरम्", meaning: "Foremost of speakers", meaningHi: "विद्वानों में श्रेष्ठ" },
      { word: "परिपप्रच्छ", meaning: "Inquired with reverence", meaningHi: "सादर पूछा" }
    ]
  },
  {
    id: "shloka-ramayana-ramo-vigrahavan",
    book: "ramayana",
    bookTitle: "Vālmīki Rāmāyaṇa",
    bookTitleSanskrit: "वाल्मीकि रामायणम्",
    dev: "रामो विग्रहवान् धर्मः साधुः सत्यपराक्रमः। राजा सर्वस्य लोकस्य देवानामिव वासवः॥",
    iast: "rāmo vigrahavān dharmaḥ sādhuḥ satyaparākramaḥ | rājā sarvasya lokasya devānām iva vāsavaḥ ||",
    translation: "Lord Rāma is righteousness (Dharma) personified in human form. He is gentle, noble, possesses true and unfailing valor, and protects the entire world just as Indra guides the celestial devas.",
    translationHi: "भगवान राम साक्षात् धर्म के मूर्त रूप हैं। वे साधु, सत्यप्रतिज्ञ और अद्वितीय पराक्रमी हैं। वे समस्त संसार के राजा हैं, जैसे देवताओं के राजा इंद्र हैं।",
    source: "Vālmīki Rāmāyaṇa 3.37.13 (Mārīca to Rāvaṇa)",
    category: "morals",
    categoryLabel: "Moral Values & Character",
    categoryLabelHi: "सदाचारः धर्मश्च",
    words: [
      { word: "विग्रहवान्", meaning: "Embodied / personified", meaningHi: "मूर्त रूप" },
      { word: "धर्मः", meaning: "Righteousness / duty", meaningHi: "धर्म" },
      { word: "सत्यपराक्रमः", meaning: "Of true, righteous valor", meaningHi: "सत्य पराक्रमी" },
      { word: "वासवः", meaning: "Lord Indra", meaningHi: "इंद्रदेव" }
    ]
  },
  {
    id: "shloka-ramayana-anirvedah",
    book: "ramayana",
    bookTitle: "Vālmīki Rāmāyaṇa",
    bookTitleSanskrit: "वाल्मीकि रामायणम्",
    dev: "अनिर्वेदः श्रियो मूलमनिर्वेदः परं सुखम्। अनिर्वेदो हि सततं सर्वार्थेषु प्रवर्तकः॥",
    iast: "anirvedaḥ śriyo mūlam anirvedaḥ paraṃ sukham | anirvedo hi satataṃ sarvārtheṣu pravartakaḥ ||",
    translation: "Steadfast perseverance without despair is the root of all fortune; perseverance is the source of supreme happiness. It is steadfast enthusiasm that brings all noble tasks to glorious fulfillment.",
    translationHi: "उत्साह और निराशा का अभाव ही समस्त समृद्धि की जड़ है, और वही परम सुख का स्रोत है। निरंतर प्रयत्नशीलता ही सभी कार्यों को सिद्ध करती है। (हनुमान जी का सुंदरकांड में आत्म-वचन)।",
    source: "Vālmīki Rāmāyaṇa 5.12.11 (Sundarakāṇḍa)",
    category: "wisdom",
    categoryLabel: "Wisdom & Life Lessons",
    categoryLabelHi: "सुभाषितानि नीतिश्च",
    words: [
      { word: "अनिर्वेदः", meaning: "Freedom from despondency / grit", meaningHi: "निराशा का अभाव / उत्साह" },
      { word: "श्रियः", meaning: "Of prosperity / success", meaningHi: "समृद्धि की" },
      { word: "मूलम्", meaning: "The root / foundation", meaningHi: "जड़ / मूल" },
      { word: "प्रवर्तकः", meaning: "The driver / inspirer", meaningHi: "प्रेरक" }
    ]
  },
  {
    id: "shloka-ramayana-shoko-nashayati",
    book: "ramayana",
    bookTitle: "Vālmīki Rāmāyaṇa",
    bookTitleSanskrit: "वाल्मीकि रामायणम्",
    dev: "शोकनाशयते धैर्यं शोकनाशयते श्रुतम्। शोकनाशयते सर्वं नास्ति शोकसमों रिपुः॥",
    iast: "śoko nāśayate dhairyaṃ śoko nāśayate śrutam | śoko nāśayate sarvaṃ nāsti śokasamo ripuḥ ||",
    translation: "Grief and despondency destroy courage; grief destroys learned wisdom; grief destroys everything. Indeed, there is no enemy as devastating as grief.",
    translationHi: "शोक धैर्य को नष्ट कर देता है, शोक ज्ञान को नष्ट कर देता है और शोक मनुष्य के सर्वस्व को नष्ट कर देता है। संसार में शोक के समान कोई दूसरा शत्रु नहीं है।",
    source: "Vālmīki Rāmāyaṇa 2.22.29 (Ayodhyākāṇḍa)",
    category: "wisdom",
    categoryLabel: "Wisdom & Life Lessons",
    categoryLabelHi: "सुभाषितानि नीतिश्च",
    words: [
      { word: "शोकः", meaning: "Grief / sorrow", meaningHi: "शोक / विषाद" },
      { word: "धैर्यम्", meaning: "Courage / fortitude", meaningHi: "धैर्य" },
      { word: "श्रुतम्", meaning: "Acquired wisdom", meaningHi: "ज्ञान" },
      { word: "रिपुः", meaning: "Enemy", meaningHi: "शत्रु" }
    ]
  },
  {
    id: "shloka-ramayana-janani",
    book: "ramayana",
    bookTitle: "Vālmīki Rāmāyaṇa",
    bookTitleSanskrit: "वाल्मीकि रामायणम्",
    dev: "अपि स्वर्णमयी लङ्का न मे लक्ष्मण रोचते। जननी जन्मभूमिश्च स्वर्गादपि गरीयसी॥",
    iast: "api svarṇamayī laṅkā na me lakṣmaṇa rocate | jananī janmabhūmiśca svargādapi garīyasī ||",
    translation: "Even though this Laṅkā is fashioned entirely of gold, O Lakṣmaṇa, it does not appeal to my heart. One's mother and motherland are far superior even to the heavens.",
    translationHi: "हे लक्ष्मण! यद्यपि यह लंका स्वर्ण की बनी हुई है, फिर भी मुझे इसमें कोई आकर्षण नहीं है। माता और जन्मभूमि स्वर्ग से भी बढ़कर श्रेष्ठ हैं।",
    source: "Vālmīki Rāmāyaṇa 6.124.17 (Yuddhakāṇḍa)",
    category: "morals",
    categoryLabel: "Moral Values & Character",
    categoryLabelHi: "सदाचारः धर्मश्च",
    words: [
      { word: "स्वर्णमयी", meaning: "Made of gold", meaningHi: "सोने की बनी" },
      { word: "रोचते", meaning: "Appeals / pleases", meaningHi: "रुचिकर लगती है" },
      { word: "जननी", meaning: "The mother", meaningHi: "माता" },
      { word: "जन्मभूमिः", meaning: "The motherland", meaningHi: "जन्मभूमि" },
      { word: "गरीयसी", meaning: "Greater / higher", meaningHi: "श्रेष्ठतर" }
    ]
  },

  // ═════════════════════════════════════════════════════════════════
  // 3. THE UPANIṢADS (उपनिषदः)
  // ═════════════════════════════════════════════════════════════════
  {
    id: "shloka-isavasya-1",
    book: "upanishads",
    bookTitle: "The Upaniṣads",
    bookTitleSanskrit: "उपनिषदः",
    dev: "ॐ ईशा वास्यमिदं सर्वं यत्किञ्च जगत्यां जगत्। तेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम्॥",
    iast: "oṃ īśā vāsyam idaṃ sarvaṃ yat kiñca jagatyāṃ jagat | tena tyaktena bhuñjīthā mā gṛdhaḥ kasyasvid dhanam ||",
    translation: "All this, whatsoever moves in this changing universe, is pervaded by the Supreme Divine. Enjoy life through detached renunciation; do not covet anyone's wealth.",
    translationHi: "इस परिवर्तनशील संसार में जो कुछ भी चराचर है, वह सब ईश्वर से व्याप्त है। त्याग भाव से उसका उपभोग करो, किसी के धन की लालसा मत करो।",
    source: "Īśāvāsya Upaniṣad 1",
    category: "peace",
    categoryLabel: "Peace & Meditation",
    categoryLabelHi: "शान्तिः ध्यानं च",
    words: [
      { word: "ईशा वास्यम्", meaning: "Pervaded by God", meaningHi: "ईश्वर से व्याप्त" },
      { word: "त्यक्तेन", meaning: "With renunciation / detachment", meaningHi: "त्याग भाव से" },
      { word: "भुञ्जीथाः", meaning: "Enjoy / sustain", meaningHi: "उपभोग करो" },
      { word: "मा गृधः", meaning: "Do not covet / be greedy", meaningHi: "लोभ मत करो" }
    ]
  },
  {
    id: "shloka-purnamada",
    book: "upanishads",
    bookTitle: "The Upaniṣads",
    bookTitleSanskrit: "उपनिषदः",
    dev: "ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते। पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते॥",
    iast: "oṃ pūrṇamadaḥ pūrṇamidaṃ pūrṇāt pūrṇamudacyate | pūrṇasya pūrṇamādāya pūrṇamevāvaśiṣyate ||",
    translation: "That unmanifest Reality is infinite fullness; this manifest world is infinite fullness. From fullness emanates fullness. Even when fullness is drawn from fullness, fullness alone remains.",
    translationHi: "वह परब्रह्म पूर्ण है, यह प्रत्यक्ष जगत भी पूर्ण है। उस पूर्ण से ही यह पूर्ण प्रकट होता है। पूर्ण में से पूर्ण को निकाल लेने पर भी पूर्ण ही शेष रहता है।",
    source: "Īśāvāsya Upaniṣad Śāntimantra",
    category: "peace",
    categoryLabel: "Peace & Meditation",
    categoryLabelHi: "शान्तिः ध्यानं च",
    words: [
      { word: "पूर्णम्", meaning: "Whole / complete / infinite", meaningHi: "परम पूर्ण" },
      { word: "अदः", meaning: "That (transcendent)", meaningHi: "वह" },
      { word: "इदम्", meaning: "This (immanent)", meaningHi: "यह" },
      { word: "उदच्यते", meaning: "Arises / manifests", meaningHi: "प्रकट होता है" },
      { word: "अवशिष्यते", meaning: "Remains intact", meaningHi: "शेष रहता है" }
    ]
  },
  {
    id: "shloka-asato-ma",
    book: "upanishads",
    bookTitle: "The Upaniṣads",
    bookTitleSanskrit: "उपनिषदः",
    dev: "असतो मा सद्गमय तमसो मा ज्योतिर्गमय। मृत्योर्मा अमृतं गमय॥",
    iast: "asato mā sad gamaya tamaso mā jyotir gamaya | mṛtyor mā amṛtaṃ gamaya ||",
    translation: "Lead me from ignorance to truth. Lead me from darkness to spiritual light. Lead me from mortality to immortality.",
    translationHi: "मुझे असत्य से सत्य की ओर ले चलो। मुझे अज्ञान रूपी अंधकार से ज्ञान के प्रकाश की ओर ले चलो। मुझे नश्वरता से अमरत्व की ओर ले चलो।",
    source: "Bṛhadāraṇyaka Upaniṣad 1.3.28",
    category: "peace",
    categoryLabel: "Peace & Meditation",
    categoryLabelHi: "शान्तिः ध्यानं च",
    words: [
      { word: "असतः", meaning: "From untruth", meaningHi: "असत्य से" },
      { word: "सत्", meaning: "To reality / truth", meaningHi: "सत्य की ओर" },
      { word: "तमसः", meaning: "From darkness", meaningHi: "अंधकार से" },
      { word: "ज्योतिः", meaning: "To illumination", meaningHi: "प्रकाश की ओर" },
      { word: "अमृतम्", meaning: "To immortality", meaningHi: "अमरता की ओर" }
    ]
  },
  {
    id: "shloka-sarve-bhavantu",
    book: "upanishads",
    bookTitle: "The Upaniṣads",
    bookTitleSanskrit: "उपनिषदः",
    dev: "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः। सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत्॥",
    iast: "sarve bhavantu sukhinaḥ sarve santu nirāmayāḥ | sarve bhadrāṇi paśyantu mā kaścid duḥkhabhāg bhavet ||",
    translation: "May all beings be happy. May all beings be free from sickness. May all behold what is auspicious. May no soul suffer sorrow.",
    translationHi: "सभी प्राणी सुखी हों, सभी निरोगी हों। सभी कल्याण और शुभ देखें, किसी को भी दुःख का भागी न होना पड़े।",
    source: "Bṛhadāraṇyaka Upaniṣad Śāntimantra",
    category: "peace",
    categoryLabel: "Peace & Meditation",
    categoryLabelHi: "शान्तिः ध्यानं च",
    words: [
      { word: "सर्वे", meaning: "All beings", meaningHi: "सभी" },
      { word: "सुखिनः", meaning: "Happy / joyous", meaningHi: "सुखी" },
      { word: "निरामयाः", meaning: "Free from diseases", meaningHi: "रोगमुक्त" },
      { word: "भद्राणि", meaning: "Auspicious things", meaningHi: "शुभ / कल्याण" },
      { word: "पश्यन्तु", meaning: "May they behold", meaningHi: "देखें" },
      { word: "दुःखभाक्", meaning: "Partaker of sorrow", meaningHi: "दुःख का भागी" }
    ]
  },
  {
    id: "shloka-sahanavavatu",
    book: "upanishads",
    bookTitle: "The Upaniṣads",
    bookTitleSanskrit: "उपनिषदः",
    dev: "ॐ सह नाववतु सह नौ भुनक्तु सह वीर्यं करवावहै। तेजस्वि नावधीतमस्तु मा विद्विषावहै॥",
    iast: "oṃ saha nāvavatu saha nau bhunaktu saha vīryaṃ karavāvahai | tejasvi nāvadhītamastu mā vidviṣāvahai ||",
    translation: "May the Supreme protect us both (teacher and pupil); may we be nurtured together; may we work together with boundless vigor. May our study be illuminated with clarity; may we never harbor discord.",
    translationHi: "परमात्मा हम दोनों (गुरु-शिष्य) की साथ-साथ रक्षा करें, हमारा साथ पालन-पोषण करें, हम साथ मिलकर सामर्थ्यवान कार्य करें, हमारी शिक्षा तेजस्वी हो, और हम परस्पर कभी द्वेष न करें।",
    source: "Taittirīya Upaniṣad Śāntipāṭha",
    category: "peace",
    categoryLabel: "Peace & Meditation",
    categoryLabelHi: "शान्तिः ध्यानं च",
    words: [
      { word: "सह", meaning: "Together", meaningHi: "साथ-साथ" },
      { word: "नाववतु", meaning: "Protect us both", meaningHi: "हम दोनों की रक्षा करें" },
      { word: "वीर्यम्", meaning: "Strength / energy", meaningHi: "सामर्थ्य" },
      { word: "अधीतम्", meaning: "Our learning", meaningHi: "अध्ययन" },
      { word: "मा विद्विषावहै", meaning: "May we never resent each other", meaningHi: "हम द्वेष न करें" }
    ]
  },
  {
    id: "shloka-taittiriya-satyam-vada",
    book: "upanishads",
    bookTitle: "The Upaniṣads",
    bookTitleSanskrit: "उपनिषदः",
    dev: "सत्यं वद। धर्मं चर। स्वाध्यायान्मा प्रमदः। मातृदेवो भव। पितृदेवो भव। आचार्यदेवो भव॥",
    iast: "satyaṃ vada | dharmaṃ cara | svādhyāyān mā pramadaḥ | mātṛdevo bhava | pitṛdevo bhava | ācāryadevo bhava ||",
    translation: "Speak the truth. Practice righteousness. Do not neglect sacred study. Revere your mother as divine; revere your father as divine; revere your teacher as divine.",
    translationHi: "सत्य बोलो। धर्म का आचरण करो। स्वाध्याय में प्रमाद (आलस्य) मत करो। माता को देवता तुल्य मानो। पिता को देवता तुल्य मानो। गुरु को देवता तुल्य मानो। (दीक्षांत उपदेश)।",
    source: "Taittirīya Upaniṣad 1.11.1 (Śikṣāvallī)",
    category: "morals",
    categoryLabel: "Moral Values & Character",
    categoryLabelHi: "सदाचारः धर्मश्च",
    words: [
      { word: "सत्यं वद", meaning: "Speak the truth", meaningHi: "सत्य बोलो" },
      { word: "धर्मं चर", meaning: "Walk in righteousness", meaningHi: "धर्म का पालन करो" },
      { word: "स्वाध्यायात्", meaning: "From self-study", meaningHi: "स्वाध्याय से" },
      { word: "मातृदेवः", meaning: "One who reveres mother as divine", meaningHi: "माता को देव मानने वाला" }
    ]
  },
  {
    id: "shloka-mundaka-satyameva",
    book: "upanishads",
    bookTitle: "The Upaniṣads",
    bookTitleSanskrit: "उपनिषदः",
    dev: "सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः। येनाक्रमन्त्यृषयो ह्याप्तकामा यत्र तत् सत्यस्य परमं निधानम्॥",
    iast: "satyameva jayate nānṛtaṃ satyena panthā vitato devayānaḥ | yenākramanty ṛṣayo hy āptakāmā yatra tat satyasya paramaṃ nidhānam ||",
    translation: "Truth alone triumphs, never untruth. Through truth is paved the divine path along which the fulfilled sages ascend to where lies the supreme treasure of Truth.",
    translationHi: "सत्य की ही सदा विजय होती है, असत्य की नहीं। सत्य के द्वारा ही वह दिव्य देवयान मार्ग प्रशस्त होता है, जिससे निष्काम ऋषिगण सत्य के परम धाम को प्राप्त करते हैं।",
    source: "Muṇḍaka Upaniṣad 3.1.6",
    category: "morals",
    categoryLabel: "Moral Values & Character",
    categoryLabelHi: "सदाचारः धर्मश्च",
    words: [
      { word: "सत्यमेव", meaning: "Truth alone", meaningHi: "सत्य ही" },
      { word: "जयते", meaning: "Triumphs / wins", meaningHi: "जीतता है" },
      { word: "नानृतम्", meaning: "Not untruth", meaningHi: "झूठ नहीं" },
      { word: "निधानम्", meaning: "Supreme treasure / abode", meaningHi: "परम धाम / खजाना" }
    ]
  },
  {
    id: "shloka-katha-anoraniyan",
    book: "upanishads",
    bookTitle: "The Upaniṣads",
    bookTitleSanskrit: "उपनिषदः",
    dev: "अणोरणीयान् महतो महीयान् आत्मास्य जन्तोर्निहितो गुहायाम्। तमक्रतुः पश्यति वीतशोको धातुप्रसादान्महिमानमात्मनः॥",
    iast: "aṇor aṇīyān mahato mahīyān ātmāsya jantor nihito guhāyām | tam akratuḥ paśyati vītaśoko dhātuprasādān mahimānam ātmanaḥ ||",
    translation: "Subtler than the subtlest atom and grander than the greatest cosmos, the Self is seated in the heart of all beings. The serene seeker, free from desires and grief, perceives this glory of the Self.",
    translationHi: "सूक्ष्म से भी अति सूक्ष्म और महान से भी अति महान यह आत्मा प्रत्येक प्राणी के हृदय रूपी गुहा में स्थित है। कामना-रहित और शोक-रहित साधक परमात्मा की कृपा से इस आत्म-महिमा का दर्शन करता है।",
    source: "Kaṭha Upaniṣad 1.2.20",
    category: "peace",
    categoryLabel: "Peace & Meditation",
    categoryLabelHi: "शान्तिः ध्यानं च",
    words: [
      { word: "अणोरणीयान्", meaning: "Subtler than atom", meaningHi: "अणु से भी सूक्ष्म" },
      { word: "महतो महीयान्", meaning: "Greater than the greatest", meaningHi: "महान से भी महान" },
      { word: "गुहायाम्", meaning: "In the cave of the heart", meaningHi: "हृदय-गुहा में" },
      { word: "वीतशोकः", meaning: "Free from grief", meaningHi: "शोक-मुक्त" }
    ]
  },
  {
    id: "shloka-katha-uttishthata",
    book: "upanishads",
    bookTitle: "The Upaniṣads",
    bookTitleSanskrit: "उपनिषदः",
    dev: "उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत। क्षुरस्य धारा निशिता दुरत्यया दुर्गं पथस्तत्कवयो वदन्ति॥",
    iast: "uttiṣṭhata jāgrata prāpya varān nibodhata | kṣurasya dhārā niśitā duratyayā durgaṃ pathas tat kavayo vadanti ||",
    translation: "Arise! Awake! Approach the enlightened masters and realize the Truth. Sharp as the edge of a razor and difficult to tread, so the wise describe this spiritual path.",
    translationHi: "उठो! जागो! और श्रेष्ठ गुरुओं के सान्निध्य में जाकर आत्म-ज्ञान को प्राप्त करो। ज्ञानी जन कहते हैं कि यह मार्ग छुरे की तीक्ष्ण धार के समान अत्यंत दुर्गम और कठिन है।",
    source: "Kaṭha Upaniṣad 1.3.14",
    category: "knowledge",
    categoryLabel: "Knowledge & Education",
    categoryLabelHi: "विद्या ज्ञानं च",
    words: [
      { word: "उत्तिष्ठत", meaning: "Arise", meaningHi: "उठो" },
      { word: "जाग्रत", meaning: "Awake", meaningHi: "जागो" },
      { word: "निबोधत", meaning: "Know / realize", meaningHi: "जानो" },
      { word: "क्षुरस्य धारा", meaning: "Razor's edge", meaningHi: "छुरे की धार" }
    ]
  },
  {
    id: "shloka-vasudhaiva",
    book: "upanishads",
    bookTitle: "The Upaniṣads",
    bookTitleSanskrit: "उपनिषदः",
    dev: "अयं निजः परो वेति गणना लघुचेतसाम्। उदारचरितानां तु वसुधैव कुटुम्बकम्॥",
    iast: "ayaṃ nijaḥ paro veti gaṇanā laghucetasām | udāracaritānāṃ tu vasudhaiva kuṭumbakam ||",
    translation: "'This one is mine, that one is an outsider' is the narrow calculation of petty minds. For people of magnanimous character, the entire Earth is one united family.",
    translationHi: "'यह मेरा है और वह पराया है' ऐसी गणना संकीर्ण बुद्धि वाले करते हैं। उदार चरित्र वाले मनुष्यों के लिए तो संपूर्ण पृथ्वी ही एक परिवार है।",
    source: "Mahā Upaniṣad 6.71",
    category: "wisdom",
    categoryLabel: "Wisdom & Life Lessons",
    categoryLabelHi: "सुभाषितानि नीतिश्च",
    words: [
      { word: "अयम्", meaning: "This person", meaningHi: "यह" },
      { word: "निजः", meaning: "One's own", meaningHi: "अपना" },
      { word: "परः", meaning: "Stranger / other", meaningHi: "पराया" },
      { word: "लघुचेतसाम्", meaning: "Of small-minded", meaningHi: "संकीर्ण मन वालों का" },
      { word: "उदारचरितानाम्", meaning: "Of noble-hearted", meaningHi: "उदार चरित्र वालों का" },
      { word: "वसुधा", meaning: "The Earth", meaningHi: "पृथ्वी" },
      { word: "कुटुम्बकम्", meaning: "Family", meaningHi: "परिवार" }
    ]
  },

  // ═════════════════════════════════════════════════════════════════
  // 4. THE VEDAS (वेदाः)
  // ═════════════════════════════════════════════════════════════════
  {
    id: "shloka-gayatri",
    book: "vedas",
    bookTitle: "The Vedas",
    bookTitleSanskrit: "वेदाः",
    dev: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥",
    iast: "oṃ bhūr bhuvaḥ svaḥ tat savitur vareṇyaṃ bhargo devasya dhīmahi dhiyo yo naḥ pracodayāt ||",
    translation: "We meditate upon the supreme, adorable effulgence of that Divine Sun; may that sacred radiance illumine and guide our intellect.",
    translationHi: "हम उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा का ध्यान करते हैं; वह हमारी बुद्धि को सन्मार्ग में प्रेरित करे।",
    source: "Ṛgveda 3.62.10 (Gāyatrī Mantra)",
    category: "devotion",
    categoryLabel: "Devotion & Prayer",
    categoryLabelHi: "भक्तिः प्रार्थना च",
    words: [
      { word: "ॐ", meaning: "Sacred primordial sound", meaningHi: "परब्रह्म का ओंकार" },
      { word: "भूः", meaning: "Physical realm", meaningHi: "भूलोक" },
      { word: "भुवः", meaning: "Subtle realm", meaningHi: "भुवर्लोक" },
      { word: "स्वः", meaning: "Celestial realm", meaningHi: "स्वर्गलोक" },
      { word: "सवितुः", meaning: "Of Creator Sun", meaningHi: "सूर्यदेव का" },
      { word: "धीमहि", meaning: "We meditate", meaningHi: "हम ध्यान करते हैं" },
      { word: "प्रचोदयात्", meaning: "May guide / inspire", meaningHi: "प्रेरित करे" }
    ]
  },
  {
    id: "shloka-mahamrityunjaya",
    book: "vedas",
    bookTitle: "The Vedas",
    bookTitleSanskrit: "वेदाः",
    dev: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥",
    iast: "oṃ tryambakaṃ yajāmahe sugandhiṃ puṣṭivardhanam | urvārukamiva bandhanān mṛtyor mukṣīya māmṛtāt ||",
    translation: "We worship the Three-Eyed Lord Śiva, fragrant and the nourisher of all life. Just as a ripe melon naturally frees itself from the vine, may we be liberated from death, not from immortality.",
    translationHi: "हम सुगंधित और समस्त जीवन का पोषण करने वाले त्रिनेत्रधारी भगवान शिव की आराधना करते हैं। जैसे ककड़ी पककर बेल से सहज मुक्त हो जाती है, वैसे ही हम मृत्यु से मुक्त हों, अमरत्व से नहीं।",
    source: "Ṛgveda 7.59.12 / Śukla Yajurveda 3.60",
    category: "devotion",
    categoryLabel: "Devotion & Prayer",
    categoryLabelHi: "भक्तिः प्रार्थना च",
    words: [
      { word: "त्र्यम्बकम्", meaning: "Three-eyed Lord", meaningHi: "त्रिनेत्रधारी शिव" },
      { word: "यजामहे", meaning: "We worship", meaningHi: "हम पूजन करते हैं" },
      { word: "पुष्टिवर्धनम्", meaning: "Nourisher of growth", meaningHi: "पोषण बढ़ाने वाला" },
      { word: "उर्वारुकम्", meaning: "Cucumber / melon", meaningHi: "ककड़ी" },
      { word: "अमृतात्", meaning: "From immortality", meaningHi: "अमरता से" }
    ]
  },
  {
    id: "shloka-veda-samgacchadhvam",
    book: "vedas",
    bookTitle: "The Vedas",
    bookTitleSanskrit: "वेदाः",
    dev: "सं गच्छध्वं सं वदध्वं सं वो मनांसि जानताम्। देवा भागं यथा पूर्वे सञ्जानाना उपासते॥",
    iast: "saṃ gacchadhvaṃ saṃ vadadhvaṃ saṃ vo manāṃsi jānatām | devā bhāgaṃ yathā pūrve sañjānānā upāsate ||",
    translation: "Walk together in harmony; speak together in truth; let your minds comprehend together as one; just as the enlightened devas in ancient times shared their offerings in accord.",
    translationHi: "तुम सब साथ मिलकर चलो, साथ मिलकर बोलो, तुम्हारे मन एक समान चिंतन करें। जिस प्रकार प्राचीन काल में ज्ञानी देवता एकमत होकर अपने भाग को ग्रहण करते थे।",
    source: "Ṛgveda 10.191.2 (Saṃjñāna Sūkta)",
    category: "peace",
    categoryLabel: "Peace & Meditation",
    categoryLabelHi: "शान्तिः ध्यानं च",
    words: [
      { word: "सं गच्छध्वम्", meaning: "Walk together", meaningHi: "साथ चलो" },
      { word: "सं वदध्वम्", meaning: "Speak together", meaningHi: "एक स्वर में बोलो" },
      { word: "मनांसि", meaning: "Minds / hearts", meaningHi: "मन" },
      { word: "सञ्जानानाः", meaning: "Being in harmonious accord", meaningHi: "एकमत होकर" }
    ]
  },
  {
    id: "shloka-veda-ekam-sat",
    book: "vedas",
    bookTitle: "The Vedas",
    bookTitleSanskrit: "वेदाः",
    dev: "इन्द्रं मित्रं वरुणमग्निमाहुरथो दिव्यः स सुपर्णो गरुत्मान्। एकं सद्विप्रा बहुधा वदन्त्यग्निं यमं मातरिश्वानमाहुः॥",
    iast: "indraṃ mitraṃ varuṇam agnim āhur atho divyaḥ sa suparṇo garutmān | ekaṃ sad viprā bahudhā vadanty agniṃ yamaṃ mātariśvānam āhuḥ ||",
    translation: "They call Him Indra, Mitra, Varuṇa, and Agni; and He is the noble, celestial winged Garuḍa. Reality is One; the illumined sages call It by many names.",
    translationHi: "ज्ञानी पुरुष उसी एक परमात्मा को इंद्र, मित्र, वरुण, अग्नि और दिव्य गरुड़ कहते हैं। सत्य केवल एक ही है, जिसे विद्वान अनेक नामों से पुकारते हैं।",
    source: "Ṛgveda 1.164.46",
    category: "peace",
    categoryLabel: "Peace & Meditation",
    categoryLabelHi: "शान्तिः ध्यानं च",
    words: [
      { word: "एकम्", meaning: "The One", meaningHi: "एक ही" },
      { word: "सत्", meaning: "Ultimate Reality / Truth", meaningHi: "परम सत्य" },
      { word: "विप्राः", meaning: "The wise sages", meaningHi: "विद्वान / ऋषि" },
      { word: "बहुधा", meaning: "In diverse ways", meaningHi: "अनेक रूपों में" }
    ]
  },
  {
    id: "shloka-veda-madhu-vata",
    book: "vedas",
    bookTitle: "The Vedas",
    bookTitleSanskrit: "वेदाः",
    dev: "मधु वाता ऋतायते मधु क्षरन्ति सिन्धवः। माध्वीर्नः सन्त्वोषधीः। मधु नक्तमुतोषसो मधुमत्पार्थिवं रजः॥",
    iast: "madhu vātā ṛtāyate madhu kṣaranti sindhavaḥ | mādhvīr naḥ santv oṣadhīḥ | madhu naktam utoṣaso madhumat pārthivaṃ rajaḥ ||",
    translation: "May the breezes blow sweet with honeyed grace; may the rivers flow sweet; may the medicinal herbs be sweet to us. May the nights and dawns be sweet; may the soil of our Mother Earth be filled with sweetness.",
    translationHi: "वायु हमारे लिए मधुरता बहाए, नदियां मधुर जल प्रवाहित करें, समस्त औषधियां हमारे लिए अमृतमयी हों। रातें और प्रातःकाल सुखद हों और हमारी मातृभूमि की धूलि भी कल्याणमयी हो।",
    source: "Ṛgveda 1.90.6 (Madhu Sūkta)",
    category: "daily",
    categoryLabel: "Morning Prayers & Daily Recitation",
    categoryLabelHi: "प्रातःस्मरणम् नित्यप्रार्थना च",
    words: [
      { word: "मधु", meaning: "Sweet / honeyed / blissful", meaningHi: "मधुर / कल्याणकारी" },
      { word: "वाताः", meaning: "Breezes / winds", meaningHi: "हवाएँ" },
      { word: "सिन्धवः", meaning: "Rivers", meaningHi: "नदियाँ" },
      { word: "ओषधीः", meaning: "Herbs / plants", meaningHi: "औषधियाँ" }
    ]
  },
  {
    id: "shloka-veda-shanti-dyauh",
    book: "vedas",
    bookTitle: "The Vedas",
    bookTitleSanskrit: "वेदाः",
    dev: "ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः। वनस्पतयः शान्तिर्विश्वेदेवाः शान्तिर्ब्रह्म शान्तिः सर्वं शान्तिः शान्तिरेव शान्तिः सा मा शान्तिरेधि॥",
    iast: "oṃ dyauḥ śāntir antarikṣaṃ śāntiḥ pṛthivī śāntir āpaḥ śāntir oṣadhayaḥ śāntiḥ | vanaspatayaḥ śāntir viśvedevāḥ śāntir brahma śāntiḥ sarvaṃ śāntiḥ śāntir eva śāntiḥ sā mā śāntir edhi ||",
    translation: "May there be peace in celestial realms, peace in the atmosphere, peace on Earth, peace in the waters, peace in herbs and trees. May all gods radiate peace, may the Supreme Brahman be peace, may peace pervade all creation.",
    translationHi: "द्युलोक शांत हो, अंतरिक्ष शांत हो, पृथ्वी शांत हो, जल शांत हो, औषधियां और वनस्पतियां शांत हों। समस्त देवगण शांत हों, परब्रह्म शांत हो, सब कुछ शांत हो और वह शांति मुझे प्राप्त हो।",
    source: "Śukla Yajurveda 36.17 (Śāntipāṭha)",
    category: "peace",
    categoryLabel: "Peace & Meditation",
    categoryLabelHi: "शान्तिः ध्यानं च",
    words: [
      { word: "द्यौः", meaning: "Heavenly skies", meaningHi: "स्वर्ग / आकाश" },
      { word: "शान्तिः", meaning: "Peace and harmony", meaningHi: "शांति" },
      { word: "पृथिवी", meaning: "Mother Earth", meaningHi: "पृथ्वी" },
      { word: "आपः", meaning: "Waters", meaningHi: "जल" }
    ]
  },

  // ═════════════════════════════════════════════════════════════════
  // 5. HITOPADEŚA (हितोपदेशः)
  // ═════════════════════════════════════════════════════════════════
  {
    id: "shloka-vidya-dadati",
    book: "hitopadesha",
    bookTitle: "Hitopadeśa",
    bookTitleSanskrit: "हितोपदेशः",
    dev: "विद्या ददाति विनयं विनयाद्याति पात्रताम्। पात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम्॥",
    iast: "vidyā dadāti vinayaṃ vinayād yāti pātratām | pātratvād dhanam āpnoti dhanād dharmaṃ tataḥ sukham ||",
    translation: "Knowledge bestows humility; from humility springs worthiness; from worthiness one acquires honorable wealth; through wealth one upholds righteous duty (dharma), and thence true happiness ensues.",
    translationHi: "विद्या से विनम्रता आती है; विनम्रता से योग्यता आती है; योग्यता से धन प्राप्त होता है; धर्मपूर्ण धन से धर्म का आचरण होता है और उससे वास्तविक सुख मिलता है।",
    source: "Hitopadeśa (Prastāvikā 32)",
    category: "knowledge",
    categoryLabel: "Knowledge & Education",
    categoryLabelHi: "विद्या ज्ञानं च",
    words: [
      { word: "विद्या", meaning: "True knowledge", meaningHi: "ज्ञान / विद्या" },
      { word: "विनयम्", meaning: "Humility", meaningHi: "विनम्रता" },
      { word: "पात्रताम्", meaning: "Worthiness / competence", meaningHi: "योग्यता" },
      { word: "धनम्", meaning: "Wealth", meaningHi: "धन" },
      { word: "धर्मम्", meaning: "Righteous duty", meaningHi: "धर्म" }
    ]
  },
  {
    id: "shloka-hitopadesha-varam-eko",
    book: "hitopadesha",
    bookTitle: "Hitopadeśa",
    bookTitleSanskrit: "हितोपदेशः",
    dev: "वरमेको गुणी पुत्रो न च मूर्खशतान्यपि। एकश्चन्द्रस्तमो हन्ति न च तारागणैरपि॥",
    iast: "varam eko guṇī putro na ca mūrkhaśatāny api | ekaś candras tamo hanti na ca tārāgaṇair api ||",
    translation: "Better is a single virtuous child than a hundred foolish ones. A single radiant moon dispels the darkness of night, which countless clusters of stars cannot accomplish.",
    translationHi: "सैकड़ों मूर्ख पुत्रों की अपेक्षा एक गुणवान पुत्र ही श्रेष्ठ होता है। रात्रि के अंधकार को अकेला चंद्रमा दूर कर देता है, जबकि तारों का समूह भी उसे नहीं मिटा पाता।",
    source: "Hitopadeśa (Prastāvikā 13)",
    category: "wisdom",
    categoryLabel: "Wisdom & Life Lessons",
    categoryLabelHi: "सुभाषितानि नीतिश्च",
    words: [
      { word: "वरम्", meaning: "Better / superior", meaningHi: "श्रेष्ठ" },
      { word: "गुणी", meaning: "Virtuous / capable", meaningHi: "गुणवान" },
      { word: "चन्द्रः", meaning: "The moon", meaningHi: "चाँद" },
      { word: "तमः", meaning: "Darkness", meaningHi: "अंधकार" }
    ]
  },
  {
    id: "shloka-hitopadesha-mitram",
    book: "hitopadesha",
    bookTitle: "Hitopadeśa",
    bookTitleSanskrit: "हितोपदेशः",
    dev: "आपत्सु मित्रं जानीयाद्युद्धे शूरमृणे शुचिम्। भार्यां क्षीणेषु वित्तेषु व्यसनेषु च बान्धवान्॥",
    iast: "āpatsu mitraṃ jānīyād yuddhe śūram ṛṇe śucim | bhāryāṃ kṣīṇeṣu vitteṣu vyasaneṣu ca bāndhavān ||",
    translation: "Test a friend in times of calamity; a warrior in battle; a person's integrity in settling debts; a spouse when wealth is lost; and relatives in times of adversity.",
    translationHi: "विपत्ति के समय सच्चे मित्र की, युद्ध में वीर की, ऋण चुकाते समय ईमानदार की, धन समाप्त होने पर पत्नी की और संकट के समय बंधु-बांधवों की परीक्षा होती है।",
    source: "Hitopadeśa (Mitralābha 64)",
    category: "wisdom",
    categoryLabel: "Wisdom & Life Lessons",
    categoryLabelHi: "सुभाषितानि नीतिश्च",
    words: [
      { word: "आपत्सु", meaning: "In calamities", meaningHi: "विपत्ति में" },
      { word: "मित्रम्", meaning: "A true friend", meaningHi: "सच्चा मित्र" },
      { word: "शूरम्", meaning: "A brave warrior", meaningHi: "वीर को" },
      { word: "शुचिम्", meaning: "One of clean integrity", meaningHi: "ईमानदार" }
    ]
  },
  {
    id: "shloka-hitopadesha-alasya",
    book: "hitopadesha",
    bookTitle: "Hitopadeśa",
    bookTitleSanskrit: "हितोपदेशः",
    dev: "आलस्यं हि मनुष्याणां शरीरस्थो महान् रिपुः। नास्त्युद्यमसमो बन्धुः कुर्वाणो नावसीदति॥",
    iast: "ālasyaṃ hi manuṣyāṇāṃ śarīrastho mahān ripuḥ | nāsty udyamasamo bandhuḥ kurvāṇo nāvasīdati ||",
    translation: "Indolence (laziness) dwelling within the physical body is the greatest enemy of human beings. There is no friend equal to diligent enterprise, having done which, none ever despairs.",
    translationHi: "मनुष्यों के शरीर में स्थित आलस्य ही उनका सबसे बड़ा शत्रु है। परिश्रम के समान कोई सच्चा बंधु नहीं है, जिसे करने वाला कभी दुःखी नहीं होता।",
    source: "Hitopadeśa (Mitralābha)",
    category: "wisdom",
    categoryLabel: "Wisdom & Life Lessons",
    categoryLabelHi: "सुभाषितानि नीतिश्च",
    words: [
      { word: "आलस्यम्", meaning: "Laziness / inertia", meaningHi: "आलस्य" },
      { word: "रिपुः", meaning: "Fierce enemy", meaningHi: "शत्रु" },
      { word: "उद्यमसमः", meaning: "Equal to effort", meaningHi: "परिश्रम के समान" },
      { word: "अवसीदति", meaning: "Grieves / despairs", meaningHi: "दुखी होता है" }
    ]
  },
  {
    id: "shloka-hitopadesha-gunavanta",
    book: "hitopadesha",
    bookTitle: "Hitopadeśa",
    bookTitleSanskrit: "हितोपदेशः",
    dev: "गुणा गुणज्ञेषु गुणा भवन्ति ते निर्गुणं प्राप्य भवन्ति दोषाः। आस्वाद्यतोयाः प्रवहन्ति नद्यः समुद्रमासाद्य भवन्त्यपेयाः॥",
    iast: "guṇā guṇajñeṣu guṇā bhavanti te nirguṇaṃ prāpya bhavanti doṣāḥ | āsvādyatoyāḥ pravahanti nadyaḥ samudram āsādya bhavanty apeyāḥ ||",
    translation: "Virtues remain virtues when in the company of those who appreciate them; when reaching the unvirtuous, they turn into vices. Delicious, sweet waters flow in rivers, but reaching the ocean, they become undrinkable.",
    translationHi: "गुण गुणियों के पास रहकर ही गुण बने रहते हैं, दुर्जनों के संपर्क में वे दोष बन जाते हैं। स्वादिष्ट जल वाली नदियाँ जब समुद्र में मिल जाती हैं, तो उनका जल पीने योग्य नहीं रहता।",
    source: "Hitopadeśa (Suhridbheda)",
    category: "morals",
    categoryLabel: "Moral Values & Character",
    categoryLabelHi: "सदाचारः धर्मश्च",
    words: [
      { word: "गुणज्ञेषु", meaning: "Among knowers of virtues", meaningHi: "गुणवानों में" },
      { word: "आस्वाद्यतोयाः", meaning: "Of sweet, delicious water", meaningHi: "मीठे जल वाली" },
      { word: "समुद्रम्", meaning: "The ocean", meaningHi: "समुद्र को" },
      { word: "अपेयाः", meaning: "Undrinkable", meaningHi: "पीने अयोग्य" }
    ]
  },

  // ═════════════════════════════════════════════════════════════════
  // 6. PAÑCATANTRA (पञ्चतन्त्रम्)
  // ═════════════════════════════════════════════════════════════════
  {
    id: "shloka-udyamena",
    book: "panchatantra",
    bookTitle: "Pañcatantra",
    bookTitleSanskrit: "पञ्चतन्त्रम्",
    dev: "उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः। न हि सुप्तस्य सिंहस्य प्रविशन्ति मुखे मृगाः॥",
    iast: "udyamena hi sidhyanti kāryāṇi na manorathaiḥ | na hi suptasya siṃhasya praviśanti mukhe mṛgāḥ ||",
    translation: "All endeavors are accomplished solely through diligent exertion, never by daydreams alone. Deer never walk into the mouth of a slumbering lion on their own.",
    translationHi: "सभी कार्य परिश्रम और उद्यम से ही सिद्ध होते हैं, केवल मन की इच्छाओं से नहीं। सोए हुए सिंह के मुख में हिरण स्वयं प्रवेश नहीं करते।",
    source: "Pañcatantra (Mitrabheda)",
    category: "wisdom",
    categoryLabel: "Wisdom & Life Lessons",
    categoryLabelHi: "सुभाषितानि नीतिश्च",
    words: [
      { word: "उद्यमेन", meaning: "By effort / diligence", meaningHi: "परिश्रम से" },
      { word: "सिध्यन्ति", meaning: "Succeed / fructify", meaningHi: "सिद्ध होते हैं" },
      { word: "कार्याणि", meaning: "Tasks / works", meaningHi: "कार्य" },
      { word: "मनोरथैः", meaning: "By wishes", meaningHi: "मन की इच्छाओं से" },
      { word: "सुप्तस्य", meaning: "Of the sleeping", meaningHi: "सोए हुए के" },
      { word: "मृगाः", meaning: "Deer / animals", meaningHi: "हिरण" }
    ]
  },
  {
    id: "shloka-panchatantra-buddhir-yasya",
    book: "panchatantra",
    bookTitle: "Pañcatantra",
    bookTitleSanskrit: "पञ्चतन्त्रम्",
    dev: "बुद्धिर्यस्य बलं तस्य निर्बुद्धेस्तु कुतो बलम्। वने सिंहो मदोन्मत्तः शशकेन निपातितः॥",
    iast: "buddhir yasya balaṃ tasya nirbuddhes tu kuto balam | vane siṃho madonmattaḥ śaśakena nipātitaḥ ||",
    translation: "Whoever possesses intellect possesses true strength; whence comes strength to one devoid of intellect? In the forest, an arrogant, ferocious lion was outwitted and destroyed by a tiny hare.",
    translationHi: "जिसके पास बुद्धि है, उसी के पास वास्तविक बल है; बुद्धिहीन व्यक्ति में बल कहाँ? वन में घमंडी मतवाले सिंह को एक छोटे से खरगोश ने अपनी चतुराई से कुएँ में गिराकर मार दिया।",
    source: "Pañcatantra (Mitrabheda - Lion & Hare)",
    category: "knowledge",
    categoryLabel: "Knowledge & Education",
    categoryLabelHi: "विद्या ज्ञानं च",
    words: [
      { word: "बुद्धिः", meaning: "Intellect / wisdom", meaningHi: "बुद्धि" },
      { word: "बलम्", meaning: "True strength", meaningHi: "बल" },
      { word: "मदोन्मत्तः", meaning: "Intoxicated with arrogance", meaningHi: "घमंडी" },
      { word: "शशकेन", meaning: "By the little hare", meaningHi: "खरगोश द्वारा" }
    ]
  },
  {
    id: "shloka-panchatantra-sahasa",
    book: "panchatantra",
    bookTitle: "Pañcatantra",
    bookTitleSanskrit: "पञ्चतन्त्रम्",
    dev: "सहसा विदधीत न क्रियामविवेकः परमापदां पदम्। वृणुते हि विमृश्यकारिणं गुणलुब्धाः स्वयमेव सम्पदः॥",
    iast: "sahasā vidadhīta na kriyām avivekaḥ paramāpadāṃ padam | vṛṇute hi vimṛśyakāriṇaṃ guṇalubdhāḥ svayam eva sampadaḥ ||",
    translation: "One should never act precipitously or without reflection; rashness is the breeding ground of supreme perils. True fortunes, drawn to merit, willingly choose those who deliberate with prudence.",
    translationHi: "अचानक बिना सोचे-समझे कोई कार्य नहीं करना चाहिए; अविवेक विपत्तियों का सबसे बड़ा घर है। सोच-विचार कर कार्य करने वाले विवेकी मनुष्य का वरण संपत्तियां स्वयं कर लेती हैं।",
    source: "Pañcatantra (Aparīkṣitakārakam)",
    category: "wisdom",
    categoryLabel: "Wisdom & Life Lessons",
    categoryLabelHi: "सुभाषितानि नीतिश्च",
    words: [
      { word: "सहसा", meaning: "Hastily / suddenly", meaningHi: "बिना विचारे" },
      { word: "अविवेकी", meaning: "Thoughtlessness", meaningHi: "अविवेक" },
      { word: "विमृश्यकारिणम्", meaning: "One who reflects first", meaningHi: "विचार कर कार्य करने वाले को" },
      { word: "सम्पदः", meaning: "Prosperities / fortunes", meaningHi: "संपत्तियां" }
    ]
  },
  {
    id: "shloka-panchatantra-preeti",
    book: "panchatantra",
    bookTitle: "Pañcatantra",
    bookTitleSanskrit: "पञ्चतन्त्रम्",
    dev: "ददाति प्रतिगृह्णाति गुह्यमाख्याति पृच्छति। भुङ्क्ते भोजयते चैव षड्विधं प्रीतिलक्षणम्॥",
    iast: "dadāti pratigṛhṇāti guhyam ākhyāti pṛcchati | bhuṅkte bhojayate caiva ṣaḍvidhaṃ prītilakṣaṇam ||",
    translation: "Giving gifts, accepting gifts, confiding one's heart, inquiring after well-being, sharing meals, and feeding one another — these six are the true marks of genuine affection and friendship.",
    translationHi: "उपहार देना, उपहार लेना, अपने मन की गुप्त बात बताना, दूसरों के सुख-दुःख की सुधि लेना, साथ भोजन करना और भोजन कराना — ये छह सच्चे प्रेम और मित्रता के लक्षण हैं।",
    source: "Pañcatantra (Mitrabheda)",
    category: "morals",
    categoryLabel: "Moral Values & Character",
    categoryLabelHi: "सदाचारः धर्मश्च",
    words: [
      { word: "ददाति", meaning: "Gives generously", meaningHi: "देता है" },
      { word: "गुह्यम्", meaning: "Confidential heart", meaningHi: "रहस्य" },
      { word: "पृच्छति", meaning: "Inquires affectionately", meaningHi: "पूछता है" },
      { word: "प्रीतिलक्षणम्", meaning: "Marks of true love", meaningHi: "प्रेम के लक्षण" }
    ]
  },
  {
    id: "shloka-panchatantra-mitra",
    book: "panchatantra",
    bookTitle: "Pañcatantra",
    bookTitleSanskrit: "पञ्चतन्त्रम्",
    dev: "शोकरातिभयत्राणं प्रीतिविश्रम्भभाजनम्। केन रत्नमिदं सृष्टं मित्रमित्यक्षरद्वयम्॥",
    iast: "śokāratibhayatrāṇaṃ prītiviśrambhabhājanam | kena ratnam idaṃ sṛṣṭaṃ mitram ity akṣaradvayam ||",
    translation: "A shield against sorrow, anguish, and fear, a vessel of boundless love and trustworthy faith: by which visionary creator was this two-syllable jewel called 'Mitra' (Friend) created?",
    translationHi: "शोक, कष्ट और भय से रक्षा करने वाला, तथा प्रेम और विश्वास का पात्र — 'मित्र' इन दो अक्षरों के अमूल्य रत्न को किसने गढ़ा है?",
    source: "Pañcatantra (Mitralābha)",
    category: "wisdom",
    categoryLabel: "Wisdom & Life Lessons",
    categoryLabelHi: "सुभाषितानि नीतिश्च",
    words: [
      { word: "शोकत्राणम्", meaning: "Protector from sorrow", meaningHi: "शोक से रक्षा करने वाला" },
      { word: "विश्रम्भ", meaning: "Deep trust", meaningHi: "विश्वास" },
      { word: "रत्नम्", meaning: "Precious jewel", meaningHi: "रत्न" },
      { word: "अक्षरद्वयम्", meaning: "Two sacred syllables", meaningHi: "दो अक्षर" }
    ]
  },

  // ═════════════════════════════════════════════════════════════════
  // 7. BHARTṚHARI'S NĪTIŚATAKAM (नीतिशतकम्)
  // ═════════════════════════════════════════════════════════════════
  {
    id: "shloka-vidya-guptam",
    book: "nitisatakam",
    bookTitle: "Nītiśatakam",
    bookTitleSanskrit: "नीतिशतकम्",
    dev: "विद्या नाम नरस्य रूपमधिकं प्रच्छन्नगुप्तं धनम्। विद्या भोगकरी यशःसुखकरी विद्या गुरूणां गुरुः॥",
    iast: "vidyā nāma narasya rūpam adhikaṃ pracchannaguptaṃ dhanam | vidyā bhogakarī yaśaḥ-sukhakarī vidyā gurūṇāṃ guruḥ ||",
    translation: "Knowledge is humankind's greatest elegance and imperishable hidden treasure. Knowledge yields noble enjoyment, renown, and joy; knowledge is the master of all masters.",
    translationHi: "विद्या मनुष्य का वास्तविक सौंदर्य और सबसे सुरक्षित गुप्त धन है। विद्या यश, सुख और भोग प्रदान करने वाली है, और विद्या ही गुरुओं की परम गुरु है।",
    source: "Bhartṛhari Nītiśatakam 16",
    category: "knowledge",
    categoryLabel: "Knowledge & Education",
    categoryLabelHi: "विद्या ज्ञानं च",
    words: [
      { word: "रूपम्", meaning: "Inner beauty / form", meaningHi: "सौंदर्य" },
      { word: "प्रच्छन्नगुप्तम्", meaning: "Deeply concealed", meaningHi: "सुरक्षित गुप्त" },
      { word: "भोगकरी", meaning: "Providing fulfillment", meaningHi: "सुख देने वाली" },
      { word: "यशः", meaning: "Honor / fame", meaningHi: "कीर्ति" }
    ]
  },
  {
    id: "shloka-bhartrihari-ajnaha",
    book: "nitisatakam",
    bookTitle: "Nītiśatakam",
    bookTitleSanskrit: "नीतिशतकम्",
    dev: "अज्ञः सुखमाराध्यः सुखतरमाराध्यते विशेषज्ञः। ज्ञानलवदुर्विदग्धं ब्रह्मापि तं नरं न रञ्जयति॥",
    iast: "ajñaḥ sukham ārādhyaḥ sukhataram ārādhyate viśeṣajñaḥ | jñānalavadurvidagdhaṃ brahmāpi taṃ naraṃ na rañjayati ||",
    translation: "An ignorant person is easy to enlighten; a learned specialist is even easier to satisfy. But a conceited person puffed up with a tiny fragment of knowledge cannot be pleased even by Brahmā the creator.",
    translationHi: "अज्ञानी को समझाना सरल है, और विशेषज्ञ विद्वान को समझाना और भी सरल है। परंतु जो अल्प-ज्ञान के अहंकार में चूर है, उस मनुष्य को तो स्वयं ब्रह्मा भी संतुष्ट नहीं कर सकते।",
    source: "Bhartṛhari Nītiśatakam 3",
    category: "knowledge",
    categoryLabel: "Knowledge & Education",
    categoryLabelHi: "विद्या ज्ञानं च",
    words: [
      { word: "अज्ञः", meaning: "The ignorant", meaningHi: "अज्ञानी" },
      { word: "विशेषज्ञः", meaning: "The expert scholar", meaningHi: "विशेष ज्ञानी" },
      { word: "ज्ञानलव", meaning: "A fraction of knowledge", meaningHi: "अल्प ज्ञान" },
      { word: "दुर्विदग्धम्", meaning: "Conceited / arrogant", meaningHi: "घमंडी" }
    ]
  },
  {
    id: "shloka-bhartrihari-keyurani",
    book: "nitisatakam",
    bookTitle: "Nītiśatakam",
    bookTitleSanskrit: "नीतिशतकम्",
    dev: "केयूराणि न भूषयन्ति पुरुषं हारा न चन्द्रोज्ज्वला न स्नानं न विलेपनं न कुसुमं नालङ्कृता मूर्धजाः। वाण्येका समलङ्करोति पुरुषं या संस्कृता धार्यते क्षीयन्ते खलु भूषणानि सततं वाग्भूषणं भूषणम्॥",
    iast: "keyūrāṇi na bhūṣayanti puruṣaṃ hārā na candrojjvalā na snānaṃ na vilepanaṃ na kusumaṃ nālaṅkṛtā mūrdhajāḥ | vāṇyekā samalaṅkaroti puruṣaṃ yā saṃskṛtā dhāryate kṣīyante khalu bhūṣaṇāni satataṃ vāgbhūṣaṇaṃ bhūṣaṇam ||",
    translation: "Neither jeweled bracelets nor radiant moon-like necklaces adorn a person; neither perfumed baths nor garlands ornament them. Cultured, refined speech alone truly beautifies humankind; all physical ornaments fade away, but the ornament of speech endures forever.",
    translationHi: "मनुष्य को न बाजूबंद, न चंद्रहार, न सुगंधित स्नान और न पुष्प सुशोभित करते हैं। केवल सुसंस्कृत वाणी ही मनुष्य का सच्चा आभूषण है; समस्त भौतिक आभूषण नष्ट हो जाते हैं, किंतु वाणी का आभूषण सदा अमर रहता है।",
    source: "Bhartṛhari Nītiśatakam 19",
    category: "morals",
    categoryLabel: "Moral Values & Character",
    categoryLabelHi: "सदाचारः धर्मश्च",
    words: [
      { word: "केयूराणि", meaning: "Armlets / bracelets", meaningHi: "बाजूबंद" },
      { word: "संस्कृता", meaning: "Refined / cultured", meaningHi: "संस्कारयुक्त वाणी" },
      { word: "क्षीयन्ते", meaning: "Fade / perish", meaningHi: "नष्ट हो जाते हैं" },
      { word: "वाग्भूषणम्", meaning: "Ornament of speech", meaningHi: "वाणी का आभूषण" }
    ]
  },
  {
    id: "shloka-bhartrihari-namanti",
    book: "nitisatakam",
    bookTitle: "Nītiśatakam",
    bookTitleSanskrit: "नीतिशतकम्",
    dev: "नमन्ति फलिनो वृक्षा नमन्ति गुणिनो जनाः। शुष्ककाष्ठं च मूर्खश्च न नमन्ति कदाचन॥",
    iast: "namanti phalino vṛkṣā namanti guṇino janāḥ | śuṣkakāṣṭhaṃ ca mūrkhaśca na namanti kadācana ||",
    translation: "Trees laden with ripe fruit bow gracefully low; virtuous and knowledgeable people are ever humble. But dry dead wood and arrogant fools will break before they ever bend.",
    translationHi: "फलों से लदे वृक्ष झुक जाते हैं और गुणवान मनुष्य विनम्रता से झुकते हैं। किंतु सूखी लकड़ी और मूर्ख मनुष्य कभी झुकना नहीं जानते, टूट भले ही जाएं।",
    source: "Bhartṛhari Nītiśatakam",
    category: "morals",
    categoryLabel: "Moral Values & Character",
    categoryLabelHi: "सदाचारः धर्मश्च",
    words: [
      { word: "नमन्ति", meaning: "Bow in humility", meaningHi: "झुकते हैं" },
      { word: "फलिनः", meaning: "Fruit-laden", meaningHi: "फलों से युक्त" },
      { word: "गुणिनः", meaning: "Virtuous scholars", meaningHi: "गुणवान लोग" },
      { word: "शुष्ककाष्ठम्", meaning: "Dry dead timber", meaningHi: "सूखी लकड़ी" }
    ]
  },
  {
    id: "shloka-bhartrihari-apurva-kosa",
    book: "nitisatakam",
    bookTitle: "Nītiśatakam",
    bookTitleSanskrit: "नीतिशतकम्",
    dev: "अपूर्वः कोऽपि कोशोऽयं विद्यते तव भारति। व्ययतो वृद्धिमायाति क्षयमायाति सञ्चयात्॥",
    iast: "apūrvaḥ ko'pi kośo'yaṃ vidyate tava bhārati | vyayato vṛddhim āyāti kṣayam āyāti sañcayāt ||",
    translation: "O Goddess of Wisdom Sarasvatī, truly incomparable is this treasure-house of yours! The more it is spent and shared, the more it flourishes; while if it is hoarded in secret, it dwindles and decays.",
    translationHi: "हे माँ सरस्वती! आपका यह विद्या-कोश अत्यंत विलक्षण है। इसे जितना खर्च करो (बाँटो) यह उतना ही बढ़ता है, और यदि इसे छुपाकर संचित रखो तो यह नष्ट हो जाता है।",
    source: "Bhartṛhari Subhāṣita",
    category: "knowledge",
    categoryLabel: "Knowledge & Education",
    categoryLabelHi: "विद्या ज्ञानं च",
    words: [
      { word: "अपूर्वः", meaning: "Unprecedented / unique", meaningHi: "अद्वितीय" },
      { word: "भारति", meaning: "O Goddess Sarasvatī", meaningHi: "हे सरस्वती" },
      { word: "व्ययतः", meaning: "By spending / sharing", meaningHi: "खर्च करने से" },
      { word: "वृद्धिम्", meaning: "Increase / expansion", meaningHi: "वृद्धि को" }
    ]
  },
  {
    id: "shloka-bhartrihari-prarabhyate",
    book: "nitisatakam",
    bookTitle: "Nītiśatakam",
    bookTitleSanskrit: "नीतिशतकम्",
    dev: "प्रारभ्यते न खलु विघ्नभयेन नीचैः प्रारभ्य विघ्नविहता विरमन्ति मध्याः। विघ्नैः पुनः पुनरपि प्रतिहन्यमानाः प्रारब्धमुत्तमगुणा न परित्यजन्ति॥",
    iast: "prārabhyate na khalu vighnabhayena nīcaiḥ prārabhya vighnavihatā viramanti madhyāḥ | vighnaiḥ punaḥ punar api pratihanyamānāḥ prārabdham uttamaguṇā na parityajanti ||",
    translation: "The timid never even commence a task for fear of obstacles; mediocre people begin, but abandon it when hurdles strike. But noble souls of steadfast character, though struck repeatedly by trials, never abandon what they have undertaken until victory is attained.",
    translationHi: "विघ्न के भय से निम्न श्रेणी के लोग कार्य का आरम्भ ही नहीं करते; मध्यम लोग आरम्भ करके संकट आने पर रुक जाते हैं। किंतु श्रेष्ठ गुणवान लोग बारंबार बाधाएं आने पर भी अपने आरम्भ किए कार्य को कभी नहीं छोड़ते।",
    source: "Bhartṛhari Nītiśatakam 27",
    category: "wisdom",
    categoryLabel: "Wisdom & Life Lessons",
    categoryLabelHi: "सुभाषितानि नीतिश्च",
    words: [
      { word: "विघ्नभयेन", meaning: "Through fear of obstacles", meaningHi: "बाधाओं के डर से" },
      { word: "मध्यमाः", meaning: "Mediocre people", meaningHi: "मध्यम श्रेणी के लोग" },
      { word: "उत्तमगुणाः", meaning: "Noble souls", meaningHi: "श्रेष्ठ जन" },
      { word: "न परित्यजन्ति", meaning: "Do not abandon", meaningHi: "नहीं छोड़ते" }
    ]
  },

  // ═════════════════════════════════════════════════════════════════
  // 8. CĀṆAKYA NĪTI (चाणक्यनीतिः)
  // ═════════════════════════════════════════════════════════════════
  {
    id: "shloka-matrvat",
    book: "chanakya",
    bookTitle: "Cāṇakya Nīti",
    bookTitleSanskrit: "चाणक्यनीतिः",
    dev: "मातृवत् परदारेषु परद्रव्येषु लोष्टवत्। आत्मवत् सर्वभूतेषु यः पश्यति स पण्डितः॥",
    iast: "mātṛvat paradāreṣu paradravyeṣu loṣṭavat | ātmavat sarvabhūteṣu yaḥ paśyati sa paṇḍitaḥ ||",
    translation: "One who regards others' spouses with the reverence given to a mother, views others' wealth as mere clods of earth, and feels for all living beings as one's own self — that person is truly enlightened.",
    translationHi: "जो दूसरों की स्त्रियों को माता के समान, दूसरों के धन को मिट्टी के ढेले के समान, और सभी जीवों को अपनी ही आत्मा के समान देखता है, वही सच्चा ज्ञानी है।",
    source: "Cāṇakya Nīti 12.14",
    category: "morals",
    categoryLabel: "Moral Values & Character",
    categoryLabelHi: "सदाचारः धर्मश्च",
    words: [
      { word: "मातृवत्", meaning: "Like a mother", meaningHi: "माता के समान" },
      { word: "लोष्टवत्", meaning: "Like clods of earth", meaningHi: "मिट्टी के ढेले जैसा" },
      { word: "आत्मवत्", meaning: "As one's own soul", meaningHi: "अपनी आत्मा के समान" },
      { word: "सर्वभूतेषु", meaning: "In all beings", meaningHi: "समस्त प्राणियों में" }
    ]
  },
  {
    id: "shloka-chanakya-svadeshe",
    book: "chanakya",
    bookTitle: "Cāṇakya Nīti",
    bookTitleSanskrit: "चाणक्यनीतिः",
    dev: "विद्वत्त्वं च नृपत्वं च नैव तुल्यं कदाचन। स्वदेशे पूज्यते राजा विद्वान् सर्वत्र पूज्यते॥",
    iast: "vidvattvaṃ ca nṛpatvaṃ ca naiva tulyaṃ kadācana | svadeśe pūjyate rājā vidvān sarvatra pūjyate ||",
    translation: "Scholarship and kingship are never comparable under any measure. A monarch is honored only within his own territory, but a scholar is revered across all realms of the world.",
    translationHi: "विद्वत्ता और राज्य-सत्ता की कभी तुलना नहीं हो सकती। राजा का सम्मान केवल उसके अपने देश में होता है, जबकि विद्वान की पूजा संपूर्ण विश्व में सर्वत्र होती है।",
    source: "Cāṇakya Nīti 1.12",
    category: "knowledge",
    categoryLabel: "Knowledge & Education",
    categoryLabelHi: "विद्या ज्ञानं च",
    words: [
      { word: "विद्वत्त्वम्", meaning: "Scholarship / wisdom", meaningHi: "विद्वत्ता" },
      { word: "नृपत्वम्", meaning: "Rulership / kingship", meaningHi: "राजा होना" },
      { word: "स्वदेशे", meaning: "In one's own country", meaningHi: "अपने देश में" },
      { word: "सर्वत्र", meaning: "Everywhere", meaningHi: "सब जगह" }
    ]
  },
  {
    id: "shloka-chanakya-vidya-mitram",
    book: "chanakya",
    bookTitle: "Cāṇakya Nīti",
    bookTitleSanskrit: "चाणक्यनीतिः",
    dev: "विद्या मित्रं प्रवासेषु भार्या मित्रं गृहेषु च। व्याधितस्यौषधं मित्रं धर्मो मित्रं मृतस्य च॥",
    iast: "vidyā mitraṃ pravāseṣu bhāryā mitraṃ gṛheṣu ca | vyādhitasyauṣadhaṃ mitraṃ dharmo mitraṃ mṛtasya ca ||",
    translation: "Knowledge is one's closest friend during travels abroad; a virtuous spouse is a friend in the home; medicine is the friend of the sick; and righteous dharma is the eternal companion that walks with the soul beyond death.",
    translationHi: "प्रवास में विद्या मित्र होती है, घर में गुणवती जीवनसंगिनी मित्र होती है, रोगी के लिए औषधि मित्र होती है और मृत्यु के उपरांत केवल धर्म ही आत्मा का सच्चा मित्र होता है।",
    source: "Cāṇakya Nīti 4.15",
    category: "knowledge",
    categoryLabel: "Knowledge & Education",
    categoryLabelHi: "विद्या ज्ञानं च",
    words: [
      { word: "प्रवासेषु", meaning: "In journeys abroad", meaningHi: "विदेश यात्रा में" },
      { word: "व्याधितस्य", meaning: "Of the sick person", meaningHi: "रोगी का" },
      { word: "औषधम्", meaning: "Medicine", meaningHi: "दवा" },
      { word: "धर्मः", meaning: "Righteous dharma", meaningHi: "सच्चा धर्म" }
    ]
  },
  {
    id: "shloka-chanakya-anabhyase",
    book: "chanakya",
    bookTitle: "Cāṇakya Nīti",
    bookTitleSanskrit: "चाणक्यनीतिः",
    dev: "अनभ्यासे विषं शास्त्रमजीर्णे भोजनं विषम्। दरिद्रस्य विषं गोष्ठी वृद्धस्य तरुणी विषम्॥",
    iast: "anabhyāse viṣaṃ śāstram ajīrṇe bhojanaṃ viṣam | daridrasya viṣaṃ goṣṭhī vṛddhasya taruṇī viṣam ||",
    translation: "Learning becomes as toxic as poison without regular practice; food turns to poison during indigestion; a royal gathering turns painful to the indigent, and mismatched attachments bring grief.",
    translationHi: "अभ्यास के बिना शास्त्र विष बन जाता है, अपच (अजीर्ण) होने पर भोजन विष बन जाता है, दरिद्र के लिए सभा विष के समान होती है।",
    source: "Cāṇakya Nīti 2.16",
    category: "knowledge",
    categoryLabel: "Knowledge & Education",
    categoryLabelHi: "विद्या ज्ञानं च",
    words: [
      { word: "अनभ्यासे", meaning: "Without continuous practice", meaningHi: "अभ्यास के अभाव में" },
      { word: "विषम्", meaning: "Poison", meaningHi: "विष" },
      { word: "शास्त्रम्", meaning: "Sacred science / text", meaningHi: "शास्त्र" },
      { word: "अजीर्णे", meaning: "During indigestion", meaningHi: "अपच में" }
    ]
  },
  {
    id: "shloka-chanakya-jala-bindu",
    book: "chanakya",
    bookTitle: "Cāṇakya Nīti",
    bookTitleSanskrit: "चाणक्यनीतिः",
    dev: "जलविन्दुनिपातेन क्रमशः पूर्यते घटः। स हेतुः सर्वविद्यानां धर्मस्य च धनस्य च॥",
    iast: "jalavindunipātena kramaśaḥ pūryate ghaṭaḥ | sa hetuḥ sarvavidyānāṃ dharmasya ca dhanasya ca ||",
    translation: "Drop by drop of falling water, the large clay pot gradually fills to the brim. In the very same manner, continuous small steps accumulate all wisdom, virtue, and wealth.",
    translationHi: "पानी की एक-एक बूंद टपकने से धीरे-धीरे पूरा घड़ा भर जाता है। यही नियम समस्त विद्याओं, धर्म के संचय और धन की वृद्धि पर भी लागू होता है।",
    source: "Cāṇakya Nīti 12.1",
    category: "wisdom",
    categoryLabel: "Wisdom & Life Lessons",
    categoryLabelHi: "सुभाषितानि नीतिश्च",
    words: [
      { word: "जलविन्दु", meaning: "Drop of water", meaningHi: "जल की बूंद" },
      { word: "घटः", meaning: "Clay pitcher / pot", meaningHi: "घड़ा" },
      { word: "क्रमशः", meaning: "Gradually / step by step", meaningHi: "धीरे-धीरे" },
      { word: "हेतुः", meaning: "The path / method", meaningHi: "कारण / नियम" }
    ]
  },
  {
    id: "shloka-chanakya-pustakastha",
    book: "chanakya",
    bookTitle: "Cāṇakya Nīti",
    bookTitleSanskrit: "चाणक्यनीतिः",
    dev: "पुस्तकस्था तु या विद्या परहस्तगतं धनम्। कार्यकाले समुत्पन्ने न सा विद्या न तद्धनम्॥",
    iast: "pustakasthā tu yā vidyā parahastagataṃ dhanam | kāryakāle samutpanne na sā vidyā na tad dhanam ||",
    translation: "Knowledge that remains trapped in books and wealth that is tied in another's hands: when the critical hour of necessity arrives, neither does that knowledge assist nor is that wealth of any avail.",
    translationHi: "जो विद्या केवल पुस्तकों में बंद है और जो धन दूसरों के हाथ में पड़ा है, आवश्यकता पड़ने पर न वह विद्या काम आती है और न वह धन किसी काम का रहता है।",
    source: "Cāṇakya Nīti 16.20",
    category: "knowledge",
    categoryLabel: "Knowledge & Education",
    categoryLabelHi: "विद्या ज्ञानं च",
    words: [
      { word: "पुस्तकस्था", meaning: "Residing in books", meaningHi: "पुस्तकों में रखी" },
      { word: "परहस्तगतम्", meaning: "Gone into another's hand", meaningHi: "दूसरों के हाथ गया" },
      { word: "कार्यकाले", meaning: "At the time of need", meaningHi: "समय पड़ने पर" }
    ]
  },
  {
    id: "shloka-chanakya-lalayet",
    book: "chanakya",
    bookTitle: "Cāṇakya Nīti",
    bookTitleSanskrit: "चाणक्यनीतिः",
    dev: "लालयेत् पञ्च वर्षाणि दश वर्षाणि ताडयेत्। प्राप्ते तु षोडशे वर्षे पुत्रं मित्रवदाचरेत्॥",
    iast: "lālayet pañca varṣāṇi daśa varṣāṇi tāḍayet | prāpte tu ṣoḍaśe varṣe putraṃ mitravad ācaret ||",
    translation: "Cherish a child with unconditional tenderness for the first five years; guide them with discipline for the next ten years. Once they attain sixteen years of age, treat them as your trusted friend.",
    translationHi: "पाँच वर्ष की आयु तक संतान को अत्यधिक स्नेह और दुलार दें; अगले दस वर्ष (आयु ६ से १५) अनुशासन सिखाएं; और सोलहवें वर्ष में पहुँचने पर पुत्र या पुत्री से मित्रवत व्यवहार करें।",
    source: "Cāṇakya Nīti 3.18",
    category: "morals",
    categoryLabel: "Moral Values & Character",
    categoryLabelHi: "सदाचारः धर्मश्च",
    words: [
      { word: "लालयेत्", meaning: "Shower tender care", meaningHi: "लाड़-प्यार करें" },
      { word: "ताडयेत्", meaning: "Discipline firmly", meaningHi: "अनुशासन में रखें" },
      { word: "षोडशे वर्षे", meaning: "At sixteenth year", meaningHi: "सोलहवें वर्ष में" },
      { word: "मित्रवत्", meaning: "Like a friend", meaningHi: "मित्र के समान" }
    ]
  },

  // ═════════════════════════════════════════════════════════════════
  // 9. MAHĀBHĀRATA & VIDURA NĪTI (महाभारतम् / विदुरनीतिः)
  // ═════════════════════════════════════════════════════════════════
  {
    id: "shloka-ahimsa",
    book: "mahabharata",
    bookTitle: "Mahābhārata & Vidura Nīti",
    bookTitleSanskrit: "महाभारतम् / विदुरनीतिः",
    dev: "अहिंसा परमो धर्मस्तथाहिंसा परं दमः। अहिंसा परमं दानमहिंसा परमं तपः॥",
    iast: "ahiṃsā paramo dharmas tathāhiṃsā paraṃ damaḥ | ahiṃsā paramaṃ dānam ahiṃsā paramaṃ tapaḥ ||",
    translation: "Non-violence is the highest duty, and non-violence is the highest self-discipline. Non-violence is the supreme charity, and non-violence is the ultimate penance.",
    translationHi: "अहिंसा ही सबसे बड़ा धर्म है और अहिंसा ही सर्वोच्च आत्म-संयम है। अहिंसा ही सर्वश्रेष्ठ दान है और अहिंसा ही परम तपस्या है।",
    source: "Mahābhārata (Anuśāsana Parva 115.25)",
    category: "morals",
    categoryLabel: "Moral Values & Character",
    categoryLabelHi: "सदाचारः धर्मश्च",
    words: [
      { word: "अहिंसा", meaning: "Non-violence / compassion", meaningHi: "अहिंसा" },
      { word: "परमः", meaning: "Supreme", meaningHi: "सर्वोच्च" },
      { word: "धर्मः", meaning: "Righteous virtue", meaningHi: "धर्म" },
      { word: "दमः", meaning: "Restraint of senses", meaningHi: "संयम" }
    ]
  },
  {
    id: "shloka-vidura-pandita",
    book: "mahabharata",
    bookTitle: "Mahābhārata & Vidura Nīti",
    bookTitleSanskrit: "महाभारतम् / विदुरनीतिः",
    dev: "यस्य कृत्यं न विघ्नन्ति शीतमुष्णं भयं रतिः। समृद्धिरसमृद्धिर्वा स वै पण्डित उच्यते॥",
    iast: "yasya kṛtyaṃ na vighnanti śītam uṣṇaṃ bhayaṃ ratiḥ | samṛddhir asamṛddhir vā sa vai paṇḍita ucyate ||",
    translation: "Whose undertakings are never disrupted by bitter cold or scorching heat, fear or passion, opulence or poverty — that person alone is recognized as truly wise (Paṇḍita).",
    translationHi: "जिसके कार्यों में सर्दी, गर्मी, भय, वासना, संपत्ति अथवा विपत्ति कभी बाधा नहीं बनती — वही व्यक्ति वास्तव में सच्चा ज्ञानी और पंडित कहलाता है।",
    source: "Mahābhārata (Vidura Nīti 33.16)",
    category: "wisdom",
    categoryLabel: "Wisdom & Life Lessons",
    categoryLabelHi: "सुभाषितानि नीतिश्च",
    words: [
      { word: "कृत्यम्", meaning: "Action / undertaking", meaningHi: "कार्य / संकल्प" },
      { word: "शीतमुष्णम्", meaning: "Cold and heat", meaningHi: "सर्दी और गर्मी" },
      { word: "समृद्धिः", meaning: "Prosperity", meaningHi: "ऐश्वर्य" },
      { word: "पण्डितः", meaning: "A truly wise soul", meaningHi: "ज्ञानी" }
    ]
  },
  {
    id: "shloka-vidura-shad-dosha",
    book: "mahabharata",
    bookTitle: "Mahābhārata & Vidura Nīti",
    bookTitleSanskrit: "महाभारतम् / विदुरनीतिः",
    dev: "षड् दोषाः पुरुषेणेह हातव्या भूतिमिच्छता। निद्रा तन्द्रा भयं क्रोध आलस्यं दीर्घसूत्रता॥",
    iast: "ṣaḍ doṣāḥ puruṣeṇeha hātavyā bhūtim icchatā | nidrā tandrā bhayaṃ krodha ālasyaṃ dīrghasūtratā ||",
    translation: "A person striving for prosperity and fulfillment in this world must eradicate six fatal defects: excessive sleep, lethargy, fear, anger, laziness, and chronic procrastination.",
    translationHi: "संसार में उन्नति और ऐश्वर्य चाहने वाले मनुष्य को छह दुर्गुणों को त्याग देना चाहिए: अधिक सोना, तंद्रा (सुस्ती), भय, क्रोध, आलस्य और काम को टालना (दीर्घसूत्रता)।",
    source: "Mahābhārata (Vidura Nīti 33.68)",
    category: "wisdom",
    categoryLabel: "Wisdom & Life Lessons",
    categoryLabelHi: "सुभाषितानि नीतिश्च",
    words: [
      { word: "षड् दोषाः", meaning: "Six flaws", meaningHi: "छह दोष" },
      { word: "भूतिमिच्छता", meaning: "By one desiring prosperity", meaningHi: "उन्नति चाहने वाले द्वारा" },
      { word: "निद्रा", meaning: "Excessive sleep", meaningHi: "अति-निद्रा" },
      { word: "दीर्घसूत्रता", meaning: "Procrastination / delaying", meaningHi: "टालमटोल करना" }
    ]
  },
  {
    id: "shloka-paropakara",
    book: "mahabharata",
    bookTitle: "Mahābhārata & Vidura Nīti",
    bookTitleSanskrit: "महाभारतम् / विदुरनीतिः",
    dev: "अष्टादशपुराणेषु व्यासस्य वचनद्वयम्। परोपकारः पुण्याय पापाय परपीडनम्॥",
    iast: "aṣṭādaśapurāṇeṣu vyāsasya vacanadvayam | paropakāraḥ puṇyāya pāpāya parapīḍanam ||",
    translation: "Across all eighteen Purāṇas, sage Vedavyāsa distilled two eternal truths: benefiting others is the highest virtue; causing affliction to others is the greatest sin.",
    translationHi: "अठारह पुराणों में महर्षि वेदव्यास के दो ही प्रमुख वचन हैं: दूसरों का उपकार करना सबसे बड़ा पुण्य है, और दूसरों को पीड़ा पहुँचाना सबसे बड़ा पाप है।",
    source: "Vyāsa Subhāṣita / Purāṇic Tradition",
    category: "wisdom",
    categoryLabel: "Wisdom & Life Lessons",
    categoryLabelHi: "सुभाषितानि नीतिश्च",
    words: [
      { word: "वचनद्वयम्", meaning: "Two proclamations", meaningHi: "दो कथन" },
      { word: "परोपकारः", meaning: "Benevolence to others", meaningHi: "दूसरों की भलाई" },
      { word: "पुण्याय", meaning: "Leads to spiritual merit", meaningHi: "पुण्य के लिए" },
      { word: "परपीडनम्", meaning: "Tormenting others", meaningHi: "दूसरों को कष्ट देना" }
    ]
  },
  {
    id: "shloka-satyam-bruyat",
    book: "mahabharata",
    bookTitle: "Mahābhārata & Vidura Nīti",
    bookTitleSanskrit: "महाभारतम् / विदुरनीतिः",
    dev: "सत्यं ब्रूयात् प्रियं ब्रूयान् न ब्रूयात् सत्यमप्रियम्। प्रियं च नानृतं ब्रूयादेष धर्मः सनातनः॥",
    iast: "satyaṃ brūyāt priyaṃ brūyān na brūyāt satyam apriyam | priyaṃ ca nānṛtaṃ brūyād eṣa dharmaḥ sanātanaḥ ||",
    translation: "Speak the truth, speak what is kind and beneficial; do not utter an unkind truth, nor speak a pleasing falsehood — this is the eternal moral foundation.",
    translationHi: "सत्य बोलो, प्रिय बोलो; अप्रिय सत्य मत बोलो, और मीठा लगने वाला असत्य भी मत बोलो — यही सनातन धर्म और सदाचार है।",
    source: "Manusmṛti 4.138 / Mahābhārata Śāntiparva",
    category: "morals",
    categoryLabel: "Moral Values & Character",
    categoryLabelHi: "सदाचारः धर्मश्च",
    words: [
      { word: "सत्यम्", meaning: "Truth", meaningHi: "सत्य" },
      { word: "ब्रूयात्", meaning: "One should speak", meaningHi: "बोलना चाहिए" },
      { word: "प्रियम्", meaning: "Pleasing / benevolent", meaningHi: "प्रिय / हितकारी" },
      { word: "अनृतम्", meaning: "Untruth / lie", meaningHi: "झूठ" },
      { word: "सनातनः", meaning: "Eternal", meaningHi: "सदा रहने वाला" }
    ]
  },

  // ═════════════════════════════════════════════════════════════════
  // 10. STOTRAS & SUBHĀṢITĀNI (स्तोत्राणि सुभाषितानि च)
  // ═════════════════════════════════════════════════════════════════
  {
    id: "shloka-vakratunda",
    book: "stotras_subhashita",
    bookTitle: "Stotras & Subhāṣitāni",
    bookTitleSanskrit: "स्तोत्राणि सुभाषितानि च",
    dev: "वक्रतुण्ड महाकाय सूर्यकोटिसमप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
    iast: "vakratuṇḍa mahākāya sūryakoṭisamaprabha | nirvighnaṃ kuru me deva sarvakāryeṣu सर्वदा ||",
    translation: "O Lord with the curved trunk, colossal divine form, radiant as ten million suns: please remove all obstacles from every one of my endeavors, always.",
    translationHi: "हे वक्र सूंड वाले, विशालकाय, करोड़ों सूर्यों के समान तेजस्वी देव, मेरे सभी कार्यों को सदा बाधा-रहित और निर्विघ्न करें।",
    source: "Gaṇeśa Purāṇa",
    category: "devotion",
    categoryLabel: "Devotion & Prayer",
    categoryLabelHi: "भक्तिः प्रार्थना च",
    words: [
      { word: "वक्रतुण्ड", meaning: "Of curved trunk", meaningHi: "टेढ़ी सूंड वाले" },
      { word: "महाकाय", meaning: "Of colossal body", meaningHi: "विशाल शरीर वाले" },
      { word: "सूर्यकोटि", meaning: "Ten million suns", meaningHi: "करोड़ों सूर्य" },
      { word: "समप्रभ", meaning: "Equal in splendor", meaningHi: "समान कांति वाले" },
      { word: "निर्विघ्नम्", meaning: "Without obstacle", meaningHi: "बाधा-मुक्त" }
    ]
  },
  {
    id: "shloka-saraswati",
    book: "stotras_subhashita",
    bookTitle: "Stotras & Subhāṣitāni",
    bookTitleSanskrit: "स्तोत्राणि सुभाषितानि च",
    dev: "सरस्वति नमस्तुभ्यं वरदे कामरूपिणि। विद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा॥",
    iast: "sarasvati namastubhyaṃ varade kāmarūpiṇi | vidyārambhaṃ kariṣyāmi siddhir bhavatu me sadā ||",
    translation: "Salutations to you, O Goddess Sarasvatī, giver of boons and embodiment of all creative aspirations. I commence my studies; may success and fulfillment always be mine.",
    translationHi: "हे वरदान देने वाली तथा सर्वकामना पूर्ण करने वाली भगवती सरस्वती, आपको नमस्कार। मैं अपनी विद्या का आरम्भ कर रहा हूँ, मुझे सदा सफलता प्राप्त हो।",
    source: "Traditional Sarasvatī Vandanā",
    category: "knowledge",
    categoryLabel: "Knowledge & Education",
    categoryLabelHi: "विद्या ज्ञानं च",
    words: [
      { word: "सरस्वति", meaning: "O Sarasvatī", meaningHi: "हे सरस्वती" },
      { word: "वरदे", meaning: "Giver of boons", meaningHi: "वरदान देने वाली" },
      { word: "कामरूपिणि", meaning: "Fulfiller of aspirations", meaningHi: "इच्छित रूप धारिणी" },
      { word: "विद्यारम्भम्", meaning: "Beginning of studies", meaningHi: "विद्या का आरम्भ" },
      { word: "सिद्धिः", meaning: "Mastery / success", meaningHi: "सफलता" }
    ]
  },
  {
    id: "shloka-guru-stotram",
    book: "stotras_subhashita",
    bookTitle: "Stotras & Subhāṣitāni",
    bookTitleSanskrit: "स्तोत्राणि सुभाषितानि च",
    dev: "गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः। गुरुः साक्षात् परं ब्रह्म तस्मै श्रीगुरवे नमः॥",
    iast: "gururbrahmā gururviṣṇuḥ gururdevo maheśvaraḥ | guruḥ sākṣāt paraṃ brahma tasmai śrīgurave namaḥ ||",
    translation: "The Guru is Brahmā the creator; the Guru is Viṣṇu the preserver; the Guru is Lord Maheśvara the transformer. The Guru is verily the supreme Brahman in visible presence; salutations to that revered Guru.",
    translationHi: "गुरु ही ब्रह्मा हैं, गुरु ही विष्णु हैं और गुरु ही देवाधिदेव महेश्वर हैं। गुरु ही साक्षात् परब्रह्म हैं; उन श्री गुरुदेव को सादर प्रणाम।",
    source: "Guru Gītā / Skanda Purāṇa",
    category: "devotion",
    categoryLabel: "Devotion & Prayer",
    categoryLabelHi: "भक्तिः प्रार्थना च",
    words: [
      { word: "गुरुः", meaning: "Spiritual master / teacher", meaningHi: "गुरुदेव" },
      { word: "साक्षात्", meaning: "Directly manifest", meaningHi: "प्रत्यक्ष" },
      { word: "परं ब्रह्म", meaning: "Supreme Reality", meaningHi: "परम ब्रह्म" },
      { word: "तस्मै", meaning: "Unto that", meaningHi: "उस" },
      { word: "नमः", meaning: "Salutations / bow", meaningHi: "नमस्कार" }
    ]
  },
  {
    id: "shloka-karagre",
    book: "stotras_subhashita",
    bookTitle: "Stotras & Subhāṣitāni",
    bookTitleSanskrit: "स्तोत्राणि सुभाषितानि च",
    dev: "कराग्रे वसते लक्ष्मीः करमध्ये सरस्वती। करमूले तु गोविन्दः प्रभाते करदर्शनम्॥",
    iast: "karāgre vasate lakṣmīḥ karamadhye sarasvatī | karamūle tu govindaḥ prabhāte karadarśanam ||",
    translation: "At the tip of the hands dwells Goddess Lakṣmī (fortune); in the palm resides Goddess Sarasvatī (wisdom); at the base of the hands rests Lord Govinda (divine grace). Thus one gazes upon one's palms upon waking at dawn.",
    translationHi: "हथेलियों के अग्रभाग में लक्ष्मी, मध्य में सरस्वती और मूल भाग में भगवान गोविंद का वास है। इसलिए प्रातःकाल जागते ही सबसे पहले अपनी हथेलियों का दर्शन करना चाहिए।",
    source: "Traditional Prātaḥ-smaraṇam",
    category: "daily",
    categoryLabel: "Morning Prayers & Daily Recitation",
    categoryLabelHi: "प्रातःस्मरणम् नित्यप्रार्थना च",
    words: [
      { word: "कराग्रे", meaning: "At fingertips", meaningHi: "हाथ के अग्रभाग में" },
      { word: "करमध्ये", meaning: "In the palm", meaningHi: "हथेली के मध्य में" },
      { word: "करमूले", meaning: "At base of wrist/hand", meaningHi: "हाथ के मूल में" },
      { word: "प्रभाते", meaning: "At dawn / morning", meaningHi: "प्रातःकाल" },
      { word: "करदर्शनम्", meaning: "Gazing at the hands", meaningHi: "हाथों का दर्शन" }
    ]
  },
  {
    id: "shloka-samudra-vasane",
    book: "stotras_subhashita",
    bookTitle: "Stotras & Subhāṣitāni",
    bookTitleSanskrit: "स्तोत्राणि सुभाषितानि च",
    dev: "समुद्रवसने देवि पर्वतस्तनमण्डले। विष्णुपत्नि नमस्तुभ्यं पादस्पर्शं क्षमस्व मे॥",
    iast: "samudravasane devi parvatastanamaṇḍale | viṣṇupatni namastubhyaṃ pādasparśaṃ kṣamasva me ||",
    translation: "O Mother Earth, draped in the oceans as your garments and crowned by majestic mountains, divine consort of Viṣṇu: salutations to you; forgive the touch of my feet as I step upon you this day.",
    translationHi: "हे समुद्र रूपी वस्त्र धारण करने वाली और पर्वतों रूपी भूषणों से सुशोभित पृथ्वी देवी, भगवान विष्णु की पत्नी! आपको नमन है; कृपया आज के दिन मेरे चरणों के स्पर्श को क्षमा करें।",
    source: "Traditional Bhūmi Vandanā",
    category: "daily",
    categoryLabel: "Morning Prayers & Daily Recitation",
    categoryLabelHi: "प्रातःस्मरणम् नित्यप्रार्थना च",
    words: [
      { word: "समुद्रवसने", meaning: "Clad in the oceans", meaningHi: "सागर रूपी वस्त्र वाली" },
      { word: "देवि", meaning: "O Divine Mother", meaningHi: "हे देवी" },
      { word: "विष्णुपत्नि", meaning: "Consort of Lord Viṣṇu", meaningHi: "विष्णुप्रिया पृथ्वी" },
      { word: "पादस्पर्शम्", meaning: "Touch of the feet", meaningHi: "चरण स्पर्श" }
    ]
  },
  {
    id: "shloka-stotra-kara-charana",
    book: "stotras_subhashita",
    bookTitle: "Stotras & Subhāṣitāni",
    bookTitleSanskrit: "स्तोत्राणि सुभाषितानि च",
    dev: "करचरणकृतं वाक्कायजं कर्मजं वा श्रवणनयनजं वा मानसं वापराधम्। विहितमविहितं वा सर्वमेतत्क्षमस्व जय जय करुणाब्धे श्रीमहादेव शम्भो॥",
    iast: "karacaraṇakṛtaṃ vāk-kāyajaṃ karmajaṃ vā śravaṇanayanajaṃ vā mānasaṃ vāparādham | vihitam avihitaṃ vā sarvam etat kṣamasva jaya jaya karuṇābdhe śrīmahādeva śambho ||",
    translation: "Whatever sins I may have committed with hands or feet, through speech or body, through action, through eyes, ears or thoughts, whether forbidden or prescribed — forgive all of these, O ocean of boundless compassion, victory to You, Śrī Mahādeva Śambho!",
    translationHi: "हाथ, पैर, वाणी, शरीर, कर्म, कान, नेत्र अथवा मन से मैंने जो भी अपराध किए हों, शास्त्र-विहित या अविहित, उन सबको हे दया के सागर कल्याणकारी भगवान शिव, आप क्षमा करें। आपकी जय हो!",
    source: "Śiva Aparādha Kṣamāpaṇa Stotram",
    category: "peace",
    categoryLabel: "Peace & Meditation",
    categoryLabelHi: "शान्तिः ध्यानं च",
    words: [
      { word: "करचरणकृतम्", meaning: "Done by hands and feet", meaningHi: "हाथ-पैरों से किया" },
      { word: "अपराधम्", meaning: "Offense / transgression", meaningHi: "अपराध" },
      { word: "करुणाब्धे", meaning: "O Ocean of Mercy", meaningHi: "हे करुणा के सागर" },
      { word: "क्षमस्व", meaning: "Please forgive", meaningHi: "क्षमा करें" }
    ]
  },
  {
    id: "shloka-stotra-annapurna",
    book: "stotras_subhashita",
    bookTitle: "Stotras & Subhāṣitāni",
    bookTitleSanskrit: "स्तोत्राणि सुभाषितानि च",
    dev: "अन्नपूर्णे सदापूर्णे शङ्करप्राणवल्लभे। ज्ञानवैराग्यसिद्ध्यर्थं भिक्षां देहि च पार्वति॥",
    iast: "annapūrṇe sadāpūrṇe śaṅkaraprāṇavallabhe | jñānavairāgyasiddhyarthaṃ bhikṣāṃ dehi ca pārvati ||",
    translation: "O Mother Annapūrṇā, ever full and bountiful, beloved of Lord Śaṅkara's heart: grant unto us as spiritual alms the attainment of wisdom and divine dispassion, O Goddess Pārvatī.",
    translationHi: "हे नित्य परिपूर्ण रहने वाली माँ अन्नपूर्णा, भगवान शंकर की प्राणवल्लभा! हमें ज्ञान और वैराग्य की सिद्धि के लिए भिक्षा प्रदान करें, हे पार्वती माता।",
    source: "Annapūrṇā Stotram 11 (Ādi Śaṅkarācārya)",
    category: "devotion",
    categoryLabel: "Devotion & Prayer",
    categoryLabelHi: "भक्तिः प्रार्थना च",
    words: [
      { word: "अन्नपूर्णे", meaning: "Full of food and sustenance", meaningHi: "अन्नपूर्णा" },
      { word: "सदापूर्णे", meaning: "Ever complete and bountiful", meaningHi: "सदा परिपूर्ण" },
      { word: "ज्ञानवैराग्य", meaning: "Wisdom and detachment", meaningHi: "ज्ञान और वैराग्य" },
      { word: "भिक्षाम्", meaning: "Spiritual alms", meaningHi: "भिक्षा" }
    ]
  }
];
