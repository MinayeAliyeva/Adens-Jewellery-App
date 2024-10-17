import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Provider } from "react-redux";
import { store } from "./redux/store";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        Home: "Home",
        Shop: "Shop",
        Products: "Products",
        "About Us": " About Us",
        "Contact Us": "Contact Us",
      },
    },
    tr: {
      translation: {
        Home: "Ana sayfa",
        Shop: "Mağaza",
        Products: "Ürünler",
        "About Us": "Hakkımızda",
        "Contact Us": "Bize Ulaşın",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
