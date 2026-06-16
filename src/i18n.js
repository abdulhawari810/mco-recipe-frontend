import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import id from "./locales/id.json";
import en from "./locales/en.json";
import jp from "./locales/jp.json";
import kr from "./locales/kr.json";

const defaultLanguage = localStorage.getItem("language");

i18n.use(initReactI18next).init({
  resources: {
    id: {
      translation: id,
    },
    en: {
      translation: en,
    },
    jp: {
      translation: jp,
    },
    kr: {
      translation: kr,
    },
  },
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  Interpolation: {
    escapeValue: false,
  },
});

export default i18n;
