// src/i18n/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          Home: "Home",
        },
      },
      tr: {
        translation: {
          Home: "Ana sayfa",
        },
      },
    },
    lng: "en", // Varsayılan dil
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React zaten XSS koruması sağlıyor
    },
  });

export default i18n;
