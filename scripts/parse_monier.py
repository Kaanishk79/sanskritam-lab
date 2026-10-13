#!/usr/bin/env python3
"""
parse_monier.py
Parses the Cologne Digital Sanskrit Dictionaries Monier-Williams (1899) data (mw.txt)
into client-side JSON (client/src/data/monier_core.json) and database seed scripts.

Extracts comprehensive, high-quality entries across ALL Sanskrit letters (vowels and consonants)
with Devanagari, IAST transliteration, part-of-speech, and curated English meanings.
"""

import os
import re
import sys
import json

# SLP1 (Sanskrit Library Phonetic) to Devanagari mapping
SLP1_VOWELS = {
    'a': 'अ', 'A': 'आ', 'i': 'इ', 'I': 'ई', 'u': 'उ', 'U': 'ऊ',
    'f': 'ऋ', 'F': 'ॠ', 'x': 'ऌ', 'X': 'ॡ', 'e': 'ए', 'E': 'ऐ', 'ai': 'ऐ',
    'o': 'ओ', 'O': 'औ', 'au': 'औ'
}

SLP1_MATRAS = {
    'a': '', 'A': 'ा', 'i': 'ि', 'I': 'ी', 'u': 'ु', 'U': 'ू',
    'f': 'ृ', 'F': 'ॄ', 'x': 'ॢ', 'X': 'ॣ', 'e': 'े', 'E': 'ै', 'ai': 'ै',
    'o': 'ो', 'O': 'ौ', 'au': 'ौ'
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
    'E': 'ai', 'O': 'au',
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
    t = re.sub(r'^\s*[a-zA-Z/~\\^—\s]+?\s+(?:mf\([^)]*\)\s*n?\.?|mfn\.?|m\.|f\.|n\.|ind\.|indecl\.|adj\.|cl\.\s*\d+\.?|adv\.)\s*', '', t)
    # Remove XML tags
    t = re.sub(r'<[^>]+>', ' ', t)
    t = re.sub(r'¦', ' ', t)
    # Remove Vedic accents and root marks
    t = re.sub(r'[\/\\\^~√]', '', t)
    # Remove source abbreviations
    t = re.sub(r'\b(L|MBh|R|TS|AV|RV|ŚBr|Mn|Raghu|Megh|Hit|Pañcat|Kathās|BhP|VP|Daś)\.\s*', '', t)
    # Remove grammar abbreviations
    t = re.sub(r'\b(mfn|m|f|n|ind|indecl|cl\s*\d+|P|Ā|pass|caus|desid|perf|fut|gen|dat|acc|loc|instr|abl|voc)\.\s*', '', t)
    t = re.sub(r'—+', ' ', t)
    # Strip leading etymological or grammatical parentheses repeatedly: ( fr. kf ), ( A m. )
    for _ in range(5):
        subbed = re.sub(r'^\s*\([^\)]*\)\s*[,;]?\s*', '', t)
        if subbed == t:
            break
        t = subbed
    # Collapse multiple spaces
    t = re.sub(r'\s+', ' ', t).strip()
    t = re.sub(r'^[.,;:\-\s]+', '', t)
    return t

def is_junk_meaning(m):
    low = m.lower().strip()
    if len(low) < 3:
        return True
    if re.match(r'^[\d\.\,\s\(\)\-]+$', low):
        return True
    if any(k in low for k in ['see p', 'see under', 'see below', 'see above', 'cf.', 'q.v.', '&c', 'ss.vv', 'ib.', 'opposed to']):
        return True
    if re.match(r'^(?:or|and|also|in comp|fr\.|viz\.|id\.|mf\b|mfn\b|comp\.|superl\.)\b', low):
        return True
    return False

def clean_meaning_snippet(text):
    t = text
    t = re.sub(r'^(?:mf\([^)]*\)\s*n?\.?|mfn\.?|m\.|f\.|n\.|ind\.|indecl\.|adj\.|adv\.)\s*', '', t, flags=re.I)
    t = re.sub(r'^\s*\(.*?\)\s*', '', t)
    t = re.sub(r'^\s*(?:cf\.|see|comp\.|superl\.|once|esp\.)\s+[^;,\.]+[;,\.]?\s*', '', t, flags=re.I)
    t = re.sub(r'^[.,;:\-\s]+', '', t)
    t = re.sub(r'\s+', ' ', t).strip()
    return t

def parse_mw(mw_path):
    print(f"Reading {mw_path} across all letters...")
    words_map = {}

    with open(mw_path, 'r', encoding='utf-8', errors='ignore') as f:
        current_k1 = None
        current_lines = []
        is_primary = False

        for line in f:
            line_str = line.strip()
            if line_str.startswith("<L>"):
                m = re.search(r'<k1>([^<]+)', line_str)
                current_k1 = m.group(1).strip() if m else None
                # Check for primary or compound entry
                is_primary = ('<e>1' in line_str or '<e>2' in line_str)
                current_lines = []
            elif line_str == "<LEND>":
                if current_k1 and is_primary and current_lines:
                    clean_k1 = re.sub(r'[\d/\\^~_]', '', current_k1)
                    if clean_k1 and len(clean_k1) > 1:
                        body = " ".join(current_lines)
                        clean_def = clean_definition(body)

                        # Filter out empty or pure cross references
                        is_pure_ref = any(k in clean_def.lower() for k in ['see pp.', 'see under', '&c. see p'])
                        if len(clean_def) >= 4 and not is_pure_ref:
                            # Extract POS
                            pos = "noun"
                            if "m." in body or "n." in body or "f." in body:
                                pos = "noun"
                            elif "cl." in body or "Pass." in body or "Caus." in body or "Desid." in body:
                                pos = "verb"
                            elif "ind." in body or "indecl." in body:
                                pos = "indeclinable"
                            elif "adj." in body:
                                pos = "adjective"

                            # Extract concise meanings
                            parts = [s.strip() for s in re.split(r'[;,]\s+', clean_def[:320])]
                            meanings = []
                            seen_m = set()
                            for p in parts:
                                p_clean = clean_meaning_snippet(p)
                                if len(p_clean) >= 3 and not re.match(r'^[a-z]{1,2}$', p_clean):
                                    if not is_junk_meaning(p_clean):
                                        low = p_clean.lower()
                                        if low not in seen_m:
                                            seen_m.add(low)
                                            meanings.append(p_clean)
                                if len(meanings) >= 5:
                                    break

                            if meanings:
                                dev = slp1_to_devanagari(clean_k1)
                                if dev and len(dev) >= 2:
                                    if clean_k1 not in words_map:
                                        words_map[clean_k1] = {
                                            "word": dev,
                                            "iast": slp1_to_iast(clean_k1),
                                            "pos": pos,
                                            "meanings": meanings,
                                            "raw_def": clean_def[:180]
                                        }
                                    else:
                                        existing = words_map[clean_k1]
                                        # If existing had poor or junk meanings, replace
                                        if any(is_junk_meaning(x) for x in existing["meanings"]):
                                            existing["meanings"] = meanings
                                            existing["raw_def"] = clean_def[:180]
                                        else:
                                            # Enrich existing meanings
                                            if len(clean_def) > len(existing["raw_def"]) + 20:
                                                existing["raw_def"] = clean_def[:180]
                                            for m in meanings:
                                                if len(existing["meanings"]) < 6 and m.lower() not in [x.lower() for x in existing["meanings"]]:
                                                    existing["meanings"].append(m)

                current_k1 = None
                current_lines = []
            else:
                if current_k1:
                    current_lines.append(line_str)

    # Ensure key canonical Sanskrit terms are explicitly covered with rich definitions
    canonical_enrichments = {
        "karma": {
            "word": "कर्म",
            "iast": "karma",
            "pos": "noun",
            "meanings": ["action", "work", "deed", "duty", "moral consequence"],
            "raw_def": "act, action, work, deed, religious rite, duty, karma"
        },
        "karman": {
            "word": "कर्मन्",
            "iast": "karman",
            "pos": "noun",
            "meanings": ["act", "action", "work", "performance", "duty"],
            "raw_def": "act, action, performance, business, office, special duty, activity, work"
        },
        "rAma": {
            "word": "राम",
            "iast": "rāma",
            "pos": "noun",
            "meanings": ["pleasing", "charming", "lovely", "beautiful", "N. of Rāma (hero of Rāmāyaṇa)"],
            "raw_def": "pleasing, pleasant, charming, lovely, beautiful, joy, delight; N. of celebrated hero Rāma"
        },
        "yoga": {
            "word": "योग",
            "iast": "yoga",
            "pos": "noun",
            "meanings": ["union", "joining", "application", "meditation", "Yoga philosophy system"],
            "raw_def": "the act of yoking, joining, union, connection; application or concentration of thoughts, meditation, Yoga"
        },
        "pustaka": {
            "word": "पुस्तक",
            "iast": "pustaka",
            "pos": "noun",
            "meanings": ["manuscript", "book", "treatise", "volume"],
            "raw_def": "a manuscript, book, booklet, written work, treatise"
        },
        "guru": {
            "word": "गुरु",
            "iast": "guru",
            "pos": "noun",
            "meanings": ["spiritual preceptor", "teacher", "venerable person", "heavy", "weighty"],
            "raw_def": "a spiritual parent or preceptor, teacher, instructor in the Śāstras; venerable, weighty"
        },
        "vidyA": {
            "word": "विद्या",
            "iast": "vidyā",
            "pos": "noun",
            "meanings": ["knowledge", "learning", "science", "scholarship", "philosophy"],
            "raw_def": "knowledge, science, learning, scholarship, philosophy; spiritual wisdom"
        },
        "jYAna": {
            "word": "ज्ञान",
            "iast": "jñāna",
            "pos": "noun",
            "meanings": ["knowledge", "higher knowledge", "wisdom", "cognition", "awareness"],
            "raw_def": "knowing, becoming acquainted with, knowledge, higher knowledge derived from meditation"
        },
        "Darma": {
            "word": "धर्म",
            "iast": "dharma",
            "pos": "noun",
            "meanings": ["righteousness", "moral duty", "virtue", "law", "nature / essential quality"],
            "raw_def": "that which is established, steadfast decree, statute, ordinance, law, virtue, morality, duty"
        },
        "satya": {
            "word": "सत्य",
            "iast": "satya",
            "pos": "noun",
            "meanings": ["truth", "reality", "true", "real", "genuine"],
            "raw_def": "true, real, actual, genuine, sincere, honest; truth, reality"
        },
        "kfzRa": {
            "word": "कृष्ण",
            "iast": "kṛṣṇa",
            "pos": "noun",
            "meanings": ["N. of celebrated Avatār Kṛṣṇa", "dark", "black", "all-attractive"],
            "raw_def": "black, dark; N. of a celebrated Avatār of Viṣṇu, son of Vasudeva and Devakī"
        },
        "Siva": {
            "word": "शिव",
            "iast": "śiva",
            "pos": "noun",
            "meanings": ["auspicious", "propitious", "gracious", "benevolent", "N. of Lord Śiva"],
            "raw_def": "auspicious, propitious, gracious, favourable, benign, kind; N. of the deity Śiva"
        }
    }

    for k, v in canonical_enrichments.items():
        words_map[k] = v

    entries = list(words_map.values())
    entries.sort(key=lambda x: x["iast"].lower())
    print(f"Extracted {len(entries)} comprehensive entries spanning entire alphabet.")
    return entries

def main():
    mw_path = "Assets/Dictionary/txt/mw.txt"
    if not os.path.exists(mw_path):
        print(f"Error: {mw_path} not found.")
        sys.exit(1)

    entries = parse_mw(mw_path)

    # Save to client/src/data/monier_core.json
    out_json = "client/src/data/monier_core.json"
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(entries, f, ensure_ascii=False, separators=(',', ':'))
    print(f"Saved {out_json} ({os.path.getsize(out_json) / (1024 * 1024):.2f} MB)")

    # Generate a database seed SQL sample
    out_sql = "database/seed_monier_sample.sql"
    with open(out_sql, "w", encoding="utf-8") as f:
        f.write("-- Monier-Williams Sanskrit Dictionary Seed (Sample Core)\n")
        f.write("INSERT INTO public.dictionary (word, pos, meanings) VALUES\n")
        rows = []
        for e in entries[:1000]: # top 1000 for lightweight SQL seed
            w = e["word"].replace("'", "''")
            pos = e["pos"].replace("'", "''")
            meanings_str = '{"' + '", "'.join([m.replace('"', '\\"').replace("'", "''") for m in e["meanings"]]) + '"}'
            rows.append(f"  ('{w}', '{pos}', '{meanings_str}')")
        f.write(",\n".join(rows))
        f.write("\nON CONFLICT DO NOTHING;\n")
    print(f"Saved {out_sql}")

if __name__ == "__main__":
    main()
