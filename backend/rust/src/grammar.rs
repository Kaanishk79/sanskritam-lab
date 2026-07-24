use actix_web::{web, HttpResponse};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct ParseRequest {
    pub text: String,
}

#[derive(Serialize)]
pub struct ParseResponse {
    pub tokens: Vec<Token>,
    pub syntax_tree: String,
}

#[derive(Serialize)]
pub struct Token {
    pub word: String,
    pub root: String,
    pub pos: String,
    pub case_info: Option<String>,
}

pub async fn parse(body: web::Json<ParseRequest>) -> HttpResponse {
    let tokens: Vec<Token> = body.text
        .split_whitespace()
        .map(|w| Token {
            word: w.to_string(),
            root: w.to_string(),
            pos: "noun".into(),
            case_info: None,
        })
        .collect();

    HttpResponse::Ok().json(ParseResponse {
        tokens,
        syntax_tree: "(S (NP ...))".into(),
    })
}

#[derive(Deserialize)]
pub struct SandhiRequest {
    pub text: String,
}

#[derive(Serialize)]
pub struct SandhiResponse {
    pub splits: Vec<String>,
}

pub async fn sandhi_split(body: web::Json<SandhiRequest>) -> HttpResponse {
    HttpResponse::Ok().json(SandhiResponse {
        splits: body.text.split_whitespace().map(|w| w.to_string()).collect(),
    })
}

pub async fn declensions() -> HttpResponse {
    HttpResponse::Ok().json(serde_json::json!({
        "paradigms": ["rama", "ramaU", "ramaH"]
    }))
}