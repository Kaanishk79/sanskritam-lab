pub mod grammar;
pub mod dictionary;
pub mod corpus;
pub mod assessment;
pub mod viva;
pub mod ocr;
pub mod tts;

pub fn engine_version() -> &'static str {
    "0.2.0"
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_engine_version() {
        assert_eq!(engine_version(), "0.2.0");
    }

    #[test]
    fn test_analyze_token() {
        let (root, pos, case_info, meaning) = grammar::analyze_token("रामः");
        assert_eq!(root, "राम");
        assert_eq!(pos, "noun");
        assert_eq!(case_info.as_deref(), Some("प्रथमा एकवचन (Nominative Sg)"));
        assert_eq!(meaning.as_deref(), Some("Rama"));
    }

    #[test]
    fn test_corpus_store() {
        let store = corpus::CorpusStore::new();
        assert!(store.texts.contains_key("rv-1-1"));
        let rv = &store.texts["rv-1-1"];
        assert!(rv.content.contains("अग्निमीळे"));
    }

    #[test]
    fn test_dictionary_store() {
        let store = dictionary::DictionaryStore::new();
        assert!(store.entries.contains_key("विद्या"));
    }
}
