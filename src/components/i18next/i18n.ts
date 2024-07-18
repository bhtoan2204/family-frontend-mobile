// i18n.js
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import enTranslations from './locales/en.json'; 
import viTranslations from './locales/vi.json';

const i18n = new I18n({
  en: enTranslations,
  vi: viTranslations,
});

i18n.locale = 'vi'; // Fallback to 'en' if Localization.locale is undefined
i18n.enableFallback = true; // Enable fallback to default language

export default i18n;
