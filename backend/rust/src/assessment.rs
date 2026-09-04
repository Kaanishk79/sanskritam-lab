#[cfg(feature = "server")]
use actix_web::{web, HttpResponse};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct AssessmentRequest {
    pub topic: Option<String>,
    pub count: Option<usize>,
    pub level: Option<u8>,
}

#[derive(Serialize)]
pub struct AssessmentResponse {
    pub topic: String,
    pub level: u8,
    pub questions: Vec<Question>,
}

#[derive(Serialize, Clone)]
pub struct Question {
    pub id: String,
    pub prompt: String,
    pub prompt_hi: String,
    pub options: Vec<String>,
    pub options_hi: Vec<String>,
    pub correct_idx: usize,
    pub explanation: String,
    pub explanation_hi: String,
}

#[cfg(feature = "server")]
pub async fn generate(body: web::Json<AssessmentRequest>) -> HttpResponse {
    let topic = body.topic.as_deref().unwrap_or("general");
    let count = body.count.unwrap_or(3).min(10);
    let level = body.level.unwrap_or(1);

    let all_questions = get_questions_pool();

    let mut selected: Vec<Question> = all_questions.into_iter().take(count).collect();

    HttpResponse::Ok().json(AssessmentResponse {
        topic: topic.to_string(),
        level,
        questions: selected,
    })
}

fn get_questions_pool() -> Vec<Question> {
    vec![
        Question {
            id: "q-vibhakti-1".into(),
            prompt: "What is the correct form of राम (Rama) in instrumental singular?".into(),
            prompt_hi: "राम शब्द का तृतीया एकवचन (करण कारक) क्या रूप है?".into(),
            options: vec!["रामेण".into(), "रामाय".into(), "रामात्".into(), "रामस्य".into()],
            options_hi: vec!["रामेण".into(), "रामाय".into(), "रामात्".into(), "रामस्य".into()],
            correct_idx: 0,
            explanation: "The instrumental singular (तृतीया एकवचन) of the masculine a-stem 'राम' is 'रामेण' by na-to-ṇa rule (Pāṇini 8.4.1).".into(),
            explanation_hi: "अकारान्त पुंल्लिंग 'राम' का तृतीया एकवचन रूप 'रामेण' होता है (अट्कुप्वाङ्नुम्व्यवायेऽपि)।".into(),
        },
        Question {
            id: "q-sandhi-1".into(),
            prompt: "Which sandhi rule applies to 'अग्नि + इव' (yielding 'अग्नीव')?".into(),
            prompt_hi: "'अग्नि + इव' (अग्नीव) में कौन सा संधि नियम लागू होता है?".into(),
            options: vec![
                "सवर्णदीर्घः (Savarna Dīrgha: i + i → ī)".into(),
                "गुणः (Guṇa: a + i → e)".into(),
                "वृद्धिः (Vṛddhi: a + e → ai)".into(),
                "यण् (Yaṇ: i + vowel → y)".into(),
            ],
            options_hi: vec![
                "सवर्णदीर्घः (इ + इ → ई)".into(),
                "गुणः (अ + इ → ए)".into(),
                "वृद्धिः (अ + ए → ऐ)".into(),
                "यण् (इ + अ → य)".into(),
            ],
            correct_idx: 0,
            explanation: "By Pāṇini 6.1.101 'akaḥ savarṇe dīrghaḥ', similar vowels merge into long vowel: अग्नि + इव = अग्नीव.".into(),
            explanation_hi: "पाणिनि सूत्र 'अकः सवर्णे दीर्घः' (६.१.१०१) से समान स्वर मिलकर दीर्घ हो जाते हैं: अग्नि + इव = अग्नीव।".into(),
        },
        Question {
            id: "q-dhatu-1".into(),
            prompt: "What is the 3rd person singular present tense (लट् प्रथमपुरुष एकवचन) of root √गम् (gam)?".into(),
            prompt_hi: "√गम् धातु का लट् लकार प्रथमपुरुष एकवचन रूप क्या है?".into(),
            options: vec!["गच्छति".into(), "गच्छसि".into(), "गच्छामि".into(), "गम्यते".into()],
            options_hi: vec!["गच्छति".into(), "गच्छसि".into(), "गच्छामि".into(), "गम्यते".into()],
            correct_idx: 0,
            explanation: "Root √गम् becomes 'गच्छ' in śap-vikaraṇa and takes 'ति' suffix: गच्छति (he/she/it goes).".into(),
            explanation_hi: "√गम् धातु को 'इषुकमिगमां छः' से गच्छ आदेश होकर 'ति' प्रत्यय लगता है: गच्छति (वह जाता है)।".into(),
        },
        Question {
            id: "q-vibhakti-2".into(),
            prompt: "What is the dative singular (चतुर्थी एकवचन) of फल (phala, neuter)?".into(),
            prompt_hi: "फल (नपुंसकलिंग) का चतुर्थी एकवचन क्या रूप है?".into(),
            options: vec!["फलाय".into(), "फलेन".into(), "फलात्".into(), "फलस्य".into()],
            options_hi: vec!["फलाय".into(), "फलेन".into(), "फलात्".into(), "फलस्य".into()],
            correct_idx: 0,
            explanation: "The dative singular of neuter a-stem 'फल' is 'फलाय' (for the fruit).".into(),
            explanation_hi: "अकारान्त नपुंसकलिंग 'फल' का चतुर्थी एकवचन 'फलाय' होता है (फल के लिए)।".into(),
        },
    ]
}
