use actix_web::{web, HttpResponse};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Serialize)]
pub struct DictionaryEntry {
    pub word: String,
    pub meanings: Vec<String>,
    pub root: String,
    pub derivations: Vec<String>,
}

#[derive(Deserialize)]
pub struct LookupQuery {
    pub word: String,
}

pub async fn lookup(query: web::Query<LookupQuery>) -> HttpResponse {
    let dict: HashMap<&str, DictionaryEntry> = [
        ("अग्नि", DictionaryEntry {
            word: "अग्नि".into(),
            meanings: vec!["fire".into(), "god of fire".into(), "energy".into()],
            root: "अञ्च्".into(),
            derivations: vec!["आग्नेय".into(), "अग्निकार्य".into()],
        }),
        ("राम", DictionaryEntry {
            word: "राम".into(),
            meanings: vec!["Rama".into(), "pleasing".into(), "charming".into()],
            root: "रम्".into(),
            derivations: vec!["रामायण".into(), "रामानुज".into()],
        }),
    ].into();

    match dict.get(query.word.as_str()) {
        Some(entry) => HttpResponse::Ok().json(entry),
        None => HttpResponse::NotFound().json(serde_json::json!({"error": "word not found"})),
    }
}

#[derive(Deserialize)]
pub struct CompoundSplitRequest {
    pub compound: String,
}

#[derive(Serialize)]
pub struct CompoundSplitResponse {
    pub components: Vec<String>,
    pub explanation: String,
}

pub async fn compound_split(body: web::Json<CompoundSplitRequest>) -> HttpResponse {
    HttpResponse::Ok().json(CompoundSplitResponse {
        components: vec![body.compound.clone()],
        explanation: "Compound splitting result (stub)".into(),
    })
}