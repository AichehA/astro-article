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
  menuNavigation: [
    {
      title: "nav.home",
      link: "",
      lang: ["fr", "en"],
    },
    {
      title: "nav.articles",
      link: "articles",
      lang: ["fr", "en"],
    },
    {
      title: "nav.about",
      link: "about",
      lang: ["fr", "en"],
    },
  ],
};

export default appConfig;
