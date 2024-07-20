import { ui, defaultLang } from "./ui";

export type translate = keyof (typeof ui)[typeof defaultLang];

export function getLangFromUrl(url: URL) {
  const paths = url.pathname.split("/");
  const lang = import.meta.env.BASE_URL ? paths[2] : paths[1];
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: translate) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLink(lang: string, name?: string) {
  const path = name ? `/${lang}/${name}` : `/${lang}`;

  return import.meta.env.BASE_URL + path;
}
