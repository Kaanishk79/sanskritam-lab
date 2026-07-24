import sys
import json
import os
from pathlib import Path

try:
    from PySide6.QtWidgets import (
        QApplication, QMainWindow, QWidget, QVBoxLayout, QHBoxLayout,
        QPushButton, QStackedWidget, QLabel, QListWidget, QSplitter,
        QTextEdit, QTreeWidget, QMenuBar, QMenu, QStatusBar, QTabWidget,
        QMessageBox
    )
    from PySide6.QtCore import Qt, QSize
    from PySide6.QtGui import QAction, QFont, QIcon
except ImportError:
    print("PySide6 not installed. Install with: pip install PySide6")
    sys.exit(1)


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
        layout.addWidget(QLabel("Smart Corpus & Search"))

        self.search_input = QTextEdit()
        self.search_input.setPlaceholderText("Search texts...")
        self.search_input.setMaximumHeight(60)
        layout.addWidget(self.search_input)

        self.results = QListWidget()
        self.results.addItems([
            "Ṛgveda 1.1 — 1500-1200 BCE",
            "Aṣṭādhyāyī 1.1 — ~500 BCE",
            "Bhagavad Gītā 2.47 — ~200 BCE",
            "Abhijñānaśākuntalam 1.1 — ~4th CE",
        ])
        layout.addWidget(self.results)

        self.annotation_area = QTextEdit()
        self.annotation_area.setPlaceholderText("Add layered annotations here...")
        layout.addWidget(self.annotation_area)
        self.setLayout(layout)


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
        layout.addWidget(QLabel("AI Oral Exam (Viva) Simulator"))

        self.question_display = QLabel(
            "Question: Explain the sandhi rules for 'अग्नि + इव'"
        )
        self.question_display.setStyleSheet("font-size: 18px; padding: 20px;")
        self.question_display.setAlignment(Qt.AlignCenter)
        layout.addWidget(self.question_display)

        self.response_area = QTextEdit()
        self.response_area.setPlaceholderText("Type your response or use speech input...")
        layout.addWidget(self.response_area)

        btn_layout = QHBoxLayout()
        btn_layout.addWidget(QPushButton("🎤 Start Recording"))
        btn_layout.addWidget(QPushButton("Submit Response"))
        btn_layout.addWidget(QPushButton("Next Question"))
        layout.addLayout(btn_layout)

        self.feedback_label = QLabel("Feedback will appear here")
        self.feedback_label.setStyleSheet("padding: 15px; background: #1a3a1a; color: #8f8;")
        layout.addWidget(self.feedback_label)
        self.setLayout(layout)


class SanskritLabDesktop(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("SanskritLab — Research & Learning Platform")
        self.setMinimumSize(1280, 800)

        self.init_menu()
        self.init_ui()
        self.statusBar().showMessage("Ready")

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
            "📚 Corpus & Search",
            "📄 Manuscript OCR",
            "🏛️ Annotation Tool",
            "🎨 3D Manuscript Viewer",
            "🌳 Grammar Maps",
            "📈 Evolutionary Timeline",
            "👨‍🏫 Teacher Dashboard",
            "🧑‍🎓 Student Workspace",
            "📝 Assessment Engine",
            "🎙️ Viva Simulator",
            "📊 Analytics",
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
            self.statusBar().showMessage(f"Module: {module_names[index]}")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    app.setStyle("Fusion")
    window = SanskritLabDesktop()
    window.show()
    sys.exit(app.exec())