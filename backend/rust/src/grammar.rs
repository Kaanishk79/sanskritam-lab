#[cfg(feature = "server")]
use actix_web::{web, HttpResponse};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Deserialize)]
pub struct ParseRequest {
    pub text: String,
}

#[derive(Serialize)]
pub struct ParseResponse {
    pub tokens: Vec<Token>,
    pub syntax_tree: String,
}

#[derive(Serialize, Clone)]
pub struct Token {
    pub word: String,
    pub root: String,
    pub pos: String,
    pub case_info: Option<String>,
    pub meaning: Option<String>,
}

#[derive(Deserialize)]
pub struct SandhiSplitRequest {
    pub text: String,
}

#[derive(Serialize)]
pub struct SandhiSplitResponse {
    pub original: String,
    pub splits: Vec<String>,
    pub rule_applied: Option<String>,
    pub explanation: Option<String>,
}

#[derive(Deserialize)]
pub struct SandhiJoinRequest {
    pub word1: String,
    pub word2: String,
}

#[derive(Serialize)]
pub struct SandhiJoinResponse {
    pub joined: String,
    pub rule: String,
    pub paninian_sutra: String,
}

#[derive(Deserialize)]
pub struct DeclensionQuery {
    pub stem: Option<String>,
    pub gender: Option<String>,
}

#[derive(Serialize)]
pub struct DeclensionTable {
    pub stem: String,
    pub gender: String,
    pub paradigm: Vec<VibhaktiRow>,
}

#[derive(Serialize)]
pub struct VibhaktiRow {
    pub case_num: u8,
    pub case_name: String,
    pub singular: String,
    pub dual: String,
    pub plural: String,
}

#[cfg(feature = "server")]
pub async fn parse(body: web::Json<ParseRequest>) -> HttpResponse {
    let raw = body.text.trim();
    let words: Vec<&str> = raw.split(|c: char| c.is_whitespace() || c == '।' || c == '॥' || c == ',' || c == '.').filter(|s| !s.is_empty()).collect();

    let tokens: Vec<Token> = words.into_iter().map(|w| {
        let (root, pos, case_info, meaning) = analyze_token(w);
        Token {
            word: w.to_string(),
            root,
            pos,
            case_info,
            meaning,
        }
    }).collect();

    let syntax_tree = format!("(S {})", tokens.iter().map(|t| format!("({} {})", t.pos, t.word)).collect::<Vec<_>>().join(" "));

    HttpResponse::Ok().json(ParseResponse {
        tokens,
        syntax_tree,
    })
}

pub fn analyze_token(w: &str) -> (String, String, Option<String>, Option<String>) {
    match w {
        "रामः" => ("राम".into(), "noun".into(), Some("प्रथमा एकवचन (Nominative Sg)".into()), Some("Rama".into())),
        "रामम्" => ("राम".into(), "noun".into(), Some("द्वितीया एकवचन (Accusative Sg)".into()), Some("Rama (object)".into())),
        "रामेण" => ("राम".into(), "noun".into(), Some("तृतीया एकवचन (Instrumental Sg)".into()), Some("by Rama".into())),
        "रामाय" => ("राम".into(), "noun".into(), Some("चतुर्थी एकवचन (Dative Sg)".into()), Some("for Rama".into())),
        "रामात्" => ("राम".into(), "noun".into(), Some("पञ्चमी एकवचन (Ablative Sg)".into()), Some("from Rama".into())),
        "रामस्य" => ("राम".into(), "noun".into(), Some("षष्ठी एकवचन (Genitive Sg)".into()), Some("of Rama".into())),
        "रामे" => ("राम".into(), "noun".into(), Some("सप्तमी एकवचन (Locative Sg)".into()), Some("in Rama".into())),
        "गच्छति" => ("गम्".into(), "verb".into(), Some("लट् प्रथमपुरुष एकवचन (Present 3rd Sg)".into()), Some("goes".into())),
        "गच्छसि" => ("गम्".into(), "verb".into(), Some("लट् मध्यमपुरुष एकवचन (Present 2nd Sg)".into()), Some("you go".into())),
        "गच्छामि" => ("गम्".into(), "verb".into(), Some("लट् उत्तमपुरुष एकवचन (Present 1st Sg)".into()), Some("I go".into())),
        "पठति" => ("पठ्".into(), "verb".into(), Some("लट् प्रथमपुरुष एकवचन (Present 3rd Sg)".into()), Some("reads".into())),
        "पठामि" => ("पठ्".into(), "verb".into(), Some("लट् उत्तमपुरुष एकवचन (Present 1st Sg)".into()), Some("I read".into())),
        "अस्ति" => ("अस्".into(), "verb".into(), Some("लट् प्रथमपुरुष एकवचन (Present 3rd Sg)".into()), Some("is / exists".into())),
        "भवति" => ("भू".into(), "verb".into(), Some("लट् प्रथमपुरुष एकवचन (Present 3rd Sg)".into()), Some("becomes / is".into())),
        "अहम्" => ("अस्मद्".into(), "pronoun".into(), Some("प्रथमा एकवचन (1st Person Pronoun)".into()), Some("I".into())),
        "त्वम्" => ("युष्मद्".into(), "pronoun".into(), Some("प्रथमा एकवचन (2nd Person Pronoun)".into()), Some("you".into())),
        "सः" => ("तद्".into(), "pronoun".into(), Some("प्रथमा एकवचन (3rd Person Masc Pronoun)".into()), Some("he".into())),
        "सा" => ("तद्".into(), "pronoun".into(), Some("प्रथमा एकवचन (3rd Person Fem Pronoun)".into()), Some("she".into())),
        "तत्" => ("तद्".into(), "pronoun".into(), Some("प्रथमा एकवचन (3rd Person Neuter Pronoun)".into()), Some("that".into())),
        "वनम्" => ("वन".into(), "noun".into(), Some("प्रथमा/द्वितीया एकवचन (Neuter Sg)".into()), Some("forest".into())),
        "फलम्" => ("फल".into(), "noun".into(), Some("प्रथमा/द्वितीया एकवचन (Neuter Sg)".into()), Some("fruit".into())),
        "पुस्तकम्" => ("पुस्तक".into(), "noun".into(), Some("प्रथमा/द्वितीया एकवचन (Neuter Sg)".into()), Some("book".into())),
        "च" => ("च".into(), "indeclinable".into(), None, Some("and".into())),
        "न" => ("न".into(), "indeclinable".into(), None, Some("not".into())),
        "अत्र" => ("अत्र".into(), "indeclinable".into(), None, Some("here".into())),
        "तत्र" => ("तत्र".into(), "indeclinable".into(), None, Some("there".into())),
        _ => (w.to_string(), "noun".into(), None, None),
    }
}

#[cfg(feature = "server")]
pub async fn sandhi_split(body: web::Json<SandhiSplitRequest>) -> HttpResponse {
    let input = body.text.trim();
    let (splits, rule, explanation) = match input {
        "रामाग्र" => (vec!["राम".into(), "अग्र".into()], Some("सवर्णदीर्घ (Savarna Dīrgha)".into()), Some("अ + अ → आ".into())),
        "अग्नीव" => (vec!["अग्नि".into(), "इव".into()], Some("सवर्णदीर्घ (Savarna Dīrgha)".into()), Some("इ + इ → ई (Pāṇini 6.1.101 akaḥ savarṇe dīrghaḥ)".into())),
        "देवेन्द्र" => (vec!["देव".into(), "इन्द्र".into()], Some("गुण (Guṇa)".into()), Some("अ + इ → ए (Pāṇini 6.1.87 ādguṇaḥ)".into())),
        "सूर्योदय" => (vec!["सूर्य".into(), "उदय".into()], Some("गुण (Guṇa)".into()), Some("अ + उ → ओ (Pāṇini 6.1.87 ādguṇaḥ)".into())),
        "सदैव" => (vec!["सदा".into(), "एव".into()], Some("वृद्धि (Vṛddhi)".into()), Some("आ + ए → ऐ (Pāṇini 6.1.88 vṛddhireci)".into())),
        "महौषधम्" => (vec!["महा".into(), "औषधम्".into()], Some("वृद्धि (Vṛddhi)".into()), Some("आ + ओ → औ (Pāṇini 6.1.88 vṛddhireci)".into())),
        "इत्यादि" => (vec!["इति".into(), "आदि".into()], Some("यण् (Yaṇ)".into()), Some("इ + आ → या (Pāṇini 6.1.77 iko yaṇaci)".into())),
        "स्वागतम्" => (vec!["सु".into(), "आगतम्".into()], Some("यण् (Yaṇ)".into()), Some("उ + आ → वा (Pāṇini 6.1.77 iko yaṇaci)".into())),
        "नयनम्" => (vec!["ने".into(), "अनम्".into()], Some("अयादि (Ayādi)".into()), Some("ए + अ → अय् (Pāṇini 6.1.78 eco'yavāyāvaḥ)".into())),
        "पावकः" => (vec!["पौ".into(), "अकः".into()], Some("अयादि (Ayādi)".into()), Some("औ + अ → आव् (Pāṇini 6.1.78 eco'yavāyāvaḥ)".into())),
        _ => {
            let parts: Vec<String> = input.split_whitespace().map(|s| s.to_string()).collect();
            (parts, None, None)
        }
    };

    HttpResponse::Ok().json(SandhiSplitResponse {
        original: input.to_string(),
        splits,
        rule_applied: rule,
        explanation,
    })
}

#[cfg(feature = "server")]
pub async fn sandhi_join(body: web::Json<SandhiJoinRequest>) -> HttpResponse {
    let w1 = body.word1.trim();
    let w2 = body.word2.trim();

    let (joined, rule, sutra) = if (w1 == "अग्नि" || w1.ends_with('ि')) && (w2 == "इव" || w2.starts_with('इ')) {
        let base = w1.trim_end_matches('ि');
        let rem = &w2['इ'.len_utf8()..];
        (format!("{}ी{}", base, rem), "सवर्णदीर्घ (Savarna Dīrgha: i + i → ī)".into(), "अकः सवर्णे दीर्घः (६.१.१०१)".into())
    } else if (w1 == "देव" || w1.ends_with('अ') || !w1.ends_with(|c: char| ['ा','ि','ी','ु','ू','े','ै','ो','ौ','्'].contains(&c))) && w2.starts_with('इ') {
        let rem = &w2['इ'.len_utf8()..];
        (format!("{}े{}", w1, rem), "गुण (Guṇa: a + i → e)".into(), "आद्गुणः (६.१.८७)".into())
    } else if (w1 == "सदा" || w1.ends_with('ा')) && w2.starts_with('ए') {
        let base = w1.trim_end_matches('ा');
        let rem = &w2['ए'.len_utf8()..];
        (format!("{}ै{}", base, rem), "वृद्धि (Vṛddhi: ā + e → ai)".into(), "वृद्धिरेचि (६.१.८८)".into())
    } else if (w1 == "इति" || w1.ends_with('ि')) && (w2.starts_with('आ') || w2.starts_with('अ')) {
        let base = w1.trim_end_matches('ि');
        let (v_lead, v_len) = if w2.starts_with('आ') { ("ा", 'आ'.len_utf8()) } else { ("", 'अ'.len_utf8()) };
        (format!("{}्य{}{}", base, v_lead, &w2[v_len..]), "यण् (Yaṇ: i + vowel → ya)".into(), "इको यणचि (६.१.७७)".into())
    } else {
        (format!("{} {}", w1, w2), "General combination".into(), "संहितायाम्".into())
    };

    HttpResponse::Ok().json(SandhiJoinResponse {
        joined,
        rule,
        paninian_sutra: sutra,
    })
}

#[cfg(feature = "server")]
pub async fn declensions(query: web::Query<DeclensionQuery>) -> HttpResponse {
    let stem = query.stem.as_deref().unwrap_or("राम");
    let gender = query.gender.as_deref().unwrap_or("masculine");

    let paradigm = match stem {
        "राम" | "बालक" | "देव" => vec![
            VibhaktiRow { case_num: 1, case_name: "प्रथमा (Nominative)".into(), singular: format!("{}ः", stem), dual: format!("{}ौ", stem), plural: format!("{}ाः", stem) },
            VibhaktiRow { case_num: 2, case_name: "द्वितीया (Accusative)".into(), singular: format!("{}म्", stem), dual: format!("{}ौ", stem), plural: format!("{}ान्", stem) },
            VibhaktiRow { case_num: 3, case_name: "तृतीया (Instrumental)".into(), singular: if stem == "राम" { "रामेण".into() } else { format!("{}ेन", stem) }, dual: format!("{}ाभ्याम्", stem), plural: format!("{}ैः", stem) },
            VibhaktiRow { case_num: 4, case_name: "चतुर्थी (Dative)".into(), singular: format!("{}ाय", stem), dual: format!("{}ाभ्याम्", stem), plural: format!("{}ेभ्यः", stem) },
            VibhaktiRow { case_num: 5, case_name: "पञ्चमी (Ablative)".into(), singular: format!("{}ात्", stem), dual: format!("{}ाभ्याम्", stem), plural: format!("{}ेभ्यः", stem) },
            VibhaktiRow { case_num: 6, case_name: "षष्ठी (Genitive)".into(), singular: format!("{}स्य", stem), dual: format!("{}योः", stem), plural: format!("{}ाणाम्", stem) },
            VibhaktiRow { case_num: 7, case_name: "सप्तमी (Locative)".into(), singular: format!("{}े", stem), dual: format!("{}योः", stem), plural: format!("{}ेषु", stem) },
            VibhaktiRow { case_num: 8, case_name: "सम्बोधन (Vocative)".into(), singular: format!("हे {}", stem), dual: format!("हे {}ौ", stem), plural: format!("हे {}ाः", stem) },
        ],
        "फल" | "पुस्तक" | "वन" => vec![
            VibhaktiRow { case_num: 1, case_name: "प्रथमा (Nominative)".into(), singular: format!("{}म्", stem), dual: format!("{}े", stem), plural: format!("{}ानि", stem) },
            VibhaktiRow { case_num: 2, case_name: "द्वितीया (Accusative)".into(), singular: format!("{}म्", stem), dual: format!("{}े", stem), plural: format!("{}ानि", stem) },
            VibhaktiRow { case_num: 3, case_name: "तृतीया (Instrumental)".into(), singular: format!("{}ेन", stem), dual: format!("{}ाभ्याम्", stem), plural: format!("{}ैः", stem) },
            VibhaktiRow { case_num: 4, case_name: "चतुर्थी (Dative)".into(), singular: format!("{}ाय", stem), dual: format!("{}ाभ्याम्", stem), plural: format!("{}ेभ्यः", stem) },
            VibhaktiRow { case_num: 5, case_name: "पञ्चमी (Ablative)".into(), singular: format!("{}ात्", stem), dual: format!("{}ाभ्याम्", stem), plural: format!("{}ेभ्यः", stem) },
            VibhaktiRow { case_num: 6, case_name: "षष्ठी (Genitive)".into(), singular: format!("{}स्य", stem), dual: format!("{}योः", stem), plural: format!("{}ानाम्", stem) },
            VibhaktiRow { case_num: 7, case_name: "सप्तमी (Locative)".into(), singular: format!("{}े", stem), dual: format!("{}योः", stem), plural: format!("{}ेषु", stem) },
            VibhaktiRow { case_num: 8, case_name: "सम्बोधन (Vocative)".into(), singular: format!("हे {}", stem), dual: format!("हे {}े", stem), plural: format!("हे {}ानि", stem) },
        ],
        _ => vec![
            VibhaktiRow { case_num: 1, case_name: "प्रथमा (Nominative)".into(), singular: format!("{}ः", stem), dual: format!("{}ौ", stem), plural: format!("{}ाः", stem) },
        ],
    };

    HttpResponse::Ok().json(DeclensionTable {
        stem: stem.to_string(),
        gender: gender.to_string(),
        paradigm,
    })
}