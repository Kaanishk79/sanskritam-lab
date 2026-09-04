#[cfg(feature = "server")]
use actix_web::{web, HttpResponse};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Serialize, Clone)]
pub struct DictionaryEntry {
    pub word: String,
    pub iast: String,
    pub meanings: Vec<String>,
    pub meanings_hi: Vec<String>,
    pub root: Option<String>,
    pub root_meaning: Option<String>,
    pub derivations: Vec<String>,
    pub pos: String,
    pub gender: Option<String>,
}

#[derive(Deserialize)]
pub struct LookupQuery {
    pub word: String,
}

#[derive(Deserialize)]
pub struct SearchQuery {
    pub q: String,
}

#[derive(Deserialize)]
pub struct CompoundSplitRequest {
    pub compound: String,
}

#[derive(Serialize)]
pub struct CompoundSplitResponse {
    pub compound: String,
    pub components: Vec<String>,
    pub samasa_type: String,
    pub explanation: String,
}

pub struct DictionaryStore {
    pub entries: HashMap<String, DictionaryEntry>,
}

impl DictionaryStore {
    pub fn new() -> Self {
        let mut entries = HashMap::new();

        let list = vec![
            DictionaryEntry {
                word: "अग्नि".into(),
                iast: "agni".into(),
                meanings: vec!["fire".into(), "god of fire".into(), "digestive heat".into()],
                meanings_hi: vec!["आग".into(), "अग्निदेव".into(), "जठराग्नि".into()],
                root: Some("अञ्च् / अज्".into()),
                root_meaning: Some("to move / illuminate".into()),
                derivations: vec!["आग्नेय".into(), "अग्निकार्य".into(), "अग्निहोत्र".into()],
                pos: "noun".into(),
                gender: Some("masculine".into()),
            },
            DictionaryEntry {
                word: "राम".into(),
                iast: "rāma".into(),
                meanings: vec!["Rama".into(), "charming".into(), "pleasing".into(), "delightful".into()],
                meanings_hi: vec!["श्रीराम".into(), "आनंददायक".into(), "मनोहर".into()],
                root: Some("रम्".into()),
                root_meaning: Some("to rejoice / find pleasure".into()),
                derivations: vec!["रामायण".into(), "रामानुज".into(), "रम्य".into()],
                pos: "noun".into(),
                gender: Some("masculine".into()),
            },
            DictionaryEntry {
                word: "विद्या".into(),
                iast: "vidyā".into(),
                meanings: vec!["knowledge".into(), "learning".into(), "science / philosophy".into()],
                meanings_hi: vec!["ज्ञान".into(), "शिक्षा".into(), "सरस्वती".into()],
                root: Some("विद्".into()),
                root_meaning: Some("to know / perceive".into()),
                derivations: vec!["विद्यालय".into(), "विद्यार्थी".into(), "विद्वान्".into()],
                pos: "noun".into(),
                gender: Some("feminine".into()),
            },
            DictionaryEntry {
                word: "गुरु".into(),
                iast: "guru".into(),
                meanings: vec!["teacher".into(), "spiritual guide".into(), "heavy / weighty".into()],
                meanings_hi: vec!["शिक्षक".into(), "आचार्य".into(), "भारी / महान".into()],
                root: Some("गॄ".into()),
                root_meaning: Some("to invoke / speak".into()),
                derivations: vec!["गुरुत्व".into(), "गुरुवार".into(), "गुरुकुल".into()],
                pos: "noun".into(),
                gender: Some("masculine".into()),
            },
            DictionaryEntry {
                word: "शान्ति".into(),
                iast: "śānti".into(),
                meanings: vec!["peace".into(), "tranquility".into(), "calmness".into()],
                meanings_hi: vec!["अमन".into(), "शांति".into(), "चित्त की स्थिरता".into()],
                root: Some("शम्".into()),
                root_meaning: Some("to become calm / quiet".into()),
                derivations: vec!["शान्तिमय".into(), "प्रशान्ति".into(), "शमित".into()],
                pos: "noun".into(),
                gender: Some("feminine".into()),
            },
            DictionaryEntry {
                word: "धर्म".into(),
                iast: "dharma".into(),
                meanings: vec!["righteousness".into(), "duty".into(), "moral law".into(), "nature / attribute".into()],
                meanings_hi: vec!["कर्तव्य".into(), "सदाचार".into(), "स्वभाव".into()],
                root: Some("धृ".into()),
                root_meaning: Some("to uphold / sustain".into()),
                derivations: vec!["धार्मिक".into(), "धर्मराज".into(), "धर्मक्षेत्र".into()],
                pos: "noun".into(),
                gender: Some("masculine".into()),
            },
            DictionaryEntry {
                word: "सत्य".into(),
                iast: "satya".into(),
                meanings: vec!["truth".into(), "reality".into(), "unfailing".into()],
                meanings_hi: vec!["सच्चाई".into(), "यथार्थ".into()],
                root: Some("अस्".into()),
                root_meaning: Some("to be / exist (sat)".into()),
                derivations: vec!["सत्यवादी".into(), "सत्यमेव".into(), "सत्यलोक".into()],
                pos: "noun".into(),
                gender: Some("neuter".into()),
            },
            DictionaryEntry {
                word: "पुस्तक".into(),
                iast: "pustaka".into(),
                meanings: vec!["book".into(), "manuscript".into(), "treatise".into()],
                meanings_hi: vec!["किताब".into(), "ग्रन्थ".into()],
                root: Some("पुस्त्".into()),
                root_meaning: Some("to bind / cover".into()),
                derivations: vec!["पुस्तकालय".into(), "पुस्तिका".into()],
                pos: "noun".into(),
                gender: Some("neuter".into()),
            },
            DictionaryEntry {
                word: "जल".into(),
                iast: "jala".into(),
                meanings: vec!["water".into(), "fresh water".into()],
                meanings_hi: vec!["पानी".into(), "नीर".into()],
                root: Some("जल्".into()),
                root_meaning: Some("to cover / cool".into()),
                derivations: vec!["जलाशय".into(), "जलधि".into(), "जलपान".into()],
                pos: "noun".into(),
                gender: Some("neuter".into()),
            },
            DictionaryEntry {
                word: "फल".into(),
                iast: "phala".into(),
                meanings: vec!["fruit".into(), "consequence / result".into(), "reward".into()],
                meanings_hi: vec!["फल".into(), "परिणाम".into(), "लाभ".into()],
                root: Some("फल्".into()),
                root_meaning: Some("to bear fruit / burst forth".into()),
                derivations: vec!["फलवान्".into(), "फलश्रुति".into(), "निष्फल".into()],
                pos: "noun".into(),
                gender: Some("neuter".into()),
            },
        ];

        for item in list {
            entries.insert(item.word.clone(), item);
        }

        DictionaryStore { entries }
    }
}

#[cfg(feature = "server")]
pub async fn lookup(query: web::Query<LookupQuery>, dict: web::Data<DictionaryStore>) -> HttpResponse {
    let target = query.word.trim();
    if let Some(entry) = dict.entries.get(target) {
        HttpResponse::Ok().json(entry)
    } else {
        HttpResponse::NotFound().json(serde_json::json!({
            "error": "Word not found in dictionary",
            "word": target
        }))
    }
}

#[cfg(feature = "server")]
pub async fn search_dictionary(query: web::Query<SearchQuery>, dict: web::Data<DictionaryStore>) -> HttpResponse {
    let q = query.q.trim().to_lowercase();
    let matches: Vec<&DictionaryEntry> = dict.entries.values().filter(|e| {
        e.word.contains(&q)
            || e.iast.to_lowercase().contains(&q)
            || e.meanings.iter().any(|m| m.to_lowercase().contains(&q))
            || e.meanings_hi.iter().any(|m| m.contains(&q))
    }).collect();

    HttpResponse::Ok().json(matches)
}

#[cfg(feature = "server")]
pub async fn compound_split(body: web::Json<CompoundSplitRequest>) -> HttpResponse {
    let compound = body.compound.trim();

    let (components, samasa_type, explanation) = match compound {
        "विद्यालय" | "विद्यालयः" => (
            vec!["विद्या".into(), "आलयः".into()],
            "तत्पुरुष (Tatpuruṣa - षष्ठी)".into(),
            "विद्यायाः आलयः (Abode of knowledge)".into()
        ),
        "सूर्योदय" | "सूर्योदयः" => (
            vec!["सूर्य".into(), "उदयः".into()],
            "तत्पुरुष (Tatpuruṣa - षष्ठी)".into(),
            "सूर्यस्य उदयः (Rise of the sun)".into()
        ),
        "पीताम्बर" | "पीताम्बरः" => (
            vec!["पीत".into(), "अम्बरम्".into()],
            "बहुव्रीहि (Bahuvrīhi)".into(),
            "पीतं अम्बरं यस्य सः (One whose garments are yellow — Vishnu/Krishna)".into()
        ),
        "रामलक्ष्मणौ" => (
            vec!["रामः".into(), "लक्ष्मणः".into()],
            "द्वन्द्व (Dvandva)".into(),
            "रामश्च लक्ष्मणश्च (Rama and Lakshmana)".into()
        ),
        "यथाशक्ति" => (
            vec!["शक्तिम्".into(), "अनतिक्रम्य".into()],
            "अव्ययीभाव (Avyayībhāva)".into(),
            "शक्तिम् अनतिक्रम्य (According to one's capacity)".into()
        ),
        _ => (
            vec![compound.to_string()],
            "Unknown / Single word".into(),
            format!("No compound split found for {}", compound)
        ),
    };

    HttpResponse::Ok().json(CompoundSplitResponse {
        compound: compound.to_string(),
        components,
        samasa_type,
        explanation,
    })
}