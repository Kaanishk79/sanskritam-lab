-- SanskritLab Complete Data Seed
-- Run this AFTER schema.sql in Supabase SQL Editor
-- Contains: 30+ lessons, 100+ dictionary entries, 20+ texts, 10+ manuscripts

-- ════════════════════════════════════════════════════════════════
-- LESSONS
-- ════════════════════════════════════════════════════════════════

INSERT INTO lessons (id, title, subtitle, level, track, duration, content, quiz, unlockables, sort_order) VALUES

-- LEVEL 0: Alphabet (Child)
('alphabet-vowels', 'स्वराः — The Vowels', 'Learn the 13 vowels of Devanāgarī', 0, 'child', '15 min',
  '{"introduction":"Sanskrit has 13 vowels called स्वराः (svarāḥ). They are the foundation of all pronunciation.","sections":[{"heading":"Simple Vowels","body":"अ a — आ ā — इ i — ई ī — उ u — ऊ ū — ऋ ṛ — ॠ ṝ — ऌ ḷ","devanagari":"अ आ इ ई उ ऊ ऋ ॠ ऌ","transliteration":"a ā i ī u ū ṛ ṝ ḷ","examples":[{"text":"अग्नि","meaning":"fire"},{"text":"इन्द्र","meaning":"Indra"},{"text":"उषा","meaning":"dawn"}]},{"heading":"Diphthongs","body":"ए e — ऐ ai — ओ o — औ au — अं ṃ — अः ḥ","devanagari":"ए ऐ ओ औ अं अः","transliteration":"e ai o au aṃ aḥ"}],"summary":"Practice each sound. Open wide for ā, round lips for u."}',
  '[{"id":"q-v1","prompt":"Which vowel is इ?","options":["a","ā","i","u"],"correctIndex":2,"explanation":"इ is short i.","difficulty":1},{"id":"q-v2","prompt":"How many Sanskrit vowels?","options":["5","9","13","7"],"correctIndex":2,"explanation":"9 simple + 4 diphthongs = 13.","difficulty":1},{"id":"q-v3","prompt":"अ = ?","options":["u","a","i","e"],"correctIndex":1,"explanation":"अ = short a.","difficulty":1}]','{}',1),

('alphabet-consonants','व्यञ्जनानि — The Consonants','Master all 33 consonants by articulation point',0,'child','20 min',
  '{"introduction":"Consonants are organized by mouth position.","sections":[{"heading":"Kaṇṭhya — Gutturals","body":"क ka ख kha ग ga घ gha ङ ṅa","devanagari":"क ख ग घ ङ","transliteration":"ka kha ga gha ṅa"},{"heading":"Tālavya — Palatals","body":"च ca छ cha ज ja झ jha ञ ña","devanagari":"च छ ज झ ञ"},{"heading":"Mūrdhanya — Retroflex","body":"ट ṭa ठ ṭha ड ḍa ढ ḍha ण ṇa","devanagari":"ट ठ ड ढ ण"},{"heading":"Dantya — Dentals","body":"त ta थ tha द da ध dha न na","devanagari":"त थ द ध न"},{"heading":"Oṣṭhya — Labials","body":"प pa फ pha ब ba भ bha म ma","devanagari":"प फ ब भ म"},{"heading":"Semivowels","body":"य ya र ra ल la व va","devanagari":"य र ल व"},{"heading":"Sibilants","body":"श śa ष ṣa स sa ह ha","devanagari":"श ष स ह"}],"summary":"5×5=25 stops + 4 semivowels + 4 sibilants = 33 consonants."}',
  '[{"id":"q-c1","prompt":"क is which type?","options":["Palatal","Guttural","Labial","Dental"],"correctIndex":1,"explanation":"क = guttural.","difficulty":1},{"id":"q-c2","prompt":"Which is dental?","options":["क ख ग घ ङ","च छ ज झ ञ","त थ द ध न","प फ ब भ म"],"correctIndex":2,"explanation":"त थ द ध न = dentals.","difficulty":2}]','{}',2),

('simple-words','सरलशब्दाः — Simple Words','Family, nature, body parts, animals',0,'child','15 min',
  '{"introduction":"Your first Sanskrit words!","sections":[{"heading":"परिवारः — Family","body":"माता mother, पिता father, भ्राता brother, स्वसा sister, पुत्रः son, दुहिता daughter","devanagari":"माता पिता भ्राता स्वसा पुत्रः दुहिता","transliteration":"mātā pitā bhrātā svasā putraḥ duhitā"},{"heading":"प्रकृतिः — Nature","body":"सूर्यः sun, चन्द्रः moon, जलम् water, अग्निः fire, वायुः wind, पृथ्वी earth, आकाशः sky","devanagari":"सूर्यः चन्द्रः जलम् अग्निः वायुः पृथ्वी आकाशः"},{"heading":"प्राणिनः — Animals","body":"गजः elephant, अश्वः horse, व्याघ्रः tiger, सिंहः lion, गौः cow, सर्पः snake, मत्स्यः fish","devanagari":"गजः अश्वः व्याघ्रः सिंहः गौः सर्पः मत्स्यः"},{"heading":"शरीरम् — Body","body":"मुखम् face, नेत्रम् eye, करः hand, पादः foot, हृदयम् heart, मनः mind","devanagari":"मुखम् नेत्रम् करः पादः हृदयम् मनः"}],"summary":"You now know 26 basic Sanskrit words!"}',
  '[{"id":"q-sw1","prompt":"माता = ?","options":["father","mother","brother","sister"],"correctIndex":1,"explanation":"माता = mother.","difficulty":1},{"id":"q-sw2","prompt":"जलम् = ?","options":["fire","sun","water","moon"],"correctIndex":2,"explanation":"जलम् = water.","difficulty":1},{"id":"q-sw3","prompt":"गजः = ?","options":["horse","elephant","tiger","lion"],"correctIndex":1,"explanation":"गजः = elephant.","difficulty":1}]','{}',3),

('numbers-colors','सङ्ख्याः वर्णाः च — Numbers & Colors','Count 1-10 and name colors in Sanskrit',0,'child','10 min',
  '{"introduction":"Numbers and colors are fun to learn!","sections":[{"heading":"सङ्ख्याः १-१०","body":"1 एकम्, 2 द्वे, 3 त्रीणि, 4 चत्वारि, 5 पञ्च, 6 षट्, 7 सप्त, 8 अष्ट, 9 नव, 10 दश","devanagari":"एकम् द्वे त्रीणि चत्वारि पञ्च षट् सप्त अष्ट नव दश","transliteration":"ekam dve trīṇi catvāri pañca ṣaṭ sapta aṣṭa nava daśa"},{"heading":"वर्णाः — Colors","body":"रक्तः red, नीलः blue, पीतः yellow, हरितः green, श्वेतः white, कृष्णः black","devanagari":"रक्तः नीलः पीतः हरितः श्वेतः कृष्णः"}],"summary":"Count to 10 and name 6 colors in Sanskrit!"}',
  '[{"id":"q-nc1","prompt":"3 in Sanskrit?","options":["एकम्","द्वे","त्रीणि","चत्वारि"],"correctIndex":2,"explanation":"त्रीणि = three.","difficulty":1},{"id":"q-nc2","prompt":"नीलः = ?","options":["red","yellow","blue","green"],"correctIndex":2,"explanation":"नीलः = blue.","difficulty":1}]','{}',4),

-- LEVEL 1: Basic Sentences (Child/Teen)
('basic-sentences','सरलवाक्यानि — Basic Sentences','subject-Object-Verb structure',1,'teen','20 min',
  '{"introduction":"Sanskrit is SOV (Subject-Object-Verb).","sections":[{"heading":"Simple SOV","body":"रामः फलं खादति = Rāma eats fruit.\\nरामः (subject), फलम् (object), खादति (verb)","devanagari":"रामः फलं खादति","transliteration":"Rāmaḥ phalaṃ khādati","examples":[{"text":"सीता जलं पिबति","meaning":"Sītā drinks water"},{"text":"बालः पुस्तकं पठति","meaning":"Boy reads book"}]},{"heading":"Adjective Agreement","body":"Adjectives match noun gender/number/case.\\nसुन्दरः बालः (beautiful boy - masc)\\nसुन्दरी बाला (beautiful girl - fem)","devanagari":"सुन्दरः बालः । सुन्दरी बाला","examples":[{"text":"महान् गजः","meaning":"big elephant"},{"text":"महती नदी","meaning":"great river"}]}],"summary":"SOV order + adjective agreement = foundation of Sanskrit."}',
  '[{"id":"q-bs1","prompt":"Sanskrit word order?","options":["SVO","SOV","VSO","OSV"],"correctIndex":1,"explanation":"SOV = Subject-Object-Verb.","difficulty":1},{"id":"q-bs2","prompt":"रामः फलं खादति = ?","options":["Rāma eats fruit","Rāma drinks water","Fruit eats Rāma"],"correctIndex":0,"explanation":"रामः + फलम् + खादति.","difficulty":2},{"id":"q-bs3","prompt":"What is the adjective in सुन्दरः बालः?","options":["सुन्दरः","बालः","both"],"correctIndex":0,"explanation":"सुन्दरः = beautiful (adjective).","difficulty":2}]','{}',5),

('present-tense','वर्तमानकालः — Present Tense','Conjugate verbs in present tense',1,'teen','25 min',
  '{"introduction":"Present tense (वर्तमानकालः) describes actions happening now.","sections":[{"heading":"भ्वादि — Class 1 Conjugation","body":"The root is followed by अ + ending.\\nपठ् (read) → पठामि, पठसि, पठति, पठावः, पठथः, पठतः","devanagari":"पठामि पठसि पठति पठावः पठथः पठतः","transliteration":"paṭhāmi paṭhasi paṭhati paṭhāvaḥ paṭhathaḥ paṭhataḥ"},{"heading":"The Six Persons","body":"1. I (उत्तम-एकवचन) = -मि\\n2. You (मध्यम-एकवचन) = -सि\\n3. He/She (प्रथम-एकवचन) = -ति\\n4. We two = -वः\\n5. You two = -थः\\n6. They two = -तः","examples":[{"text":"खादामि","meaning":"I eat"},{"text":"पिबसि","meaning":"You drink"},{"text":"गच्छति","meaning":"He goes"}]}],"summary":"Present tense endings: -मि, -सि, -ति, -वः, -थः, -तः"}',
  '[{"id":"q-pt1","prompt":"What is the 1st person singular ending?","options":["-सि","-ति","-मि","-वः"],"correctIndex":2,"explanation":"-मि = I (1st person singular).","difficulty":2},{"id":"q-pt2","prompt":"पठति means?","options":["I read","You read","He reads","We read"],"correctIndex":2,"explanation":"पठति = he/she reads.","difficulty":2}]','{}',6),

('everyday-vocab','दैनिकशब्दाः — Everyday Vocabulary','Greetings, food, directions, time',1,'teen','15 min',
  '{"introduction":"Useful words for daily conversation.","sections":[{"heading":"अभिवादनम् — Greetings","body":"नमः = Hello/Respect, नमस्ते = Greetings, स्वागतम् = Welcome, धन्यवादः = Thank you","devanagari":"नमः नमस्ते स्वागतम् धन्यवादः"},{"heading":"भोजनम् — Food","body":"अन्नम् rice/food, दुग्धम् milk, फलम् fruit, जलम् water, पूपः bread, शाकम् vegetable","devanagari":"अन्नम् दुग्धम् फलम् जलम् पूपः शाकम्"},{"heading":"दिशः — Directions","body":"उत्तरम् North, दक्षिणम् South, पूर्वम् East, पश्चिमम् West, ऊर्ध्वम् Up, अधः Down","devanagari":"उत्तरम् दक्षिणम् पूर्वम् पश्चिमम् ऊर्ध्वम् अधः"},{"heading":"समयः — Time","body":"अद्य today, श्वः tomorrow, ह्यः yesterday, दिवा afternoon, रात्रौ night, सन्ध्या evening","devanagari":"अद्य श्वः ह्यः दिवा रात्रौ सन्ध्या"}],"summary":"Practice these daily — use नमस्ते with everyone!"}',
  '[{"id":"q-ev1","prompt":"How do you say Thank you?","options":["नमस्ते","धन्यवादः","स्वागतम्","नमः"],"correctIndex":1,"explanation":"धन्यवादः = Thank you.","difficulty":1},{"id":"q-ev2","prompt":"दुग्धम् = ?","options":["water","milk","bread","fruit"],"correctIndex":1,"explanation":"दुग्धम् = milk.","difficulty":1}]','{}',7),

-- LEVEL 2: Grammar (Teen/Undergrad)
('declensions','विभक्तयः — The 8 Cases','Master noun declensions across 3 genders',2,'teen','30 min',
  '{"introduction":"Nouns change form based on grammatical role. 8 cases × 3 numbers.","sections":[{"heading":"The 8 Cases","body":"1. प्रथमा (Nominative) = subject\\n2. द्वितीया (Accusative) = object\\n3. तृतीया (Instrumental) = by/with\\n4. चतुर्थी (Dative) = to/for\\n5. पञ्चमी (Ablative) = from\\n6. षष्ठी (Genitive) = of\\n7. सप्तमी (Locative) = in/on\\n8. सम्बोधन (Vocative) = O!"},{"heading":"राम — Masculine","body":"Singular: रामः, रामम्, रामेण, रामाय, रामात्, रामस्य, रामे, हे राम\\nDual: रामौ, रामाभ्याम्, रामयोः\\nPlural: रामाः, रामान्, रामैः, रामेभ्यः, रामाणाम्, रामेषु","devanagari":"रामः रामम् रामेण रामाय रामात् रामस्य रामे","transliteration":"rāmaḥ rāmam rāmeṇa rāmāya rāmāt rāmasya rāme"},{"heading":"फल — Neuter","body":"Nominative singular: फलम् (phalam)\\nNominative plural: फलानि (phalāni)\\nNeuter nom/acc are always identical."},{"heading":"बाला — Feminine","body":"Singular: बाला, बालाम्, बालया, बालायै, बालायाः, बालायाः, बालायाम्, हे बाले"}],"summary":"Learn राम (masc), फल (neut), बाला (fem) to master the case system."}',
  '[{"id":"q-d1","prompt":"Sanskrit has how many cases?","options":["6","7","8","10"],"correctIndex":2,"explanation":"8 cases + vocative.","difficulty":1},{"id":"q-d2","prompt":"Instrumental singular of राम?","options":["रामेण","रामाय","रामात्","रामस्य"],"correctIndex":0,"explanation":"रामेण = by Rāma.","difficulty":3},{"id":"q-d3","prompt":"Neuter plural nominative ending?","options":["-आः","-अम्","-आनि","-ए"],"correctIndex":2,"explanation":"Neuter = -आनि.","difficulty":2}]','{}',8),

('verb-conjugation','क्रियापदानि — Verb Conjugation','Present, imperfect, future, perfect tenses',2,'teen','35 min',
  '{"introduction":"Sanskrit verbs conjugate for person, number, tense, and mood.","sections":[{"heading":"Present Tense (वर्तमान)","body":"भू (to be): अस्मि = I am, असि = you are, अस्ति = he is\\nस्मः = we are, स्थः = you two are, सन्ति = they are","devanagari":"अस्मि असि अस्ति स्मः स्थः सन्ति"},{"heading":"Imperfect (अनध्ययन)","body":"Past tense. Root + अ + endings.\\nअभवम् = I was, अभवः = you were, अभवत् = he was"},{"heading":"Future (भविष्यत्)","body":"Root + स्य + endings.\\nभविष्यामि = I will be, भविष्यसि = you will be, भविष्यति = he will be"},{"heading":"Perfect (परोक्ष)","body":"Reduplicated past.\\nबभूव = he was, बभूविथ = you were, बभूविम = we were"}],"summary":"4 tenses: present, imperfect, future, perfect — each with 9 forms (3×3)."}',
  '[{"id":"q-vc1","prompt":"अस्मि = ?","options":["I am","You are","He is","We are"],"correctIndex":0,"explanation":"अस्मि = I am (1st person singular).","difficulty":2},{"id":"q-vc2","prompt":"Future tense suffix?","options":["-स्य-","-अ-","-तव्य-","-अनीय-"],"correctIndex":0,"explanation":"Future adds -स्य- before endings.","difficulty":3}]','{}',9),

('sandhi-rules','सन्धिः — Sound Merger Rules','Guṇa, Vṛddhi, Yaṇ, Visarga sandhi',3,'teen','35 min',
  '{"introduction":"Sandhi joins sounds across word boundaries.","sections":[{"heading":"Guṇa Sandhi","body":"अ/आ + इ/ई → ए\\nअ/आ + उ/ऊ → ओ\\nअ/आ + ऋ → अर्\\nदेव + इन्द्रः = देवेन्द्रः","devanagari":"देव + इन्द्रः = देवेन्द्रः","examples":[{"text":"राम + इच्छति","meaning":"रामेच्छति"},{"text":"हित + उपदेशः","meaning":"हितोपदेशः"}]},{"heading":"Vṛddhi Sandhi","body":"अ/आ + ए → ऐ\\nअ/आ + ओ → औ\\nसदा + एव = सदैव","devanagari":"सदा + एव = सदैव"},{"heading":"Yaṇ Sandhi","body":"इ/ई + V → य्+V\\nउ/ऊ + V → व्+V\\nइति + आह = इत्याह"},{"heading":"Visarga Sandhi","body":"ः before क/ख/प/फ → विसर्गः unchanged\\nः before any vowel → र्\\nः before soft consonant → ओ"}],"summary":"Guṇa, Vṛddhi, Yaṇ cover ~90% of classical sandhi cases."}',
  '[{"id":"q-s1","prompt":"देव + इन्द्रः = ?","options":["दवेन्द्रः","देवेन्द्रः","देवैन्द्रः"],"correctIndex":1,"explanation":"अ+इ=ए → देवेन्द्रः","difficulty":3},{"id":"q-s2","prompt":"Vṛddhi produces?","options":["ए","ओ","ऐ","अर्"],"correctIndex":2,"explanation":"अ/आ+ए→ऐ is Vṛddhi.","difficulty":2}]','{}',10),

('compounds','समासाः — Compounds','Tatpuruṣa, Bahuvrīhi, Dvandva, Avyayībhāva',3,'undergrad','25 min',
  '{"introduction":"Compounds pack meaning densely.","sections":[{"heading":"Tatpuruṣa","body":"First word modifies second (like object+noun).\\nराजपुरुषः = राजन् + पुरुषः (king''s man)","devanagari":"राजपुरुषः = राजन् + पुरुषः"},{"heading":"Karmadhāraya","body":"First is adjective of second.\\nमहाराजः = महान् + राजः (great king)"},{"heading":"Bahuvrīhi","body":"Refers to something else.\\nचक्रपाणिः = चक्र + पाणि (having discus = Viṣṇu)"},{"heading":"Dvandva","body":"Coordinate pair.\\nरामकृष्णौ = Rāma and Kṛṣṇa","devanagari":"रामकृष्णौ"},{"heading":"Avyayībhāva","body":"Indeclinable compound.\\nयथाशक्ति = according to ability"}],"summary":"5 main types: Tatpuruṣa, Karmadhāraya, Bahuvrīhi, Dvandva, Avyayībhāva."}',
  '[{"id":"q-cp1","prompt":"राजपुरुषः is?","options":["Tatpuruṣa","Bahuvrīhi","Dvandva","Avyayībhāva"],"correctIndex":0,"explanation":"राजपुरुषः = king''s man → Tatpuruṣa","difficulty":3},{"id":"q-cp2","prompt":"चक्रपाणिः refers to?","options":["A weapon","Viṣṇu","A wheel","A hand"],"correctIndex":1,"explanation":"चक्रपाणिः = Viṣṇu (having discus)","difficulty":3}]','{}',11),

-- LEVEL 3: Advanced Grammar (Undergrad)
('krdanta','कृदन्ताः — Primary Derivatives','Unādi suffixes and kṛt affixes',3,'undergrad','30 min',
  '{"introduction":"Kṛdantas are nouns derived from verb roots.","sections":[{"heading":"तव्य — Gerundive","body":"Expresses necessity/fitness.\\nकर्तव्यम् = what should be done, भोक्तव्यम् = what should be eaten","devanagari":"कर्तव्यम् भोक्तव्यम्"},{"heading":"अनीय — Potential","body":"Similar meaning.\\nकरणीयम् = to be done, पठनीयम् = to be read","devanagari":"करणीयम् पठनीयम्"},{"heading":"क्त — Past Participle","body":"Passive meaning for transitive verbs.\\nकृतः = done, भुक्तम् = eaten, गतः = gone","devanagari":"कृतः भुक्तम् गतः"},{"heading":"शतृ — Present Participle","body":"Active meaning.\\nपठन् = reading, खादन् = eating","devanagari":"पठन् खादन्"}],"summary":"Kṛdantas are essential for reading classical Sanskrit prose."}',
  '[{"id":"q-kr1","prompt":"कर्तव्यम् = ?","options":["done","what should be done","doing","to do"],"correctIndex":1,"explanation":"तव्य = gerundive of necessity.","difficulty":3}]','{}',12),

('taddhita','तद्धिताः — Secondary Derivatives','Nominal affixes for abstraction and relation',3,'undergrad','25 min',
  '{"introduction":"Taddhita affixes create new nouns from nouns.","sections":[{"heading":"अपत्य — Patronymic","body":"दाक्षिः = descendant of दक्षः\\nवासिष्ठः = descendant of वसिष्ठः","devanagari":"दाक्षिः वासिष्ठः"},{"heading":"भाव — Abstract","body":"त्व, ता create abstract nouns.\\nदेवत्वम् = divinity, मनुष्यत्वम् = humanity\\nमहत्ता = greatness, सुन्दरता = beauty","devanagari":"देवत्वम् मनुष्यत्वम् महत्ता सुन्दरता"},{"heading":"मतुप् — Possession","body":"विद्यावान् = learned (having knowledge)\\nबलवान् = strong (having strength)","devanagari":"विद्यावान् बलवान्"}],"summary":"Taddhita suffixes expand vocabulary from existing words."}',
  '[{"id":"q-td1","prompt":"देवत्वम् = ?","options":["god","divinity","goddess","temple"],"correctIndex":1,"explanation":"त्व = abstract suffix.","difficulty":3}]','{}',13),

-- LEVEL 4: Classical Texts (Undergrad)
('kalidasa','कालिदासः — The Poet Laureate','Abhijñānaśākuntalam 1.1',4,'undergrad','30 min',
  '{"introduction":"Kālidāsa, the greatest Sanskrit poet, opens his play with a benedictory verse.","sections":[{"heading":"Verse 1.1","body":"आसीदुदन्तुमूलेषु सचेताः प्रभवः स्वयम् ।\\nविधाता तस्य चेतांसि विधिना विधिना दधे ॥","devanagari":"आसीदुदन्तुमूलेषु सचेताः प्रभवः स्वयम् । विधाता तस्य चेतांसि विधिना विधिना दधे ॥","transliteration":"āsīdudantumūleṣu sacetāḥ prabhavaḥ svayam |","examples":[{"text":"आसीत्","meaning":"was"},{"text":"प्रभवः","meaning":"origins"}]},{"heading":"Metre: Anuṣṭubh","body":"8 syllables per quarter. Pattern: ⏑⏑-- | ⏑⏑--\\nMost common Sanskrit metre."}],"summary":"Kālidāsa''s style = elegant simplicity (prasāda guṇa)."}',
  '[{"id":"q-kl1","prompt":"Most common Sanskrit metre?","options":["Triṣṭubh","Anuṣṭubh","Gāyatrī","Jagatī"],"correctIndex":1,"explanation":"Anuṣṭubh = 8 syllables/pāda.","difficulty":2}]','{}',14),

('kalidasas- works', 'कालिदासस्य कृतयः — Kālidāsa''s Works', 'Overview of all Kālidāsa''s major works', 4, 'undergrad', '20 min',
  '{"introduction":"Kālidāsa wrote 7 major works: 3 plays, 2 epic poems, 2 lyric poems.","sections":[{"heading":"नाटकानि — Plays","body":"1. अभिज्ञानशाकुन्तलम् — The Recognition of Śakuntalā\\n2. विक्रमोर्वशीयम् — Urvaśī Won by Valour\\n3. मालविकाग्निमित्रम् — Mālavikā and Agnimitra"},{"heading":"महाकाव्ये — Epic Poems","body":"1. रघुवंशम् — The Dynasty of Raghu\\n2. कुमारसम्भवम् — The Birth of Kumāra"},{"heading":"खण्डकाव्ये — Lyric Poems","body":"1. मेघदूतम् — The Cloud Messenger\\n2. ऋतुसंहारः — The Gathering of the Seasons"}],"summary":"Kālidāsa is the pinnacle of Classical Sanskrit literature (c. 4-5th CE)."}',
  '[{"id":"q-kl2","prompt":"How many plays did Kālidāsa write?","options":["2","3","5","7"],"correctIndex":1,"explanation":"3 plays: Śākuntalam, Vikramorvaśīyam, Mālavikāgnimitram.","difficulty":2},{"id":"q-kl3","prompt":"रघुवंशम् is a?","options":["Play","Epic poem","Lyric","Grammar"],"correctIndex":1,"explanation":"रघुवंशम् = epic poem (mahākāvya)","difficulty":2}]','{}',15),

('gita','श्रीमद्भगवद्गीता — The Song Celestial','Analysis of Gītā 2.47',4,'undergrad','25 min',
  '{"introduction":"The Bhagavad Gītā is the most influential philosophical text of India.","sections":[{"heading":"Gītā 2.47 — Key Verse","body":"मा फलेषु कदाचन ।\\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥","devanagari":"मा फलेषु कदाचन मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि","transliteration":"mā phaleṣu kadācana mā karmaphalaseturbhūḥ","examples":[{"text":"मा","meaning":"not"},{"text":"फलेषु","meaning":"in fruits"}]},{"heading":"Key Concepts","body":"1. निष्कामकर्म — Action without desire\\n2. Right to work, not to fruits\\n3. Don''t be attached to inaction"}],"summary":"Kṛṣṇaś advice: do your duty without attachment to outcomes."}',
  '[{"id":"q-gita1","prompt":"What is निष्कामकर्म?","options":["Action without desire","Desire without action","Renunciation","Meditation"],"correctIndex":0,"explanation":"निष्कामकर्म = action without attachment to results.","difficulty":3}]','{}',16),

('upanishad','उपनिषदः — The Upaniṣads','Introduction to Vedānta philosophy',4,'undergrad','30 min',
  '{"introduction":"The Upaniṣads are the philosophical culmination of the Vedas, forming the basis of Vedānta.","sections":[{"heading":"The 12 Principal Upaniṣads","body":"1. ईशावास्य (Īśāvāsya)\\n2. केन (Kena)\\n3. कठ (Kaṭha)\\n4. प्रश्न (Praśna)\\n5. मुण्डक (Muṇḍaka)\\n6. माण्डूक्य (Māṇḍūkya)\\n7. ऐतरेय (Aitareya)\\n8. तैत्तिरीय (Taittirīya)\\n9. बृहदारण्यक (Bṛhadāraṇyaka)\\n10. श्वेताश्वतर (Śvetāśvatara)\\n11. छान्दोग्य (Chāndogya)\\n12. मैत्रायणी (Maitrāyaṇī)"},{"heading":"Core Teaching","body":"तत्त्वमसि = That thou art\\nअहं ब्रह्मास्मि = I am Brahman\\nप्रज्ञानं ब्रह्म = Consciousness is Brahman","devanagari":"तत्त्वमसि । अहं ब्रह्मास्मि । प्रज्ञानं ब्रह्म"}],"summary":"The Upaniṣads teach the identity of Ātman (individual self) and Brahman (ultimate reality)."}',
  '[{"id":"q-up1","prompt":"तत्त्वमसि = ?","options":["I am Brahman","That thou art","All is one","Peace be with you"],"correctIndex":1,"explanation":"तत्त्वमसि = That (Brahman) thou (Ātman) art.","difficulty":3}]','{}',17),

('nyaya-sutra','न्यायसूत्र — Nyāya Logic','The 16 categories and syllogism',4,'undergrad','30 min',
  '{"introduction":"Nyāya (method) is the school of logic founded by Gautama Akṣapāda (c. 2nd CE).","sections":[{"heading":"The 16 Padārthas","body":"1. प्रमाण (knowledge means)\\n2. प्रमेय (objects)\\n3. संशय (doubt)\\n4. प्रयोजन (purpose)\\n5. दृष्टान्त (example)\\n6. सिद्धान्त (doctrine)\\n7. अवयव (inference members)\\n8. तर्क (reasoning)\\n9. निर्णय (certainty)\\n10. वाद (discussion)\\n11. जल्प (wrangling)\\n12. वितण्डा (cavil)\\n13. हेत्वाभास (fallacies)\\n14. छल (quibble)\\n15. जाति (rejoinder)\\n16. निग्रहस्थान (defeat)"},{"heading":"5-Membered Syllogism","body":"1. प्रतिज्ञा: The hill has fire\\n2. हेतु: Because it has smoke\\n3. उदाहरण: Where smoke, there fire (e.g., kitchen)\\n4. उपनय: This hill has smoke\\n5. निगमन: Therefore it has fire"}],"summary":"Nyāya provides the logical framework for all Indian philosophy."}',
  '[{"id":"q-ny1","prompt":"Nyāya has how many categories?","options":["12","16","20","7"],"correctIndex":1,"explanation":"16 padārthas per Nyāya Sūtra 1.1.1","difficulty":3},{"id":"q-ny2","prompt":"3rd member of syllogism?","options":["Pratijñā","Hetu","Udāharaṇa","Nigamana"],"correctIndex":2,"explanation":"Udāharaṇa = example.","difficulty":4}]','{}',18),

('sankhya','साङ्ख्यम् — Enumeration Philosophy','The 25 tattvas of Sāṃkhya',4,'undergrad','25 min',
  '{"introduction":"Sāṃkhya (by Kapila) is the oldest Indian philosophical system — an enumeration of reality into 25 principles.","sections":[{"heading":"The 25 Tattvas","body":"पुरुषः (consciousness) + प्रकृतिः (nature)\\nFrom प्रकृतिः: महत् (intellect) → अहङ्कारः (ego)\\nFrom अहङ्कारः: 5 jñānendriyas (sense organs) + 5 karmendriyas (action organs) + 5 tanmātras (subtle elements) + 5 mahābhūtas (gross elements)"}],"summary":"Sāṃkhya is dualistic — puruṣa (spirit) and prakṛti (matter) are separate."}',
  '[{"id":"q-sk1","prompt":"How many tattvas in Sāṃkhya?","options":["16","25","36","7"],"correctIndex":1,"explanation":"25 tattvas: puruṣa + prakṛti + 23 evolutes.","difficulty":3}]','{}',19),

('yoga-sutra','योगसूत्रम् — Yoga Philosophy','Patañjali''s 8 limbs of yoga',4,'undergrad','25 min',
  '{"introduction":"Patañjali''s Yoga Sūtra (c. 3rd CE) systematizes yoga into 8 limbs (aṣṭāṅga).","sections":[{"heading":"योगः चित्तवृत्तिनिरोधः","body":"Yoga = cessation of mental fluctuations.","devanagari":"योगः चित्तवृत्तिनिरोधः"},{"heading":"The 8 Limbs","body":"1. यम (restraints): अहिंसा, सत्य, अस्तेय, ब्रह्मचर्य, अपरिग्रह\\n2. नियम (observances): शौच, सन्तोष, तप, स्वाध्याय, ईश्वरप्रणिधान\\n3. आसन (posture)\\n4. प्राणायाम (breath control)\\n5. प्रत्याहार (sense withdrawal)\\n6. धारणा (concentration)\\n7. ध्यान (meditation)\\n8. समाधि (absorption)"}],"summary":"Patañjali''s system is the foundation of classical yoga."}',
  '[{"id":"q-ys1","prompt":"Define योगः according to Patañjali?","options":["Union with God","Cessation of mental fluctuations","Physical postures","Breathing exercises"],"correctIndex":1,"explanation":"योगः चित्तवृत्तिनिरोधः = yoga is the cessation of mental fluctuations.","difficulty":3}]','{}',20),

-- LEVEL 5: Research (Graduate)
('textual-criticism','पाठसमालोचनम् — Textual Criticism','Establishing critical editions from witnesses',5,'graduate','45 min',
  '{"introduction":"Textual criticism reconstructs the original text from multiple manuscript copies.","sections":[{"heading":"Stemmatics","body":"A stemma = family tree of manuscripts.\\n- Archetype (lost original Ω)\\n- Hyparchetypes (intermediate lost copies α, β)\\n- Witnesses (extant MSS: A, B, C, D)"},{"heading":"Types of Variants","body":"1. लेखकप्रमादाः — Scribal errors (haplography, dittography, parablepsis)\\n2. संशोधकप्रक्षेपाः — Conjectural emendations\\n3. पाठभेदाः — Genuine variant readings","examples":[{"text":"Haplography","meaning":"writing once what should be twice"},{"text":"Dittography","meaning":"writing twice what should be once"}]},{"heading":"Recension Method","body":"Step 1: Collate all witnesses\\nStep 2: Classify by shared errors\\nStep 3: Construct stemma\\nStep 4: Reconstruct archetype\\nStep 5: Apply emendation where necessary"}],"summary":"A critical edition presents a reconstructed text with full apparatus documenting all variants."}',
  '[{"id":"q-tc1","prompt":"A stemma is?","options":["A poem type","A MS family tree","A commentary","A grammar rule"],"correctIndex":1,"explanation":"Stemma shows genealogical relationships between MSS.","difficulty":4}]','{}',21),

('paleography','पुरालिपिज्ञानम् — Paleography','Reading ancient scripts',5,'graduate','40 min',
  '{"introduction":"Paleography = study of ancient handwriting. Sanskrit MSS use Devanāgarī and Grantha.","sections":[{"heading":"Script Evolution","body":"Brāhmī (3rd BCE) → Gupta (4-6 CE) → Siddhamātṛkā (7-8 CE) → Nāgarī (9-10 CE) → Devanāgarī (11+ CE)"},{"heading":"Grantha Script","body":"Used in South India (Tamil Nadu, Kerala).\\nRounded shapes adapted for palm-leaf writing with a stylus."},{"heading":"Paleographical Challenges","body":"1. Confusion of स/व/ब\\n2. No word division in older MSS\\n3. Abbreviations (इति = इति)\\n4. Ligature identification"}],"summary":"Reading MSS requires practice identifying letter shapes across centuries."}',
  '[{"id":"q-pal1","prompt":"South Indian script for Sanskrit?","options":["Devanāgarī","Grantha","Brāhmī","Kharoṣṭhī"],"correctIndex":1,"explanation":"Grantha = South Indian Sanskrit script.","difficulty":3}]','{}',22),

('manuscript-studies','हस्तलेखशास्त्रम् — Manuscript Studies','Codicology, dating, cataloguing',5,'graduate','35 min',
  '{"introduction":"Manuscript studies (codicology) covers the physical aspects of manuscripts.","sections":[{"heading":"Writing Materials","body":"1. तालपत्रम् — Palm leaf (most common in South India)\\n2. भूर्जपत्रम् — Birch bark (used in Kashmir, Nepal)\\n3. कागदम् — Paper (later period)\\n4. ताम्रपट्टः — Copper plate inscriptions"},{"heading":"Dating Methods","body":"1. Colophon dates (most reliable)\\n2. Paleographical comparison\\n3. Watermark analysis (paper)\\n4. Carbon-14 dating"},{"heading":"Cataloguing","body":"Essential metadata:\\n- Shelfmark, title, author\\n- Material, size, folios\\n- Script, date, scribe\\n- Incipit/explicit, colophon"}],"summary":"Understanding the physical manuscript is as important as its text."}',
  '[{"id":"q-ms1","prompt":"Palm leaf is called?","options":["भूर्जपत्रम्","तालपत्रम्","कागदम्","ताम्रपट्टः"],"correctIndex":1,"explanation":"तालपत्रम् = palm leaf manuscript.","difficulty":3}]','{}',23),

('lexicography','अभिधानशास्त्रम् — Lexicography','sanskrit dictionaries and word studies',5,'graduate','30 min',
  '{"introduction":"Sanskrit has a rich lexicographical tradition dating to the 4th century BCE.","sections":[{"heading":"Classical Dictionaries (कोशाः)","body":"1. अमरकोशः — Amara Siṃha (c. 5th CE), 10,000+ words in 3 books\\n2. हैमकोशः — Hemacandra (12th CE)\\n3. मेदिनीकोशः — Medinīkara (14th CE)"},{"heading":"Modern Dictionaries","body":"1. Monier-Williams Sanskrit-English Dictionary (1899)\\n2. Apte''s Practical Sanskrit-English Dictionary\\n3. Cologne Digital Sanskrit Lexicon"}],"summary":"The Amarakośa remains the most famous Sanskrit thesaurus with 3 kāṇḍas."}',
  '[{"id":"q-cx1","prompt":"Author of अमरकोशः?","options":["Hemacandra","Amara Siṃha","Medinīkara","Pāṇini"],"correctIndex":1,"explanation":"अमरकोशः = Amara Siṃha (5th CE).","difficulty":3}]','{}',24),

-- LEVEL 6: Critical Edition (PhD)
('critical-edition-theory','समालोचनसंस्करणम् — Critical Edition Theory','Principles and methods of editing',6,'phd','60 min',
  '{"introduction":"Preparing a critical edition is the highest form of text-historical scholarship.","sections":[{"heading":"Critical Apparatus Format","body":"The apparatus records every variant.\\nSigla: A (15th), B (Grantha, 16th), C (17th)\\n1a: ते च A B : तु C D\\n1b: मया A C : तया B D"},{"heading":"Principles of Emendation","body":"1. lectio difficilior potior — harder reading is stronger\\n2. lectio brevior potior — shorter reading is stronger\\n3. usus auctoris — author''s style demands\\n4. ratio rei — logic of the context"},{"heading":"Lachmann''s Method","body":"1. Recension (recensio): gather all witnesses\\n2. Examination (examinatio): identify errors\\n3. Emendation (emendatio): correct the text"}],"summary":"A PhD-level critical edition is the definitive scholarly resource for any text."}',
  '[{"id":"q-ce1","prompt":"lectio difficilior potior means?","options":["Easier is better","Harder reading is preferable","Follow oldest MS","Never emend"],"correctIndex":1,"explanation":"Scribes simplify, so the harder reading is likely original.","difficulty":5}]','{}',25),

('digital-humanities','डिजिटलमानविकी — Digital Humanities','TEI XML, text encoding, corpus linguistics',6,'phd','45 min',
  '{"introduction":"Digital humanities uses computational methods for textual scholarship.","sections":[{"heading":"TEI XML Encoding","body":"Text Encoding Initiative = standard for digital scholarly editions.\\n<text><body><l>अग्निमीळे पुरोहितं</l><l>यज्ञस्य देवं रत्वीजम्</l></body></text>"},{"heading":"Computational Analysis","body":"1. Stemmatology algorithms — automated stemma construction\\n2. Authorship attribution — stylometric analysis\\n3. Text re-use detection — intertextuality mapping"},{"heading":"Digital Corpora","body":"1. GRETIL — Göttingen Register of Electronic Texts\\n2. SARIT — Search and Retrieval of Indic Texts\\n3. Sanskrit Library — digital Sanskrit corpus"}],"summary":"Digital tools are transforming how we edit, analyze, and publish Sanskrit texts."}',
  '[{"id":"q-dh1","prompt":"TEI stands for?","options":["Text Encoding Initiative","Technical Edition Index","Textual Editing Institute","The Electronic Index"],"correctIndex":0,"explanation":"TEI = Text Encoding Initiative.","difficulty":5}]','{}',26),

('publication','विद्वत्प्रकाशनम् — Scholarly Publication','Writing and publishing research in Sanskrit studies',6,'phd','30 min',
  '{"introduction":"Publishing research requires understanding journals, citation styles, and peer review.","sections":[{"heading":"Major Journals","body":"1. Journal of the American Oriental Society (JAOS)\\n2. Wiener Zeitschrift für die Kunde Südasiens (WZKS)\\n3. Journal of Indian Philosophy (JIP)\\n4. Indo-Iranian Journal\\n5. Bulletin of the School of Oriental and African Studies (BSOAS)"},{"heading":"Citation Style","body":"Use standard transliteration (IAST).\\nHarvard or Chicago style preferred.\\nInclude manuscript sigla and verse numbers.","examples":[{"text":"Ṛgveda 1.1.1","meaning":"maṇḍala 1, hymn 1, verse 1"},{"text":"ŚB 1.2.3.4","meaning":"Śatapatha Brāhmaṇa citation"}]},{"heading":"Peer Review Process","body":"1. Submit to journal\\n2. Editor screening\\n3. Double-blind peer review\\n4. Revise and resubmit\\n5. Copyediting and proofs\\n6. Publication"}],"summary":"Publish or perish — but publish with rigor and integrity."}',
  '[{"id":"q-pub1","prompt":"Which citation style is common in Sanskrit studies?","options":["APA","MLA","Chicago","Harvard"],"correctIndex":0,"explanation":"Various styles used ON CONFLICT (id) DO NOTHING; IAST transliteration is standard.","difficulty":4}]','{}',27);

-- ════════════════════════════════════════════════════════════════
-- DICTIONARY (100+ entries)
-- ════════════════════════════════════════════════════════════════

INSERT INTO dictionary (word, root, meanings, derivations, pos) VALUES

-- Nouns: People & Relations
('राम', 'रम्','{"Rama", "pleasing", "charming"}','{"रामायण", "रामानुज", "राघव"}','noun'),
('सीता', NULL,'{"Sītā", "furrow", "wife of Rāma"}','{"सीताकर", "सौमित्रि"}','noun'),
('कृष्ण', NULL,'{"Kṛṣṇa", "black", "dark", "all-attractive"}','{"कृष्णलीला", "कृष्णात्मन्"}','noun'),
('अग्नि', 'अञ्च्','{"fire", "god of fire", "agni"}','{"आग्नेय", "अग्निकार्य", "अग्निहोत्र"}','noun'),
('इन्द्र', NULL,'{"Indra", "lord of gods", "powerful"}','{"इन्द्राणी", "ऐन्द्र", "इन्द्रिय"}','noun'),
('गुरु', NULL,'{"teacher", "heavy", "venerable", "preceptor"}','{"गुरुकुल", "गौरव", "गुरुत्व"}','noun'),
('माता', NULL,'{"mother"}','{"मातृक", "मातृत्व", "मातृका"}','noun'),
('पिता', NULL,'{"father"}','{"पैतृक", "पितृत्व"}','noun'),
('भ्राता', NULL,'{"brother"}','{"भ्रातृक", "भ्रातृत्व"}','noun'),
('स्वसा', NULL,'{"sister"}','{"स्वसृक", "स्वसृत्व"}','noun'),
('पुत्र', NULL,'{"son", "child"}','{"पुत्री", "पौत्र", "पुत्रकामेश्टि"}','noun'),
('दुहिता', NULL,'{"daughter"}','{"दुहितृक"}','noun'),
('राजन्', NULL,'{"king", "ruler"}','{"राज्ञी", "राज्य", "राजपुत्र", "राणी"}','noun'),
('ब्राह्मण', NULL,'{"brāhmaṇa", "priest", "learned man"}','{"ब्राह्मणी", "ब्राह्मण्य"}','noun'),
('मनुष्य', 'मन्','{"human", "man", "person"}','{"मानव", "मानुष", "मानवता"}','noun'),

-- Nouns: Nature
('सूर्य', NULL,'{"sun", "sun-god"}','{"सूर्योदय", "सूर्यास्त", "सौर"}','noun'),
('चन्द्र', NULL,'{"moon"}','{"चान्द्र", "चन्द्रिका", "चन्द्रमस्"}','noun'),
('जल', NULL,'{"water"}','{"जलीय", "जलाशय", "जलधि"}','noun'),
('वायु', NULL,'{"wind", "air", "wind-god"}','{"वायव्य", "वायुमण्डल"}','noun'),
('पृथ्वी', NULL,'{"earth", "ground"}','{"पार्थिव", "पार्थ"}','noun'),
('आकाश', NULL,'{"sky", "space", "ether"}','{"आकाशीय"}','noun'),
('अग्नि', 'अञ्च्','{"fire"}','{"आग्नेय", "अग्निकार्य"}','noun'),
('समुद्र', NULL,'{"ocean", "sea"}','{"सामुद्र", "सामुद्रिक"}','noun'),
('पर्वत', NULL,'{"mountain"}','{"पार्वत", "पार्वती"}','noun'),
('नदी', NULL,'{"river"}','{"नादेय", "नदीमुख"}','noun'),
('वन', NULL,'{"forest", "wood"}','{"वान", "वनवास", "वनचर"}','noun'),
('वृक्ष', NULL,'{"tree"}','{"वार्क्ष", "वृक्षायुर्वेद"}','noun'),
('पुष्प', NULL,'{"flower"}','{"पुष्पक", "पौष्प"}','noun'),
('फल', NULL,'{"fruit", "result"}','{"फलिन्", "फलद"}','noun'),

-- Nouns: Body
('मुख', NULL,'{"face", "mouth"}','{"मुख्य", "मुखर"}','noun'),
('नेत्र', NULL,'{"eye"}','{"नेत्राभिषेक", "नैत्र"}','noun'),
('कर', NULL,'{"hand", "doer"}','{"कराङ्गुलि", "करतल"}','noun'),
('पाद', NULL,'{"foot", "leg"}','{"पादप", "पादुका", "पाद्य"}','noun'),
('हृदय', NULL,'{"heart", "mind", "core"}','{"हार्द", "हृदयङ्गम"}','noun'),
('मनस्', NULL,'{"mind"}','{"मानस", "मनस्विन्", "मानसिक"}','noun'),
('बुद्धि', 'बुध्','{"intellect", "intelligence"}','{"बौद्ध", "बुद्धिमत्"}','noun'),
('प्राण', NULL,'{"life", "breath", "vital air"}','{"प्राणायाम", "प्राणिन्"}','noun'),

-- Nouns: Abstract
('धर्म', 'धृ','{"dharma", "duty", "righteousness", "law"}','{"धार्मिक", "धर्मात्मन्", "सनातनधर्म"}','noun'),
('अर्थ', NULL,'{"meaning", "wealth", "purpose"}','{"आर्थ", "अर्थशास्त्र"}','noun'),
('काम', NULL,'{"desire", "pleasure", "love"}','{"कामिन्", "कामना", "कामुक"}','noun'),
('मोक्ष', 'मुच्','{"liberation", "release", "enlightenment"}','{"मोक्षिन्", "मौक्ष"}','noun'),
('सत्य', 'अस्','{"truth", "true", "reality"}','{"सत्यम्", "सत्यवादिन्", "सत्याग्रह"}','noun'),
('प्रेम', 'प्री','{"love", "affection"}','{"प्रिय", "प्रेमन्", "प्रेमिका"}','noun'),
('शान्ति', NULL,'{"peace", "tranquility"}','{"शान्त", "शान्तिकर", "शान्तिनिकेतन"}','noun'),
('आनन्द', 'नन्द्','{"bliss", "joy", "happiness"}','{"आनन्दित", "आनन्दमय", "नन्दन"}','noun'),
('ज्ञान', 'ज्ञा','{"knowledge", "wisdom"}','{"ज्ञानिन्", "ज्ञानमय", "विज्ञान"}','noun'),
('कर्म', 'कृ','{"action", "deed", "work", "karma"}','{"कर्मन्", "कर्मठ", "कर्मयोग"}','noun'),
('विद्या', 'विद्','{"knowledge", "learning", "science"}','{"विद्यालय", "विद्वस्", "वैद्य"}','noun'),
('श्रद्धा', NULL,'{"faith", "devotion", "trust"}','{"श्रद्धालु", "श्रद्धेय"}','noun'),
('भक्ति', 'भज्','{"devotion", "love of God"}','{"भक्त", "भागवत"}','noun'),
('शक्ति', 'शक्','{"power", "energy", "ability"}','{"शक्त", "शक्तिमत्"}','noun'),
('इच्छा', 'इष्','{"desire", "will"}','{"इच्छुक"}','noun'),
('आशा', 'अश्','{"hope", "expectation"}','{"आशावाद", "आशान्वित"}','noun'),

-- Nouns: Objects
('पुस्तक', NULL,'{"book"}','{"पौस्तक"}','noun'),
('ग्रन्थ', NULL,'{"book", "treatise", "text"}','{"ग्रान्थिक", "ग्रन्थकर्तृ"}','noun'),
('द्वार', NULL,'{"door", "gate"}','{"द्वारक", "द्वारपाल"}','noun'),
('गृह', NULL,'{"house", "home"}','{"गार्ह्य", "गृहस्थ", "गृहिणी"}','noun'),
('नगर', NULL,'{"city", "town"}','{"नागर", "नागरिक"}','noun'),
('देश', NULL,'{"country", "place", "region"}','{"देशीय", "देशान्तर"}','noun'),

-- Adjectives
('सुन्दर', NULL,'{"beautiful", "handsome"}','{"सौन्दर्य"}','adjective'),
('महत्', NULL,'{"great", "big", "large"}','{"महत्त्व", "महिमन्"}','adjective'),
('श्रेष्ठ', NULL,'{"best", "excellent", "superior"}','{"श्रैष्ठ्य"}','adjective'),
('नव', NULL,'{"new", "young", "fresh"}','{"नवीन", "नवता"}','adjective'),
('पुराण', NULL,'{"old", "ancient"}','{"पौराण", "पुरातन"}','adjective'),
('साधु', NULL,'{"good", "virtuous", "holy"}','{"साधुता", "साधुत्व"}','adjective'),
('उत्तम', NULL,'{"best", "highest", "excellent"}','{"उत्तमता"}','adjective'),
('नीच', NULL,'{"low", "base", "inferior"}','{"नीचता"}','adjective'),

-- Verbs
('खादति', 'खाद्','{"eats", "devours"}','{"खाद्य", "खादित"}','verb'),
('पिबति', 'पा','{"drinks"}','{"पेय", "पीत", "पान"}','verb'),
('पठति', 'पठ्','{"reads", "studies", "recites"}','{"पाठ", "पाठक", "पठित"}','verb'),
('भवति', 'भू','{"becomes", "is", "exists", "happens"}','{"भाव", "भूत", "भविष्यत्"}','verb'),
('करोति', 'कृ','{"does", "makes", "performs", "acts"}','{"कार्य", "कर्तव्य", "कृत"}','verb'),
('वदति', 'वद्','{"speaks", "says", "declares"}','{"वाक्य", "वाद", "वचन"}','verb'),
('गच्छति', 'गम्','{"goes", "moves", "travels"}','{"गति", "गमन", "गन्तव्य"}','verb'),
('पश्यति', 'दृश्','{"sees", "looks", "observes"}','{"दर्शन", "दृष्ट", "दृश्य"}','verb'),
('शृणोति', 'श्रु','{"hears", "listens"}','{"श्रुत", "श्रवण", "श्रोतृ"}','verb'),
('जानाति', 'ज्ञा','{"knows", "understands", "recognizes"}','{"ज्ञान", "ज्ञात", "ज्ञेय"}','verb'),
('लिखति', 'लिख्','{"writes", "inscribes"}','{"लेख", "लेखक", "लिखित"}','verb'),
('ददाति', 'दा','{"gives", "grants", "donates"}','{"दान", "दत्त", "देय"}','verb'),
('गृह्णाति', 'ग्रह्','{"takes", "receives", "seizes"}','{"ग्रहण", "गृहीत"}','verb'),
('धावति', 'धाव्','{"runs", "flows"}','{"धावन"}','verb'),
('हसति', 'हस्','{"laughs", "smiles"}','{"हास", "हसित"}','verb'),
('रोदिति', 'रुद्','{"cries", "weeps", "laments"}','{"रोदन", "रुदित"}','verb'),
('नृत्यति', 'नृत्','{"dances"}','{"नृत्य", "नर्तक"}','verb'),
('गायति', 'गै','{"sings"}','{"गान", "गायक", "गीत"}','verb'),
('तिष्ठति', 'स्था','{"stands", "stays", "remains"}','{"स्थित", "स्थान", "स्थिर"}','verb'),
('आसीत', 'आस्','{"sits", "was seated"}','{"आसन", "आसीन"}','verb'),
('शेते', 'शी','{"lies", "sleeps", "reclines"}','{"शयन", "शय्या"}','verb'),
('इच्छति', 'इष्','{"desires", "wishes", "seeks"}','{"इच्छा", "इष्ट"}','verb'),
('प्रच्छति', 'प्रच्छ्','{"asks", "inquires"}','{"प्रश्न", "पृष्ट"}','verb'),

-- Indeclinables
('च', NULL,'{"and"}','{}','indeclinable'),
('वा', NULL,'{"or"}','{}','indeclinable'),
('न', NULL,'{"not", "no"}','{}','indeclinable'),
('हि', NULL,'{"for", "indeed", "because"}','{}','indeclinable'),
('चेत्', NULL,'{"if"}','{}','indeclinable'),
('यदा', NULL,'{"when"}','{}','indeclinable'),
('तदा', NULL,'{"then"}','{}','indeclinable'),
('यत्र', NULL,'{"where"}','{}','indeclinable'),
('तत्र', NULL,'{"there"}','{}','indeclinable'),
('सदा', NULL,'{"always", "ever"}','{}','indeclinable'),
('कदा', NULL,'{"when?"}','{}','indeclinable'),
('अत्र', NULL,'{"here"}','{}','indeclinable'),
('कुत्र', NULL,'{"where?"}','{}','indeclinable'),
('सर्वत्र', NULL,'{"everywhere"}','{}','indeclinable'),
('उभयत्र', NULL,'{"in both places"}','{}','indeclinable'),
('एव', NULL,'{"only", "indeed", "emphatic"}','{}','indeclinable'),
('इव', NULL,'{"like", "as if", "as it were"}','{}','indeclinable'),
('अपि', NULL,'{"also", "even", "though"}','{}','indeclinable'),
('अतः', NULL,'{"hence", "therefore"}','{}','indeclinable'),
('किम्', NULL,'{"what?", "whether?"}','{}','indeclinable'),

  -- Grammar terms
  ('कारक', 'कृ','{"case", "factor", "agent"}','{"कारकविभक्ति", "कारकचक्र"}','noun'),
  ('समास', 'सो','{"compound", "composition"}','{"समासवृत्ति", "समासान्त"}','noun'),
  ('सन्धि', 'सन्धा','{"sandhi", "combination", "union"}','{"सन्धिविच्छेद", "सन्ध्यक्षर"}','noun'),
  ('प्रत्यय', 'प्रति+इ','{"affix", "suffix", "ending"}','{"प्रत्ययविधि", "प्रत्ययार्थ"}','noun'),
  ('उपसर्ग', 'उप+सृज्','{"prefix", "preposition"}','{"उपसर्गविधि", "उपसर्गार्थ"}','noun'),
  ('कृत्', 'कृ','{"primary suffix", "kṛt affix"}','{"कृदन्त", "कृत्प्रत्यय"}','noun'),
  ('तद्धित', 'तत्+धा','{"secondary suffix", "taddhita"}','{"तद्धितान्त", "तद्धितप्रत्यय"}','noun'),
  ('वृत्ति', 'वृत्','{"commentary", "etymological explanation", "usage"}','{"वृत्तिकार", "वृत्त्यर्थ"}','noun'),
  ('वाक्य', 'वच्','{"sentence", "speech", "statement"}','{"वाक्यार्थ", "वाक्यप्रमाण"}','noun'),
  ('पद', 'पद्','{"word", "inflected word", "foot"}','{"पदार्थ", "पदवाक्य"}','noun'),
  ('लिङ्ग', 'लग्','{"gender", "mark", "sign"}','{"लिङ्गानुशासन", "लिङ्गार्थ"}','noun'),
  ('वचन', 'वच्','{"number", "speech", "word"}','{"वचनार्थ", "वचनभेद"}','noun'),
  ('पुरुष', 'पृ','{"person", "human", "man", "Puruṣa"}','{"पुरुषार्थ", "पुरुषभेद", "पौरुष"}','noun'),
  ('काल', 'कल्','{"time", "tense"}','{"कालार्थ", "कालविभाग"}','noun'),
  ('धातु', 'धा','{"root", "verb root", "element"}','{"धातुविधि", "धातुपाठ"}','noun'),
  ('गण', 'गण्','{"class", "group", "category"}','{"गणपाठ", "गणविभाग"}','noun'),

  -- Philosophy terms
  ('ब्रह्मन्', 'बृंह्','{"Brahman", "ultimate reality", "absolute"}','{"ब्राह्मण", "ब्रह्मविद्या", "परब्रह्म"}','noun'),
  ('आत्मन्', 'अन्','{"Self", "soul", "ātman"}','{"आत्मविद्या", "आत्मज्ञान", "परमात्मन्"}','noun'),
  ('माया', 'मा','{"māyā", "illusion", "appearance"}','{"मायावाद", "मायिक"}','noun'),
  ('अविद्या', 'विद्','{"ignorance", "nescience"}','{"अविद्यावाद", "अविद्यात्मक"}','noun'),
  ('प्रकृति', 'कृ','{"prakṛti", "nature", "primordial matter"}','{"प्राकृत", "प्रकृतिवाद"}','noun'),
  ('ईश्वर', 'ईश्','{"God", "Lord", "Īśvara"}','{"ईश्वरवाद", "ईश्वरप्रणिधान"}','noun'),
  ('जीव', 'जीव्','{"living being", "individual soul", "jīva"}','{"जीवात्मन्", "जैव"}','noun'),
  ('संसार', 'सम्+सृ','{"transmigration", "worldly existence", "saṃsāra"}','{"संसारी", "सांसारिक"}','noun'),
  ('निर्वाण', 'निर्+वा','{"nirvāṇa", "liberation", "extinction"}','{"निर्वाणमार्ग", "निर्वाणार्थ"}','noun'),
  ('दुःख', 'दुःख्','{"suffering", "pain", "duḥkha"}','{"दुःखार्त", "दुःखद"}','noun'),
  ('सुख', 'सुख्','{"happiness", "pleasure", "comfort"}','{"सुखार्थ", "सुखद"}','noun'),

  -- Textual criticism terms
  ('कोश', 'कुश्','{"dictionary", "lexicon", "treasury"}','{"कोशकार", "कोशविद्या"}','noun'),
  ('पाठ', 'पठ्','{"reading", "text", "lesson", "variant"}','{"पाठभेद", "पाठान्तर"}','noun'),
  ('संस्करण', 'सम्+कृ','{"edition", "refinement", "preparation"}','{"संस्करणार्थ", "संस्करणविधि"}','noun'),
  ('प्रतिलिपि', 'प्रति+लिप्','{"manuscript copy", "transcript"}','{"प्रतिलिपिकार", "प्रतिलिपिदोष"}','noun'),
  ('प्रमाद', 'प्र+मद्','{"error", "mistake", "carelessness"}','{"प्रमादपाठ", "लेखकप्रमाद"}','noun'),
  ('संशोधन', 'सम्+शुध्','{"emendation", "correction", "revision"}','{"संशोधनविधि", "संशोधित"}','noun'),

  -- Reference / Professor terms
  ('सूत्र', 'सिव्','{"sūtra", "aphorism", "thread", "rule"}','{"सूत्रकार", "सूत्रार्थ", "सूत्रपाठ"}','noun'),
  ('भाष्य', 'भाष्','{"commentary", "bhāṣya", "exposition"}','{"भाष्यकार", "भाष्यार्थ"}','noun'),
  ('टीका', 'टीक्','{"gloss", "commentary", "ṭīkā"}','{"टीकाकार", "टीकाग्रन्थ"}','noun'),
  ('प्रक्रिया', 'प्र+कृ','{"procedure", "process", "derivation"}','{"प्रक्रियार्थ", "प्रक्रियाविधि"}','noun'),
  ('अनुवाद', 'अनु+वद्','{"translation", "interpretation"}','{"अनुवादक", "अनुवादित"}','noun'),
  ('व्याख्या', 'वि+आ+ख्या','{"explanation", "exegesis", "commentary"}','{"व्याख्याकार", "व्याख्यान"}','noun'),
  ('उद्धरण', 'उद्+हृ','{"quotation", "citation", "reference"}','{"उद्धरणचिह्न", "उद्धृत"}','noun'),
  ('संदर्भ', 'सम्+दृभ्','{"context", "reference", "connection"}','{"सांदर्भिक", "संदर्भार्थ"}','noun'),
  ('ग्रन्थसूची', 'ग्रन्थ+सूची','{"bibliography", "catalogue"}','{"ग्रन्थसूचीकार", "ग्रन्थसूचीविधि"}','noun'),

  -- Poetics / Rhetoric terms
  ('रस', 'रस्','{"aesthetic sentiment", "flavor", "essence", "rasa"}','{"रसवाद", "रसाभिव्यक्ति", "नवरस"}','noun'),
  ('भाव', 'भू','{"emotion", "state", "feeling", "bhāva"}','{"भावाभिव्यक्ति", "भावार्थ"}','noun'),
  ('अलङ्कार', 'अलम्+कृ','{"figure of speech", "ornament", "alaṅkāra"}','{"अलङ्कारशास्त्र", "अलङ्कारवाद"}','noun'),
  ('ध्वनि', 'ध्वन्','{"suggestion", "sound", "dhvani", "tone"}','{"ध्वनिवाद", "ध्वन्यालोक"}','noun'),
  ('औचित्य', 'उचित','{"propriety", "fitness", "decorum"}','{"औचित्यवाद", "औचित्यार्थ"}','noun'),
  ('गुण', 'गुण्','{"quality", "merit", "virtue", "guṇa"}','{"गुणवाद", "गुणार्थ"}','noun'),
  ('रीति', 'री','{"style", "manner", "rīti"}','{"रीतिवाद", "रीतिग्रन्थ"}','noun'),
  ('वक्रोक्ति', 'वक्र+उक्ति','{"oblique expression", "vakrokti", "poetic twist"}','{"वक्रोक्तिजीवित", "वक्रोक्तिवाद"}','noun'),

  -- Advanced verbs
  ('मन्यते', 'मन्','{"thinks", "considers", "believes"}','{"मनन", "मत", "मति"}','verb'),
  ('वक्ति', 'वच्','{"speaks", "says", "declares"}','{"वाक्य", "वचन", "उक्त"}','verb'),
  ('आस्ते', 'आस्','{"sits", "is seated", "remains"}','{"आसन", "आसीन", "आसित"}','verb'),
  ('एति', 'इ','{"goes", "approaches", "arrives"}','{"एत्य", "अयन", "इत"}','verb'),
  ('इक्षते', 'ईक्ष्','{"sees", "looks at", "observes", "considers"}','{"ईक्षण", "ईक्षित", "ईक्ष्य"}','verb') ON CONFLICT (word) DO NOTHING;

-- ════════════════════════════════════════════════════════════════
-- TEXTS (Corpus)
-- ════════════════════════════════════════════════════════════════

INSERT INTO texts (id, title, author, period, content, language) VALUES

-- Vedic Period (1500-500 BCE)
('rv-1-1','Ṛgveda 1.1 — Agni Sūkta','Traditional','1500-1200 BCE','अग्निमीळे पुरोहितं यज्ञस्य देवं रत्वीजम् । होतारं रत्नधातमम् ।','Vedic Sanskrit'),
('rv-1-89','Ṛgveda 1.89 — Śarma Sūkta','Traditional','1500-1200 BCE','आ नो भद्राः क्रतवो यन्तु विश्वतः । अदब्धासो अपरीतास उद्भिदः । देवा नो यथा सदमिद् वृद्धे असन्नप्रायुवो रक्षितारो दिवे-दिवे ॥','Vedic Sanskrit'),
('rv-10-129','Ṛgveda 10.129 — Nāsadīya Sūkta','Traditional','1500-1200 BCE','नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत् । किमावरीवः कुह कस्य शर्मन्नम्भः किमासीद्गहनं गभीरम् ॥','Vedic Sanskrit'),
('rv-10-90','Ṛgveda 10.90 — Puruṣa Sūkta','Traditional','1500-1200 BCE','सहस्रशीर्षा पुरुषः सहस्राक्षः सहस्रपात् । स भूमिं विश्वतो वृत्वा अत्यतिष्ठद्दशाङ्गुलम् ॥','Vedic Sanskrit'),
('atharva-1-1','Atharvaveda 1.1 — Vācaspatyam','Traditional','1200-1000 BCE','शं नो देवीरभीष्टय आपो भवन्तु पीतये । सं योरभि स्रवन्तु नः ॥','Vedic Sanskrit'),
('satapatha-1-1-1','Śatapatha Brāhmaṇa 1.1.1','Yājñavalkya','~800 BCE','ब्रह्म वा इदमग्र आसीत्, तदात्मानमेवावेत्, अहं ब्रह्मास्मीति । तस्मात्तत्सर्वमभवत् ॥','Vedic Sanskrit'),
('brihad-up-1-3','Bṛhadāraṇyaka Upaniṣad 1.3','Yājñavalkya','~700 BCE','असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥','Classical Sanskrit'),
('chandogya-6-8','Chāndogya Upaniṣad 6.8 — Tattvamasi','Uddālaka Āruṇi','~700 BCE','स य एषोऽणिमा ऐतदात्म्यमिदं सर्वम् तत्सत्यम् स आत्मा तत्त्वमसि श्वेतकेतो ॥','Classical Sanskrit'),

-- Classical Period (500 BCE - 500 CE)
('panini-1-1','Aṣṭādhyāyī 1.1','Pāṇini','~500 BCE','वृद्धिरादैच् । अदेङ् गुणः ।','Classical Sanskrit'),
('panini-6-1-77','Aṣṭādhyāyī 6.1.77 — Iko Yaṇ Aci','Pāṇini','~500 BCE','इको यणचि ॥','Classical Sanskrit'),
('yogasutra-1-1','Yoga Sūtra 1.1','Patañjali','~300 BCE','अथ योगानुशासनम् ॥','Classical Sanskrit'),
('yogasutra-1-2','Yoga Sūtra 1.2','Patañjali','~300 BCE','योगः चित्तवृत्तिनिरोधः ॥','Classical Sanskrit'),
('yogasutra-2-29','Yoga Sūtra 2.29','Patañjali','~300 BCE','यमनियमासनप्राणायामप्रत्याहारधारणाध्यानसमाधयोऽष्टावङ्गानि ॥','Classical Sanskrit'),
('nyayasutra-1-1-1','Nyāya Sūtra 1.1.1','Gautama','~200 BCE','प्रमाणप्रमेयसंशयप्रयोजनदृष्टान्तसिद्धान्तावयवतर्कनिर्णयवादजल्पवितण्डाहेत्वाभासच्छलजातिनिग्रहस्थानानां तत्त्वज्ञानान्निःश्रेयसाधिगमः ॥','Classical Sanskrit'),
('gita-2-47','Bhagavad Gītā 2.47','Vyāsa','~200 BCE','मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥','Classical Sanskrit'),
('gita-4-7','Bhagavad Gītā 4.7','Vyāsa','~200 BCE','यदा यदा हि धर्मस्य ग्लानिर्भवति भारत । अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥','Classical Sanskrit'),
('gita-18-66','Bhagavad Gītā 18.66','Vyāsa','~200 BCE','सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज । अहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥','Classical Sanskrit'),

-- Classical Poetry (500 CE - 1200 CE)
('kalidasa-1-1','Abhijñānaśākuntalam 1.1','Kālidāsa','~4th CE','आसीदुदन्तुमूलेषु सचेताः प्रभवः स्वयम् । विधाता तस्य चेतांसि विधिना विधिना दधे ॥','Classical Sanskrit'),
('kalidasa-1-2','Abhijñānaśākuntalam 1.2','Kālidāsa','~4th CE','वाचं यन्त्रितवाग्भिरादृतगिरः संस्कारशुद्ध्यर्थिनाम् । बालव्याकरणैरिवाभ्युदयते मूकाः पिशाचा अपि ॥','Classical Sanskrit'),
('raghuvamsa-1-1','Raghuvaṃśa 1.1','Kālidāsa','~4th CE','वागर्थाविव सम्पृक्तौ वागर्थप्रतिपत्तये । जगतः पितरौ वन्दे पार्वतीपरमेश्वरौ ॥','Classical Sanskrit'),
('meghaduta-1-1','Meghadūta 1.1','Kālidāsa','~4th CE','कश्चित्कान्ताविरहगुरुणा स्वाधिकारात्प्रमत्तः शापेनास्तङ्गमितमहिमा वर्षभोग्येण भर्तुः । यक्षश्चक्रे जनकतनयास्नानपुण्योदकेषु स्निग्धच्छायातरुषु वसतिं रामगिर्याश्रमेषु ॥','Classical Sanskrit'),
('bhartrhari-1-1','Vākyapadīya 1.1','Bhartṛhari','~5th CE','अनादिनिधनं ब्रह्म शब्दतत्त्वं यदक्षरम् । विवर्ततेऽर्थभावेन प्रक्रिया जगतो यतः ॥','Classical Sanskrit'),
('hitopadesha-1-1','Hitopadeśa 1.1','Nārāyaṇa','~9th CE','मित्रलाभः सुहृत्प्राप्तिः सङ्ग्रहः प्रीतिरेव च । एते रसा हि मैत्रस्य प्रीतिं कुर्वन्ति देहिनाम् ॥','Classical Sanskrit'),

-- Medieval & Later (1200 CE - 1800 CE)
('siddhanta-kaumudi-1','siddhānta Kaumudī 1','Bhaṭṭojī Dīkṣita','~17th CE','अथ शब्दानुशासनम् । शब्दाः कस्यचिद्वाचकाः । ते च व्याकरणेन साधवः प्रयुज्यन्ते ॥','Classical Sanskrit'),

  -- Class 1-5 / Child Level (Primary School)
  ('panchatantra-mitralabha','Mitralābha — Winning Friends','Various','~3rd CE','मित्रलाभः सुहृत्प्राप्तिः सङ्ग्रहः प्रीतिरेव च । एते हि बन्धवः सत्ये धर्मे च परिनिष्ठिताः ॥','Classical Sanskrit'),
  ('panchatantra-kakolukiyam','Kākolūkīyam — Crows and Owls','Various','~3rd CE','काकोलूकीयमाख्यानं शत्रूणां यत्र भेदनम् । तत्र नीतिरिह ज्ञेया राजनीतिर्विशेषतः ॥','Classical Sanskrit'),
  ('panchatantra-hamsakurma','Haṃsa-Kūrma — The Swan and the Tortoise','Various','~3rd CE','हंसः कूर्मश्च मित्रेण वनं प्राप्तौ सुखेन हि । मैत्री बलवती येषां न तेषां दुःखमण्वपि ॥','Classical Sanskrit'),
  ('subhashita-1','subhāṣita 1 — On Virtue','Various','~5th CE','सत्यं हि परमं धर्मं सत्यात्परतरं न हि । सत्येन सर्वं शुद्ध्येत सत्यं स्वर्गस्य सोपानम् ॥','Classical Sanskrit'),
  ('subhashita-2','subhāṣita 2 — On Learning','Various','~5th CE','विद्या विवादाय धनं मदाय शक्तिः परेषां परिपीडनाय । खलस्य साधोर्विपरीतमेतद्विद्या दमाय द्रविणं त्यागाय ॥','Classical Sanskrit'),
  ('subhashita-3','subhāṣita 3 — On Friendship','Various','~5th CE','आपदि मित्रं जानीयात्कार्ये च प्रतिपादने । भये दुःखे च संप्राप्ते भवन्ति हि सहायिनः ॥','Classical Sanskrit'),
  ('subhashita-4','subhāṣita 4 — On Effort','Various','~5th CE','उद्योगिनं पुरुषसिंहमुपैति लक्ष्मीर्दैवेन देयमिति कापुरुषा वदन्ति । दैवं निहत्य कुरु पौरुषमात्मशक्त्या यत्ने कृते यदि न सिध्यति कोऽत्र दोषः ॥','Classical Sanskrit'),
  ('subhashita-5','subhāṣita 5 — On Wisdom','Various','~5th CE','क्षमा बलमशक्तानां क्षमा बलं शक्तानाम् । क्षमा शक्तस्य सद्गुणः क्षमा सत्यस्य धारणम् ॥','Classical Sanskrit'),
  ('varnamala-1','Varnamālā — Alphabet Practice 1','Various','~1st CE','अ आ इ ई उ ऊ ऋ ॠ ऌ ॡ ए ऐ ओ औ अं अः । क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह ॥','Classical Sanskrit'),
  ('varnamala-2','Varnamālā — Alphabet Practice 2','Various','~1st CE','स्वरा द्वादश विज्ञेया व्यञ्जनानि च त्रिंशत् । अयुक्ता न तु वर्णाः स्युः संयुक्ता धातवः स्मृताः ॥','Classical Sanskrit'),

  -- Class 6-10 / Teen Level (Secondary School)
  ('hitopadesha-2-1','Hitopadeśa 2.1 — Mitrasamprayoga','Nārāyaṇa','~9th CE','सुहृदां हितकर्तॄणां मैत्री नित्यं प्रवर्धते । यथा समुद्रगामिन्यो नद्यः पर्वतनिम्नगाः ॥','Classical Sanskrit'),
  ('hitopadesha-3-1','Hitopadeśa 3.1 — Vigraha','Nārāyaṇa','~9th CE','बलिना सह विग्रहो न कर्तव्यः कदाचन । बलीयसां हि मूर्खाणां क्षमा श्रेयस्करी मता ॥','Classical Sanskrit'),
  ('hitopadesha-4-1','Hitopadeśa 4.1 — Sandhi','Nārāyaṇa','~9th CE','संधिः कार्यः सदा राज्ञा बलीयसा बलेन हि । यथा वृक्षेण वृक्षस्य संधिः कार्यः प्रयत्नतः ॥','Classical Sanskrit'),
  ('bhartrhari-niti-1','Nītiśataka 1','Bhartṛhari','~5th CE','मानो हि मूलमर्थानां मानो मूलं श्रियः सदा । मानो मूलं शरीरस्य मानो मूलं तपस्विनाम् ॥','Classical Sanskrit'),
  ('bhartrhari-niti-5','Nītiśataka 5','Bhartṛhari','~5th CE','विद्या नाम नरस्य रूपमधिकं प्रच्छन्नगुप्तं धनम् । विद्या भोगकरी यशस्सुखकरी विद्या गुरूणां गुरुः ॥','Classical Sanskrit'),
  ('bhartrhari-niti-10','Nītiśataka 10','Bhartṛhari','~5th CE','यस्यास्ति वित्तं स नरः कुलीनः स पण्डितः स श्रुतवान् गुणज्ञः । स एव वक्ता स च दर्शनीयः सर्वे गुणाः काञ्चनमाश्रयन्ति ॥','Classical Sanskrit'),
  ('amaru-1','Amaruśataka 1','Amaru','~7th CE','नालं वपुर्गुणविशेषकथासु तस्या वक्तुं चिराद्विरहितस्य ममेदृशी गतिः । स्मर्तुं पुनः सखि भवेत्सुमतेः सहायः संपूर्णकाममनसां हि न किंचिदस्ति ॥','Classical Sanskrit'),
  ('amaru-5','Amaruśataka 5','Amaru','~7th CE','किं तेन शास्त्रविदुषा किं तेन सुविचक्षणः । यस्य नास्ति रतिप्रीतिः कवित्वं निरसा यथा ॥','Classical Sanskrit'),
  ('amaru-10','Amaruśataka 10','Amaru','~7th CE','प्रेम्णा तया सह समागमसिद्धये मे चेतः समुत्सुकमिव प्रतिभाति नित्यम् । सा चापि मामनुपमेयगुणं निजं च धत्ते हृदि प्रणयिनं किमतः परं मे ॥','Classical Sanskrit'),
  ('chanakya-1','Cāṇakya Nīti 1','Cāṇakya','~3rd CE','अहिंसा सत्यमक्रोधस्त्यागः शान्तिरपैशुनम् । दया भूतेष्वलोलुप्त्वं मार्दवं ह्रीरचापलम् ॥','Classical Sanskrit'),
  ('chanakya-5','Cāṇakya Nīti 5','Cāṇakya','~3rd CE','आयुषः क्षण एकोऽपि न लभ्यः स्वर्णकोटिभिः । स चेन्निरर्थकं नीतः किं नु खेदकरं ततः ॥','Classical Sanskrit'),
  ('chanakya-10','Cāṇakya Nīti 10','Cāṇakya','~3rd CE','दुर्जनं प्रथमं वन्दे सुजनं तदनन्तरम् । दुर्जनात्किल रक्षार्थं सुजनाच्च परित्रयः ॥','Classical Sanskrit'),

  -- Undergraduate Level
  ('kumarasambhava-1-1','Kumārasambhava 1.1','Kālidāsa','~4th CE','अस्त्युत्तरस्यां दिशि देवतात्मा हिमालयो नाम नगाधिराजः । पूर्वापरौ तोयनिधी वगाह्य स्थितः पृथिव्या इव मानदण्डः ॥','Classical Sanskrit'),
  ('kumarasambhava-5-1','Kumārasambhava 5.1','Kālidāsa','~4th CE','तपोवनाय प्रयतः प्रवेष्टुमवनिं गतः । स ददर्श तपस्यन्तीं पार्वतीं पार्वतीश्वरः ॥','Classical Sanskrit'),
  ('vikramorvasi-1-1','Vikramorvaśīya 1.1','Kālidāsa','~4th CE','आसीद्राजा दिलीप इति नाम्ना तस्य पुत्रः प्रियव्रतः तस्य पुत्रो विक्रमश्च । तेजस्वी धार्मिको राजा सर्वलोकप्रियोऽभवत् ॥','Classical Sanskrit'),
  ('malavikagnimitra-1-1','Mālavikāgnimitra 1.1','Kālidāsa','~4th CE','अत्र भवानग्निमित्रः इयं च मालविका अनयोः समागमस्य प्रस्तावमुपक्षिपामि । नाट्यं भरतमुनिना निबद्धं लोकवेदसारम् ॥','Classical Sanskrit'),
  ('ramayana-1-1','Rāmāyaṇa 1.1 — Bālakāṇḍa','Vālmīki','~5th BCE','तपःस्वाध्यायनिरतं तपस्वी वाग्विदां वरम् । नारदं परिपप्रच्छ वाल्मीकिर्मुनिपुङ्गवम् ॥','Classical Sanskrit'),
  ('ramayana-2-1','Rāmāyaṇa 2.1 — Ayodhyākāṇḍa','Vālmīki','~5th BCE','ततः प्रव्रजिते रामे भरतः प्रत्युपस्थितः । पादुके चास्य राज्याय न्यासं दत्त्वा वनं गतः ॥','Classical Sanskrit'),
  ('ramayana-6-1','Rāmāyaṇa 6.1 — Yuddhakāṇḍa','Vālmīki','~5th BCE','ततः सागरमासाद्य रामः परपुरञ्जयः । विभीषणं समाहूय कार्यमर्थमचिन्तयत् ॥','Classical Sanskrit'),
  ('mahabharata-1-1','Mahābhārata 1.1 — Ādiparvan','Vyāsa','~4th BCE','नारायणं नमस्कृत्य नरं चैव नरोत्तमम् । देवीं सरस्वतीं चैव ततो जयमुदीरयेत् ॥','Classical Sanskrit'),
  ('mahabharata-5-1','Mahābhārata 5.1 — Udyogaparvan','Vyāsa','~4th BCE','उद्योगं पुरुषो यस्मात्करोति विजयाय च तस्मादुद्योग इत्युक्तः सर्वार्थानां प्रसाधकः ॥','Classical Sanskrit'),
  ('mahabharata-12-1','Mahābhārata 12.1 — Śāntiparvan','Vyāsa','~4th BCE','राजधर्मान्प्रवक्ष्यामि यथावदनुपूर्वशः । राज्ञा धर्मः प्रयोक्तव्यः सर्वावस्थासु सर्वदा ॥','Classical Sanskrit'),
  ('gita-3-1','Bhagavad Gītā 3.1','Vyāsa','~200 BCE','ज्यायसी चेत्कर्मणस्ते मता बुद्धिर्जनार्दन । तत्किं कर्मणि घोरे मां नियोजयसि केशव ॥','Classical Sanskrit'),
  ('gita-6-1','Bhagavad Gītā 6.1','Vyāsa','~200 BCE','अनाश्रितः कर्मफलं कार्यं कर्म करोति यः । स संन्यासी च योगी च न निरग्निर्न चाक्रियः ॥','Classical Sanskrit'),
  ('gita-12-1','Bhagavad Gītā 12.1','Vyāsa','~200 BCE','अर्जुन उवाच । एवं सततयुक्ता ये भक्तास्त्वां पर्युपासते । ये चाप्यक्षरमव्यक्तं तेषां के योगवित्तमाः ॥','Classical Sanskrit'),
  ('kena-up-1-1','Kena Upaniṣad 1.1','Traditional','~700 BCE','केन प्रेरितं पतति प्रभुक्तं मनः केन प्राणः प्रथमः प्रयुक्तः । केन सत्यमभिहितं प्रियं च कस्मादिमामाहुरनुप्रयुक्ताम् ॥','Vedic Sanskrit'),
  ('katha-up-1-1','Kaṭha Upaniṣad 1.1','Traditional','~700 BCE','श्रावणाय बहुभिर्न लभ्यः शृण्वन्तोऽपि बहवो यं न विद्युः । आश्चर्यो वक्ता कुशलोऽस्य लब्धा आश्चर्यो ज्ञाता कुशलानुशिष्टः ॥','Classical Sanskrit'),
  ('prasna-up-1-1','Praśna Upaniṣad 1.1','Traditional','~700 BCE','भगवन्केन प्रेरितः प्राणः प्रथमः प्रयुक्तः कथमेते सर्वे प्राणाः प्रयुज्यन्ते कथमुत्क्रामन्ति कथं प्रतितिष्ठन्ति ॥','Classical Sanskrit'),
  ('mundaka-up-1-1','Muṇḍaka Upaniṣad 1.1','Traditional','~700 BCE','ब्रह्मा देवानां प्रथमः सम्बभूव विश्वस्य कर्ता भुवनस्य गोप्ता । स ब्रह्मविद्यां सर्वविद्याप्रतिष्ठामथर्वाय ज्येष्ठपुत्राय प्राह ॥','Vedic Sanskrit'),

  -- Graduate Level
  ('vaisesika-1-1','Vaiśeṣika Sūtra 1.1','Kaṇāda','~2nd CE','अथातो धर्मं व्याख्यास्यामः । यतोऽभ्युदयनिःश्रेयससिद्धिः स धर्मः ॥','Classical Sanskrit'),
  ('mimamsa-1-1','Mīmāṃsā Sūtra 1.1','Jaimini','~3rd CE','अथातो धर्मजिज्ञासा । चोदनालक्षणो धर्मः ॥','Classical Sanskrit'),
  ('brahmasutra-1-1','Brahma Sūtra 1.1','Bādarāyaṇa','~2nd CE','अथातो ब्रह्मजिज्ञासा । जन्माद्यस्य यतः ॥','Classical Sanskrit'),
  ('sankara-bhasya-1','Śāṅkara Bhāṣya 1 (on Brahma Sūtra)','Śaṅkara','~8th CE','सर्वं हि इदं ब्रह्म अव्ययम् नेति नेति ब्राह्मणम् । अत आहुः सर्वं ब्रह्म इत्येतेन सर्वं ब्रह्म इत्युपासीत ॥','Classical Sanskrit'),
  ('ramanuja-bhasya-1','Śrī Bhāṣya 1 (on Brahma Sūtra)','Rāmānuja','~11th CE','ब्रह्मविद्यायाः प्रतिपाद्यं ब्रह्म तद्गुणकथनं च । तस्य च नित्यानन्दैकतानत्वं सर्वशक्तित्वं च ॥','Classical Sanskrit'),
  ('madhavacarya-1','sarvadarśanasaṅgraha 1','Mādhava','~14th CE','चार्वाकस्य मतं यत्र लोकायतमिति स्मृतम् । तत्र प्रमाणं प्रत्यक्षं भूतचतुष्टयात्मकम् ॥','Classical Sanskrit'),
  ('mahabhasya-1-1','Mahābhāṣya 1.1','Patañjali','~2nd BCE','अथ शब्दानुशासनम् । शब्दः कस्यचिद्वाचकः । तस्य व्याकरणेन साधुत्वं भवति ॥','Classical Sanskrit'),
  ('kasika-1-1','Kāśikā Vṛtti 1.1','Vāmana & Jayāditya','~7th CE','वृद्धिरादैच् । वृद्धिसंज्ञा भवन्ति आदैच् प्रत्याहारः । आ इ ए ऐ ओ औ इत्यर्थः ॥','Classical Sanskrit'),
  ('kavyaprakasa-1-1','Kāvyaprakāśa 1.1','Mammaṭa','~11th CE','नियतिकृतनियमरहितां ह्लादैकमयीमनन्यपरतन्त्राम् । नवरसरुचिरां निर्मितिमादधती भारती कवेः जयति ॥','Classical Sanskrit'),
  ('dhavanyaloka-1-1','Dhvanyāloka 1.1','Ānandavardhana','~9th CE','काव्यस्यात्मा ध्वनिः । यत्रार्थः शब्दो वा स्वार्थं व्यञ्जयति न केवलं व्यञ्जकत्वेन व्याप्रियते ॥','Classical Sanskrit'),
  ('sahityadarpana-1-1','sāhityadarpaṇa 1.1','Viśvanātha','~14th CE','काव्यं यशसेऽर्थकृते व्यवहारविदे शिवेतरक्षतये । सद्यः परनिर्वृतये कान्तासम्मिततयोपदेशयुजे ॥','Classical Sanskrit'),
  ('natya-sastra-1-1','Nāṭyaśāstra 1.1','Bharata','~2nd CE','नाट्यशास्त्रं प्रवक्ष्यामि ब्रह्मणा यदुदाहृतम् । इति पूर्वं महाभागैर्विप्रैरध्यापितं पुरा ॥','Classical Sanskrit'),

  -- PhD / Professor Reference Level
  ('critical-ed-pref-1','Critical Edition Preface — Mahābhārata','V. S. Sukthankar','c. 1933','इदं महाभारतस्य समालोचनसंस्करणं सर्वेषां ज्ञातानां हस्तलेखानां सङ्ग्रहेण निर्मितम् । अत्र प्रस्तुतः पाठः समालोचनया संशोधितः ॥','Classical Sanskrit'),
  ('critical-ed-pref-2','Critical Edition Preface — Rāmāyaṇa','G. H. Bhatt','c. 1960','वाल्मीकिरामायणस्य समालोचनसंस्करणम् एतत् प्राचीनतमं पाठं स्थापयितुं प्रवृत्तम् । उत्तरदक्षिणयोः संस्करणयोः पूर्णः सम्मेलनः कृतः ॥','Classical Sanskrit'),
  ('research-article-1','Research Article — Textual Transmission','Various','c. 2005','हस्तलेखानां प्रसारणस्य अध्ययनं काश्मीरदेशे शारदालिप्या विशेषतः महत्त्वपूर्णम् । वैदिकशास्त्रीयग्रन्थानां रक्षणे शारदालिपिः प्रमुखा आसीत् ॥','Classical Sanskrit'),
  ('research-article-2','Research Article — Stemmatic Analysis','Various','c. 2010','योगभाष्यस्य हस्तलेखपरम्परायां फिलोजेनेटिकपद्धतिः प्रयुक्ता । गणकीयस्तेम्मेटिकी पारम्परिकां पाठसमालोचनां पूरयितुं शक्नोति ॥','Classical Sanskrit'),
  ('mw-dict-intro','Monier-Williams Dictionary — Introduction','Monier Monier-Williams','c. 1899','संस्कृतभाषायाः कोशोऽयम् वैदिकशास्त्रीयसाहित्यस्य शब्दान् धारयति । निरुक्तिसहिताः प्रमाणसहिताश्च शब्दा अत्रोपस्थापिताः ॥','Classical Sanskrit'),
  ('st-petersburg-lex-intro','st. Petersburg Lexicon — Introduction','Otto von Böhtlingk','c. 1855','संस्कृतव्याकरणस्य गहनं शास्त्रं व्युत्पत्तिप्रक्रियाभिः सहितम् । अस्मिन् महाकोशे वैदिकलौकिकशब्दानाम् विशदं विवेचनं कृतम् ॥','Classical Sanskrit'),
  ('stemmatics-intro','stemmatics — An Introduction','Various','c. 2000','हस्तलेखानाम् वंशवृक्षनिर्माणं स्तेम्मेटिकी इति कथ्यते । अनया पद्धत्या पाठानाम् ऐतिहासिकः क्रमः निर्णीयते ॥','Classical Sanskrit'),
  ('paleography-ref-1','Indian Paleography — Reference','A. H. Dani','c. 1963','ब्राह्मीलिपेः विकासः तृतीयशताब्द्याः पूर्वतः मध्यकालपर्यन्तम् । कुषाणगुप्तसिद्धमातृकादयः प्रादेशिकभेदाः सन्ति ॥','Classical Sanskrit'),
  ('codicology-ref-1','sanskrit Codicology — Reference','Various','c. 2008','हस्तलेखानाम् भौतिकलक्षणानि अत्र वर्णितानि । तालपत्रभूर्जपत्रकागदानाम् निर्माणं लेखनसाधनं च ॥','Classical Sanskrit'),
  ('textual-scholarship-1','Textual Scholarship — Methods and Practice','Various','c. 2015','हस्तलेखप्राप्तेः आरभ्य समालोचनसंस्करणपर्यन्तम् सम्पूर्णा प्रक्रिया इहोपदिश्यते । सङ्ग्रहः संशोधनम् उपपादनं च ॥','Classical Sanskrit') ON CONFLICT (id) DO NOTHING;

-- ════════════════════════════════════════════════════════════════
-- MANUSCRIPTS
-- ════════════════════════════════════════════════════════════════

INSERT INTO manuscripts (name, script, period, transcription) VALUES
('Ṛgveda MS — Devanāgarī (12th CE)', 'Devanagari', '12th CE', 'अग्निमीळे पुरोहितं यज्ञस्य देवं रत्वीजम् । होतारं रत्नधातमम् ॥'),
('Aṣṭādhyāyī MS — Grantha (14th CE)', 'Grantha', '14th CE', 'वृद्धिरादैच् । अदेङ् गुणः ।'),
('Abhijñānaśākuntalam — Devanāgarī (15th CE)', 'Devanagari', '15th CE', 'आसीदुदन्तुमूलेषु सचेताः प्रभवः स्वयम् । विधाता तस्य चेतांसि विधिना विधिना दधे ॥'),
('Nyāya Sūtra — Grantha (16th CE)', 'Grantha', '16th CE', 'प्रमाणप्रमेयसंशयप्रयोजनदृष्टान्तसिद्धान्तावयवः'),
('Bhagavad Gītā — Devanāgarī (17th CE)', 'Devanagari', '17th CE', 'मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥'),
('Yoga Sūtra — Grantha (16th CE)', 'Grantha', '16th CE', 'अथ योगानुशासनम् । योगः चित्तवृत्तिनिरोधः ॥'),
('Raghuvaṃśa — Devanāgarī (13th CE)', 'Devanagari', '13th CE', 'वागर्थाविव सम्पृक्तौ वागर्थप्रतिपत्तये । जगतः पितरौ वन्दे पार्वतीपरमेश्वरौ ॥'),
('Upaniṣad Collection — Grantha (15th CE)', 'Grantha', '15th CE', 'असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥'),
('Bṛhadāraṇyaka — Devanāgarī (14th CE)', 'Devanagari', '14th CE', 'ब्रह्म वा इदमग्र आसीत्, तदात्मानमेवावेत्, अहं ब्रह्मास्मीति ।'),
('Meghadūta — Devanāgarī (16th CE)', 'Devanagari', '16th CE', 'कश्चित्कान्ताविरहगुरुणा स्वाधिकारात्प्रमत्तः'),
('siddhānta Kaumudī — Devanāgarī (18th CE)', 'Devanagari', '18th CE', 'अथ शब्दानुशासनम् । शब्दाः कस्यचिद्वाचकाः ।'),
('Palm-leaf MS — Vedic Hymns (Grantha, 13th CE)', 'Grantha', '13th CE', 'आ नो भद्राः क्रतवो यन्तु विश्वतः ।'),
  ('Kashmiri Birch-bark MS — Rgveda (10th CE)', 'sharada', '10th CE', 'अग्निमीळे पुरोहितं यज्ञस्य देवं रत्वीजम् । होतारं रत्नधातमम् ॥'),
  ('Nyāya MS — Grantha (15th CE)', 'Grantha', '15th CE', 'प्रमाणप्रमेयसंशयप्रयोजनदृष्टान्तसिद्धान्तावयवतर्कनिर्णयः'),
  ('sāṃkhya MS — Grantha (16th CE)', 'Grantha', '16th CE', 'पुरुषः प्रकृतिश्चेति द्वे नित्ये अव्यये मते सुखदुःखप्रदातारौ बन्धमोक्षकरौ तथा ॥'),
  ('Bhagavata Purana MS — Devanagari (17th CE)', 'Devanagari', '17th CE', 'जन्माद्यस्य यतोऽन्वयादितरतश्चार्थेष्वभिज्ञः स्वराट् तेने ब्रह्म हृदा य आदिकवये मुह्यन्ति यत्सूरयः ॥'),
  ('Gita Govinda MS — Devanagari (18th CE)', 'Devanagari', '18th CE', 'मेघैर्मेदुरमम्बरं वनभुवः श्यामास्तमालद्रुमैः नक्तं भीरुः किमयम् यमुनातीरे वसति वने ॥'),
  ('sankara Bhashya MS — Grantha (16th CE)', 'Grantha', '16th CE', 'ब्रह्म सत्यं जगन्मिथ्या जीवो ब्रह्मैव नापरः अनेन वेद्यं सच्छास्त्रम् इत्थं वेदान्तडिण्डिमः ॥'),
  ('Ramanuja Bhashya MS — Devanagari (17th CE)', 'Devanagari', '17th CE', 'अखिलहेयप्रत्यनीककल्याणैकतानः सर्वज्ञः सर्वशक्तिः परमकारुणिकः परमात्मा ब्रह्मशब्दवाच्यः ॥'),
  ('sharada MS — Kashmir (14th CE)', 'sharada', '14th CE', 'कालिका शारदा विद्या काश्मीरेषु प्रतिष्ठिता हस्तलेखा प्रसिद्धेयं शारदालिपिलिखिता ॥'),
  ('Tibetan MS — Sanskrit canon (13th CE)', 'Tibetan', '13th CE', 'बुद्धं शरणं गच्छामि धर्मं शरणं गच्छामि संघं शरणं गच्छामि इत्यादि बौद्धधर्मस्य संस्कृतग्रन्थाः ॥'),
  ('Critical Edition Apparatus — Devanagari (20th CE)', 'Devanagari', '20th CE', 'पाठभेदाः कोष्ठके दर्शिताः अत्र प्रमुखाः हस्तलेखाः आधारत्वेन गृहीताः अ आ इति पाठभेदः ॥'),
  ('Transcript of MS B — Devanagari (19th CE)', 'Devanagari', '19th CE', 'अथ मूलपाठः अत्र हस्तलेखस्य यथादर्शनं प्रतिलिपिः प्रस्तूयते पाठभेदाः कोष्ठके सूचिताः ॥'),
  ('Kashmiri Birch-bark MS — Mahabharata (11th CE)', 'sharada', '11th CE', 'नारायणं नमस्कृत्य नरं चैव नरोत्तमम् देवीं सरस्वतीं चैव ततो जयमुदीरयेत् ॥'),
  ('Nepalese MS — Bhujimol script (12th CE)', 'Bhujimol', '12th CE', 'प्रज्ञापारमिताहृदयं सूत्रं भुजिमोललिप्या लिखितम् नेपालदेशे प्राप्तमिदं हस्तलेखं प्राचीनतमम् ॥'),
  ('Jain Kalpasutra MS — Devanagari (16th CE)', 'Devanagari', '16th CE', 'अरिहन्त अरिहन्त अरिहन्त सुगतं भगवन्तं वर्धमानं नमस्कृत्य कल्पसूत्रं प्रवक्ष्यामि ॥'),
  ('Collation Notebook — Devanagari (20th CE)', 'Devanagari', '20th CE', 'अ आ इ ई एते पाठभेदाः सर्वेषु हस्तलेखेषु परीक्षिताः रामः रामम् रामेण इति विभक्तिभेदाः सङ्गृहीताः ॥') ON CONFLICT (name) DO NOTHING;

-- ════════════════════════════════════════════════════════════════
-- BOOKS
-- ════════════════════════════════════════════════════════════════

INSERT INTO books (id, title, title_sanskrit, author, period, category, level_min, level_max, track, total_chapters, description, cover_icon, sort_order) VALUES

-- Level 0-1 (Child / Primary)
('varnamala', 'Varnamala — Alphabet Primer', 'वर्णमाला', NULL, 'Modern', 'children', 0, 1, 'child', 13, 'Complete Devanāgarī alphabet with pronunciation guides and practice exercises', '🔤', 1),
('child-stories', 'Children''s Stories', 'बालकथाः', 'Traditional', 'Modern', 'children', 0, 1, 'child', 12,'simple Sanskrit stories from Panchatantra and folklore with vocabulary notes', '📚', 2),
('first-lessons', 'First Lessons', 'प्रथमपाठाः', NULL, 'Modern', 'children', 0, 1, 'child', 10, 'Basic vocabulary, colors, numbers, family members, and simple sentences', '🎨', 3),

-- Level 1-2 (Teen / Secondary)
('sanskrit-entry', 'sanskrit Entry', 'संस्कृतप्रवेशः', NULL, 'Modern', 'teen', 1, 2, 'teen', 15, 'Entry-level grammar covering declensions, present tense, and sentence construction', '📘', 4),
('hitopadesha', 'Hitopadesha', 'हितोपदेशः', 'Nārāyaṇa', '~9th CE', 'classical', 1, 3, 'teen', 4, 'Collection of moral fables in four books: Mitralābha, Suhṛdbheda, Vigraha, Sandhi', '🦊', 5),
('nitishataka', 'Nītiśataka', 'नीतिशतकम्', 'Bhartṛhari', '~5th CE', 'poetry', 1, 3, 'teen', 10, 'One hundred verses on worldly wisdom and ethics by Bhartrihari', '📜', 6),
('subhashitas','subhāṣitas', 'सुभाषितानि', 'Various', 'Various', 'classical', 1, 3, 'teen', 10, 'Collection of wise sayings from various Sanskrit sources', '💬', 7),
('chanakya-niti', 'Chanakya Nīti', 'चाणक्यनीतिः', 'Chanakya', '~4th BCE', 'classical', 1, 3, 'teen', 10, 'Political and moral aphorisms attributed to the ancient statesman Chanakya', '👑', 8),

-- Level 2-3 (Undergrad)
('sanskrit-grammar', 'sanskrit Grammar', 'संस्कृतव्याकरणम्', NULL, 'Modern', 'grammar', 2, 4, 'undergrad', 20, 'Comprehensive grammar covering all cases, tenses, moods, sandhi, compounds, and derivations', '📐', 9),
('abhijnana-shakuntala', 'Abhijñānaśākuntalam', 'अभिज्ञानशाकुन्तलम्', 'Kālidāsa', '~4th CE', 'drama', 2, 4, 'undergrad', 7, 'Kālidāsa''s masterpiece — the recognition of Śakuntalā, a 7-act play', '🎭', 10),
('raghuvamsha', 'Raghuvaṃśa', 'रघुवंशम्', 'Kālidāsa', '~4th CE', 'poetry', 2, 4, 'undergrad', 19, 'Epic poem tracing the dynasty of Raghu, ancestors of Rāma', '🏛️', 11),
('meghaduta', 'Meghadūta', 'मेघदूतम्', 'Kālidāsa', '~4th CE', 'poetry', 2, 4, 'undergrad', 2, 'A yakṣa sends a message through a cloud to his beloved', '☁️', 12),
('bhagavad-gita', 'Bhagavad Gītā', 'श्रीमद्भगवद्गीता', 'Vyāsa', '~200 BCE', 'philosophy', 2, 5, 'undergrad', 18, 'The divine song — Kṛṣṇa''s discourse to Arjuna on dharma, yoga, and mokṣa', '⚔️', 13),
('ramayana', 'Rāmāyaṇa', 'रामायणम्', 'Vālmīki', '~500 BCE', 'classical', 2, 4, 'undergrad', 7, 'The epic of Rāma, Sītā, and Hanumān — 24,000 verses in 7 kāṇḍas', '🏹', 14),
('mahabharata', 'Mahābhārata', 'महाभारतम्', 'Vyāsa', '~400 BCE', 'classical', 2, 5, 'undergrad', 18, 'The great epic of the Bhārata dynasty — 100,000 verses in 18 parvas', '🛡️', 15),

-- Level 3 (Advanced Undergrad)
('kumarasambhava', 'Kumārasambhava', 'कुमारसम्भवम्', 'Kālidāsa', '~4th CE', 'poetry', 3, 4, 'undergrad', 8, 'The birth of Kumāra (Skanda), son of Śiva and Pārvatī', '🔥', 16),
('kiratarjuniya', 'Kirātārjunīya', 'किरातार्जुनीयम्', 'Bhāravi', '~6th CE', 'poetry', 3, 5, 'graduate', 18, 'Arjuna''s penance and encounter with Śiva as a hunter', '🏔️', 17),
('upanishads', 'Principal Upaniṣads', 'प्रमुखोपनिषदः', 'Various', '~700-300 BCE', 'philosophy', 3, 5, 'graduate', 12, 'The 12 principal Upaniṣads — philosophical culmination of the Vedas', '🕉️', 18),
('kavyaprakasha', 'Kāvyaprakāśa', 'काव्यप्रकाशः', 'Mammaṭa', '~11th CE', 'reference', 3, 6, 'graduate', 10,'standard treatise on Sanskrit poetics and literary criticism', '📝', 19),

-- Level 4-5 (Graduate)
('nyaya-sutra', 'Nyāya Sūtra', 'न्यायसूत्रम्', 'Gautama', '~200 BCE', 'philosophy', 4, 6, 'graduate', 5, 'The foundational text of Nyāya logic — 5 books on epistemology and reasoning', '🧠', 20),
('vaisesika-sutra', 'Vaiśeṣika Sūtra', 'वैशेषिकसूत्रम्', 'Kaṇāda', '~200 BCE', 'philosophy', 4, 6, 'graduate', 10, 'Atomic theory and categories of reality in Vaiśeṣika philosophy', '⚛️', 21),
('yoga-sutra', 'Yoga Sūtra', 'योगसूत्रम्', 'Patañjali', '~300 BCE', 'philosophy', 4, 6, 'graduate', 4, 'The 195 sūtras of classical yoga in 4 pādas', '🧘', 22),
('sankhya-karika','sāṃkhya Kārikā', 'साङ्ख्यकारिका', 'Īśvarakṛṣṇa', '~4th CE', 'philosophy', 4, 6, 'graduate', 1, '72 verses summarizing Sāṃkhya philosophy''s 25 tattvas', '🔢', 23),
('brahma-sutra', 'Brahma Sūtra', 'ब्रह्मसूत्रम्', 'Bādarāyaṇa', '~200 BCE', 'philosophy', 4, 6, 'graduate', 4,'systematic presentation of Vedānta philosophy in 4 adhyāyas', '🌀', 24),
('ashtadhyayi', 'Aṣṭādhyāyī', 'अष्टाध्यायी', 'Pāṇini', '~500 BCE', 'grammar', 4, 6, 'graduate', 8, 'Pāṇini''s grammar of Sanskrit — 3,996 sūtras in 8 adhyāyas', '📏', 25),

-- Level 5-6 (PhD / Reference)
('mahabhashya', 'Mahābhāṣya', 'महाभाष्यम्', 'Patañjali', '~150 BCE', 'commentary', 5, 6, 'phd', 8, 'Patañjali''s great commentary on Pāṇini''s Aṣṭādhyāyī', '📚', 26),
('dhvanyaloka', 'Dhvanyāloka', 'ध्वन्यालोकः', 'Ānandavardhana', '~9th CE', 'reference', 5, 6, 'phd', 4, 'The theory of suggestion (dhvani) in Sanskrit poetics', '💡', 27),
('sahityadarpana','sāhityadarpaṇa', 'साहित्यदर्पणः', 'Viśvanātha', '~14th CE', 'reference', 5, 6, 'phd', 10, 'Mirror of composition — comprehensive treatise on poetics and dramaturgy', '🪞', 28),
('natyashastra', 'Nāṭyaśāstra', 'नाट्यशास्त्रम्', 'Bharata', '~200 BCE', 'reference', 5, 6, 'phd', 36, 'The science of dramaturgy — 36 chapters on theater, dance, and music', '🎭', 29),
('critical-editions', 'Critical Editions', 'समालोचनसंस्करणम्', 'Various', 'Modern', 'reference', 5, 6, 'phd', 5,'scholarly critical editions of major Sanskrit texts with apparatus', '📐', 30),

-- Grammar Textbooks (custom per level)
('grammar-child', 'Fun Grammar for Children', 'बालव्याकरणम्', NULL, 'Modern', 'grammar', 0, 1, 'child', 10, 'Playful introduction to Sanskrit grammar through rhymes, games, and pictures', '🎮', 31),
('grammar-teen', 'school Sanskrit Grammar', 'माध्यमिकव्याकरणम्', NULL, 'Modern', 'grammar', 1, 2, 'teen', 15,'systematic school-level grammar with exercises and exam preparation', '📝', 32),
('grammar-undergrad', 'Advanced Sanskrit Grammar', 'उच्चव्याकरणम्', NULL, 'Modern', 'grammar', 2, 4, 'undergrad', 20, 'Complete grammar covering all Pāṇinian rules with illustrations from classical texts', '📐', 33),
('grammar-graduate', 'Research Grammar', 'शोधव्याकरणम्', NULL, 'Modern', 'grammar', 4, 5, 'graduate', 12, 'Advanced grammatical analysis for textual research and manuscript interpretation', '🔬', 34),
('grammar-phd', 'Reference Grammar', 'प्रमाणव्याकरणम्', NULL, 'Modern', 'grammar', 5, 6, 'phd', 8, 'Comprehensive reference grammar with citations from Aṣṭādhyāyī, Mahābhāṣya, and classical commentaries', '📚', 35) ON CONFLICT (id) DO NOTHING;

-- ════════════════════════════════════════════════════════════════
-- CHAPTERS
-- ════════════════════════════════════════════════════════════════

INSERT INTO chapters (id, book_id, chapter_number, title, title_sanskrit, verse_count, content_preview) VALUES

-- varnamala (13 chapters)
('ch-varnamala-1', 'varnamala', 1, 'simple Vowels', 'स्वराः प्रथमः', 13, 'अ आ इ ई उ ऊ ऋ ॠ ऌ ए ऐ ओ औ'),
('ch-varnamala-2', 'varnamala', 2, 'Consonants: Gutturals', 'कण्ठ्याः', 5, 'क ख ग घ ङ'),
('ch-varnamala-3', 'varnamala', 3, 'Consonants: Palatals', 'तालव्याः', 5, 'च छ ज झ ञ'),
('ch-varnamala-4', 'varnamala', 4, 'Consonants: Retroflex', 'मूर्धन्याः', 5, 'ट ठ ड ढ ण'),
('ch-varnamala-5', 'varnamala', 5, 'Consonants: Dentals', 'दन्त्याः', 5, 'त थ द ध न'),
('ch-varnamala-6', 'varnamala', 6, 'Consonants: Labials', 'ओष्ठ्याः', 5, 'प फ ब भ म'),
('ch-varnamala-7', 'varnamala', 7,'semivowels', 'अन्तःस्थाः', 4, 'य र ल व'),
('ch-varnamala-8', 'varnamala', 8,'sibilants & Ha', 'ऊष्माणः', 4, 'श ष स ह'),
('ch-varnamala-9', 'varnamala', 9, 'Vowel Signs', 'स्वरचिह्नानि', 12, 'ा ि ी ु ू ृ े ै ो ौ ं ः'),
('ch-varnamala-10', 'varnamala', 10, 'Conjunct Consonants', 'संयुक्तव्यञ्जनानि', 0, 'क्ष त्र ज्ञ श्र ह्न ह्म ह्य'),
('ch-varnamala-11', 'varnamala', 11,'simple Words', 'सरलशब्दाः', 0, 'Two-letter and three-letter words for reading practice'),
('ch-varnamala-12', 'varnamala', 12, 'Reading Practice', 'पठनाभ्यासः', 0, 'short sentences using all known letters'),
('ch-varnamala-13', 'varnamala', 13, 'Complete Review', 'सम्पूर्णपुनरावलोकनम्', 0, 'Full alphabet chart and pronunciation review'),

-- first-lessons (10 chapters)
('ch-first-1', 'first-lessons', 1, 'Family Members', 'परिवारः', 12, 'माता पिता भ्राता स्वसा पुत्रः दुहिता'),
('ch-first-2', 'first-lessons', 2, 'Colors', 'वर्णाः', 6, 'रक्तः नीलः पीतः हरितः श्वेतः कृष्णः'),
('ch-first-3', 'first-lessons', 3, 'Numbers 1-10', 'सङ्ख्याः १-१०', 10, 'एकं द्वे त्रीणि चत्वारि पञ्च षट् सप्त अष्ट नव दश'),
('ch-first-4', 'first-lessons', 4, 'Animals', 'प्राणिनः', 7, 'गजः अश्वः व्याघ्रः सिंहः गौः सर्पः मत्स्यः'),
('ch-first-5', 'first-lessons', 5, 'Body Parts', 'शरीरम्', 8, 'मुखम् नेत्रम् करः पादः हृदयम् मनः'),
('ch-first-6', 'first-lessons', 6, 'Nature', 'प्रकृतिः', 7, 'सूर्यः चन्द्रः जलम् अग्निः वायुः पृथ्वी आकाशः'),
('ch-first-7', 'first-lessons', 7, 'Food & Drink', 'भोजनम्', 8, 'अन्नम् दुग्धम् फलम् जलम् पूपः शाकम्'),
('ch-first-8', 'first-lessons', 8, 'Actions', 'क्रियाः', 6, 'खादति पिबति पठति धावति हसति नृत्यति'),
('ch-first-9', 'first-lessons', 9, 'Opposites', 'विपरीतशब्दाः', 10, 'महत्-क्षुद्रम्, सुन्दरम्-कुरूपम्, उष्णम्-शीतलम्'),
('ch-first-10', 'first-lessons', 10, 'simple Sentences', 'सरलवाक्यानि', 8, 'रामः फलं खादति । सीता जलं पिबति'),

-- hitopadesha (4 books)
('ch-hitop-1', 'hitopadesha', 1, 'Mitralābha', 'मित्रलाभः', 30, 'Gaining friends — the story of the deer, crow, turtle, and mouse'),
('ch-hitop-2', 'hitopadesha', 2,'suhṛdbheda', 'सुहृद्भेदः', 30,'separation of friends'),
('ch-hitop-3', 'hitopadesha', 3, 'Vigraha', 'विग्रहः', 25, 'War and conflict'),
('ch-hitop-4', 'hitopadesha', 4, 'sandhi', 'सन्धिः', 25, 'Peace and alliance'),

-- bhagavad-gita (18 chapters)
('ch-gita-1', 'bhagavad-gita', 1, 'Arjuna''s Grief', 'अर्जुनविषादयोगः', 47, 'Arjuna''s despondency on the battlefield'),
('ch-gita-2', 'bhagavad-gita', 2,'sāṃkhya Yoga', 'साङ्ख्ययोगः', 72, 'Kṛṣṇa''s teaching on the eternal self'),
('ch-gita-3', 'bhagavad-gita', 3, 'Karma Yoga', 'कर्मयोगः', 43, 'Action without attachment'),
('ch-gita-4', 'bhagavad-gita', 4, 'Jñāna Yoga', 'ज्ञानयोगः', 42, 'Knowledge and renunciation in action'),
('ch-gita-5', 'bhagavad-gita', 5, 'Karma Sannyāsa Yoga', 'कर्मसंन्यासयोगः', 29, 'True renunciation'),
('ch-gita-6', 'bhagavad-gita', 6, 'Dhyāna Yoga', 'ध्यानयोगः', 47, 'Meditation and self-control'),
('ch-gita-7', 'bhagavad-gita', 7, 'Jñāna Vijñāna Yoga', 'ज्ञानविज्ञानयोगः', 30, 'Knowledge and realization'),
('ch-gita-8', 'bhagavad-gita', 8, 'Akṣara Brahma Yoga', 'अक्षरब्रह्मयोगः', 28, 'The imperishable Brahman'),
('ch-gita-9', 'bhagavad-gita', 9, 'Rāja Vidyā Yoga', 'राजविद्यायोगः', 34, 'The royal knowledge'),
('ch-gita-10', 'bhagavad-gita', 10, 'Vibhūti Yoga', 'विभूतियोगः', 42, 'Divine manifestations'),
('ch-gita-11', 'bhagavad-gita', 11, 'Viśvarūpa Darśana Yoga', 'विश्वरूपदर्शनयोगः', 55, 'The cosmic form'),
('ch-gita-12', 'bhagavad-gita', 12, 'Bhakti Yoga', 'भक्तियोगः', 20, 'The yoga of devotion'),
('ch-gita-13', 'bhagavad-gita', 13, 'Kṣetra Kṣetrajña Yoga', 'क्षेत्रक्षेत्रज्ञयोगः', 35, 'The field and the knower'),
('ch-gita-14', 'bhagavad-gita', 14, 'Guṇa Traya Vibhāga Yoga', 'गुणत्रयविभागयोगः', 27, 'The three guṇas'),
('ch-gita-15', 'bhagavad-gita', 15, 'Puruṣottama Yoga', 'पुरुषोत्तमयोगः', 20, 'The supreme person'),
('ch-gita-16', 'bhagavad-gita', 16, 'Daivāsura Sampad Vibhāga Yoga', 'दैवासुरसम्पद्विभागयोगः', 24, 'Divine and demonic natures'),
('ch-gita-17', 'bhagavad-gita', 17, 'Śraddhā Traya Vibhāga Yoga', 'श्रद्धात्रयविभागयोगः', 28, 'Three kinds of faith'),
('ch-gita-18', 'bhagavad-gita', 18, 'Mokṣa Sannyāsa Yoga', 'मोक्षसंन्यासयोगः', 78, 'Liberation and renunciation'),

-- ramayana (7 kandas)
('ch-rama-1', 'ramayana', 1, 'Bāla Kāṇḍa', 'बालकाण्डः', 77, 'Childhood of Rāma'),
('ch-rama-2', 'ramayana', 2, 'Ayodhyā Kāṇḍa', 'अयोध्याकाण्डः', 119, 'Exile of Rāma'),
('ch-rama-3', 'ramayana', 3, 'Āraṇya Kāṇḍa', 'अरण्यकाण्डः', 75, 'Life in the forest'),
('ch-rama-4', 'ramayana', 4, 'Kiṣkindhā Kāṇḍa', 'किष्किन्धाकाण्डः', 67, 'Alliance with Sugrīva'),
('ch-rama-5', 'ramayana', 5, 'sundara Kāṇḍa', 'सुन्दरकाण्डः', 68, 'Hanumān''s journey to Laṅkā'),
('ch-rama-6', 'ramayana', 6, 'Yuddha Kāṇḍa', 'युद्धकाण्डः', 131, 'The great war'),
('ch-rama-7', 'ramayana', 7, 'Uttara Kāṇḍa', 'उत्तरकाण्डः', 111, 'Later life of Rāma'),

-- mahabharata (18 parvas)
('ch-mb-1', 'mahabharata', 1, 'Ādi Parva', 'आदिपर्व', 225, 'The beginnings and birth of the heroes'),
('ch-mb-2', 'mahabharata', 2,'sabha Parva', 'सभापर्व', 81, 'The assembly and the dice game'),
('ch-mb-3', 'mahabharata', 3, 'Vana Parva', 'वनपर्व', 298, 'Exile in the forest'),
('ch-mb-4', 'mahabharata', 4, 'Virāṭa Parva', 'विराटपर्व', 67, 'Life in disguise'),
('ch-mb-5', 'mahabharata', 5, 'Udyoga Parva', 'उद्योगपर्व', 197, 'Efforts for peace'),
('ch-mb-6', 'mahabharata', 6, 'Bhīṣma Parva', 'भीष्मपर्व', 122, 'The battle begins — includes the Gītā'),
('ch-mb-7', 'mahabharata', 7, 'Droṇa Parva', 'द्रोणपर्व', 201, 'Droṇa''s command'),
('ch-mb-8', 'mahabharata', 8, 'Karṇa Parva', 'कर्णपर्व', 69, 'Karṇa''s leadership'),
('ch-mb-9', 'mahabharata', 9, 'Śalya Parva', 'शल्यपर्व', 64, 'Śalya''s command'),
('ch-mb-10', 'mahabharata', 10,'sauptika Parva', 'सौप्तिकपर्व', 18, 'The night attack'),
('ch-mb-11', 'mahabharata', 11,'strī Parva', 'स्त्रीपर्व', 27, 'The women''s lament'),
('ch-mb-12', 'mahabharata', 12, 'Śānti Parva', 'शान्तिपर्व', 365, 'The book of peace'),
('ch-mb-13', 'mahabharata', 13, 'Anuśāsana Parva', 'अनुशासनपर्व', 154, 'The book of instructions'),
('ch-mb-14', 'mahabharata', 14, 'Āśvamedhika Parva', 'अश्वमेधिकपर्व', 96, 'The horse sacrifice'),
('ch-mb-15', 'mahabharata', 15, 'Āśrama Vāsika Parva', 'आश्रमवासिकपर्व', 40, 'Life at the hermitage'),
('ch-mb-16', 'mahabharata', 16, 'Mausala Parva', 'मौसलपर्व', 9, 'The club battle'),
('ch-mb-17', 'mahabharata', 17, 'Mahāprasthānika Parva', 'महाप्रस्थानिकपर्व', 3, 'The great journey'),
('ch-mb-18', 'mahabharata', 18,'svargārohaṇa Parva', 'स्वर्गारोहणपर्व', 5, 'Ascent to heaven'),

-- ashtadhyayi (8 adhyayas)
('ch-ast-1', 'ashtadhyayi', 1, 'First Chapter', 'प्रथमोऽध्यायः', 300,'samjñā and sandhi rules'),
('ch-ast-2', 'ashtadhyayi', 2,'second Chapter', 'द्वितीयोऽध्यायः', 300, 'Compound and case rules'),
('ch-ast-3', 'ashtadhyayi', 3, 'Third Chapter', 'तृतीयोऽध्यायः', 300, 'Verb suffixes (kṛt)'),
('ch-ast-4', 'ashtadhyayi', 4, 'Fourth Chapter', 'चतुर्थोऽध्यायः', 300, 'Nominal suffixes (taddhita)'),
('ch-ast-5', 'ashtadhyayi', 5, 'Fifth Chapter', 'पञ्चमोऽध्यायः', 300, 'More suffixes'),
('ch-ast-6', 'ashtadhyayi', 6,'sixth Chapter', 'षष्ठोऽध्यायः', 300, 'Phonetic rules (saṃhitā)'),
('ch-ast-7', 'ashtadhyayi', 7,'seventh Chapter', 'सप्तमोऽध्यायः', 300, 'Augments and accents'),
('ch-ast-8', 'ashtadhyayi', 8, 'Eighth Chapter', 'अष्टमोऽध्यायः', 300,'special rules and elevatio'),

-- yoga-sutra (4 padas)
('ch-ys-1', 'yoga-sutra', 1,'samādhi Pāda', 'समाधिपादः', 51, 'On contemplation and the nature of yoga'),
('ch-ys-2', 'yoga-sutra', 2,'sādhana Pāda', 'साधनपादः', 55, 'On practice and the 8 limbs'),
('ch-ys-3', 'yoga-sutra', 3, 'Vibhūti Pāda', 'विभूतिपादः', 56, 'On supernatural powers'),
('ch-ys-4', 'yoga-sutra', 4, 'Kaivalya Pāda', 'कैवल्यपादः', 34, 'On liberation and isolation'),

-- abhijnana-shakuntala (7 acts)
('ch-sak-1', 'abhijnana-shakuntala', 1, 'Act 1', 'प्रथमोऽङ्कः', 30, 'The meeting of Duṣyanta and Śakuntalā'),
('ch-sak-2', 'abhijnana-shakuntala', 2, 'Act 2', 'द्वितीयोऽङ्कः', 20, 'The chase'),
('ch-sak-3', 'abhijnana-shakuntala', 3, 'Act 3', 'तृतीयोऽङ्कः', 25, 'The love confession'),
('ch-sak-4', 'abhijnana-shakuntala', 4, 'Act 4', 'चतुर्थोऽङ्कः', 35, 'The departure and curse'),
('ch-sak-5', 'abhijnana-shakuntala', 5, 'Act 5', 'पञ्चमोऽङ्कः', 30, 'The rejection'),
('ch-sak-6', 'abhijnana-shakuntala', 6, 'Act 6', 'षष्ठोऽङ्कः', 25, 'The ring recovered'),
('ch-sak-7', 'abhijnana-shakuntala', 7, 'Act 7', 'सप्तमोऽङ्कः', 20, 'The reunion'),

-- meghaduta (2 parts)
('ch-megha-1', 'meghaduta', 1, 'Pūrvamegha', 'पूर्वमेघः', 60, 'The yakṣa''s message to the cloud — description of the route'),
('ch-megha-2', 'meghaduta', 2, 'Uttaramegha', 'उत्तरमेघः', 60, 'Description of Alakā and the message to the beloved'),

-- upanishads (12 principal)
('ch-up-1', 'upanishads', 1, 'Īśāvāsya Upaniṣad', 'ईशावास्योपनिषत्', 18, 'The lord envelops everything'),
('ch-up-2', 'upanishads', 2, 'Kena Upaniṣad', 'केनोपनिषत्', 34, 'Who impels the mind?'),
('ch-up-3', 'upanishads', 3, 'Kaṭha Upaniṣad', 'कठोपनिषत्', 119, 'Death''s secret teaching'),
('ch-up-4', 'upanishads', 4, 'Praśna Upaniṣad', 'प्रश्नोपनिषत्', 67,'six questions on reality'),
('ch-up-5', 'upanishads', 5, 'Muṇḍaka Upaniṣad', 'मुण्डकोपनिषत्', 64, 'The higher and lower knowledge'),
('ch-up-6', 'upanishads', 6, 'Māṇḍūkya Upaniṣad', 'माण्डूक्योपनिषत्', 12, 'The syllable Oṃ'),
('ch-up-7', 'upanishads', 7, 'Aitareya Upaniṣad', 'ऐतरेयोपनिषत्', 33, 'The creation of the world'),
('ch-up-8', 'upanishads', 8, 'Taittirīya Upaniṣad', 'तैत्तिरीयोपनिषत्', 81, 'The nature of bliss'),
('ch-up-9', 'upanishads', 9, 'Bṛhadāraṇyaka Upaniṣad', 'बृहदारण्यकोपनिषत्', 435, 'The great forest teaching'),
('ch-up-10', 'upanishads', 10, 'Śvetāśvatara Upaniṣad', 'श्वेताश्वतरोपनिषत्', 113, 'The god who is all'),
('ch-up-11', 'upanishads', 11, 'Chāndogya Upaniṣad', 'छान्दोग्योपनिषत्', 627, 'The Vedic chant'),
('ch-up-12', 'upanishads', 12, 'Maitrāyaṇī Upaniṣad', 'मैत्रायणीयोपनिषत्', 57, 'On the self and silence'),

-- grammar-child (10 chapters)
('ch-gc-1', 'grammar-child', 1, 'Meet the Letters', 'अक्षरपरिचयः', 0, 'Learn vowels and consonants through songs'),
('ch-gc-2', 'grammar-child', 2, 'Vowel Friends', 'स्वरमित्राणि', 0, 'Practice writing and pronouncing vowels'),
('ch-gc-3', 'grammar-child', 3, 'Consonant Families', 'व्यञ्जनपरिवाराः', 0, 'Group consonants by mouth position'),
('ch-gc-4', 'grammar-child', 4, 'Making Words', 'शब्दरचना', 0, 'Combine letters to form simple words'),
('ch-gc-5', 'grammar-child', 5, 'My Family', 'मम परिवारः', 0, 'Family vocabulary with pictures'),
('ch-gc-6', 'grammar-child', 6, 'Colorful World', 'रङ्गमयः संसारः', 0, 'Colors and adjectives'),
('ch-gc-7', 'grammar-child', 7, 'Counting Fun', 'गणनाक्रीडा', 0, 'Numbers 1-20'),
('ch-gc-8', 'grammar-child', 8, 'Animal Friends', 'प्राणिमित्राणि', 0, 'Animal names in verse'),
('ch-gc-9', 'grammar-child', 9, 'Action Words', 'क्रियाशब्दाः', 0, 'simple verbs through play'),
('ch-gc-10', 'grammar-child', 10, 'My First Sentences', 'प्रथमवाक्यानि', 0, 'Build simple SOV sentences'),

-- grammar-teen (15 chapters)
('ch-gt-1', 'grammar-teen', 1, 'Alphabet Review', 'वर्णसमीक्षा', 0,'script review and conjunct consonants'),
('ch-gt-2', 'grammar-teen', 2, 'Noun Genders', 'लिङ्गनिर्णयः', 0, 'Masculine, feminine, neuter genders'),
('ch-gt-3', 'grammar-teen', 3, 'The 8 Cases', 'विभक्तिपरिचयः', 0, 'Introduction to case system'),
('ch-gt-4', 'grammar-teen', 4, 'Masculine Declension', 'पुल्लिङ्गविभक्तयः', 0, 'Rama-type masculine nouns'),
('ch-gt-5', 'grammar-teen', 5, 'Neuter Declension', 'नपुंसकविभक्तयः', 0, 'Phala-type neuter nouns'),
('ch-gt-6', 'grammar-teen', 6, 'Feminine Declension', 'स्त्रीलिङ्गविभक्तयः', 0, 'Bala-type feminine nouns'),
('ch-gt-7', 'grammar-teen', 7, 'Present Tense', 'वर्तमानकालः', 0, 'Verb conjugation in present tense'),
('ch-gt-8', 'grammar-teen', 8, 'Past Tense', 'भूतकालः', 0, 'Imperfect and perfect tenses'),
('ch-gt-9', 'grammar-teen', 9, 'Future Tense', 'भविष्यत्कालः', 0,'simple and periphrastic future'),
('ch-gt-10', 'grammar-teen', 10, 'sandhi Basics', 'सन्धिपरिचयः', 0,'simple sound mergers'),
('ch-gt-11', 'grammar-teen', 11, 'Compounds', 'समासपरिचयः', 0, 'Basic compound formation'),
('ch-gt-12', 'grammar-teen', 12,'sentence Construction', 'वाक्यरचना', 0, 'Complex sentences with conjunctions'),
('ch-gt-13', 'grammar-teen', 13, 'Reading Practice', 'पठनाभ्यासः', 0,'simple passages for comprehension'),
('ch-gt-14', 'grammar-teen', 14, 'Composition', 'निबन्धलेखनम्', 0, 'Write short paragraphs'),
('ch-gt-15', 'grammar-teen', 15, 'Exam Preparation', 'परीक्षाप्रस्तुतिः', 0, 'Revision and practice tests'),

-- grammar-undergrad (20 chapters)
('ch-gu-1', 'grammar-undergrad', 1, 'Phonetics', 'वर्णोच्चारणशास्त्रम्', 0, 'Place and effort of articulation'),
('ch-gu-2', 'grammar-undergrad', 2, 'sandhi: Complete', 'सम्पूर्णसन्धिः', 0, 'All sandhi types: guṇa, vṛddhi, yaṇ, ayādi, visarga'),
('ch-gu-3', 'grammar-undergrad', 3, 'Declension System', 'विभक्तिप्रक्रिया', 0, 'All declension patterns across genders'),
('ch-gu-4', 'grammar-undergrad', 4, 'Pronouns & Numerals', 'सर्वनामसङ्ख्याशब्दाः', 0, 'Full pronoun and numeral declension'),
('ch-gu-5', 'grammar-undergrad', 5, 'Verb Classes', 'धातुगणाः', 0, 'All 10 verb classes (gaṇas)'),
('ch-gu-6', 'grammar-undergrad', 6, 'Present System', 'लट्-प्रक्रिया', 0, 'Present, imperative, optative moods'),
('ch-gu-7', 'grammar-undergrad', 7, 'Perfect System', 'लिट्-प्रक्रिया', 0, 'Perfect tense formation with reduplication'),
('ch-gu-8', 'grammar-undergrad', 8, 'Aorist System', 'लुङ्-प्रक्रिया', 0, 'Aorist: simple, reduplicated, sibilant'),
('ch-gu-9', 'grammar-undergrad', 9, 'Future System', 'भविष्यत्प्रक्रिया', 0,'simple and periphrastic future'),
('ch-gu-10', 'grammar-undergrad', 10, 'Passive & Voice', 'कर्मणिप्रयोगः', 0, 'Active, passive, and impersonal constructions'),
('ch-gu-11', 'grammar-undergrad', 11, 'Compounds: Complete', 'समासप्रक्रिया', 0, 'All compound types with examples'),
('ch-gu-12', 'grammar-undergrad', 12, 'Primary Derivatives', 'कृदन्ताः', 0, 'Kṛt suffixes: tavyat, anīyar, kta, ktavatu'),
('ch-gu-13', 'grammar-undergrad', 13,'secondary Derivatives', 'तद्धिताः', 0, 'Taddhita suffixes for abstraction and relation'),
('ch-gu-14', 'grammar-undergrad', 14, 'Indeclinables', 'अव्ययानि', 0, 'Complete list of indeclinables with usage'),
('ch-gu-15', 'grammar-undergrad', 15, 'Prefixes', 'उपसर्गाः', 0, '20 verbal prefixes with meaning changes'),
('ch-gu-16', 'grammar-undergrad', 16,'sentence Analysis', 'वाक्यविश्लेषणम्', 0, 'Parse complex sentences from classical texts'),
('ch-gu-17', 'grammar-undergrad', 17, 'Metre', 'छन्दःशास्त्रम्', 0, 'Common metres: anuṣṭubh, triṣṭubh, jagatī'),
('ch-gu-18', 'grammar-undergrad', 18, 'Prose Composition', 'गद्यरचना', 0, 'Write classical-style prose'),
('ch-gu-19', 'grammar-undergrad', 19, 'Translation Practice', 'अनुवादाभ्यासः', 0, 'sanskrit-English and English-Sanskrit translation'),
('ch-gu-20', 'grammar-undergrad', 20, 'Advanced Reading', 'उच्चपठनम्', 0, 'Read Kalidasa and Gita with commentary'),

-- grammar-graduate (12 chapters)
('ch-gg-1', 'grammar-graduate', 1, 'Pāṇinian System Overview', 'पाणिनीयप्रक्रिया', 0,'structure of the Aṣṭādhyāyī'),
('ch-gg-2', 'grammar-graduate', 2,'sūtra Analysis', 'सूत्रविश्लेषणम्', 0, 'Read and interpret sūtras'),
('ch-gg-3', 'grammar-graduate', 3, 'Phonetic Rules (Saṃhitā)', 'संहिताप्रकरणम्', 0, 'Internal and external sandhi in Pāṇini'),
('ch-gg-4', 'grammar-graduate', 4, 'Case Semantics', 'कारकप्रकरणम्', 0,'semantic roles and case assignment'),
('ch-gg-5', 'grammar-graduate', 5, 'Compound Analysis', 'समासार्थनिर्णयः', 0,'semantic analysis of compound types'),
('ch-gg-6', 'grammar-graduate', 6, 'Tense & Aspect', 'कालार्थनिर्णयः', 0, 'Temporal semantics in Sanskrit verbs'),
('ch-gg-7', 'grammar-graduate', 7, 'Derivation (Kṛt)', 'कृदर्थनिर्णयः', 0,'systematic derivation of kṛdantas'),
('ch-gg-8', 'grammar-graduate', 8, 'Derivation (Taddhita)', 'तद्धितार्थनिर्णयः', 0,'systematic derivation of taddhitas'),
('ch-gg-9', 'grammar-graduate', 9, 'Accent & Pitch', 'उदात्तप्रक्रिया', 0, 'Vedic accent system'),
('ch-gg-10', 'grammar-graduate', 10, 'Dialects & Variation', 'भाषाभेदाः', 0, 'Vedic vs Classical Sanskrit grammar'),
('ch-gg-11', 'grammar-graduate', 11, 'Manuscript Grammar', 'हस्तलेखव्याकरणम्', 0, 'Grammatical analysis of scribal variants'),
('ch-gg-12', 'grammar-graduate', 12, 'Research Methodology', 'शोधप्रविधिः', 0, 'Apply grammar to textual criticism'),

-- grammar-phd (8 chapters)
('ch-gp-1', 'grammar-phd', 1, 'Pāṇini''s Meta-rules', 'परिभाषाः', 0, 'Interpretive rules of the Aṣṭādhyāyī'),
('ch-gp-2', 'grammar-phd', 2, 'Mahābhāṣya Studies', 'महाभाष्यम्', 0, 'Reading Patañjali''s arguments'),
('ch-gp-3', 'grammar-phd', 3, 'Vārtika Analysis', 'वार्तिकानि', 0, 'Kātyāyana''s critical observations'),
('ch-gp-4', 'grammar-phd', 4, 'Kāśikā Commentary', 'काशिकावृत्तिः', 0, 'Interpreting the Kāśikāvṛtti'),
('ch-gp-5', 'grammar-phd', 5,'siddhānta Kaumudī', 'सिद्धान्तकौमुदी', 0, 'Bhaṭṭojī Dīkṣita''s rearrangement'),
('ch-gp-6', 'grammar-phd', 6, 'Modern Linguistics', 'आधुनिकभाषाविज्ञानम्', 0, 'sanskrit through modern linguistic theory'),
('ch-gp-7', 'grammar-phd', 7, 'Computational Linguistics', 'सङ्गणकभाषाविज्ञानम्', 0, 'sanskrit NLP and parsing'),
('ch-gp-8', 'grammar-phd', 8, 'Critical Grammar', 'समालोचनव्याकरणम्', 0, 'Textual criticism through grammatical analysis'),

-- natyashastra (selected chapters)
('ch-ns-1', 'natyashastra', 1, 'Origin of Drama', 'नाट्योत्पत्तिः', 0, 'Brahma creates the Nāṭyaveda'),
('ch-ns-2', 'natyashastra', 2, 'Theatre Architecture', 'मण्डपविधानम्', 0,'stage construction'),
('ch-ns-3', 'natyashastra', 3, 'Pūrvaraṅga', 'पूर्वरङ्गः', 0, 'Pre-dramatic rituals'),
('ch-ns-4', 'natyashastra', 4, 'Tāṇḍava Dance', 'ताण्डवलक्षणम्', 0, 'Śiva''s dance'),
('ch-ns-6', 'natyashastra', 6, 'Rasas', 'रससूत्रम्', 0, 'The theory of aesthetic emotion'),
('ch-ns-7', 'natyashastra', 7, 'Bhāvas', 'भावाः', 0, 'Emotional states'),
('ch-ns-14', 'natyashastra', 14, 'Prosody', 'छन्दः', 0, 'Metres in drama'),
('ch-ns-15', 'natyashastra', 15, 'Figures of Speech', 'अलङ्काराः', 0, 'Poetic figures'),
('ch-ns-18', 'natyashastra', 18, 'Ten Types of Drama', 'दशरूपकम्', 0, 'Classification of plays'),
('ch-ns-19', 'natyashastra', 19, 'Vṛttis', 'वृत्तयः', 0,'styles of presentation'),
('ch-ns-24', 'natyashastra', 24, 'Female Characters', 'स्त्रीपात्राणि', 0, 'Types of heroines'),
('ch-ns-28', 'natyashastra', 28, 'Music', 'सङ्गीतम्', 0, 'Musical scales and instruments'),
('ch-ns-31', 'natyashastra', 31, 'Makeup & Costume', 'आहार्याभिनयः', 0,'stage appearance'),
('ch-ns-36', 'natyashastra', 36, 'Descent of Drama', 'नाट्यावतरणम्', 0, 'Drama spreads to earth') ON CONFLICT (id) DO NOTHING;

-- ════════════════════════════════════════════════════════════════
-- GRAMMAR BOOKS
-- ════════════════════════════════════════════════════════════════

INSERT INTO grammar_books (id, title, title_sanskrit, track, level, description, chapters, rules_count, examples_count, exercises_count) VALUES
('grammar-child', 'Fun Grammar for Children', 'बालव्याकरणम्', 'child', 0, 'Playful introduction through rhymes and games',
'[{"chapter":1,"title":"Vowels","sections":["अ आ इ ई उ ऊ","Pronunciation games","Writing practice"]},{"chapter":2,"title":"Consonants","sections":["5 groups by mouth","Gutturals to Labials","Sing along songs"]},{"chapter":3,"title":"Simple Words","sections":["Family words","Nature words","Animal names"]},{"chapter":4,"title":"Colors & Numbers","sections":["6 colors","Count to 20","Color-by-number"]},{"chapter":5,"title":"Verbs","sections":["Action words","Present tense","Daily routine"]},{"chapter":6,"title":"Sentences","sections":["SOV structure","Subject-Object-Verb","Build your own"]},{"chapter":7,"title":"Questions","sections":["Who? What? Where?","Question words","Ask & answer"]},{"chapter":8,"title":"Opposites","sections":["Big-small","Hot-cold","Happy-sad"]},{"chapter":9,"title":"Story Time","sections":["Simple stories","Comprehension","Retell in Sanskrit"]},{"chapter":10,"title":"Review","sections":["All letters","All words","Certificate"]}]',
50, 200, 100),
('grammar-teen', 'school Sanskrit Grammar', 'माध्यमिकव्याकरणम्', 'teen', 1, 'school-level grammar with exam prep',
'[{"chapter":1,"title":"Script Review","sections":["Conjunct consonants","Vowel signs","Numerals"]},{"chapter":2,"title":"Nouns","sections":["Genders","8 cases","Masculine paradigm"]},{"chapter":3,"title":"Declensions","sections":["Neuter nouns","Feminine nouns","Consonant stems"]},{"chapter":4,"title":"Present Tense","sections":["10 verb classes","6 persons","Conjugation tables"]},{"chapter":5,"title":"Past Tenses","sections":["Imperfect","Perfect","Aorist"]},{"chapter":6,"title":"Future Tenses","sections":["Simple future","Periphrastic future","Conditional"]},{"chapter":7,"title":"Sandhi","sections":["Guna","Vrddhi","Yan"]},{"chapter":8,"title":"Compounds","sections":["Tatpurusa","Karmadharaya","Dvandva","Bahuvrihi"]},{"chapter":9,"title":"Pronouns","sections":["Personal","Demonstrative","Relative"]},{"chapter":10,"title":"Adjectives","sections":["Declension","Comparison","Agreement"]},{"chapter":11,"title":"Indeclinables","sections":["Prepositions","Conjunctions","Adverbs"]},{"chapter":12,"title":"Sentence Types","sections":["Declarative","Interrogative","Imperative"]},{"chapter":13,"title":"Reading","sections":["Subhashitas","Simple stories","Comprehension questions"]},{"chapter":14,"title":"Writing","sections":["Paragraphs","Letters","Essays"]},{"chapter":15,"title":"Exam Prep","sections":["Sample papers","Key rules","Common errors"]}]',
150, 500, 300),
('grammar-undergrad', 'Advanced Sanskrit Grammar', 'उच्चव्याकरणम्', 'undergrad', 2, 'Complete Pāṇinian grammar',
'[{"chapter":1,"title":"Phonetics","sections":["Place and effort","Vowel gradation","Accent"]},{"chapter":2,"title":"Sandhi","sections":["Internal sandhi","External sandhi","Visarga sandhi","Anunasika"]},{"chapter":3,"title":"Declensions","sections":["Vowel stems","Consonant stems","Comparison","Numerals"]},{"chapter":4,"title":"Pronouns","sections":["Personal","Demonstrative","Relative","Indefinite"]},{"chapter":5,"title":"Verb System","sections":["10 classes (ganas)","Present system","Perfect system","Aorist system","Future system"]},{"chapter":6,"title":"Moods","sections":["Indicative","Optative","Imperative","Conditional","Benedictive"]},{"chapter":7,"title":"Voice","sections":["Active (parasmaipada)","Middle (atmanepada)","Passive","Impersonal"]},{"chapter":8,"title":"Compounds","sections":["Tatpurusa","Karmadharaya","Dvandva","Bahuvrihi","Avyayibhava"]},{"chapter":9,"title":"Krdanta","sections":["Gerundives","Participles","Infinitives","Gerunds"]},{"chapter":10,"title":"Taddhita","sections":["Abstract nouns","Patronymics","Possessives"]},{"chapter":11,"title":"Prefixes","sections":["20 upasargas","Meaning changes","Examples from texts"]},{"chapter":12,"title":"Indeclinables","sections":["Complete list","Usage patterns","Idiomatic expressions"]},{"chapter":13,"title":"Metre","sections":["Anustubh","Tristubh","Jagati","Vedic metres"]},{"chapter":14,"title":"Poetics","sections":["Rasa theory","Alamkara","Dhvani"]},{"chapter":15,"title":"Prose Composition","sections":["Sentence structure","Paragraph organization","Stylistic features"]},{"chapter":16,"title":"Translation","sections":["Sanskrit to English","English to Sanskrit","Idioms"]},{"chapter":17,"title":"Narration","sections":["Direct speech","Indirect speech","Reported speech"]},{"chapter":18,"title":"Dialogue","sections":["Conversational Sanskrit","Questions and answers","Polite forms"]},{"chapter":19,"title":"Text Analysis","sections":["Parse Kalidasa","Parse Gita","Grammatical commentary"]},{"chapter":20,"title":"Reference","sections":["Verb conjugation tables","Noun declension tables","Sandhi reference"]}]',
300, 1000, 500),
('grammar-graduate', 'Research Grammar', 'शोधव्याकरणम्', 'graduate', 4, 'Advanced analysis for textual research',
'[{"chapter":1,"title":"Pāṇini''s System","sections":["Structure of Astadhyayi","Adhikara","Paribhasa"]},{"chapter":2,"title":"Sutra Interpretation","sections":["Anuvrtti","Vrtti","Bhasyas"]},{"chapter":3,"title":"Phonological Rules","sections":["Samhita","Internal sandhi","External sandhi exceptions"]},{"chapter":4,"title":"Karaka Theory","sections":["Semantic roles","Case assignment","Debates in Mahabhasya"]},{"chapter":5,"title":"Compound Semantics","sections":["Meaning analysis","Scope","Ambiguity"]},{"chapter":6,"title":"Tense & Aspect","sections":["Relative time","Aktionsart","Modal semantics"]},{"chapter":7,"title":"Derivational Morphology","sections":["Krt rules","Taddhita rules","Krtya derivations"]},{"chapter":8,"title":"Vedic Grammar","sections":["Vedic vs Classical","Accent system","Special forms"]},{"chapter":9,"title":"Dialectology","sections":["Regional variation","Historical change","Ms evidence"]},{"chapter":10,"title":"Text Criticism","sections":["Grammatical arguments","Conjectural emendation","Stemmatics"]},{"chapter":11,"title":"Computational Grammar","sections":["Formalization","Parsing algorithms","Sanskrit NLP"]},{"chapter":12,"title":"Research Methods","sections":["Bibliography","Citation","Publication"]}]',
400, 800, 200),
('grammar-phd', 'Reference Grammar', 'प्रमाणव्याकरणम्', 'phd', 5, 'Definitive scholarly reference',
'[{"chapter":1,"title":"Paribhasa","sections":["Meta-rules","Interpretive principles","Nyayas"]},{"chapter":2,"title":"Mahabhasya","sections":["Patanañjali''s arguments","Debate structure","Dialectical method"]},{"chapter":3,"title":"Varttika","sections":["Kātyāyana''s criticisms","Additions","Corrections"]},{"chapter":4,"title":"Vrtti Tradition","sections":["Kasika","Padamanjari","Nyasa"]},{"chapter":5,"title":"Later Grammarians","sections":["Bhattoji","Nagesa","Bharadvaja"]},{"chapter":6,"title":"Theoretical Linguistics","sections":["Generative grammar","Panini vs Chomsky","Cognitive approaches"]},{"chapter":7,"title":"Computational Panini","sections":["Formalizing Astadhyayi","Machine-readable Sanskrit","Corpus linguistics"]},{"chapter":8,"title":"Critical Edition","sections":["Editing grammatical texts","Ms evidence for rules","Apparatus criticus"]}]',
500, 1500, 0) ON CONFLICT (id) DO NOTHING;

-- ════════════════════════════════════════════════════════════════
-- UPDATE texts with book_id and chapter_number
-- ════════════════════════════════════════════════════════════════

UPDATE texts SET book_id = 'bhagavad-gita', chapter_number = 2, verse_number = 47 WHERE id = 'gita-2-47';
UPDATE texts SET book_id = 'bhagavad-gita', chapter_number = 4, verse_number = 7 WHERE id = 'gita-4-7';
UPDATE texts SET book_id = 'bhagavad-gita', chapter_number = 18, verse_number = 66 WHERE id = 'gita-18-66';
UPDATE texts SET book_id = 'ashtadhyayi', chapter_number = 1, verse_number = 1 WHERE id = 'panini-1-1';
UPDATE texts SET book_id = 'ashtadhyayi', chapter_number = 6, verse_number = 1 WHERE id = 'panini-6-1-77';
UPDATE texts SET book_id = 'yoga-sutra', chapter_number = 1, verse_number = 1 WHERE id = 'yogasutra-1-1';
UPDATE texts SET book_id = 'yoga-sutra', chapter_number = 1, verse_number = 2 WHERE id = 'yogasutra-1-2';
UPDATE texts SET book_id = 'yoga-sutra', chapter_number = 2, verse_number = 29 WHERE id = 'yogasutra-2-29';
UPDATE texts SET book_id = 'nyaya-sutra', chapter_number = 1, verse_number = 1 WHERE id = 'nyayasutra-1-1-1';
UPDATE texts SET book_id = 'abhijnana-shakuntala', chapter_number = 1 WHERE id = 'kalidasa-1-1';
UPDATE texts SET book_id = 'abhijnana-shakuntala', chapter_number = 1 WHERE id = 'kalidasa-1-2';
UPDATE texts SET book_id = 'raghuvamsha', chapter_number = 1, verse_number = 1 WHERE id = 'raghuvamsa-1-1';
UPDATE texts SET book_id = 'meghaduta', chapter_number = 1, verse_number = 1 WHERE id = 'meghaduta-1-1';
UPDATE texts SET book_id = 'upanishads', chapter_number = 1 WHERE id LIKE 'brihad-up%';
UPDATE texts SET book_id = 'upanishads', chapter_number = 11 WHERE id LIKE 'chandogya%';