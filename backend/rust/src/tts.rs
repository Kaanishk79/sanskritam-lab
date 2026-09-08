#[cfg(feature = "server")]
use actix_web::{web, HttpResponse};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
#[allow(dead_code)]
pub struct TtsRequest {
    pub text: String,
    pub accent: Option<String>,
    pub speed: Option<f64>,
}

#[derive(Serialize)]
pub struct TtsResponse {
    pub audio_url: String,
    pub duration_ms: usize,
    pub text: String,
}

#[cfg(feature = "server")]
pub async fn synthesize(body: web::Json<TtsRequest>) -> HttpResponse {
    let clean = body.text.trim();
    let duration = clean.chars().count() * 140;

    HttpResponse::Ok().json(TtsResponse {
        audio_url: format!("/api/tts/stream?q={}", urlencoding(clean)),
        duration_ms: duration,
        text: clean.to_string(),
    })
}

#[allow(dead_code)]
fn urlencoding(input: &str) -> String {
    let mut out = String::new();
    for byte in input.bytes() {
        if (byte >= b'a' && byte <= b'z') || (byte >= b'A' && byte <= b'Z') || (byte >= b'0' && byte <= b'9') || byte == b'-' || byte == b'_' || byte == b'.' || byte == b'~' {
            out.push(byte as char);
        } else {
            out.push_str(&format!("%{:02X}", byte));
        }
    }
    out
}
