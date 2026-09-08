use wasm_bindgen::prelude::*;

pub mod grammar;
pub mod dictionary;
pub mod corpus;
pub mod assessment;
pub mod viva;
pub mod ocr;
pub mod tts;

#[wasm_bindgen]
pub fn init_sanskrit_engine() -> String {
    "Sanskritam Lab WASM Engine Initialized".to_string()
}

#[wasm_bindgen]
pub fn analyze_token_wasm(word: &str) -> String {
    let (root, pos, case_info, meaning) = grammar::analyze_token(word);
    serde_json::json!({
        "word": word,
        "root": root,
        "pos": pos,
        "case_info": case_info,
        "meaning": meaning,
    }).to_string()
}

#[wasm_bindgen]
pub fn lookup_dictionary_wasm(query: &str) -> String {
    let store = dictionary::DictionaryStore::new();
    if let Some(entry) = store.entries.get(query) {
        serde_json::to_string(entry).unwrap_or_else(|_| "null".to_string())
    } else {
        "null".to_string()
    }
}

#[wasm_bindgen]
pub fn search_corpus_wasm(query: &str) -> String {
    let store = corpus::CorpusStore::new();
    let q = query.trim().to_lowercase();
    let matches: Vec<_> = store.texts.values()
        .filter(|t| t.content.to_lowercase().contains(&q) || t.title.to_lowercase().contains(&q) || t.translation_en.to_lowercase().contains(&q))
        .collect();
    serde_json::to_string(&matches).unwrap_or_else(|_| "[]".to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_init_engine() {
        assert_eq!(init_sanskrit_engine(), "Sanskritam Lab WASM Engine Initialized");
    }

    #[test]
    fn test_analyze_token() {
        let res = analyze_token_wasm("रामः");
        assert!(res.contains("noun"));
        assert!(res.contains("Rama"));
    }

    #[test]
    fn test_corpus_search() {
        let res = search_corpus_wasm("अग्नि");
        assert!(res.contains("Ṛgveda"));
    }
}
