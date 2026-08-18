export interface Quote {
  id: string
  sa: string
  iast: string
  en: string
  speaker: string
  source: string
  category: string
}

export const QUOTES: Quote[] = [
  { id: 'q1', sa: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन', iast: 'karmaṇyevādhikāraste mā phaleṣu kadācana', en: 'Your right is to action alone, never to its fruits.', speaker: 'Śrī Kṛṣṇa', source: 'Bhagavad Gītā 2.47', category: 'Gītā' },
  { id: 'q2', sa: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत', iast: 'yadā yadā hi dharmasya glānirbhavati bhārata', en: 'Whenever dharma declines, O Bhārata…', speaker: 'Śrī Kṛṣṇa', source: 'Bhagavad Gītā 4.7', category: 'Gītā' },
  { id: 'q3', sa: 'सत्यमेव जयते नानृतम्', iast: 'satyameva jayate nānṛtam', en: 'Truth alone triumphs, not falsehood.', speaker: 'Upaniṣad Ṛṣis', source: 'Muṇḍaka Upaniṣad 3.1.6', category: 'Upaniṣad' },
  { id: 'q4', sa: 'अहिंसा परमो धर्मः', iast: 'ahiṃsā paramo dharmaḥ', en: 'Non-violence is the highest dharma.', speaker: 'Mahābhārata sages', source: 'Mahābhārata', category: 'Epic' },
  { id: 'q5', sa: 'धर्मो रक्षति रक्षितः', iast: 'dharmo rakṣati rakṣitaḥ', en: 'Dharma protects those who protect it.', speaker: 'Bhīṣma', source: 'Mahābhārata', category: 'Epic' },
  { id: 'q6', sa: 'विद्या ददाति विनयं विनयाद् याति पात्रताम्', iast: 'vidyā dadāti vinayaṃ vinayād yāti pātratām', en: 'Knowledge gives humility; from humility comes worthiness.', speaker: 'Śrī Kṛṣṇa', source: 'Vidura Nīti', category: 'Wisdom' },
  { id: 'q7', sa: 'यथा हि एकेन चक्रेण न रथस्य गतिर्भवेत्', iast: 'yathā hi ekena cakreṇa na rathasya gatirbhavet', en: 'As a chariot cannot move on one wheel…', speaker: 'Vidura', source: 'Vidura Nīti', category: 'Wisdom' },
  { id: 'q8', sa: 'उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः', iast: 'udyamena hi sidhyanti kāryāṇi na manorathaiḥ', en: 'Tasks succeed by effort, not by wishing.', speaker: 'Hitopadeśa', source: 'Hitopadeśa', category: 'Wisdom' },
  { id: 'q9', sa: 'पुस्तकेषु च या विद्या परहस्तगतेषु च', iast: 'pustakeṣu ca yā vidyā parahastagateṣu ca', en: 'Knowledge kept in books or in another’s hands is not knowledge.', speaker: 'Cāṇakya', source: 'Cāṇakya Nīti', category: 'Wisdom' },
  { id: 'q10', sa: 'माता शत्रुः पिता वैरी येन बालो न पाठितः', iast: 'mātā śatruḥ pitā vairī yena bālo na pāṭhitaḥ', en: 'A mother and father are enemies who do not educate their child.', speaker: 'Cāṇakya', source: 'Cāṇakya Nīti', category: 'Wisdom' },
  { id: 'q11', sa: 'सा विद्या या विमुक्तये', iast: 'sā vidyā yā vimuktaye', en: 'That is true knowledge which liberates.', speaker: 'Ādi Śaṅkarācārya', source: 'Vivekacūḍāmaṇi', category: 'Philosophy' },
  { id: 'q12', sa: 'मन एव मनुष्याणां कारणं बन्धमोक्षयोः', iast: 'mana eva manuṣyāṇāṃ kāraṇaṃ bandhamokṣayoḥ', en: 'The mind alone is the cause of bondage and freedom.', speaker: 'Ādi Śaṅkarācārya', source: 'Vivekacūḍāmaṇi', category: 'Philosophy' },
  { id: 'q13', sa: 'अतिथिदेवो भव', iast: 'atithidevo bhava', en: 'Treat the guest as a god.', speaker: 'Upaniṣad Ṛṣis', source: 'Taittirīya Upaniṣad', category: 'Upaniṣad' },
  { id: 'q14', sa: 'सत्यं वद धर्मं चर', iast: 'satyaṃ vada dharmaṃ cara', en: 'Speak the truth, practise dharma.', speaker: 'Upaniṣad Ṛṣis', source: 'Taittirīya Upaniṣad', category: 'Upaniṣad' },
  { id: 'q15', sa: 'न मे धनं न च धनानि, नैव दाराः सुताः', iast: 'na me dhanaṃ na ca dhanāni, naiva dārāḥ sutāḥ', en: 'Not wealth, nor wife, nor children — only thou, O Lord…', speaker: 'Śaṅkarācārya', source: 'Bhaja Govindam', category: 'Philosophy' },
  { id: 'q16', sa: 'पूर्णमदः पूर्णमिदं पूर्णात् पूर्णमुदच्यते', iast: 'pūrṇamadaḥ pūrṇamidaṃ pūrṇāt pūrṇamudacyate', en: 'That is whole; this is whole; from the whole arises the whole.', speaker: 'Upaniṣad Ṛṣis', source: 'Īśāvāsya Upaniṣad', category: 'Upaniṣad' },
  { id: 'q17', sa: 'काव्येषु नाटकं रम्यं तत्र रम्या शकुन्तला', iast: 'kāvyeṣu nāṭakaṃ ramyaṃ tatra ramyā śakuntalā', en: 'Among poems the drama is charming; there charming is Śakuntalā.', speaker: 'Kālidāsa', source: 'Abhijñānaśākuntalam', category: 'Poetry' },
  { id: 'q18', sa: 'मनसि वचसि काये शुद्धता', iast: 'manasi vacasi kāye śuddhatā', en: 'Purity in thought, word and deed…', speaker: 'Bhāgavata sages', source: 'Śrīmad Bhāgavatam', category: 'Devotion' },
  { id: 'q19', sa: 'सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः', iast: 'sarve bhavantu sukhinaḥ sarve santu nirāmayāḥ', en: 'May all be happy, may all be free of disease.', speaker: 'Śānti mantras', source: 'Vedic śānti pāṭha', category: 'Devotion' },
  { id: 'q20', sa: 'क्षमा बलमशक्तानां शक्तानां भूषणं क्षमा', iast: 'kṣamā balamaśaktānāṃ śaktānāṃ bhūṣaṇaṃ kṣamā', en: 'Forgiveness is the strength of the weak and the ornament of the strong.', speaker: 'Mahābhārata sages', source: 'Mahābhārata', category: 'Epic' },
  { id: 'q21', sa: 'स्वस्मिन् विश्वसिति न यः स कथं विश्वसेत् परस्मै', iast: 'svasmin viśvasiti na yaḥ sa kathaṃ viśvaset parasmai', en: 'One who does not trust himself cannot be trusted by others.', speaker: 'Bhāsa', source: 'Svapnavāsavadattam', category: 'Drama' },
  { id: 'q22', sa: 'यथा चतुर्भिः कनकं परीक्ष्यते नीराजनैः श्रौततुलाघटैः तथा चतुर्भिः पुरुषः परीक्ष्यते', iast: 'yathā caturbhiḥ kanakaṃ parīkṣyate', en: 'As gold is tested by four means, so is a person tested.', speaker: 'Mahābhārata sages', source: 'Mahābhārata', category: 'Wisdom' },
  { id: 'q23', sa: 'अपि स्वर्णमयी लङ्का न मे लक्ष्मण रोचते', iast: 'api svarṇamayī laṅkā na me lakṣmaṇa rocate', en: 'Even this golden Laṅkā does not please me, Lakṣmaṇa.', speaker: 'Rāma', source: 'Rāmāyaṇa', category: 'Epic' },
  { id: 'q24', sa: 'न हि ज्ञानेन सदृशं पवित्रमिह विद्यते', iast: 'na hi jñānena sadṛśaṃ pavitramiha vidyate', en: 'Nothing here is as pure as knowledge.', speaker: 'Śrī Kṛṣṇa', source: 'Bhagavad Gītā 4.38', category: 'Gītā' },
  { id: 'q25', sa: 'आत्मनः प्रतिकूलानि परेषां न समाचरेत्', iast: 'ātmanaḥ pratikūlāni pareṣāṃ na samācaret', en: 'Do not do to others what is against yourself.', speaker: 'Mahābhārata sages', source: 'Mahābhārata', category: 'Wisdom' },
  { id: 'q26', sa: 'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्', iast: 'uddharedātmanātmānaṃ nātmānamavasādayet', en: 'Raise yourself by yourself; do not degrade yourself.', speaker: 'Śrī Kṛṣṇa', source: 'Bhagavad Gītā 6.5', category: 'Gītā' },
  { id: 'q27', sa: 'अमित्रं कुरुते मित्रं मित्रं द्वेष्टि च सर्वदा', iast: 'amitraṃ kurute mitraṃ', en: 'He turns enemies into friends and hates friends.', speaker: 'Duryodhana', source: 'Mahābhārata', category: 'Epic' },
  { id: 'q28', sa: 'सर्वं परवशं दुःखं सर्वमात्मवशं सुखम्', iast: 'sarvaṃ paravaśaṃ duḥkhaṃ sarvamātmavaśaṃ sukham', en: 'Everything dependent on others is suffering; everything under one’s own control is joy.', speaker: 'Mahābhārata sages', source: 'Mahābhārata', category: 'Wisdom' },
]

export const SPEAKERS = [...new Set(QUOTES.map((q) => q.speaker))]

export function quoteOfDay(): Quote {
  const d = new Date()
  return QUOTES[(d.getFullYear() * 12 + d.getMonth() + d.getDate()) % QUOTES.length]
}