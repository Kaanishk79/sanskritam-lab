-- SanskritLab Data Seed
-- Run this AFTER schema.sql in Supabase SQL Editor

-- ─── LESSONS ───
INSERT INTO lessons (id, title, subtitle, level, track, duration, content, quiz, unlockables, sort_order) VALUES

('alphabet-vowels', 'स्वराः — The Vowels', 'Learn the 13 vowels of Devanāgarī', 0, 'child', '15 min',
  '{"introduction":"Sanskrit has 13 vowels called स्वराः (svarāḥ). They are the foundation of all pronunciation.","sections":[{"heading":"Simple Vowels","body":"अ a — आ ā — इ i — ई ī — उ u — ऊ ū — ऋ ṛ — ॠ ṝ — ऌ ḷ","devanagari":"अ आ इ ई उ ऊ ऋ ॠ ऌ","transliteration":"a ā i ī u ū ṛ ṝ ḷ","examples":[{"text":"अग्नि","meaning":"fire"},{"text":"इन्द्र","meaning":"lord Indra"},{"text":"उषा","meaning":"dawn"}]},{"heading":"Diphthongs","body":"ए e — ऐ ai — ओ o — औ au — अं ṃ — अः ḥ","devanagari":"ए ऐ ओ औ अं अः","transliteration":"e ai o au aṃ aḥ"}],"summary":"Practice making each sound. Open your mouth wide for ā, round your lips for u."}',
  '[{"id":"q-v1","prompt":"Which vowel is \"इ\"?","options":["a","ā","i","u"],"correctIndex":2,"explanation":"इ is the short i vowel, pronounced like in \"sit\".","difficulty":1},{"id":"q-v2","prompt":"How many simple vowels does Sanskrit have?","options":["5","9","13","7"],"correctIndex":1,"explanation":"Sanskrit has 9 simple vowels plus 4 diphthongs = 13 total.","difficulty":1},{"id":"q-v3","prompt":"Match: अ = ?","options":["u","a","i","e"],"correctIndex":1,"explanation":"अ is the short a vowel.","difficulty":1}]',
  '["skill-alphabet"]', 1),

('alphabet-consonants', 'व्यञ्जनानि — The Consonants', 'Master all 33 consonants by place of articulation', 0, 'child', '20 min',
  '{"introduction":"Sanskrit organizes consonants by where in the mouth they are produced — from the throat to the lips.","sections":[{"heading":"Kaṇṭhya — Gutturals (Throat)","body":"क ka — ख kha — ग ga — घ gha — ङ ṅa","devanagari":"क ख ग घ ङ","transliteration":"ka kha ga gha ṅa"},{"heading":"Tālavya — Palatals (Palate)","body":"च ca — छ cha — ज ja — झ jha — ञ ña","devanagari":"च छ ज झ ञ"},{"heading":"Mūrdhanya — Retroflex","body":"ट ṭa — ठ ṭha — ड ḍa — ढ ḍha — ण ṇa","devanagari":"ट ठ ड ढ ण"},{"heading":"Dantya — Dentals (Teeth)","body":"त ta — थ tha — द da — ध dha — न na","devanagari":"त थ द ध न"},{"heading":"Oṣṭhya — Labials (Lips)","body":"प pa — फ pha — ब ba — भ bha — म ma","devanagari":"प फ ब भ म"},{"heading":"Antaḥsthā — Semivowels","body":"य ya — र ra — ल la — व va","devanagari":"य र ल व"},{"heading":"Ūṣman — Sibilants & Aspirate","body":"श śa — ष ṣa — स sa — ह ha","devanagari":"श ष स ह"}],"summary":"There are 5 groups × 5 = 25, plus 4 semivowels and 4 sibilants = 33 consonants."}',
  '[{"id":"q-c1","prompt":"क is which type?","options":["Palatal","Guttural","Labial","Dental"],"correctIndex":1,"explanation":"क is guttural (kaṇṭhya) — from the throat.","difficulty":1},{"id":"q-c2","prompt":"Which is the dental series?","options":["क ख ग घ ङ","च छ ज झ ञ","त थ द ध न","प फ ब भ म"],"correctIndex":2,"explanation":"त थ द ध न are the dental series — tongue touches the teeth.","difficulty":2}]',
  '["skill-alphabet"]', 2),

('simple-words', 'सरलशब्दाः — Simple Words', 'First words: family, nature, body parts', 0, 'child', '15 min',
  '{"introduction":"Let\'s learn your first Sanskrit words! Repeat each word aloud.","sections":[{"heading":"परिवारः — Family","body":"माता = mother, पिता = father, भ्राता = brother, स्वसा = sister","devanagari":"माता पिता भ्राता स्वसा","transliteration":"mātā pitā bhrātā svasā"},{"heading":"प्रकृतिः — Nature","body":"सूर्यः = sun, चन्द्रः = moon, जलम् = water, अग्निः = fire","devanagari":"सूर्यः चन्द्रः जलम् अग्निः"},{"heading":"शरीरम् — Body","body":"मुखम् = face, नेत्रम् = eye, करः = hand, पादः = foot","devanagari":"मुखम् नेत्रम् करः पादः"}],"summary":"Great! You know 12 basic Sanskrit words. Practice by pointing to objects and saying their Sanskrit names."}',
  '[{"id":"q-sw1","prompt":"What is \\"mother\\" in Sanskrit?","options":["पिता","माता","भ्राता","स्वसा"],"correctIndex":1,"explanation":"माता = mother.","difficulty":1},{"id":"q-sw2","prompt":"जलम् means...?","options":["Fire","Sun","Water","Moon"],"correctIndex":2,"explanation":"जलम् = water.","difficulty":1}]',
  '["skill-vocab-basics"]', 3),

('basic-sentences', 'सरलवाक्यानि — Basic Sentences', 'Subject-Object-Verb in simple sentences', 1, 'teen', '20 min',
  '{"introduction":"Sanskrit word order is Subject-Object-Verb (SOV). Adjectives agree with nouns.","sections":[{"heading":"Simple SOV Structure","body":"रामः फलं खादति = Rāma eats a fruit.\\nरामः = subject (Rāma), फलम् = object (fruit), खादति = verb (eats)","devanagari":"रामः फलं खादति","transliteration":"Rāmaḥ phalaṃ khādati","examples":[{"text":"सीता जलं पिबति","meaning":"Sītā drinks water"},{"text":"बालः पुस्तकं पठति","meaning":"The boy reads a book"}]},{"heading":"Adjective-Noun Agreement","body":"Adjectives match the noun in gender, number, case.\\nबालः = boy (masc.), बाला = girl (fem.)\\nसुन्दरः बालः = beautiful boy\\nसुन्दरी बाला = beautiful girl","devanagari":"सुन्दरः बालः । सुन्दरी बाला"}],"summary":"SOV order + adjective agreement are the foundation of all Sanskrit sentences."}',
  '[{"id":"q-bs1","prompt":"What is the word order in Sanskrit?","options":["SVO","SOV","VSO","OSV"],"correctIndex":1,"explanation":"Sanskrit follows Subject-Object-Verb order.","difficulty":1},{"id":"q-bs2","prompt":"Translate: रामः फलं खादति","options":["Rāma eats a fruit","Rāma drinks water","Fruit eats Rāma","Rāma is a fruit"],"correctIndex":0,"explanation":"रामः (Rāma) + फलम् (fruit) + खादति (eats).","difficulty":2}]',
  '["skill-syntax"]', 4),

('declensions', 'विभक्तयः — The 8 Cases', 'Master noun declensions across 3 genders', 2, 'undergrad', '30 min',
  '{"introduction":"Sanskrit nouns change form (decline) based on their grammatical role. There are 8 cases (vibhaktis) and 3 numbers (singular, dual, plural).","sections":[{"heading":"The 8 Cases (विभक्तयः)","body":"1. प्रथमा = Nominative (subject)\\n2. द्वितीया = Accusative (object)\\n3. तृतीया = Instrumental (by/with)\\n4. चतुर्थी = Dative (to/for)\\n5. पञ्चमी = Ablative (from)\\n6. षष्ठी = Genitive (of)\\n7. सप्तमी = Locative (in/on)\\n8. सम्बोधन = Vocative (O!)"},{"heading":"राम — Masculine a-stem","body":"Singular: रामः, रामम्, रामेण, रामाय, रामात्, रामस्य, रामे, हे राम\\nDual: रामौ, रामौ, रामाभ्याम्, ...\\nPlural: रामाः, रामान्, रामैः, ...","devanagari":"रामः  रामम्  रामेण  रामाय  रामात्  रामस्य  रामे  हे राम","transliteration":"rāmaḥ rāmam rāmeṇa rāmāya rāmāt rāmasya rāme he rāma"},{"heading":"फल — Neuter a-stem","body":"Nominative singular: फलम् (phalam)\\nNominative plural: फलानि (phalāni)\\nNote: Neuter nom./acc. are always identical.","devanagari":"फलम् फलानि"},{"heading":"बाला — Feminine ā-stem","body":"Singular: बाला, बालाम्, बालया, बालायै, बालायाः, बालायाः, बालायाम्, हे बाले","devanagari":"बाला बालाम् बालया बालायै"}],"summary":"Learn the paradigm of राम (masc.), फल (neut.), and बाला (fem.) to master the case system."}',
  '[{"id":"q-d1","prompt":"How many cases does Sanskrit have?","options":["6","7","8","10"],"correctIndex":2,"explanation":"Sanskrit has 8 cases (vibhaktis) plus the vocative.","difficulty":1},{"id":"q-d2","prompt":"What is the instrumental singular of राम?","options":["रामेण","रामाय","रामात्","रामस्य"],"correctIndex":0,"explanation":"Instrumental (तृतीया) singular of राम is रामेण.","difficulty":3},{"id":"q-d3","prompt":"Neuter nominative plural ending?","options":["-आः","-अम्","-आनि","-ए"],"correctIndex":2,"explanation":"Neuter a-stem nominative plural ends in -आनि.","difficulty":2}]',
  '["skill-declensions"]', 5),

('sandhi-rules', 'सन्धिः — Sound Merger Rules', 'The elegant rules of sound combination', 3, 'teen', '35 min',
  '{"introduction":"Sandhi is the joining of sounds across word boundaries. Sanskrit texts are written with sandhi applied.","sections":[{"heading":"Guṇa Sandhi","body":"अ/आ + इ/ई → ए\\nअ/आ + उ/ऊ → ओ\\nअ/आ + ऋ → अर्\\nExample: देव + इन्द्रः = देवेन्द्रः","devanagari":"देव + इन्द्रः = देवेन्द्रः","examples":[{"text":"राम + इच्छति","meaning":"रामेच्छति (Rāma desires)"},{"text":"हित + उपदेशः","meaning":"हितोपदेशः (beneficial advice)"}]},{"heading":"Vṛddhi Sandhi","body":"अ/आ + ए → ऐ\\nअ/आ + ओ → औ\\nExample: सदा + एव = सदैव","devanagari":"सदा + एव = सदैव"},{"heading":"Yaṇ Sandhi","body":"इ/ई + vowel → य् + vowel\\nउ/ऊ + vowel → व् + vowel\\nExample: इति + आह = इत्याह","devanagari":"इति + आह = इत्याह","examples":[{"text":"अग्नि + इव","meaning":"अग्निरिव (like fire)"}]}],"summary":"The three main sandhi types — Guṇa, Vṛddhi, and Yaṇ — cover 90% of cases in classical texts."}',
  '[{"id":"q-s1","prompt":"देव + इन्द्रः = ?","options":["दवेन्द्रः","देवेन्द्रः","देवैन्द्रः","देवीन्द्रः"],"correctIndex":1,"explanation":"अ + इ = ए by Guṇa sandhi: देवेन्द्रः.","difficulty":3},{"id":"q-s2","prompt":"Which sandhi produces ऐ?","options":["Guṇa","Vṛddhi","Yaṇ","Ayādi"],"correctIndex":1,"explanation":"Vṛddhi sandhi: अ/आ + ए → ऐ.","difficulty":2}]',
  '["skill-sandhi"]', 6),

('compounds', 'समासाः — Compound Formation', 'The art of combining words into compact forms', 3, 'teen', '25 min',
  '{"introduction":"Sanskrit loves compounds (samāsas). A single compound word can express what takes a full sentence in English.","sections":[{"heading":"Tatpuruṣa (Determinative)","body":"First part modifies the second (like an object/complement).\\nExample: राजपुरुषः = राजन् + पुरुषः (king\'s man)","devanagari":"राजपुरुषः = राजन् + पुरुषः"},{"heading":"Bahuvrīhi (Exocentric)","body":"Refers to something outside the compound.\\nExample: चक्रपाणिः = चक्रम् + पाणिः (having a discus in hand = Viṣṇu)","devanagari":"चक्रपाणिः"},{"heading":"Dvandva (Copulative)","body":"Lists multiple items as a pair/group.\\nExample: रामकृष्णौ = Rāma and Kṛṣṇa","devanagari":"रामकृष्णौ"}],"summary":"Tatpuruṣa, Bahuvrīhi, and Dvandva are the three main compound types."}',
  '[{"id":"q-comp1","prompt":"राजपुरुषः is which type of compound?","options":["Tatpuruṣa","Bahuvrīhi","Dvandva","Avyayībhāva"],"correctIndex":0,"explanation":"राजपुरुषः = राजन् + पुरुषः is Tatpuruṣa.","difficulty":3}]',
  '["skill-compounds"]', 7),

('kalidasa', 'कालिदासः — The Poet Laureate', 'Analyzing the first verse of Abhijñānaśākuntalam', 4, 'undergrad', '30 min',
  '{"introduction":"Kālidāsa is the greatest Sanskrit poet. His play opens with a benedictory verse.","sections":[{"heading":"Verse 1.1","body":"आसीदुदन्तुमूलेषु सचेताः प्रभवः स्वयम् । विधाता तस्य चेतांसि विधिना विधिना दधे ॥","devanagari":"आसीदुदन्तुमूलेषु सचेताः प्रभवः स्वयम् । विधाता तस्य चेतांसि विधिना विधिना दधे ॥","transliteration":"āsīdudantumūleṣu sacetāḥ prabhavaḥ svayam |","examples":[{"text":"आसीत् (āsīt)","meaning":"was"},{"text":"प्रभवः (prabhavaḥ)","meaning":"origins"}]},{"heading":"Metre: Anuṣṭubh","body":"8 syllables per quarter-verse (pāda). Pattern: ⏑⏑-- ⏑⏑-- ⏑⏑-- ⏑⏑-×\\nThis is the most common Sanskrit metre."}],"summary":"Kālidāsa\'s style is marked by elegant simplicity (prasāda guṇa)."}',
  '[{"id":"q-kl1","prompt":"Which metre is most common in Classical Sanskrit?","options":["Triṣṭubh","Anuṣṭubh","Gāyatrī","Jagatī"],"correctIndex":1,"explanation":"Anuṣṭubh (8 syllables/pāda) is the most common metre.","difficulty":2}]',
  '["skill-classical-texts"]', 8),

('nyaya-intro', 'न्यायः — Introduction to Logic', 'The 16 categories of Nyāya philosophy', 4, 'undergrad', '30 min',
  '{"introduction":"Nyāya (lit. \\"method\\") is the school of logic and epistemology founded by Gautama Akṣapāda.","sections":[{"heading":"The 16 Padārthas","body":"1. प्रमाण (knowledge)\\n2. प्रमेय (objects)\\n3. संशय (doubt)\\n4. प्रयोजन (purpose)\\n5. दृष्टान्त (example)\\n6. सिद्धान्त (doctrine)\\n7. अवयव (inference members)\\n8. तर्क (reasoning)\\n9. निर्णय (certainty)\\n10. वाद (discussion)\\n11. जल्प (wrangling)\\n12. वितण्डा (cavil)\\n13. हेत्वाभास (fallacies)\\n14. छल (quibble)\\n15. जाति (rejoinder)\\n16. निग्रहस्थान (defeat)"},{"heading":"Anumāna — Inference","body":"The 5-membered syllogism:\\n1. प्रतिज्ञा (thesis): The hill has fire\\n2. हेतु (reason): Because it has smoke\\n3. उदाहरण (example): Kitchen\\n4. उपनय (application): This hill has smoke\\n5. निगमन (conclusion): Therefore it has fire"}],"summary":"Nyāya provides the logical framework for all later Indian philosophy."}',
  '[{"id":"q-ny1","prompt":"How many categories (padārthas) does Nyāya recognize?","options":["12","16","20","7"],"correctIndex":1,"explanation":"Nyāya Sūtra 1.1.1 lists 16 padārthas.","difficulty":3},{"id":"q-ny2","prompt":"What is the third member of the Nyāya syllogism?","options":["Pratijñā","Hetu","Udāharaṇa","Nigamana"],"correctIndex":2,"explanation":"Udāharaṇa (example) is the third member.","difficulty":4}]',
  '["skill-philosophy"]', 9),

('textual-criticism', 'पाठसमालोचनम् — Textual Criticism', 'Establishing critical editions from manuscript witnesses', 5, 'graduate', '45 min',
  '{"introduction":"Textual criticism (pāṭhasamālocanam) reconstructs the original text from multiple manuscript copies.","sections":[{"heading":"Stemmatics (Stemma Codicum)","body":"A stemma is a family tree of manuscripts.\\n- Archetype (lost original)\\n- Hyparchetypes (intermediate copies)\\n- Witnesses (extant manuscripts)"},{"heading":"Types of Variants","body":"1. लेखकप्रमादाः — Scribal errors\\n2. संशोधकप्रक्षेपाः — Conjectural emendations\\n3. पाठभेदाः — Genuine variant readings"},{"heading":"Recension Method","body":"Step 1: Collate all witnesses\\nStep 2: Classify by shared errors\\nStep 3: Construct stemma\\nStep 4: Reconstruct archetype\\nStep 5: Apply emendation"}],"summary":"A critical edition presents a reconstructed text with a critical apparatus documenting all variants."}',
  '[{"id":"q-tc1","prompt":"What is a stemma?","options":["A type of poem","A family tree of MSS","A commentary","A grammatical rule"],"correctIndex":1,"explanation":"A stemma shows the genealogical relationship between manuscripts.","difficulty":4}]',
  '["skill-critical-edition"]', 10),

('paleography', 'पुरालिपिज्ञानम् — Paleography', 'Reading ancient Devanāgarī and Grantha scripts', 5, 'graduate', '40 min',
  '{"introduction":"Paleography is the study of ancient handwriting. Manuscripts are found in Devanāgarī and Grantha scripts.","sections":[{"heading":"Devanāgarī Evolution","body":"Brahmi (3rd BCE) → Gupta (4-6 CE) → Siddhamātṛkā (7-8 CE) → Nāgarī (9-10 CE) → Devanāgarī (11+ CE)"},{"heading":"Grantha Script","body":"Used in Tamil Nadu and Kerala for Sanskrit. Distinctive rounded shapes adapted to palm-leaf writing."},{"heading":"Common Challenges","body":"1. Confusion of स and व and ब\\n2. No word division in older MSS\\n3. Abbreviations"}],"summary":"Reading manuscripts requires practice identifying letter shapes across centuries."}',
  '[{"id":"q-pal1","prompt":"Which script is used for Sanskrit in South India?","options":["Devanāgarī","Grantha","Brāhmī","Kharoṣṭhī"],"correctIndex":1,"explanation":"Grantha is the South Indian script for Sanskrit.","difficulty":3}]',
  '["skill-paleography"]', 11),

('critical-edition', 'समालोचनसंस्करणम् — Critical Edition', 'Building a full critical edition with apparatus', 6, 'phd', '60 min',
  '{"introduction":"Preparing a critical edition is the highest form of text-historical scholarship.","sections":[{"heading":"Critical Apparatus Format","body":"The apparatus records every variant:\\nSigla: A, B, C = manuscripts\\n1a: ते च A B : तु C D\\n1b: मया A C : तया B D"},{"heading":"Conjectural Emendation","body":"When all witnesses give a corrupt reading, the editor may emend.\\nPrinciple: lectio difficilior potior"},{"heading":"Digital Edition Standards","body":"XML-TEI is the modern standard. Each manuscript is encoded with variant readings."}],"summary":"A PhD-level critical edition is the definitive scholarly resource for a text."}',
  '[{"id":"q-ce1","prompt":"What does \\"lectio difficilior potior\\" mean?","options":["Easier reading is better","The more difficult reading is preferable","Always follow the oldest MS","Never emend"],"correctIndex":1,"explanation":"Scribes tend to simplify, so the harder reading is likely original.","difficulty":5}]',
  '["skill-phd-research"]', 12);

-- ─── DICTIONARY ───
INSERT INTO dictionary (word, root, meanings, derivations, pos) VALUES
('अग्नि', 'अञ्च्', '{"fire", "god of fire", "energy"}', '{"आग्नेय", "अग्निकार्य"}', 'noun'),
('राम', 'रम्', '{"Rama", "pleasing", "charming"}', '{"रामायण", "रामानुज"}', 'noun'),
('पिता', NULL, '{"father"}', '{}', 'noun'),
('माता', NULL, '{"mother"}', '{}', 'noun'),
('जल', NULL, '{"water"}', '{}', 'noun'),
('सूर्य', NULL, '{"sun"}', '{}', 'noun'),
('चन्द्र', NULL, '{"moon"}', '{}', 'noun'),
('फल', NULL, '{"fruit", "result"}', '{}', 'noun'),
('देव', 'दिव्', '{"god", "divine being"}', '{"देवी", "दैव"}', 'noun'),
('मनुष्य', 'मन्', '{"human", "man"}', '{"मानव", "मानुष"}', 'noun'),
('पुस्तक', NULL, '{"book"}', '{}', 'noun'),
('विद्या', 'विद्', '{"knowledge", "learning"}', '{"विद्यालय", "विद्वान्"}', 'noun'),
('सत्य', 'अस्', '{"truth", "true"}', '{"सत्यम्", "सत्यवादी"}', 'noun'),
('धर्म', 'धृ', '{"dharma", "duty", "righteousness"}', '{"धार्मिक", "धर्मात्मा"}', 'noun'),
('गुरु', NULL, '{"teacher", "heavy", "venerable"}', '{"गुरुकुल", "गौरव"}', 'noun'),
('भाषा', 'भाष्', '{"language", "speech"}', '{"भाषण", "भाष्य"}', 'noun'),
('लोक', NULL, '{"world", "people", "realm"}', '{"लौकिक", "लोकेश"}', 'noun'),
('प्रेम', 'प्री', '{"love", "affection"}', '{"प्रिय", "प्रेमी"}', 'noun'),
('शान्ति', NULL, '{"peace", "calm"}', '{"शान्त", "शान्तिकर"}', 'noun'),
('आनन्द', 'नन्द्', '{"bliss", "joy"}', '{"आनन्दित", "नन्दन"}', 'noun'),

('खादति', 'खाद्', '{"eats", "devours"}', '{}', 'verb'),
('पिबति', 'पा', '{"drinks"}', '{}', 'verb'),
('पठति', 'पठ्', '{"reads", "studies"}', '{}', 'verb'),
('भवति', 'भू', '{"becomes", "exists", "happens"}', '{}', 'verb'),
('करोति', 'कृ', '{"does", "makes", "performs"}', '{"कार्य", "कर्म"}', 'verb'),
('वदति', 'वद्', '{"speaks", "says"}', '{"वाक्य", "वाणी"}', 'verb'),
('गच्छति', 'गम्', '{"goes"}', '{"गति", "गमन"}', 'verb'),
('पश्यति', 'दृश्', '{"sees", "looks"}', '{"दर्शन", "दृष्टि"}', 'verb'),
('शृणोति', 'श्रु', '{"hears", "listens"}', '{"श्रुति", "श्रवण"}', 'verb'),
('जानाति', 'ज्ञा', '{"knows", "understands"}', '{"ज्ञान", "ज्ञाता"}', 'verb');

-- ─── MANUSCRIPTS ───
INSERT INTO manuscripts (name, script, period, transcription) VALUES
('Palm-leaf MS 1 — Devanāgarī', 'Devanagari', '12th CE', 'अग्निमीळे पुरोहितं यज्ञस्य देवं रत्वीजम्'),
('Palm-leaf MS 2 — Grantha', 'Grantha', '14th CE', 'वृद्धिरादैच् । अदेङ् गुणः ।'),
('Palm-leaf MS 3 — Devanāgarī', 'Devanagari', '15th CE', 'अथ धर्मं व्याख्यास्यामः'),
('Grantha MS — Nyāya Sūtra', 'Grantha', '16th CE', 'प्रमाणप्रमेयसंशयप्रयोजनदृष्टान्तसिद्धान्तावयव');