package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type AnalyticsRequest struct {
	UserID   string `json:"user_id"`
	Module   string `json:"module"`
	Score    float64 `json:"score"`
	WeakAreas []string `json:"weak_areas"`
}

type StudyPathResponse struct {
	Recommendations []string `json:"recommendations"`
	NextModule      string   `json:"next_module"`
}

func handleAnalytics(w http.ResponseWriter, r *http.Request) {
	var req AnalyticsRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := StudyPathResponse{
		Recommendations: []string{
			"Review sandhi rules",
			"Practice declension tables",
			"Study verb conjugations",
		},
		NextModule: "sandhi-practice",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

type AssessmentRequest struct {
	Topic    string `json:"topic"`
	Count    int    `json:"count"`
	Language string `json:"language"`
}

type AssessmentResponse struct {
	Questions []Question `json:"questions"`
}

type Question struct {
	Prompt      string   `json:"prompt"`
	Options     []string `json:"options"`
	CorrectIdx  int      `json:"correct_idx"`
	Explanation string   `json:"explanation"`
}

func handleAssessment(w http.ResponseWriter, r *http.Request) {
	var req AssessmentRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	questions := []Question{
		{
			Prompt:      "What is the correct form of राम (Rama) in instrumental singular?",
			Options:     []string{"रामेण", "रामाय", "रामात्", "रामस्य"},
			CorrectIdx:  0,
			Explanation: "Instrumental singular of राम is रामेण",
		},
		{
			Prompt:      "Which sandhi rule applies to अग्नि + इव?",
			Options:     []string{"गुणः", "वृद्धिः", "यण्", "अयादि"},
			CorrectIdx:  0,
			Explanation: "इ + इ → ए by गुण sandhi",
		},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(AssessmentResponse{Questions: questions})
}

func handleVivaSession(w http.ResponseWriter, r *http.Request) {
	response := map[string]interface{}{
		"session_id":  "viva_" + strings.ReplaceAll(r.RemoteAddr, ":", "_"),
		"status":      "ready",
		"questions": []string{
			"Explain the concept of घटना in Nyaya philosophy",
			"What is the difference between द्रव्य and गुण?",
			"Describe the वृद्धि sandhi rule with examples",
		},
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func handleTextToSpeech(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Text     string `json:"text"`
		Accent   string `json:"accent"`
		Speed    float64 `json:"speed"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string]interface{}{
		"audio_url":   "https://storage.example.com/tts/output.mp3",
		"duration_ms": len(req.Text) * 150,
		"phonemes":    strings.Split(req.Text, ""),
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	r := mux.NewRouter()

	api := r.PathPrefix("/api").Subrouter()
	api.HandleFunc("/analytics/evaluate", handleAnalytics).Methods("POST")
	api.HandleFunc("/assessment/generate", handleAssessment).Methods("POST")
	api.HandleFunc("/viva/session", handleVivaSession).Methods("POST")
	api.HandleFunc("/tts/synthesize", handleTextToSpeech).Methods("POST")

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders: []string{"*"},
	})

	log.Println("Go backend starting on :9090")
	log.Fatal(http.ListenAndServe(":9090", c.Handler(r)))
}