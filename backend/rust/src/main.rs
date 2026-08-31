use actix_cors::Cors;
use actix_web::{web, App, HttpServer, HttpResponse};
use serde::Serialize;

mod ocr;
mod grammar;
mod corpus;
mod dictionary;
mod assessment;
mod viva;
mod tts;

pub struct AppState {
    pub corpus: corpus::CorpusStore,
    pub dictionary: dictionary::DictionaryStore,
}

#[derive(Serialize)]
pub struct HealthResponse {
    pub status: String,
    pub service: String,
    pub version: String,
    pub modules: Vec<String>,
}

async fn health() -> HttpResponse {
    HttpResponse::Ok().json(HealthResponse {
        status: "ok".into(),
        service: "SanskritLab Unified High-Performance Rust Engine".into(),
        version: "0.2.0".into(),
        modules: vec![
            "ocr".into(),
            "grammar (sandhi / morphology / vibhakti)".into(),
            "corpus (full-text search)".into(),
            "dictionary (etymology / compounds)".into(),
            "assessment (quiz generator)".into(),
            "viva (oral examiner & analytics)".into(),
            "tts (audio synthesis)".into(),
        ],
    })
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("============================================================");
    println!(" SanskritLab Unified Rust Backend running on http://127.0.0.1:8080");
    println!("============================================================");

    let corpus_data = web::Data::new(corpus::CorpusStore::new());
    let dict_data = web::Data::new(dictionary::DictionaryStore::new());

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);

        App::new()
            .wrap(cors)
            .app_data(corpus_data.clone())
            .app_data(dict_data.clone())
            .route("/api/health", web::get().to(health))
            .service(
                web::scope("/api/ocr")
                    .route("/recognize", web::post().to(ocr::recognize))
            )
            .service(
                web::scope("/api/grammar")
                    .route("/parse", web::post().to(grammar::parse))
                    .route("/sandhi", web::post().to(grammar::sandhi_split))
                    .route("/sandhi-join", web::post().to(grammar::sandhi_join))
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
                    .route("/search", web::get().to(dictionary::search_dictionary))
                    .route("/compound-split", web::post().to(dictionary::compound_split))
            )
            .service(
                web::scope("/api/assessment")
                    .route("/generate", web::post().to(assessment::generate))
            )
            .service(
                web::scope("/api/viva")
                    .route("/session", web::post().to(viva::start_session))
                    .route("/evaluate", web::post().to(viva::evaluate_response))
            )
            .service(
                web::scope("/api/analytics")
                    .route("/evaluate", web::post().to(viva::evaluate_analytics))
            )
            .service(
                web::scope("/api/tts")
                    .route("/synthesize", web::post().to(tts::synthesize))
            )
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}