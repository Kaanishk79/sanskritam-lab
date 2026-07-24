use actix_web::{web, HttpResponse};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

pub struct CorpusStore {
    pub texts: HashMap<String, TextEntry>,
}

#[derive(Clone, Serialize, Deserialize)]
pub struct TextEntry {
    pub id: String,
    pub title: String,
    pub author: String,
    pub period: String,
    pub content: String,
    pub language: String,
}

impl CorpusStore {
    pub fn new() -> Self {
        let mut texts = HashMap::new();
        texts.insert("rv-1-1".into(), TextEntry {
            id: "rv-1-1".into(),
            title: "Ṛgveda 1.1".into(),
            author: "Traditional".into(),
            period: "1500-1200 BCE".into(),
            content: "अग्निमीळे पुरोहितं यज्ञस्य देवं रत्वीजम् । होतारं रत्नधातमम् ॥".into(),
            language: "Vedic Sanskrit".into(),
        });
        texts.insert("panini-1-1".into(), TextEntry {
            id: "panini-1-1".into(),
            title: "Aṣṭādhyāyī 1.1".into(),
            author: "Pāṇini".into(),
            period: "~500 BCE".into(),
            content: "वृद्धिरादैच् । अदेङ् गुणः ।".into(),
            language: "Classical Sanskrit".into(),
        });
        CorpusStore { texts }
    }
}

#[derive(Deserialize)]
pub struct SearchQuery {
    pub q: String,
    pub period: Option<String>,
}

#[derive(Serialize)]
pub struct SearchResult {
    pub id: String,
    pub title: String,
    pub snippet: String,
    pub period: String,
    pub score: f64,
}

pub async fn search(query: web::Query<SearchQuery>, data: web::Data<super::AppState>) -> HttpResponse {
    let corpus = data.corpus.lock().unwrap();
    let results: Vec<SearchResult> = corpus.texts.values()
        .filter(|t| query.period.as_ref().map_or(true, |p| t.period == p))
        .map(|t| SearchResult {
            id: t.id.clone(),
            title: t.title.clone(),
            snippet: t.content.chars().take(100).collect(),
            period: t.period.clone(),
            score: if t.content.contains(&query.q) { 1.0 } else { 0.0 },
        })
        .collect();

    HttpResponse::Ok().json(results)
}

pub async fn list_texts(data: web::Data<super::AppState>) -> HttpResponse {
    let corpus = data.corpus.lock().unwrap();
    let texts: Vec<&TextEntry> = corpus.texts.values().collect();
    HttpResponse::Ok().json(texts)
}

pub async fn get_text(path: web::Path<String>, data: web::Data<super::AppState>) -> HttpResponse {
    let corpus = data.corpus.lock().unwrap();
    match corpus.texts.get(&path.into_inner()) {
        Some(text) => HttpResponse::Ok().json(text),
        None => HttpResponse::NotFound().json(serde_json::json!({"error": "text not found"})),
    }
}