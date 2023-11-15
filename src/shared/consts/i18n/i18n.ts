import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translateEN from './local/en.json';
import translateRU from './local/ru.json';
import languageDetector from 'i18next-browser-languagedetector';


const resources = {
    en: {
        translation: translateEN
    },
    ru: {
        translation: translateRU
    }
}
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: resources,
    interpolation: {
      escapeValue: false 
    },
    react: {
        useSuspense: true
    }
  });

export default i18n