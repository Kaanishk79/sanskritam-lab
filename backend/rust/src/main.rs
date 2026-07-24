use actix_cors::Cors;
use actix_web::{web, App, HttpServer, HttpResponse, middleware};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;

mod ocr;
mod grammar;
mod corpus;
mod dictionary;

pub struct AppState {
    pub corpus: Mutex<corpus::CorpusStore>,
}

#[derive(Serialize)]
pub struct HealthResponse {
    pub status: String,
    pub version: String,
    pub modules: Vec<String>,
}

async fn health() -> HttpResponse {
    HttpResponse::Ok().json(HealthResponse {
        status: "ok".into(),
        version: "0.1.0".into(),
        modules: vec![
            "ocr".into(),
            "grammar".into(),
            "corpus".into(),
            "dictionary".into(),
        ],
    })
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Starting SanskritLab backend on http://127.0.0.1:8080");

    let data = web::Data::new(AppState {
        corpus: Mutex::new(corpus::CorpusStore::new()),
    });

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);

        App::new()
            .wrap(cors)
            .app_data(data.clone())
            .route("/api/health", web::get().to(health))
            .service(
                web::scope("/api/ocr")
                    .route("/recognize", web::post().to(ocr::recognize))
            )
            .service(
                web::scope("/api/grammar")
                    .route("/parse", web::post().to(grammar::parse))
                    .route("/sandhi", web::post().to(grammar::sandhi_split))
                    .route("/declensions", web::get().to(grammar::declensions))
            )
            .service(
                web::scope("/api/corpus")
                    .route("/search", web::get().to(corpus::search))
                    .route("/texts", web::get().to(corpus::list_texts))
                    .route("/texts/{id}", web::get().to(corpus::get_text))
            )
            .service(
                web::scope("/api/dictionary")
                    .route("/lookup", web::get().to(dictionary::lookup))
                    .route("/compound-split", web::post().to(dictionary::compound_split))
            )
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}