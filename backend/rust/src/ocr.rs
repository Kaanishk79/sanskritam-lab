use actix_web::{web, HttpResponse};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct RecognizeRequest {
    pub image_data: String,
    pub script: String,
}

#[derive(Serialize)]
pub struct RecognizeResponse {
    pub text: String,
    pub confidence: f64,
}

pub async fn recognize(body: web::Json<RecognizeRequest>) -> HttpResponse {
    let result = RecognizeResponse {
        text: format!("[OCR stub] Recognized text from {} script", body.script),
        confidence: 0.95,
    };
    HttpResponse::Ok().json(result)
}