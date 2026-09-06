"""
Parser for Cologne Monier-Williams Sanskrit Dictionary (mw.txt)
Extracts headwords, converts SLP1 to Unicode Devanagari and IAST,
cleans definitions, and generates:
1. client/src/data/monier_core.json (top ~6,000 common words for client offline search)
2. database/seed_monier_sample.sql (SQL insert for Supabase dictionary table)
"""

import os
import re
import json
import sys

# SLP1 Transliteration Maps
SLP1_VOWELS = {
    'a': 'अ', 'A': 'आ', 'i': 'इ', 'I': 'ई', 'u': 'उ', 'U': 'ऊ',
    'f': 'ऋ', 'F': 'ॠ', 'x': 'ऌ', 'X': 'ॡ', 'e': 'ए', 'ai': 'ऐ',
    'o': 'ओ', 'au': 'औ'
}

SLP1_MATRAS = {
    'a': '', 'A': 'ा', 'i': 'ि', 'I': 'ी', 'u': 'ु', 'U': 'ू',
    'f': 'ृ', 'F': 'ॄ', 'x': 'ॢ', 'X': 'ॣ', 'e': 'े', 'ai': 'ै',
    'o': 'ो', 'au': 'ौ'
}

SLP1_CONSONANTS = {
    'k': 'क', 'K': 'ख', 'g': 'ग', 'G': 'घ', 'N': 'ङ',
    'c': 'च', 'C': 'छ', 'j': 'ज', 'J': 'झ', 'Y': 'ञ',
    'w': 'ट', 'W': 'ठ', 'q': 'ड', 'Q': 'ढ', 'R': 'ण',
    't': 'त', 'T': 'थ', 'd': 'द', 'D': 'ध', 'n': 'न',
    'p': 'प', 'P': 'फ', 'b': 'ब', 'B': 'भ', 'm': 'म',
    'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व',
    'S': 'श', 'z': 'ष', 's': 'स', 'h': 'ह'
}

SLP1_OTHER = {
    'M': 'ं', 'H': 'ः', '~': 'ँ', "'": 'ऽ'
}

SLP1_TO_IAST = {
    'A': 'ā', 'I': 'ī', 'U': 'ū', 'f': 'ṛ', 'F': 'ṝ', 'x': 'ḷ', 'X': 'ḹ',
    'N': 'ṅ', 'Y': 'ñ', 'w': 'ṭ', 'W': 'ṭh', 'q': 'ḍ', 'Q': 'ḍh', 'R': 'ṇ',
    'S': 'ś', 'z': 'ṣ', 'M': 'ṃ', 'H': 'ḥ', 'K': 'kh', 'G': 'gh', 'C': 'ch',
    'J': 'jh', 'T': 'th', 'D': 'dh', 'P': 'ph', 'B': 'bh', "'": "'"
}

def slp1_to_iast(text):
    out = []
    i = 0
    n = len(text)
    while i < n:
        if i + 1 < n and text[i:i+2] in ('ai', 'au'):
            out.append(text[i:i+2])
            i += 2
        elif text[i] in SLP1_TO_IAST:
            out.append(SLP1_TO_IAST[text[i]])
            i += 1
        else:
            out.append(text[i])
            i += 1
    return "".join(out)

def slp1_to_devanagari(text):
    out = []
    i = 0
    n = len(text)
    prev_consonant = False

    while i < n:
        # Check diphthongs
        ch2 = text[i:i+2] if i + 1 < n else ""
        if ch2 in ('ai', 'au'):
            if prev_consonant:
                out.append(SLP1_MATRAS[ch2])
                prev_consonant = False
            else:
                out.append(SLP1_VOWELS[ch2])
            i += 2
            continue

        ch = text[i]

        # Vowels
        if ch in SLP1_VOWELS:
            if prev_consonant:
                matra = SLP1_MATRAS[ch]
                if matra:
                    out.append(matra)
                prev_consonant = False
            else:
                out.append(SLP1_VOWELS[ch])
            i += 1
            continue

        # If previous was consonant and current is another consonant, add virama
        if prev_consonant:
            out.append('्')
            prev_consonant = False

        # Consonants
        if ch in SLP1_CONSONANTS:
            out.append(SLP1_CONSONANTS[ch])
            prev_consonant = True
            i += 1
            continue

        # Modifiers
        if ch in SLP1_OTHER:
            out.append(SLP1_OTHER[ch])
            i += 1
            continue

        out.append(ch)
        i += 1

    if prev_consonant:
        out.append('्')

    return "".join(out)

def clean_definition(body):
    # Strip leading headword repetition and gender/grammatical markers
    t = re.sub(r'^\s*<[^>]+>[^<]*</[^>]+>', '', body)
    t = re.sub(r'^\s*[a-zA-Z/~\\^—\s]+?\s+(?:m\.|f\.|n\.|mf\([^\)]*\)n\.|mfn\.|ind\.|indecl\.|adj\.|cl\.\s*\d+\.?|adv\.)\s*', '', t)
    # Remove XML tags
    t = re.sub(r'<[^>]+>', ' ', t)
    t = re.sub(r'¦', ' ', t)
    # Remove Vedic accents and root marks
    t = re.sub(r'[\/\\\^~√]', '', t)
    # Remove source abbreviations
    t = re.sub(r'\b(L|MBh|R|TS|AV|RV|ŚBr|Mn|Raghu|Megh|Hit|Pañcat|Kathās|BhP|VP|Daś)\.\s*', '', t)
    # Remove grammar abbreviations
    t = re.sub(r'\b(mfn|m|f|n|ind|indecl|cl\s*\d+|P|Ā|pass|caus|desid|perf|fut|gen|dat|acc|loc|instr|abl|voc)\.\s*', '', t)
    # Remove etymological parentheses
    t = re.sub(r'\([^\)]*fr\.[^\)]*\)', '', t)
    t = re.sub(r'—+', ' ', t)
    # Collapse multiple spaces
    t = re.sub(r'\s+', ' ', t).strip()
    t = re.sub(r'^[.,;:\-\s]+', '', t)
    return t

def parse_mw(mw_path, max_core=7500):
    print(f"Reading {mw_path}...")
    core_entries = []
    seen_words = set()

    with open(mw_path, 'r', encoding='utf-8', errors='ignore') as f:
        current_k1 = None
        current_lines = []
        count = 0

        for line in f:
            line_str = line.strip()
            if line_str.startswith("<L>"):
                # Extract k1
                m = re.search(r'<k1>([^<]+)', line_str)
                if m:
                    current_k1 = m.group(1).strip()
                current_lines = []
            elif line_str == "<LEND>":
                if current_k1 and current_lines:
                    body = " ".join(current_lines)
                    clean_def = clean_definition(body)

                    # Extract POS if available
                    pos = "noun"
                    if "m." in body or "n." in body or "f." in body:
                        pos = "noun"
                    elif "cl." in body or "Pass." in body or "Caus." in body or "Desid." in body:
                        pos = "verb"
                    elif "ind." in body or "indecl." in body:
                        pos = "indeclinable"
                    elif "adj." in body:
                        pos = "adjective"

                    # Convert to Devanagari and IAST
                    # Strip trailing digits / accents from key
                    clean_k1 = re.sub(r'[\d/\\^~_]', '', current_k1)
                    if clean_k1 and len(clean_k1) > 1 and clean_k1 not in seen_words:
                        dev = slp1_to_devanagari(clean_k1)
                        # Filter out invalid or malformed
                        if dev and len(dev) >= 2 and len(clean_def) >= 4:
                            parts = [s.strip() for s in re.split(r'[;,]\s+', clean_def[:250])]
                            meanings = []
                            for p in parts:
                                p_clean = re.sub(r'^[.,;:\-\s]+', '', p).strip()
                                if len(p_clean) >= 3 and not re.match(r'^[a-z]{1,2}$', p_clean):
                                    meanings.append(p_clean)
                                if len(meanings) >= 4:
                                    break

                            if meanings:
                                seen_words.add(clean_k1)
                                entry = {
                                    "word": dev,
                                    "iast": slp1_to_iast(clean_k1),
                                    "pos": pos,
                                    "meanings": meanings,
                                    "raw_def": clean_def[:180]
                                }
                                core_entries.append(entry)
                                count += 1
                                if count >= max_core:
                                    break

                    current_k1 = None
                    current_lines = []
            else:
                if current_k1:
                    current_lines.append(line_str)

    print(f"Parsed {len(core_entries)} high-quality dictionary entries.")
    return core_entries

def main():
    mw_path = "Assets/Dictionary/txt/mw.txt"
    if not os.path.exists(mw_path):
        print(f"Error: {mw_path} not found.")
        sys.exit(1)

    entries = parse_mw(mw_path, max_core=7000)

    # Save to client/src/data/monier_core.json
    out_json = "client/src/data/monier_core.json"
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(entries, f, ensure_ascii=False, indent=2)
    print(f"Saved {out_json} ({os.path.getsize(out_json) / 1024:.1f} KB)")

    # Generate a database seed SQL sample
    out_sql = "database/seed_monier_sample.sql"
    with open(out_sql, "w", encoding="utf-8") as f:
        f.write("-- Monier-Williams Sanskrit Dictionary Seed (Sample Core)\n")
        f.write("INSERT INTO public.dictionary (word, pos, meanings) VALUES\n")
        rows = []
        for e in entries[:500]: # top 500 for lightweight SQL seed
            w = e["word"].replace("'", "''")
            pos = e["pos"].replace("'", "''")
            meanings_str = '{"' + '", "'.join([m.replace('"', '\\"').replace("'", "''") for m in e["meanings"]]) + '"}'
            rows.append(f"  ('{w}', '{pos}', '{meanings_str}')")
        f.write(",\n".join(rows))
        f.write("\nON CONFLICT DO NOTHING;\n")
    print(f"Saved {out_sql}")

if __name__ == "__main__":
    main()
