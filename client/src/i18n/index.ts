import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        Home: "Home",
        "Chic Petal Perfection": "Chic Petal Perfection",
        "Jewelry is favored by both men and women because it shows luxury & class own aesthetic taste, affirming position…":
          "Jewelry is favored by both men and women because it shows luxury & class own aesthetic taste, affirming position…",
        "Shop Now": "Shop Now",
        "Indulge yourself with our exclusive selections. Because you deserve to treat yourself to the finest things in life, let us help you find the perfect reward for your achievements.":
          "Indulge yourself with our exclusive selections. Because you deserve to treat yourself to the finest things in life, let us help you find the perfect reward for your achievements.",
      },
    },
    tr: {
      translation: {
        Home: "Ana sayfa",
        "Chic Petal Perfection": "Şık Yaprak Mükemmelliği",
        "Jewelry is favored by both men and women because it shows luxury & class own aesthetic taste, affirming position…":
          "Takı hem erkekler hem de kadınlar tarafından tercih ediliyor çünkü lüks ve klas, kendi estetik zevkini gösteriyor, konumunu onaylıyor…",
        "Shop Now": "Şimdi Alışveriş Yapın",
        "Indulge yourself with our exclusive selections. Because you deserve to treat yourself to the finest things in life, let us help you find the perfect reward for your achievements.":
          "Özel seçeneklerimizle kendinizi şımartın. Kendinize hayattaki en güzel şeyleri ikram etmeyi hak ettiğiniz için, başarılarınız için mükemmel ödülü bulmanıza yardımcı olmamıza izin verin.",
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
