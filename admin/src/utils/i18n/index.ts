// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";

// i18n.use(initReactI18next).init({
//   resources: {
//     en: {
//       translation: {
//         Products: "Products",
//       },
//     },
//     az: {
//       translation: {
//         Products: "Məhsullar",
//       },
//     },
//   },
//   lng: "en", // Varsayılan dil
//   fallbackLng: "en",
//   interpolation: {
//     escapeValue: false, // React zaten XSS koruması sağlıyor
//   },
// });

// export default i18n;
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import HttpApi from 'i18next-http-backend';

// i18n
//   .use(HttpApi)
//   .use(initReactI18next)
//   .init({
//     fallbackLng: 'en',   // Standart dil olaraq 'en'
//     debug: true,
//     backend: {
//         loadPath: '/src/{{ns}}/lang.json',
//      //loadPath: '/locales/{{lng}}/lang.json',  // Tərcümə faylının yolu
//     },
//     ns: ['layout', 'home', 'about', 'contact',"pages/brands"],
//     defaultNS: 'layout',
//     interpolation: {
//       escapeValue: false, // React-da avtomatik qoruma ehtiyac yoxdur
//     }
//   });

// export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enLang from './locales/en/en.json';
import azLang from './locales/az/az.json';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: enLang,
  },
  az: {
    translation: azLang,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

