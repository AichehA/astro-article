import appConfig from "app.config";

export type translate =
  keyof (typeof appConfig.langTranslates)[typeof appConfig.defaultLang];

export function getLangFromUrl(url: URL) {
  const paths = url.pathname.split("/");
  const lang = import.meta.env.BASE_URL ? paths[2] : paths[1];
  if (lang in appConfig.langTranslates)
    return lang as keyof typeof appConfig.langTranslates;
  return appConfig.defaultLang;
}

export function useTranslations(lang: keyof typeof appConfig.langTranslates) {
  return function t(key: translate) {
    return (
      appConfig.langTranslates[lang][key] ||
      appConfig.langTranslates[appConfig.defaultLang][key]
    );
  };
}

export function getLink(lang: string, name?: string) {
  const path = name ? `/${lang}/${name}` : `/${lang}`;

  return import.meta.env.BASE_URL + path;
}
