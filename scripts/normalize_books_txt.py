"""
Sanskrit Books Text Normalizer
Cleans and normalizes all 82 NCERT Sanskrit textbook chapter files in client/public/books-data and Assets/Books_TXT.
Fixes:
- Split Repha (वर ण्ाः -> वर्णाः, सर व् -> सर्व)
- Split Halants (स्वराणाम ् -> स्वराणाम्)
- Split Matras (त ु -> तु, ण े -> णे)
- Split Anusvara / Chandrabindu (ण ं -> णं)
- InDesign layout export artifacts (.indd, Reprint, Rationalised)
- Hyphenated / chopped word linebreaks
- Canonical Unicode NFC normalization
"""

import os
import re
import unicodedata
import sys

sys.stdout.reconfigure(encoding='utf-8')

def fix_repha(text):
    pattern = r'([\u0900-\u094C\u094E-\u097F])र\s+([\u0915-\u0939])्([ािीुूृॄेैोौंःँ]?)'
    def repl(m):
        prefix = m.group(1)
        target_cons = m.group(2)
        trailing = m.group(3) if m.group(3) else ""
        return f"{prefix}र्{target_cons}{trailing}"
    return re.sub(pattern, repl, text)

def normalize_text(raw_text):
    # 1. Remove InDesign printer/export headers and metadata lines
    lines = raw_text.split("\n")
    cleaned_lines = []
    for line in lines:
        trimmed = line.strip()
        if not trimmed:
            cleaned_lines.append("")
            continue
        if re.search(r'Reprint\s+\d{4}-\d{2}', trimmed, re.IGNORECASE):
            continue
        if re.search(r'\.indd\s+\d+', trimmed, re.IGNORECASE):
            continue
        if re.search(r'Rationalised\s+\d{4}-\d{2}', trimmed, re.IGNORECASE):
            continue
        if re.match(r'^\d{1,3}\s*$', trimmed): # standalone page numbers
            continue
        cleaned_lines.append(line)
    text = "\n".join(cleaned_lines)

    # 2. Normalize whitespace artifacts
    text = text.replace('\t', ' ') # tabs to spaces
    text = text.replace('\u2009', '') # thin space
    text = text.replace('\u200a', '') # hair space
    text = text.replace('\u200b', '') # zero width space
    text = text.replace('\u00a0', ' ') # non-breaking space

    # 3. Fix split repha
    text = fix_repha(text)

    # 4. Reconnect broken word linebreaks
    # consonant + halant + newline + consonant
    text = re.sub(r'([\u0900-\u097F]्)\n\s*([\u0900-\u097F])', r'\1\2', text)
    # letter + newline + matra/diacritic
    text = re.sub(r'([\u0900-\u097F])\n\s*([ािीुूृॄेैोौ्ंःँ])', r'\1\2', text)

    # 5. Fix split halants
    # letter + space + halant -> letter + halant
    text = re.sub(r'([\u0900-\u097F])\s+्', r'\1्', text)
    # halant + space + letter -> halant + letter
    text = re.sub(r'्\s+([\u0900-\u097F])', r'्\1', text)

    # 6. Fix split matras (vowel signs)
    text = re.sub(r'([\u0900-\u097F])\s+([ािीुूृॄेैोौ])', r'\1\2', text)

    # 7. Fix split anusvara / visarga / chandrabindu
    text = re.sub(r'([\u0900-\u097F])\s+([ंःँ])', r'\1\2', text)
    text = re.sub(r'\s+([ंःँ])([\u0900-\u097F])', r'\1\2', text)

    # 8. Clean up multiple spaces and excessive blank lines
    text = re.sub(r'[ \t]{2,}', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)

    # 9. Unicode NFC canonical normalization
    text = unicodedata.normalize('NFC', text)

    return text.strip()

def process_directory(target_dir):
    print(f"Normalizing files in: {target_dir}")
    file_count = 0
    fixed_count = 0

    for root, dirs, files in os.walk(target_dir):
        for f in files:
            if f.endswith(".txt"):
                file_count += 1
                fpath = os.path.join(root, f)
                with open(fpath, "r", encoding="utf-8", errors="ignore") as fp:
                    original = fp.read()

                normalized = normalize_text(original)

                if normalized != original:
                    fixed_count += 1
                    with open(fpath, "w", encoding="utf-8") as fp:
                        fp.write(normalized)

    print(f"Processed {file_count} files ({fixed_count} files normalized and saved).")

def main():
    dirs = [
        "client/public/books-data",
        "Assets/Books_TXT"
    ]
    for d in dirs:
        if os.path.exists(d):
            process_directory(d)
        else:
            print(f"Directory {d} does not exist, skipping.")

if __name__ == "__main__":
    main()
