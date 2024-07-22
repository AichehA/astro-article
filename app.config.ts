import en from "langs/en";
import fr from "langs/fr";

const appConfig = {
  title: "Mon site",
  copyright: "© 2023 - Mon site",
  email: "your-email@example.com",
  defaultLang: "fr" as const,
  langs: ["fr", "en"],
  langTranslates: {
    fr: fr,
    en: en,
  },
};

export default appConfig;
