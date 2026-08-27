export function bi(lang: string, en: string, hi: string): string {
  return lang === 'hi' ? hi : en
}

export function biArr(lang: string, en: string[], hi: string[]): string[] {
  return lang === 'hi' ? hi : en
}
