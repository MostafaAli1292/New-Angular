export const languages:any = [
  { code: 'en', name: 'English' , direction: 'ltr' , flag: 'https://raw.githubusercontent.com/agatanga/flags/dba5027546405301f0bf5348c6ebe5f2b38d9614/svg/1x1/us.svg' , isDefault: true},
  { code: 'ar', name: 'Arabic' , direction: 'rtl' , flag: 'https://raw.githubusercontent.com/agatanga/flags/dba5027546405301f0bf5348c6ebe5f2b38d9614/svg/1x1/eg.svg' , isDefault: false},
  { code: 'fr', name: 'French' , direction: 'ltr' , flag: 'https://raw.githubusercontent.com/agatanga/flags/dba5027546405301f0bf5348c6ebe5f2b38d9614/svg/1x1/fr.svg' , isDefault: false},
  { code: 'de', name: 'German' , direction: 'ltr' , flag: 'https://raw.githubusercontent.com/agatanga/flags/dba5027546405301f0bf5348c6ebe5f2b38d9614/svg/1x1/de.svg' , isDefault: false},
]

export function langsCodesArray() {
  return languages.map(lang => lang.code);
}

export function getDefaultLanguage() {
  return languages.find((lang:any) => lang.isDefault).code;
}

export function getLanguageDirection(langCode: string) {
  return languages.find((lang:any) => lang.code === langCode).direction;
}
