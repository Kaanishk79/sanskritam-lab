export const devanagariLayouts = {
  vowels: {
    label: 'स्वर',
    chars: [
      ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ'],
      ['ऋ', 'ॠ', 'ऌ', 'ए', 'ऐ', 'ओ'],
      ['औ', 'अं', 'अः', 'ऐ', 'औ'],
    ],
  },
  consonants: {
    label: 'व्यञ्जन',
    groups: [
      { name: 'कण्ठ्य (Guttural)', chars: ['क', 'ख', 'ग', 'घ', 'ङ'] },
      { name: 'तालव्य (Palatal)', chars: ['च', 'छ', 'ज', 'झ', 'ञ'] },
      { name: 'मूर्धन्य (Retroflex)', chars: ['ट', 'ठ', 'ड', 'ढ', 'ण'] },
      { name: 'दन्त्य (Dental)', chars: ['त', 'थ', 'द', 'ध', 'न'] },
      { name: 'ओष्ठ्य (Labial)', chars: ['प', 'फ', 'ब', 'भ', 'म'] },
      { name: 'अन्तःस्थ (Semivowels)', chars: ['य', 'र', 'ल', 'व'] },
      { name: 'ऊष्मन् (Sibilants)', chars: ['श', 'ष', 'स', 'ह'] },
    ],
  },
  matras: {
    label: 'मात्रा',
    chars: [
      ['ा', 'ि', 'ी', 'ु', 'ू', 'ृ'],
      ['े', 'ै', 'ो', 'ौ', 'ं', 'ः'],
      ['ँ', '्'],
    ],
  },
  digits: {
    label: 'अङ्क',
    chars: [
      ['०', '१', '२', '३', '४'],
      ['५', '६', '७', '८', '९'],
    ],
  },
  special: {
    label: 'चिह्न',
    chars: [
      ['ॐ', '।', '॥', '॰'],
      ['ऽ', 'ऱ', 'ऴ', 'ड़', 'ढ़'],
    ],
  },
}

export function insertAtCursor(input: HTMLInputElement | HTMLTextAreaElement, char: string): void {
  const start = input.selectionStart ?? input.value.length
  const end = input.selectionEnd ?? start

  if (char === '\b' || char === 'backspace') {
    if (start === end && start > 0) {
      const before = input.value.slice(0, start - 1)
      const after = input.value.slice(start)
      input.value = before + after
      input.selectionStart = input.selectionEnd = start - 1
    } else {
      const before = input.value.slice(0, start)
      const after = input.value.slice(end)
      input.value = before + after
      input.selectionStart = input.selectionEnd = start
    }
  } else {
    const before = input.value.slice(0, start)
    const after = input.value.slice(end)
    input.value = before + char + after
    input.selectionStart = input.selectionEnd = start + char.length
  }

  input.dispatchEvent(new Event('input', { bubbles: true }))
  input.focus()
}
