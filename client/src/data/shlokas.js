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
  // ─── DEVOTION & PRAYER ───
  {
    id: "shloka-gayatri",
    dev: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥",
    iast: "oṃ bhūr bhuvaḥ svaḥ tat savitur vareṇyaṃ bhargo devasya dhīmahi dhiyo yo naḥ pracodayāt ||",
    translation: "We meditate upon the supreme, adorable effulgence of that Divine Sun; may that sacred radiance illumine and guide our intellect.",
    translationHi: "हम उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा का ध्यान करते हैं; वह हमारी बुद्धि को सन्मार्ग में प्रेरित करे।",
    source: "Ṛgveda 3.62.10",
    category: "devotion",
    categoryLabel: "Devotion & Prayer",
    categoryLabelHi: "भक्तिः प्रार्थना च",
    words: [
      { word: "ॐ", meaning: "Sacred primordial sound", meaningHi: "परब्रह्म का ओंकार" },
      { word: "भूः", meaning: "The physical realm (Earth)", meaningHi: "भूलोक" },
      { word: "भुवः", meaning: "The subtle realm (Atmosphere)", meaningHi: "भुवर्लोक" },
      { word: "स्वः", meaning: "The celestial realm (Heavens)", meaningHi: "स्वर्गलोक" },
      { word: "तत्", meaning: "That (Supreme)", meaningHi: "उस परमात्मा" },
      { word: "सवितुः", meaning: "Of the Sun / Creator", meaningHi: "सूर्यदेव / उत्पादक" },
      { word: "वरेण्यम्", meaning: "Adorable, supreme", meaningHi: "वरणीय / श्रेष्ठ" },
      { word: "भर्गः", meaning: "Divine effulgence", meaningHi: "दिव्य तेज" },
      { word: "धीमहि", meaning: "We meditate", meaningHi: "हम ध्यान करते हैं" },
      { word: "प्रचोदयात्", meaning: "May inspire / guide", meaningHi: "प्रेरित करे" }
    ]
  },
  {
    id: "shloka-mahamrityunjaya",
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
      { word: "उर्वारुकम्", meaning: "Cucumber / Melon", meaningHi: "ककड़ी" },
      { word: "बन्धनात्", meaning: "From bondage / stem", meaningHi: "बंधन से" },
      { word: "अमृतात्", meaning: "From immortality", meaningHi: "अमरता से" }
    ]
  },
  {
    id: "shloka-vakratunda",
    dev: "वक्रतुण्ड महाकाय सूर्यकोटिसमप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
    iast: "vakratuṇḍa mahākāya sūryakoṭisamaprabha | nirvighnaṃ kuru me deva sarvakāryeṣu sarvadā ||",
    translation: "O Lord with the curved trunk, immense divine form, radiant as ten million suns: please remove all obstacles from every one of my endeavors, always.",
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
      { word: "निर्विघ्नम्", meaning: "Without obstacle", meaningHi: "बाधा-मुक्त" },
      { word: "सर्वदा", meaning: "Always", meaningHi: "सदा" }
    ]
  },
  {
    id: "shloka-guru-stotram",
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

  // ─── KNOWLEDGE & EDUCATION ───
  {
    id: "shloka-saraswati",
    dev: "सरस्वति नमस्तुभ्यं वरदे कामरूपिणि। विद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा॥",
    iast: "sarasvati namastubhyaṃ varade kāmarūpiṇi | vidyārambhaṃ kariṣyāmi siddhir bhavatu me sadā ||",
    translation: "Salutations to you, O Goddess Sarasvatī, giver of boons and embodiment of all creative aspirations. I commence my studies; may success and fulfillment always be mine.",
    translationHi: "हे वरदान देने वाली तथा सर्वकामना पूर्ण करने वाली भगवती सरस्वती, आपको नमस्कार। मैं अपनी विद्या का आरम्भ कर रहा हूँ, मुझे सदा सफलता प्राप्त हो।",
    source: "Traditional Sarasvatī Vandana",
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
    id: "shloka-vidya-dadati",
    dev: "विद्या ददाति विनयं विनयाद्याति पात्रताम्। पात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम्॥",
    iast: "vidyā dadāti vinayaṃ vinayād yāti pātratām | pātratvād dhanam āpnoti dhanād dharmaṃ tataḥ sukham ||",
    translation: "Knowledge bestows humility; from humility springs true worthiness; from worthiness one acquires honorable wealth; through wealth one upholds righteous duty (dharma), and thence true happiness ensues.",
    translationHi: "विद्या से विनम्रता आती है; विनम्रता से योग्यता आती है; योग्यता से धन प्राप्त होता है; धर्मपूर्ण धन से धर्म का आचरण होता है और उससे वास्तविक सुख मिलता है।",
    source: "Hitopadeśa (Prastāvikā 32)",
    category: "knowledge",
    categoryLabel: "Knowledge & Education",
    categoryLabelHi: "विद्या ज्ञानं च",
    words: [
      { word: "विद्या", meaning: "True knowledge", meaningHi: "ज्ञान / विद्या" },
      { word: "विनयम्", meaning: "Humility / discipline", meaningHi: "विनम्रता" },
      { word: "पात्रताम्", meaning: "Worthiness / competence", meaningHi: "योग्यता" },
      { word: "धनम्", meaning: "Wealth / resources", meaningHi: "धन" },
      { word: "धर्मम्", meaning: "Righteousness", meaningHi: "धर्म" },
      { word: "सुखम्", meaning: "Happiness", meaningHi: "सुख" }
    ]
  },
  {
    id: "shloka-shraddhavan",
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
    id: "shloka-vidya-guptam",
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
      { word: "प्रच्छन्नगुप्तम्", meaning: "Deeply concealed", meaningHi: "गुप्त रूप से सुरक्षित" },
      { word: "भोगकरी", meaning: "Providing fulfillment", meaningHi: "सुख साधन देने वाली" },
      { word: "यशः", meaning: "Honor / fame", meaningHi: "कीर्ति" }
    ]
  },

  // ─── WISDOM & LIFE LESSONS ───
  {
    id: "shloka-karmanye",
    dev: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    iast: "karmaṇyevādhikāraste mā phaleṣu kadācana | mā karmaphalahetur bhūr mā te saṅgo'stvakarmaṇi ||",
    translation: "Your sacred right is to righteous action alone, never to its fruits. Let not the fruits of action be your driving motive, nor let your spirit be attached to inaction.",
    translationHi: "तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए कर्म के फल की इच्छा से प्रेरित मत होओ, और कर्म न करने में तुम्हारी आसक्ति न हो।",
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
    id: "shloka-udyamena",
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
    id: "shloka-vasudhaiva",
    dev: "अयं निजः परो वेति गणना लघुचेतसाम्। उदारचरितानां तु वसुधैव कुटुम्बकम्॥",
    iast: "ayaṃ nijaḥ paro veti gaṇanā laghucetasām | udāracaritānāṃ tu vasudhaiva kuṭumbakam ||",
    translation: "'This one is mine, that one is an outsider' is the narrow calculation of petty minds. For people of magnanimous character, the entire Earth is one united family.",
    translationHi: "'यह मेरा है और वह पराया है' ऐसी गणना संकीर्ण बुद्धि वाले करते हैं। उदार चरित्र वाले मनुष्यों के लिए तो संपूर्ण पृथ्वी ही एक परिवार है।",
    source: "Mahā Upaniṣad 6.71 / Hitopadeśa",
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
  {
    id: "shloka-paropakara",
    dev: "अष्टादशपुराणेषु व्यासस्य वचनद्वयम्। परोपकारः पुण्याय पापाय परपीडनम्॥",
    iast: "aṣṭādaśapurāṇeṣu vyāsasya vacanadvayam | paropakāraḥ puṇyāya pāpāya parapīḍanam ||",
    translation: "Across all eighteen Purāṇas, sage Vedavyāsa distilled two eternal truths: benefiting others is the highest virtue; causing affliction to others is the greatest sin.",
    translationHi: "अठारह पुराणों में महर्षि वेदव्यास के दो ही प्रमुख वचन हैं: दूसरों का उपकार करना सबसे बड़ा पुण्य है, और दूसरों को पीड़ा पहुँचाना सबसे बड़ा पाप है।",
    source: "Vyāsa Subhāṣita",
    category: "wisdom",
    categoryLabel: "Wisdom & Life Lessons",
    categoryLabelHi: "सुभाषितानि नीतिश्च",
    words: [
      { word: "वचनद्वयम्", meaning: "Two proclamations", meaningHi: "दो कथन" },
      { word: "परोपकारः", meaning: "Benevolence to others", meaningHi: "दूसरों की भलाई" },
      { word: "पुण्याय", meaning: "Leads to spiritual merit", meaningHi: "पुण्य के लिए" },
      { word: "पापाय", meaning: "Leads to demerit", meaningHi: "पाप के लिए" },
      { word: "परपीडनम्", meaning: "Tormenting others", meaningHi: "दूसरों को कष्ट देना" }
    ]
  },

  // ─── PEACE & MEDITATION ───
  {
    id: "shloka-sarve-bhavantu",
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
    id: "shloka-asato-ma",
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
    id: "shloka-purnamada",
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
    id: "shloka-sahanavavatu",
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

  // ─── MORAL VALUES & CHARACTER ───
  {
    id: "shloka-ahimsa",
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
      { word: "दमः", meaning: "Restraint of senses", meaningHi: "संयम" },
      { word: "दानम्", meaning: "Sacred giving", meaningHi: "दान" },
      { word: "तपः", meaning: "Austerity / penance", meaningHi: "तप" }
    ]
  },
  {
    id: "shloka-satyam-bruyat",
    dev: "सत्यं ब्रूयात् प्रियं ब्रूयान् न ब्रूयात् सत्यमप्रियम्। प्रियं च नानृतं ब्रूयादेष धर्मः सनातनः॥",
    iast: "satyaṃ brūyāt priyaṃ brūyān na brūyāt satyam apriyam | priyaṃ ca nānṛtaṃ brūyād eṣa dharmaḥ sanātanaḥ ||",
    translation: "Speak the truth, speak what is kind and beneficial; do not utter an unkind truth, nor speak a pleasing falsehood — this is the eternal moral foundation.",
    translationHi: "सत्य बोलो, प्रिय बोलो; अप्रिय सत्य मत बोलो, और मीठा लगने वाला असत्य भी मत बोलो — यही सनातन धर्म और सदाचार है।",
    source: "Manusmṛti 4.138",
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
  {
    id: "shloka-matrvat",
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
      { word: "सर्वभूतेषु", meaning: "In all beings", meaningHi: "समस्त प्राणियों में" },
      { word: "पण्डितः", meaning: "A truly wise scholar", meaningHi: "ज्ञानी" }
    ]
  },

  // ─── MORNING PRAYERS & DAILY RECITATIONS ───
  {
    id: "shloka-karagre",
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
      { word: "पादस्पर्शम्", meaning: "Touch of the feet", meaningHi: "चरण स्पर्श" },
      { word: "क्षमस्व", meaning: "Please forgive", meaningHi: "क्षमा करें" }
    ]
  }
];
