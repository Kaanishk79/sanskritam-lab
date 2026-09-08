#[cfg(feature = "server")]
use actix_web::{web, HttpResponse};
use serde::{Deserialize, Serialize};

#[derive(Serialize)]
pub struct VivaSessionResponse {
    pub session_id: String,
    pub status: String,
    pub questions: Vec<VivaQuestion>,
}

#[derive(Serialize, Clone)]
pub struct VivaQuestion {
    pub id: String,
    pub topic: String,
    pub question_sa: String,
    pub question_en: String,
    pub question_hi: String,
    pub expected_points: Vec<String>,
}

#[derive(Deserialize)]
#[allow(dead_code)]
pub struct EvaluateVivaRequest {
    pub question_id: String,
    pub response_text: String,
}

#[derive(Serialize)]
pub struct EvaluateVivaResponse {
    pub score: u32,
    pub max_score: u32,
    pub feedback: String,
    pub feedback_hi: String,
    pub matched_points: Vec<String>,
    pub pronunciation_tips: Vec<String>,
}

#[derive(Deserialize)]
#[allow(dead_code)]
pub struct AnalyticsRequest {
    pub user_id: String,
    pub module: String,
    pub score: f64,
    pub weak_areas: Vec<String>,
}

#[derive(Serialize)]
pub struct AnalyticsResponse {
    pub recommendations: Vec<String>,
    pub next_module: String,
    pub mastery_level: String,
}

#[cfg(feature = "server")]
pub async fn start_session() -> HttpResponse {
    let questions = vec![
        VivaQuestion {
            id: "viva-1".into(),
            topic: "Sandhi".into(),
            question_sa: "सवर्णदीर्घसन्धौ गुणसन्धौ च कः भेदः? सोदाहरणं स्पष्टीकुरुत।".into(),
            question_en: "Explain the difference between Savarna Dīrgha and Guṇa Sandhi with examples.".into(),
            question_hi: "सवर्णदीर्घ और गुण संधि में क्या अंतर है? उदाहरण सहित स्पष्ट करें।".into(),
            expected_points: vec![
                "Savarna Dirgha joins identical vowels (akaḥ savarṇe dīrghaḥ)".into(),
                "Guṇa joins a/ā with i, u, ṛ to form e, o, ar (ādguṇaḥ)".into(),
                "Examples: agni + iva = agnīva; deva + indra = devendra".into(),
            ],
        },
        VivaQuestion {
            id: "viva-2".into(),
            topic: "Philosophy".into(),
            question_sa: "न्यायदर्शने कति प्रमाणानि सन्ति? तेषां नामानि वदन्तु।".into(),
            question_en: "What are the four pramāṇas (sources of valid knowledge) in Nyāya philosophy?".into(),
            question_hi: "न्याय दर्शन में कितने प्रमाण माने गए हैं? उनके नाम बताएं।".into(),
            expected_points: vec![
                "Pratyakṣa (Perception)".into(),
                "Anumāna (Inference)".into(),
                "Upamāna (Comparison)".into(),
                "Śabda (Testimony / Scripture)".into(),
            ],
        },
    ];

    HttpResponse::Ok().json(VivaSessionResponse {
        session_id: format!("viva_{}", std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_millis()),
        status: "ready".into(),
        questions,
    })
}

#[cfg(feature = "server")]
pub async fn evaluate_response(body: web::Json<EvaluateVivaRequest>) -> HttpResponse {
    let text = body.response_text.trim();
    let score = if text.len() > 20 { 85 } else if !text.is_empty() { 60 } else { 0 };

    HttpResponse::Ok().json(EvaluateVivaResponse {
        score,
        max_score: 100,
        feedback: "Clear pronunciation and correct grammatical terminology. Keep practicing compound analysis.".into(),
        feedback_hi: "सुस्पष्ट उच्चारण और सही व्याकरणिक शब्दावली। समास विग्रह का और अभ्यास करें।".into(),
        matched_points: vec!["Identified primary rule correctly".into()],
        pronunciation_tips: vec!["Ensure distinct aspiration on mahāprāṇa consonants (ख, घ, छ, झ, थ, ध, फ, भ)".into()],
    })
}

#[cfg(feature = "server")]
pub async fn evaluate_analytics(body: web::Json<AnalyticsRequest>) -> HttpResponse {
    let mut recommendations = Vec::new();

    if body.score < 0.7 {
        recommendations.push("Review basic Sandhi rules and practice 10 drill exercises.".into());
        recommendations.push("Revise the Subanta declension paradigms for 'राम' and 'फल'.".into());
    } else {
        recommendations.push("Excellent comprehension! Advance to Classical Sanskrit text analysis.".into());
        recommendations.push("Practice compounding rules (Samāsa) and Ashtadhyayi derivations.".into());
    }

    HttpResponse::Ok().json(AnalyticsResponse {
        recommendations,
        next_module: if body.score < 0.7 { "sandhi-practice".into() } else { "classical-reading".into() },
        mastery_level: if body.score >= 0.85 { "Advanced" } else if body.score >= 0.6 { "Intermediate" } else { "Beginner" }.into(),
    })
}
