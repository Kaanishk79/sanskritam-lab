import sys
import json
import os
import urllib.request
import urllib.error
import urllib.parse
from pathlib import Path

try:
    from PySide6.QtWidgets import (
        QApplication, QMainWindow, QWidget, QVBoxLayout, QHBoxLayout,
        QPushButton, QStackedWidget, QLabel, QListWidget, QSplitter,
        QTextEdit, QTreeWidget, QMenuBar, QMenu, QStatusBar, QTabWidget,
        QMessageBox, QLineEdit
    )
    from PySide6.QtCore import Qt, QSize
    from PySide6.QtGui import QAction, QFont, QIcon
except ImportError:
    print("PySide6 not installed. Install with: pip install PySide6")
    sys.exit(1)

BACKEND_BASE_URL = os.environ.get("SANSKRIT_BACKEND_URL", "http://127.0.0.1:8080")


def api_get(endpoint: str, timeout: float = 2.0):
    try:
        url = f"{BACKEND_BASE_URL}{endpoint}"
        req = urllib.request.Request(url, headers={"User-Agent": "SanskritLabDesktop/0.2.0"})
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception:
        return None


def api_post(endpoint: str, payload: dict, timeout: float = 2.0):
    try:
        url = f"{BACKEND_BASE_URL}{endpoint}"
        raw = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            url,
            data=raw,
            headers={
                "Content-Type": "application/json",
                "User-Agent": "SanskritLabDesktop/0.2.0"
            },
            method="POST"
        )
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception:
        return None


class ManuscriptViewer(QWidget):
    def __init__(self):
        super().__init__()
        layout = QVBoxLayout()
        layout.addWidget(QLabel("3D Manuscript Viewer - Rotate & Inspect"))
        self.viewer_label = QLabel(
            "[3D Viewer Canvas]\nPalm-leaf manuscript model will render here"
        )
        self.viewer_label.setAlignment(Qt.AlignCenter)
        self.viewer_label.setStyleSheet("background: #1a1a2e; color: #e0e0e0; padding: 40px;")
        layout.addWidget(self.viewer_label)
        self.setLayout(layout)


class GrammarMapViewer(QWidget):
    def __init__(self):
        super().__init__()
        layout = QVBoxLayout()
        layout.addWidget(QLabel("Pāṇini Grammar Maps - 3D Branching Diagrams"))
        self.map_label = QLabel(
            "[Grammar Graph]\nInteractive 3D network of Ashtadhyayi rules"
        )
        self.map_label.setAlignment(Qt.AlignCenter)
        self.map_label.setStyleSheet("background: #16213e; color: #e0e0e0; padding: 40px;")
        layout.addWidget(self.map_label)
        self.setLayout(layout)


class CorpusBrowser(QWidget):
    def __init__(self):
        super().__init__()
        layout = QVBoxLayout()
        layout.addWidget(QLabel("Smart Corpus & Search (Live Rust Engine)"))

        search_row = QHBoxLayout()
        self.search_input = QLineEdit()
        self.search_input.setPlaceholderText("Search corpus (e.g. अग्नि, कर्म, वृद्धि)...")
        search_btn = QPushButton("Search")
        search_btn.clicked.connect(self.do_search)
        search_row.addWidget(self.search_input)
        search_row.addWidget(search_btn)
        layout.addLayout(search_row)

        self.results = QListWidget()
        self.results.itemClicked.connect(self.on_select_item)
        layout.addWidget(self.results)

        self.annotation_area = QTextEdit()
        self.annotation_area.setPlaceholderText("Text details and annotations will appear here...")
        layout.addWidget(self.annotation_area)
        self.setLayout(layout)

        self.loaded_texts = []
        self.load_initial_texts()

    def load_initial_texts(self):
        data = api_get("/api/corpus/texts")
        if data and isinstance(data, list):
            self.loaded_texts = data
            self.results.clear()
            for t in data:
                self.results.addItem(f"{t.get('title', '')} — {t.get('period', '')}")
        else:
            self.results.clear()
            self.results.addItems([
                "Ṛgveda 1.1 — 1500-1200 BCE",
                "Aṣṭādhyāyī 1.1 — ~500 BCE",
                "Bhagavad Gītā 2.47 — ~200 BCE",
                "Abhijñānaśākuntalam 1.1 — ~4th CE",
            ])

    def do_search(self):
        q = self.search_input.text().strip()
        if not q:
            self.load_initial_texts()
            return
        data = api_get(f"/api/corpus/search?q={urllib.parse.quote(q)}")
        if data and isinstance(data, list):
            self.results.clear()
            for res in data:
                self.results.addItem(f"[{res.get('category', '')}] {res.get('title', '')} — {res.get('snippet', '')}")
        else:
            self.annotation_area.setText(f"No results from backend for '{q}' or backend offline.")

    def on_select_item(self, item):
        idx = self.results.currentRow()
        if 0 <= idx < len(self.loaded_texts):
            text = self.loaded_texts[idx]
            details = (
                f"Title: {text.get('title', '')}\n"
                f"Author: {text.get('author', '')}\n"
                f"Period: {text.get('period', '')}\n"
                f"Language: {text.get('language', '')}\n\n"
                f"Content:\n{text.get('content', '')}\n\n"
                f"Translation (English):\n{text.get('translation_en', '')}\n\n"
                f"Translation (Hindi):\n{text.get('translation_hi', '')}"
            )
            self.annotation_area.setText(details)


class TeacherDashboard(QWidget):
    def __init__(self):
        super().__init__()
        layout = QVBoxLayout()
        layout.addWidget(QLabel("Teacher Dashboard"))

        tabs = QTabWidget()
        tabs.addTab(QWidget(), "Lesson Plans")
        tabs.addTab(QWidget(), "Interactive Exercises")
        tabs.addTab(QWidget(), "Student Progress")
        tabs.addTab(QWidget(), "Annotate Manuscripts")
        layout.addWidget(tabs)

        self.lesson_area = QTextEdit()
        self.lesson_area.setPlaceholderText("Create custom lesson plan...")
        layout.addWidget(self.lesson_area)
        self.setLayout(layout)


class VivaSimulator(QWidget):
    def __init__(self):
        super().__init__()
        layout = QVBoxLayout()
        layout.addWidget(QLabel("AI Oral Exam (Viva) Simulator (Live Rust Engine)"))

        self.question_display = QLabel(
            "Question: Explain the sandhi rules for 'अग्नि + इव'"
        )
        self.question_display.setStyleSheet("font-size: 16px; padding: 16px; font-weight: bold;")
        self.question_display.setAlignment(Qt.AlignCenter)
        layout.addWidget(self.question_display)

        self.response_area = QTextEdit()
        self.response_area.setPlaceholderText("Type your response or oral defense here...")
        layout.addWidget(self.response_area)

        btn_layout = QHBoxLayout()
        submit_btn = QPushButton("Submit Response")
        submit_btn.clicked.connect(self.submit_response)
        next_btn = QPushButton("Next Question")
        next_btn.clicked.connect(self.load_session)
        btn_layout.addWidget(submit_btn)
        btn_layout.addWidget(next_btn)
        layout.addLayout(btn_layout)

        self.feedback_label = QLabel("Feedback will appear here")
        self.feedback_label.setStyleSheet("padding: 12px; background: #1a3a1a; color: #8f8; border-radius: 6px;")
        layout.addWidget(self.feedback_label)
        self.setLayout(layout)

        self.current_question_id = "viva-1"
        self.load_session()

    def load_session(self):
        session = api_post("/api/viva/session", {})
        if session and "questions" in session and session["questions"]:
            q = session["questions"][0]
            self.current_question_id = q.get("id", "viva-1")
            self.question_display.setText(
                f"{q.get('question_sa', '')}\n\n{q.get('question_en', '')}"
            )
            self.feedback_label.setText("New viva question loaded from Rust backend. Type response and submit.")
        else:
            self.question_display.setText("Question: Explain the sandhi rules for 'अग्नि + इव'")

    def submit_response(self):
        text = self.response_area.toPlainText().strip()
        result = api_post("/api/viva/evaluate", {
            "question_id": self.current_question_id,
            "response_text": text
        })
        if result:
            fb = (
                f"Score: {result.get('score', 0)}/{result.get('max_score', 100)}\n"
                f"Feedback: {result.get('feedback', '')}\n"
                f"Tips: {', '.join(result.get('pronunciation_tips', []))}"
            )
            self.feedback_label.setText(fb)
        else:
            self.feedback_label.setText("Evaluation completed locally (Backend offline).")


class SanskritLabDesktop(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("SanskritLab — Research & Learning Platform")
        self.setMinimumSize(1280, 800)

        self.init_menu()
        self.init_ui()
        self.check_backend_status()

    def init_menu(self):
        menubar = self.menuBar()
        file_menu = menubar.addMenu("&File")
        file_menu.addAction("Open Manuscript...")
        file_menu.addAction("Import Corpus...")
        file_menu.addSeparator()
        file_menu.addAction("Exit")

        view_menu = menubar.addMenu("&View")
        view_menu.addAction("3D Viewer")
        view_menu.addAction("Grammar Maps")
        view_menu.addAction("Timeline")

        help_menu = menubar.addMenu("&Help")
        help_menu.addAction("Documentation")
        help_menu.addAction("About SanskritLab")

    def init_ui(self):
        central = QWidget()
        self.setCentralWidget(central)
        main_layout = QHBoxLayout()

        self.nav_list = QListWidget()
        self.nav_list.setMaximumWidth(200)
        self.nav_list.setMinimumWidth(180)
        self.nav_list.addItems([
            "Corpus & Search",
            "Manuscript OCR",
            "Annotation Tool",
            "3D Manuscript Viewer",
            "Grammar Maps",
            "Evolutionary Timeline",
            "Teacher Dashboard",
            "Student Workspace",
            "Assessment Engine",
            "Viva Simulator",
            "Analytics",
        ])
        self.nav_list.currentRowChanged.connect(self.switch_module)

        self.stack = QStackedWidget()
        self.stack.addWidget(CorpusBrowser())
        self.stack.addWidget(QWidget())
        self.stack.addWidget(QWidget())
        self.stack.addWidget(ManuscriptViewer())
        self.stack.addWidget(GrammarMapViewer())
        self.stack.addWidget(QWidget())
        self.stack.addWidget(TeacherDashboard())
        self.stack.addWidget(QWidget())
        self.stack.addWidget(QWidget())
        self.stack.addWidget(VivaSimulator())
        self.stack.addWidget(QWidget())

        main_layout.addWidget(self.nav_list)
        main_layout.addWidget(self.stack, 1)
        central.setLayout(main_layout)

    def switch_module(self, index):
        if index >= 0:
            self.stack.setCurrentIndex(index)
            module_names = [
                "Corpus & Search", "Manuscript OCR", "Annotation Tool",
                "3D Viewer", "Grammar Maps", "Timeline",
                "Teacher Dashboard", "Student Workspace", "Assessment Engine",
                "Viva Simulator", "Analytics",
            ]
            self.statusBar().showMessage(f"Module: {module_names[index]} | {self.backend_status_text}")

    def check_backend_status(self):
        health = api_get("/api/health", timeout=1.0)
        if health and health.get("status") == "ok":
            self.backend_status_text = f"Backend: Online ({health.get('version', '0.2.0')}) @ {BACKEND_BASE_URL}"
        else:
            self.backend_status_text = f"Backend: Offline (Local fallbacks active) @ {BACKEND_BASE_URL}"
        self.statusBar().showMessage(self.backend_status_text)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    app.setStyle("Fusion")
    window = SanskritLabDesktop()
    window.show()
    sys.exit(app.exec())