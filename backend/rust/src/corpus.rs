use actix_web::{web, HttpResponse};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Clone, Serialize, Deserialize)]
pub struct TextEntry {
    pub id: String,
    pub title: String,
    pub title_iast: String,
    pub author: String,
    pub period: String,
    pub content: String,
    pub translation_en: String,
    pub translation_hi: String,
    pub language: String,
    pub category: String,
}

pub struct CorpusStore {
    pub texts: HashMap<String, TextEntry>,
}

impl CorpusStore {
    pub fn new() -> Self {
        let mut texts = HashMap::new();

        let entries = vec![
            TextEntry {
                id: "rv-1-1".into(),
                title: "ऋग्वेदः १.१ (Ṛgveda 1.1)".into(),
                title_iast: "Ṛgveda 1.1".into(),
                author: "मधुच्छन्दाः वैश्वामित्रः (Madhucchandas)".into(),
                period: "1500-1200 BCE".into(),
                content: "अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् । होतारं रत्नधातमम् ॥ १ ॥".into(),
                translation_en: "I praise Agni, the chosen priest, the divine minister of the sacrifice, the hotar, greatest bestower of treasures.".into(),
                translation_hi: "मैं यज्ञ के पुरोहित, प्रकाशमान देव, ऋत्विक और रत्नों को धारण करने वाले अग्नि की स्तुति करता हूँ।".into(),
                language: "Vedic Sanskrit".into(),
                category: "Veda".into(),
            },
            TextEntry {
                id: "bg-2-47".into(),
                title: "श्रीमद्भगवद्गीता २.४७ (Bhagavad Gītā 2.47)".into(),
                title_iast: "Bhagavad Gītā 2.47".into(),
                author: "वेदव्यासः (Vyāsa)".into(),
                period: "~500-200 BCE".into(),
                content: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥".into(),
                translation_en: "You have a right to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of results, nor be attached to inaction.".into(),
                translation_hi: "कर्म करने में ही तुम्हारा अधिकार है, उसके फलों में कभी नहीं। इसलिए कर्मफल का हेतु मत बनो और न ही अकर्मण्यता में तुम्हारी आसक्ति हो।".into(),
                language: "Classical Sanskrit".into(),
                category: "Itihāsa / Philosophy".into(),
            },
            TextEntry {
                id: "panini-1-1".into(),
                title: "अष्टाध्यायी १.१ (Aṣṭādhyāyī 1.1)".into(),
                title_iast: "Aṣṭādhyāyī 1.1".into(),
                author: "पाणिनिः (Pāṇini)".into(),
                period: "~500 BCE".into(),
                content: "वृद्धिरादैच् (१.१.१) । अदेङ् गुणः (१.१.२) । इको गुणवृद्धी (१.१.३) ।".into(),
                translation_en: "The terms āt (ā) and aic (ai, au) are called Vṛddhi. The terms at (a) and eṅ (e, o) are called Guṇa.".into(),
                translation_hi: "आ, ऐ और औ की वृद्धि संज्ञा होती है। अ, ए और ओ की गुण संज्ञा होती है।".into(),
                language: "Grammar (Vyākaraṇa)".into(),
                category: "Grammar".into(),
            },
            TextEntry {
                id: "isha-1".into(),
                title: "ईशावास्योपनिषद् १ (Īśāvāsya Upaniṣad 1)".into(),
                title_iast: "Īśāvāsya Upaniṣad 1".into(),
                author: "Śukla Yajurveda".into(),
                period: "~800-500 BCE".into(),
                content: "ईशा वास्यमिदं सर्वं यत्किञ्च जगत्यां जगत् । तेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम् ॥".into(),
                translation_en: "All this, whatever moves in this moving world, is enveloped by God. Therefore find your enjoyment in renunciation; do not covet anyone's wealth.".into(),
                translation_hi: "इस चराचर जगत् में जो कुछ भी है, वह सब ईश्वर से व्याप्त है। त्यागपूर्वक उसका भोग करो, किसी के धन की लालसा मत करो।".into(),
                language: "Upanishadic Sanskrit".into(),
                category: "Upanishad".into(),
            },
            TextEntry {
                id: "shakuntala-1".into(),
                title: "अभिज्ञानशाकुन्तलम् नांदी (Abhijñānaśākuntalam)".into(),
                title_iast: "Abhijñānaśākuntalam".into(),
                author: "कालिदासः (Kālidāsa)".into(),
                period: "~4th-5th CE".into(),
                content: "या सृष्टिः स्रष्टुराद्या वहति विधिहुतं या हविर्या च होत्री ये द्वे कालं विधत्तः श्रुतिविषयगुणा या स्थिता व्याप्य विश्वम् ।".into(),
                translation_en: "May that Lord Shiva protect you, who is manifested in eight forms: the primal creation (water), the bearer of sacrificial offerings (fire), the priest (soul), time-keepers (sun and moon), space, earth, and air.".into(),
                translation_hi: "जल, अग्नि, यजमान, सूर्य, चन्द्रमा, आकाश, पृथ्वी और वायु — इन आठ प्रत्यक्ष मूर्तियों वाले भगवान शिव आपकी रक्षा करें।".into(),
                language: "Classical Sanskrit Drama".into(),
                category: "Kāvya / Drama".into(),
            },
        ];

        for item in entries {
            texts.insert(item.id.clone(), item);
        }

        CorpusStore { texts }
    }
}

#[derive(Deserialize)]
pub struct SearchQuery {
    pub q: String,
    pub period: Option<String>,
    pub category: Option<String>,
}

#[derive(Serialize)]
pub struct SearchResult {
    pub id: String,
    pub title: String,
    pub snippet: String,
    pub period: String,
    pub category: String,
    pub score: f64,
}

pub async fn search(query: web::Query<SearchQuery>, corpus: web::Data<CorpusStore>) -> HttpResponse {
    let q = query.q.trim().to_lowercase();

    let mut results: Vec<SearchResult> = corpus.texts.values()
        .filter(|t| query.period.as_ref().map_or(true, |p| &t.period == p))
        .filter(|t| query.category.as_ref().map_or(true, |c| &t.category == c))
        .filter_map(|t| {
            let in_content = t.content.to_lowercase().contains(&q);
            let in_title = t.title.to_lowercase().contains(&q) || t.title_iast.to_lowercase().contains(&q);
            let in_trans = t.translation_en.to_lowercase().contains(&q) || t.translation_hi.contains(&q);

            if q.is_empty() || in_content || in_title || in_trans {
                let score = if in_title { 2.0 } else if in_content { 1.5 } else { 1.0 };
                let snippet = if t.content.chars().count() > 80 {
                    t.content.chars().take(80).collect::<String>() + "…"
                } else {
                    t.content.clone()
                };

                Some(SearchResult {
                    id: t.id.clone(),
                    title: t.title.clone(),
                    snippet,
                    period: t.period.clone(),
                    category: t.category.clone(),
                    score,
                })
            } else {
                None
            }
        })
        .collect();

    results.sort_by(|a, b| b.score.partial_cmp(&a.score).unwrap());

    HttpResponse::Ok().json(results)
}

pub async fn list_texts(corpus: web::Data<CorpusStore>) -> HttpResponse {
    let mut list: Vec<&TextEntry> = corpus.texts.values().collect();
    list.sort_by(|a, b| a.title.cmp(&b.title));
    HttpResponse::Ok().json(list)
}

pub async fn get_text(path: web::Path<String>, corpus: web::Data<CorpusStore>) -> HttpResponse {
    let id = path.into_inner();
    match corpus.texts.get(&id) {
        Some(text) => HttpResponse::Ok().json(text),
        None => HttpResponse::NotFound().json(serde_json::json!({"error": "text not found", "id": id})),
    }
}