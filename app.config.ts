import en from "langs/en";
import fr from "langs/fr";

const appConfig = {
  title: "Mon site",
  copyright: "© 2024 - Mon site",
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
  socials: [
    {
      link: "https://twitter.com/damienaicheh",
      type: "Twitter",
    },
    {
      link: "https://github.com/damienaicheh",
      type: "Github",
    },
    {
      link: "https://www.youtube.com/@damienaicheh",
      type: "Youtube",
    },
  ],
};

export default appConfig;
