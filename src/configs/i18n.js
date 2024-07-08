import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import english from '../lang/en.json'
import arabic from '../lang/ar.json'

i18n

  // Enable automatic language detection
  .use(LanguageDetector)

  // Enables the hook initialization module
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: english
      },
      ar: {
        translation: arabic
      }
    },
    fallbackLng: 'en',
    debug: false,
    keySeparator: false,
    react: {
      useSuspense: true
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    }
  })

export default i18n
