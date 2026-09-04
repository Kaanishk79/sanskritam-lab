import { useState, useRef, useEffect } from "react";
import { Bot, User, Send, Keyboard, Lightbulb } from "lucide-react";
import { useKeyboard } from "../../context/KeyboardContext";
import { useLanguage } from "../../context/LanguageContext";
import { api } from "../../services/api";
const quickPrompts = [
  "What is the difference between \u0917\u0941\u0923 and \u0935\u0943\u0926\u094D\u0927\u093F sandhi?",
  "Explain the 8 cases with examples",
  "What are the 16 pad\u0101rthas of Ny\u0101ya?",
  "Tell me about K\u0101lid\u0101sa's works",
  "What does \u0924\u0924\u094D\u0924\u094D\u0935\u092E\u0938\u093F mean?",
  "Explain the 5 types of compounds"
];
const mockResponses = {
  "guna": "Gu\u1E47a sandhi occurs when \u0905/\u0906 combines with \u0907/\u0908 \u2192 \u090F, \u0905/\u0906 + \u0909/\u090A \u2192 \u0913, and \u0905/\u0906 + \u090B \u2192 \u0905\u0930\u094D.\n\nExample: \u0926\u0947\u0935 + \u0907\u0928\u094D\u0926\u094D\u0930\u0903 = \u0926\u0947\u0935\u0947\u0928\u094D\u0926\u094D\u0930\u0903 (deva + indra\u1E25 \u2192 devendra\u1E25).\n\nV\u1E5Bddhi sandhi is the stronger grade: \u0905/\u0906 + \u090F \u2192 \u0910, and \u0905/\u0906 + \u0913 \u2192 \u0914.\n\nExample: \u0938\u0926\u093E + \u090F\u0935 = \u0938\u0926\u0948\u0935 (sad\u0101 + eva \u2192 sadaiva).\n\nThe key difference is in the resulting vowel grade \u2014 Gu\u1E47a produces \u090F/\u0913/\u0905\u0930\u094D while V\u1E5Bddhi produces \u0910/\u0914.",
  "cases": "Sanskrit has 8 cases (\u0935\u093F\u092D\u0915\u094D\u0924\u092F\u0903) across 3 numbers (singular, dual, plural):\n\n1. \u092A\u094D\u0930\u0925\u092E\u093E (Nominative) \u2014 subject: \u0930\u093E\u092E\u0903 (R\u0101ma)\n2. \u0926\u094D\u0935\u093F\u0924\u0940\u092F\u093E (Accusative) \u2014 object: \u0930\u093E\u092E\u092E\u094D (R\u0101ma)\n3. \u0924\u0943\u0924\u0940\u092F\u093E (Instrumental) \u2014 by/with: \u0930\u093E\u092E\u0947\u0923 (by R\u0101ma)\n4. \u091A\u0924\u0941\u0930\u094D\u0925\u0940 (Dative) \u2014 to/for: \u0930\u093E\u092E\u093E\u092F (to R\u0101ma)\n5. \u092A\u091E\u094D\u091A\u092E\u0940 (Ablative) \u2014 from: \u0930\u093E\u092E\u093E\u0924\u094D (from R\u0101ma)\n6. \u0937\u0937\u094D\u0920\u0940 (Genitive) \u2014 of: \u0930\u093E\u092E\u0938\u094D\u092F (of R\u0101ma)\n7. \u0938\u092A\u094D\u0924\u092E\u0940 (Locative) \u2014 in/on: \u0930\u093E\u092E\u0947 (in R\u0101ma)\n8. \u0938\u092E\u094D\u092C\u094B\u0927\u0928 (Vocative) \u2014 O!: \u0939\u0947 \u0930\u093E\u092E (O R\u0101ma!)",
  "nyaya": "The 16 pad\u0101rthas (categories) of Ny\u0101ya philosophy per Ny\u0101ya S\u016Btra 1.1.1:\n\n1. \u092A\u094D\u0930\u092E\u093E\u0923 (Pram\u0101\u1E47a) \u2014 means of knowledge\n2. \u092A\u094D\u0930\u092E\u0947\u092F (Prameya) \u2014 objects of knowledge\n3. \u0938\u0902\u0936\u092F (Sa\u1E43\u015Baya) \u2014 doubt\n4. \u092A\u094D\u0930\u092F\u094B\u091C\u0928 (Prayojana) \u2014 purpose\n5. \u0926\u0943\u0937\u094D\u091F\u093E\u0928\u094D\u0924 (D\u1E5B\u1E63\u1E6D\u0101nta) \u2014 example\n6. \u0938\u093F\u0926\u094D\u0927\u093E\u0928\u094D\u0924 (Siddh\u0101nta) \u2014 established doctrine\n7. \u0905\u0935\u092F\u0935 (Avayava) \u2014 members of inference\n8. \u0924\u0930\u094D\u0915 (Tarka) \u2014 hypothetical reasoning\n9. \u0928\u093F\u0930\u094D\u0923\u092F (Nir\u1E47aya) \u2014 certainty\n10. \u0935\u093E\u0926 (V\u0101da) \u2014 discussion\n11. \u091C\u0932\u094D\u092A (Jalpa) \u2014 wrangling\n12. \u0935\u093F\u0924\u0923\u094D\u0921\u093E (Vita\u1E47\u1E0D\u0101) \u2014 cavil\n13. \u0939\u0947\u0924\u094D\u0935\u093E\u092D\u093E\u0938 (Hetv\u0101bh\u0101sa) \u2014 fallacies\n14. \u091B\u0932 (Chala) \u2014 quibble\n15. \u091C\u093E\u0924\u093F (J\u0101ti) \u2014 rejoinder\n16. \u0928\u093F\u0917\u094D\u0930\u0939\u0938\u094D\u0925\u093E\u0928 (Nigrahasth\u0101na) \u2014 point of defeat",
  "kalidasa": "K\u0101lid\u0101sa wrote 7 major works (c. 4th-5th CE):\n\n**3 Plays (\u0928\u093E\u091F\u0915\u093E\u0928\u093F):**\n1. \u0905\u092D\u093F\u091C\u094D\u091E\u093E\u0928\u0936\u093E\u0915\u0941\u0928\u094D\u0924\u0932\u092E\u094D \u2014 The Recognition of \u015Aakuntal\u0101\n2. \u0935\u093F\u0915\u094D\u0930\u092E\u094B\u0930\u094D\u0935\u0936\u0940\u092F\u092E\u094D \u2014 Urva\u015B\u012B Won by Valour\n3. \u092E\u093E\u0932\u0935\u093F\u0915\u093E\u0917\u094D\u0928\u093F\u092E\u093F\u0924\u094D\u0930\u092E\u094D \u2014 M\u0101lavik\u0101 and Agnimitra\n\n**2 Epic Poems (\u092E\u0939\u093E\u0915\u093E\u0935\u094D\u092F\u0947):**\n1. \u0930\u0918\u0941\u0935\u0902\u0936\u092E\u094D \u2014 The Dynasty of Raghu\n2. \u0915\u0941\u092E\u093E\u0930\u0938\u092E\u094D\u092D\u0935\u092E\u094D \u2014 The Birth of Kum\u0101ra\n\n**2 Lyric Poems (\u0916\u0923\u094D\u0921\u0915\u093E\u0935\u094D\u092F\u0947):**\n1. \u092E\u0947\u0918\u0926\u0942\u0924\u092E\u094D \u2014 The Cloud Messenger\n2. \u090B\u0924\u0941\u0938\u0902\u0939\u093E\u0930\u0903 \u2014 The Gathering of Seasons\n\nHis style is characterized by \u092A\u094D\u0930\u0938\u093E\u0926 (elegant simplicity) and \u092E\u093E\u0927\u0941\u0930\u094D\u092F (sweetness).",
  "tattvamasi": '\u0924\u0924\u094D\u0924\u094D\u0935\u092E\u0938\u093F (Tattvamasi) = "That thou art"\n\nThis is the great saying (\u092E\u0939\u093E\u0935\u093E\u0915\u094D\u092F) from the Ch\u0101ndogya Upani\u1E63ad 6.8, where Udd\u0101laka \u0100ru\u1E47i teaches his son \u015Avetaketu.\n\n**Breakdown:**\n- \u0924\u0924\u094D (tat) = That (Brahman, ultimate reality)\n- \u0924\u094D\u0935\u092E\u094D (tvam) = Thou (you, the individual self)\n- \u0905\u0938\u093F (asi) = art (are)\n\nIt teaches the identity of the individual self (\u0100tman) with ultimate reality (Brahman) \u2014 the core of Advaita Ved\u0101nta.',
  "compounds": "The 5 types of compounds (\u0938\u092E\u093E\u0938\u093E\u0903):\n\n1. **\u0924\u0924\u094D\u092A\u0941\u0930\u0941\u0937 (Tatpuru\u1E63a)** \u2014 Determinative: first modifies second\n   \u0930\u093E\u091C\u092A\u0941\u0930\u0941\u0937\u0903 = \u0930\u093E\u091C\u0928\u094D + \u092A\u0941\u0930\u0941\u0937\u0903 (king's man)\n\n2. **\u0915\u0930\u094D\u092E\u0927\u093E\u0930\u092F (Karmadh\u0101raya)** \u2014 Descriptive: adjective + noun\n   \u092E\u0939\u093E\u0930\u093E\u091C\u0903 = \u092E\u0939\u093E\u0928\u094D + \u0930\u093E\u091C\u093E (great king)\n\n3. **\u0926\u094D\u0935\u0928\u094D\u0926\u094D\u0935 (Dvandva)** \u2014 Copulative: coordinate pair\n   \u0930\u093E\u092E\u0915\u0943\u0937\u094D\u0923\u094C = R\u0101ma and K\u1E5B\u1E63\u1E47a\n\n4. **\u092C\u0939\u0941\u0935\u094D\u0930\u0940\u0939\u093F (Bahuvr\u012Bhi)** \u2014 Exocentric: refers to external entity\n   \u091A\u0915\u094D\u0930\u092A\u093E\u0923\u093F\u0903 = one with discus in hand = Vi\u1E63\u1E47u\n\n5. **\u0905\u0935\u094D\u092F\u092F\u0940\u092D\u093E\u0935 (Avyay\u012Bbh\u0101va)** \u2014 Adverbial: indeclinable first member\n   \u092F\u0925\u093E\u0936\u0915\u094D\u0924\u093F = according to ability"
};
const mockResponsesHi = {
  "guna": "\u0917\u0941\u0923 \u0938\u0902\u0927\u093F \u0924\u092C \u0939\u094B\u0924\u0940 \u0939\u0948 \u091C\u092C \u0905/\u0906 \u0915\u093E \u0907/\u0908 \u0915\u0947 \u0938\u093E\u0925 \u2192 \u090F, \u0905/\u0906 + \u0909/\u090A \u2192 \u0913, \u0914\u0930 \u0905/\u0906 + \u090B \u2192 \u0905\u0930\u094D\u0964\n\n\u0909\u0926\u093E\u0939\u0930\u0923: \u0926\u0947\u0935 + \u0907\u0928\u094D\u0926\u094D\u0930\u0903 = \u0926\u0947\u0935\u0947\u0928\u094D\u0926\u094D\u0930\u0903\u0964\n\n\u0935\u0943\u0926\u094D\u0927\u093F \u0938\u0902\u0927\u093F \u0905\u0927\u093F\u0915 \u092C\u0932\u0935\u093E\u0928 \u0938\u094D\u0935\u0930 \u0926\u0947\u0924\u0940 \u0939\u0948: \u0905/\u0906 + \u090F \u2192 \u0910, \u0914\u0930 \u0905/\u0906 + \u0913 \u2192 \u0914\u0964\n\n\u0909\u0926\u093E\u0939\u0930\u0923: \u0938\u0926\u093E + \u090F\u0935 = \u0938\u0926\u0948\u0935\u0964\n\n\u092E\u0941\u0916\u094D\u092F \u0905\u0902\u0924\u0930 \u0938\u094D\u0935\u0930-\u0917\u0941\u0923 \u092E\u0947\u0902 \u0939\u0948 \u2014 \u0917\u0941\u0923 \u0938\u0947 \u090F/\u0913/\u0905\u0930\u094D \u092C\u0928\u0924\u0947 \u0939\u0948\u0902 \u091C\u092C\u0915\u093F \u0935\u0943\u0926\u094D\u0927\u093F \u0938\u0947 \u0910/\u0914\u0964",
  "cases": "\u0938\u0902\u0938\u094D\u0915\u0943\u0924 \u092E\u0947\u0902 3 \u0935\u091A\u0928\u094B\u0902 (\u090F\u0915\u0935\u091A\u0928, \u0926\u094D\u0935\u093F\u0935\u091A\u0928, \u092C\u0939\u0941\u0935\u091A\u0928) \u0915\u0947 \u0938\u093E\u0925 8 \u0935\u093F\u092D\u0915\u094D\u0924\u093F\u092F\u093E\u0901 \u0939\u0948\u0902:\n\n1. \u092A\u094D\u0930\u0925\u092E\u093E (\u0915\u0930\u094D\u0924\u093E) \u2014 \u0930\u093E\u092E\u0903\n2. \u0926\u094D\u0935\u093F\u0924\u0940\u092F\u093E (\u0915\u0930\u094D\u092E) \u2014 \u0930\u093E\u092E\u092E\u094D\n3. \u0924\u0943\u0924\u0940\u092F\u093E (\u0915\u0930\u0923) \u2014 \u0930\u093E\u092E\u0947\u0923\n4. \u091A\u0924\u0941\u0930\u094D\u0925\u0940 (\u0938\u092E\u094D\u092A\u094D\u0930\u0926\u093E\u0928) \u2014 \u0930\u093E\u092E\u093E\u092F\n5. \u092A\u091E\u094D\u091A\u092E\u0940 (\u0905\u092A\u093E\u0926\u093E\u0928) \u2014 \u0930\u093E\u092E\u093E\u0924\u094D\n6. \u0937\u0937\u094D\u0920\u0940 (\u0938\u092E\u094D\u092C\u0928\u094D\u0927) \u2014 \u0930\u093E\u092E\u0938\u094D\u092F\n7. \u0938\u092A\u094D\u0924\u092E\u0940 (\u0905\u0927\u093F\u0915\u0930\u0923) \u2014 \u0930\u093E\u092E\u0947\n8. \u0938\u092E\u094D\u092C\u094B\u0927\u0928 (\u0939\u0947!) \u2014 \u0939\u0947 \u0930\u093E\u092E",
  "nyaya": "\u0928\u094D\u092F\u093E\u092F \u0938\u0942\u0924\u094D\u0930 1.1.1 \u0915\u0947 \u0905\u0928\u0941\u0938\u093E\u0930 \u0928\u094D\u092F\u093E\u092F \u0926\u0930\u094D\u0936\u0928 \u0915\u0947 16 \u092A\u0926\u093E\u0930\u094D\u0925:\n\n1. \u092A\u094D\u0930\u092E\u093E\u0923 \u2014 \u091C\u094D\u091E\u093E\u0928 \u0915\u0947 \u0938\u093E\u0927\u0928\n2. \u092A\u094D\u0930\u092E\u0947\u092F \u2014 \u091C\u094D\u091E\u093E\u0928 \u0915\u0947 \u0935\u093F\u0937\u092F\n3. \u0938\u0902\u0936\u092F \u2014 \u0938\u0902\u0926\u0947\u0939\n4. \u092A\u094D\u0930\u092F\u094B\u091C\u0928 \u2014 \u0909\u0926\u094D\u0926\u0947\u0936\u094D\u092F\n5. \u0926\u0943\u0937\u094D\u091F\u093E\u0928\u094D\u0924 \u2014 \u0909\u0926\u093E\u0939\u0930\u0923\n6. \u0938\u093F\u0926\u094D\u0927\u093E\u0928\u094D\u0924 \u2014 \u0938\u094D\u0925\u093E\u092A\u093F\u0924 \u092E\u0924\n7. \u0905\u0935\u092F\u0935 \u2014 \u0905\u0928\u0941\u092E\u093E\u0928 \u0915\u0947 \u0905\u0902\u0917\n8. \u0924\u0930\u094D\u0915 \u2014 \u0915\u093E\u0932\u094D\u092A\u0928\u093F\u0915 \u0924\u0930\u094D\u0915\n9. \u0928\u093F\u0930\u094D\u0923\u092F \u2014 \u0928\u093F\u0936\u094D\u091A\u092F\n10. \u0935\u093E\u0926 \u2014 \u091A\u0930\u094D\u091A\u093E\n11. \u091C\u0932\u094D\u092A \u2014 \u091C\u094B\u0930\u0926\u093E\u0930 \u0935\u093E\u0926\n12. \u0935\u093F\u0924\u0923\u094D\u0921\u093E \u2014 \u091B\u0932\u092A\u0942\u0930\u094D\u0923 \u0935\u093E\u0926\n13. \u0939\u0947\u0924\u094D\u0935\u093E\u092D\u093E\u0938 \u2014 \u0915\u0941\u0924\u0930\u094D\u0915\n14. \u091B\u0932 \u2014 \u0936\u092C\u094D\u0926\u094B\u0902 \u0915\u093E \u0939\u0947\u0930\u092B\u0947\u0930\n15. \u091C\u093E\u0924\u093F \u2014 \u092A\u094D\u0930\u0924\u094D\u092F\u0941\u0924\u094D\u0924\u0930\n16. \u0928\u093F\u0917\u094D\u0930\u0939\u0938\u094D\u0925\u093E\u0928 \u2014 \u092A\u0930\u093E\u091C\u092F \u0915\u093E \u0938\u094D\u0925\u093E\u0928",
  "kalidasa": "\u0915\u093E\u0932\u093F\u0926\u093E\u0938 \u0928\u0947 (\u0932\u0917\u092D\u0917 4-5 \u0936\u0924\u093E\u092C\u094D\u0926\u0940 \u0908.) 7 \u092A\u094D\u0930\u092E\u0941\u0916 \u0930\u091A\u0928\u093E\u090F\u0901 \u0932\u093F\u0916\u0940\u0902:\n\n**3 \u0928\u093E\u091F\u0915:**\n1. \u0905\u092D\u093F\u091C\u094D\u091E\u093E\u0928\u0936\u093E\u0915\u0941\u0928\u094D\u0924\u0932\u092E\u094D\n2. \u0935\u093F\u0915\u094D\u0930\u092E\u094B\u0930\u094D\u0935\u0936\u0940\u092F\u092E\u094D\n3. \u092E\u093E\u0932\u0935\u093F\u0915\u093E\u0917\u094D\u0928\u093F\u092E\u093F\u0924\u094D\u0930\u092E\u094D\n\n**2 \u092E\u0939\u093E\u0915\u093E\u0935\u094D\u092F:**\n1. \u0930\u0918\u0941\u0935\u0902\u0936\u092E\u094D\n2. \u0915\u0941\u092E\u093E\u0930\u0938\u092E\u094D\u092D\u0935\u092E\u094D\n\n**2 \u0916\u0923\u094D\u0921\u0915\u093E\u0935\u094D\u092F:**\n1. \u092E\u0947\u0918\u0926\u0942\u0924\u092E\u094D\n2. \u090B\u0924\u0941\u0938\u0902\u0939\u093E\u0930\u0903\n\n\u0909\u0928\u0915\u0940 \u0936\u0948\u0932\u0940 \u092A\u094D\u0930\u0938\u093E\u0926 (\u0938\u0930\u0932 \u0938\u0941\u0928\u094D\u0926\u0930\u0924\u093E) \u0914\u0930 \u092E\u093E\u0927\u0941\u0930\u094D\u092F \u0938\u0947 \u092A\u0930\u093F\u091A\u093F\u0924 \u0939\u0948\u0964",
  "tattvamasi": '\u0924\u0924\u094D\u0924\u094D\u0935\u092E\u0938\u093F \u0915\u093E \u0905\u0930\u094D\u0925 \u0939\u0948 "\u0935\u0939 \u0924\u0942 \u0939\u0948"\u0964\n\n\u092F\u0939 \u091B\u093E\u0928\u094D\u0926\u094B\u0917\u094D\u092F \u0909\u092A\u0928\u093F\u0937\u0926\u094D 6.8 \u0915\u093E \u092E\u0939\u093E\u0935\u093E\u0915\u094D\u092F \u0939\u0948, \u091C\u0939\u093E\u0901 \u0909\u0926\u094D\u0926\u093E\u0932\u0915 \u0906\u0930\u0941\u0923\u093F \u0905\u092A\u0928\u0947 \u092A\u0941\u0924\u094D\u0930 \u0936\u094D\u0935\u0947\u0924\u0915\u0947\u0924\u0941 \u0915\u094B \u0938\u093F\u0916\u093E\u0924\u0947 \u0939\u0948\u0902\u0964\n\n**\u0935\u093F\u092D\u093E\u091C\u0928:**\n- \u0924\u0924\u094D = \u0935\u0939 (\u092C\u094D\u0930\u0939\u094D\u092E, \u092A\u0930\u092E \u0938\u0924\u094D\u092F)\n- \u0924\u094D\u0935\u092E\u094D = \u0924\u0942 (\u0906\u0924\u094D\u092E\u093E)\n- \u0905\u0938\u093F = \u0939\u0948\n\n\u092F\u0939 \u0906\u0924\u094D\u092E\u093E \u0914\u0930 \u092C\u094D\u0930\u0939\u094D\u092E \u0915\u0940 \u090F\u0915\u0924\u093E \u0938\u093F\u0916\u093E\u0924\u093E \u0939\u0948 \u2014 \u0905\u0926\u094D\u0935\u0948\u0924 \u0935\u0947\u0926\u093E\u0902\u0924 \u0915\u093E \u092E\u0942\u0932\u0964',
  "compounds": "5 \u092A\u094D\u0930\u0915\u093E\u0930 \u0915\u0947 \u0938\u092E\u093E\u0938:\n\n1. **\u0924\u0924\u094D\u092A\u0941\u0930\u0941\u0937** \u2014 \u092A\u0939\u0932\u093E \u092A\u0926 \u0926\u0942\u0938\u0930\u0947 \u0915\u094B \u0935\u093F\u0936\u0947\u0937 \u0915\u0930\u0924\u093E \u0939\u0948\n   \u0930\u093E\u091C\u092A\u0941\u0930\u0941\u0937\u0903 = \u0930\u093E\u091C\u0928\u094D + \u092A\u0941\u0930\u0941\u0937\u0903\n\n2. **\u0915\u0930\u094D\u092E\u0927\u093E\u0930\u092F** \u2014 \u0935\u093F\u0936\u0947\u0937\u0923 + \u0935\u093F\u0936\u0947\u0937\u094D\u092F\n   \u092E\u0939\u093E\u0930\u093E\u091C\u0903 = \u092E\u0939\u093E\u0928\u094D + \u0930\u093E\u091C\u093E\n\n3. **\u0926\u094D\u0935\u0928\u094D\u0926\u094D\u0935** \u2014 \u0938\u092E\u093E\u0928 \u0905\u0927\u093F\u0915\u093E\u0930 \u0935\u093E\u0932\u0947 \u092A\u0926\u094B\u0902 \u0915\u093E \u0938\u092E\u093E\u0938\n   \u0930\u093E\u092E\u0915\u0943\u0937\u094D\u0923\u094C = \u0930\u093E\u092E \u0914\u0930 \u0915\u0943\u0937\u094D\u0923\n\n4. **\u092C\u0939\u0941\u0935\u094D\u0930\u0940\u0939\u093F** \u2014 \u0905\u0928\u094D\u092F \u092A\u0926\u093E\u0930\u094D\u0925 \u092A\u094D\u0930\u0927\u093E\u0928\n   \u091A\u0915\u094D\u0930\u092A\u093E\u0923\u093F\u0903 = \u0939\u093E\u0925 \u092E\u0947\u0902 \u091A\u0915\u094D\u0930 \u0927\u093E\u0930\u0923 \u0915\u0930\u0928\u0947 \u0935\u093E\u0932\u093E = \u0935\u093F\u0937\u094D\u0923\u0941\n\n5. **\u0905\u0935\u094D\u092F\u092F\u0940\u092D\u093E\u0935** \u2014 \u092A\u0939\u0932\u093E \u092A\u0926 \u0905\u0935\u094D\u092F\u092F\n   \u092F\u0925\u093E\u0936\u0915\u094D\u0924\u093F = \u0936\u0915\u094D\u0924\u093F \u0915\u0947 \u0905\u0928\u0941\u0938\u093E\u0930"
};
function AITutorPage() {
  const { t, lang } = useLanguage();
  const [messages, setMessages] = useState([
    { role: "assistant", content: t("\u0928\u092E\u0938\u094D\u0924\u0947! I am your Sanskrit tutor. Ask me anything about Sanskrit language, grammar, philosophy, or texts."), timestamp: Date.now() }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [aiMode, setAiMode] = useState("checking");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { toggleKeyboard } = useKeyboard();
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const getMockResponse = (input2) => {
    const lower = input2.toLowerCase();
    const map = lang === "hi" ? mockResponsesHi : mockResponses;
    for (const key of Object.keys(map)) {
      if (lower.includes(key)) return map[key];
    }
    return lang === "hi" ? "\u0938\u0902\u0938\u094D\u0915\u0943\u0924 \u0915\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902 \u092F\u0939 \u092C\u0939\u0941\u0924 \u0905\u091A\u094D\u091B\u093E \u092A\u094D\u0930\u0936\u094D\u0928 \u0939\u0948! \u092E\u0948\u0902 \u0938\u092E\u091D\u093E\u0924\u093E \u0939\u0942\u0901\u0964\n\n\u0938\u0902\u0938\u094D\u0915\u0943\u0924 \u092A\u0930\u0902\u092A\u0930\u093E \u092E\u0947\u0902 \u0907\u0938 \u0935\u093F\u0937\u092F \u0915\u094B \u0935\u094D\u092F\u0935\u0938\u094D\u0925\u093F\u0924 \u0930\u0942\u092A \u0938\u0947 \u0938\u092E\u091D\u093E \u091C\u093E\u0924\u093E \u0939\u0948\u0964 \u092E\u0941\u0916\u094D\u092F \u0938\u093F\u0926\u094D\u0927\u093E\u0902\u0924:\n\n1. \u092A\u0939\u0932\u0947 \u092E\u0942\u0932 \u0905\u0935\u0927\u093E\u0930\u0923\u093E\u090F\u0901 \u0914\u0930 \u0936\u092C\u094D\u0926\u093E\u0935\u0932\u0940 \u0938\u092E\u091D\u0947\u0902\u0964\n2. \u092B\u093F\u0930 \u0928\u093F\u092F\u092E \u0914\u0930 \u0909\u0926\u093E\u0939\u0930\u0923\u094B\u0902 \u0915\u0947 \u0938\u093E\u0925 \u0909\u0928\u0915\u0947 \u092A\u094D\u0930\u092F\u094B\u0917 \u0915\u093E \u0905\u0927\u094D\u092F\u092F\u0928 \u0915\u0930\u0947\u0902\u0964\n3. \u0905\u0902\u0924 \u092E\u0947\u0902 \u0909\u0928 \u0905\u0935\u0927\u093E\u0930\u0923\u093E\u0913\u0902 \u0915\u093E \u092A\u094D\u0930\u092F\u094B\u0917 \u0915\u0930\u0928\u0947 \u0935\u093E\u0932\u0947 \u0935\u093E\u0938\u094D\u0924\u0935\u093F\u0915 \u0917\u094D\u0930\u0902\u0925\u094B\u0902 \u0915\u094B \u092A\u0922\u093C\u0947\u0902\u0964\n\n\u0905\u0927\u093F\u0915 \u0935\u093F\u0938\u094D\u0924\u0943\u0924 \u091C\u093E\u0928\u0915\u093E\u0930\u0940 \u0939\u0947\u0924\u0941 \u0939\u092E\u093E\u0930\u0947 \u092A\u093E\u0920\u094D\u092F\u0915\u094D\u0930\u092E \u0915\u093E \u0938\u0902\u092C\u0902\u0927\u093F\u0924 \u092A\u093E\u0920 \u0926\u0947\u0916\u0947\u0902\u0964 \u0915\u093F\u0938\u0940 \u0935\u093F\u0936\u0947\u0937 \u092A\u0939\u0932\u0942 \u092A\u0930 \u0917\u0939\u0930\u093E\u0908 \u0938\u0947 \u092C\u0924\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u092D\u0940 \u092A\u0942\u091B \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964\n\n\u0915\u094D\u092F\u093E \u0906\u092A \u091A\u093E\u0939\u0947\u0902\u0917\u0947 \u0915\u093F \u092E\u0948\u0902 \u0907\u0938\u0947 \u0914\u0930 \u0935\u093F\u0938\u094D\u0924\u093E\u0930 \u0938\u0947 \u0938\u092E\u091D\u093E\u090A\u0901?" : `That's a great question about Sanskrit! Let me explain.

In the Sanskrit tradition, this topic is approached systematically. The key principles to understand are:

1. First, understand the foundational concepts and terminology.
2. Then, study the rules and their applications with examples.
3. Finally, practice by reading actual texts that use these concepts.

I'd recommend checking the relevant lesson in our curriculum for a more detailed treatment. You can also ask me to elaborate on any specific aspect.

Would you like me to break this down further?`;
  };
  const sendMessage = async (content) => {
    if (!content.trim() || isTyping) return;
    const userMsg = { role: "user", content, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    let reply = "";
    try {
      const history = messages.slice(-8).map((m) => ({ role: m.role, content: m.content }));
      const live = await api.tutor.chat([...history, { role: "user", content }]);
      reply = live.reply || getMockResponse(content);
      setAiMode("ai");
    } catch (err) {
      console.warn("AI service unavailable, using local tutor:", err);
      reply = getMockResponse(content);
      setAiMode("local");
    }
    const assistantMsg = { role: "assistant", content: reply, timestamp: Date.now() };
    setMessages((prev) => [...prev, assistantMsg]);
    setIsTyping(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };
  return <div className="page-container">
      <div className="page-header">
        <h2>{t("AI Sanskrit Tutor")}</h2>
        <p>{t("Ask anything about Sanskrit \u2014 grammar, texts, philosophy, or culture")}</p>
        {aiMode !== "checking" && <span
    style={{
      display: "inline-block",
      marginTop: 6,
      fontSize: 12,
      padding: "3px 10px",
      borderRadius: 12,
      color: "#fff",
      background: aiMode === "ai" ? "#2e7d32" : "#e67e22"
    }}
  >
            {aiMode === "ai" ? t("\u25CF AI connected") : t("\u25CF Local tutor (AI offline)")}
          </span>}
      </div>

      <div className="tutor-layout">
        <div className="tutor-chat">
          <div className="tutor-messages">
            {messages.map((msg, i) => <div key={i} className={`tutor-msg ${msg.role}`}>
                <div className="tutor-msg-avatar" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  {msg.role === "assistant" ? <Bot size={18} color="var(--vt-orange)" /> : <User size={18} />}
                </div>
                <div className="tutor-msg-bubble">
                  <div className="tutor-msg-content">{msg.content}</div>
                  <div className="tutor-msg-time">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>)}
            {isTyping && <div className="tutor-msg assistant">
                <div className="tutor-msg-avatar" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <Bot size={18} color="var(--vt-orange)" />
                </div>
                <div className="tutor-msg-bubble typing">
                  <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                </div>
              </div>}
            <div ref={messagesEndRef} />
          </div>

          <form className="tutor-input" onSubmit={handleSubmit}>
            <input
    ref={inputRef}
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder={t("Ask about Sanskrit...")}
    disabled={isTyping}
  />
            <button
    type="button"
    className="btn btn-secondary"
    onClick={() => toggleKeyboard(inputRef)}
    title={t("Devanagari Keyboard")}
    style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
  >
              <Keyboard size={16} />
            </button>
            <button type="submit" className="btn btn-primary" disabled={!input.trim() || isTyping} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Send size={14} /> <span>{t("Send")}</span>
            </button>
          </form>
        </div>

        <div className="tutor-sidebar">
          <div className="card">
            <h4>{t("Quick Questions")}</h4>
            <div className="tutor-quick-list">
              {quickPrompts.map((prompt, i) => <button
    key={i}
    className="tutor-quick-btn"
    onClick={() => sendMessage(prompt)}
    disabled={isTyping}
  >
                  {t(prompt)}
                </button>)}
            </div>
          </div>

          <div className="card" style={{ marginTop: 16 }}>
            <h4 style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Lightbulb size={16} color="#ffd54f" /> <span>{t("Tips")}</span>
            </h4>
            <ul className="tutor-tips">
              <li>{t("Ask about grammar rules with examples")}</li>
              <li>{t("Request word-by-word breakdowns of verses")}</li>
              <li>{t("Compare different philosophical schools")}</li>
              <li>{t("Ask for declension tables")}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>;
}
export {
  AITutorPage as default
};
