import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// the translations
// https://react.i18next.com/legacy-v9/step-by-step-guide
import * as translationEN from "../src/locales/en/index.js";
import * as translationNL from "../src/locales/nl/index.js";

const resources = {
  "en": translationEN,
  "en-US": translationEN,
  'nl': translationNL,
  'nl-NL': translationNL
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: resources,
    fallbackLng: "en-US",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false
    }

  });

export default i18n;
