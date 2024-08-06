import appConfig from "app.config";

export type translate =
  keyof (typeof appConfig.langTranslates)[typeof appConfig.defaultLang];

export type langs = keyof typeof appConfig.langTranslates;

/**
 * Avoir la langue courrante
 *
 * @export
 * @param {string} pathname
 * @returns {langs}
 */
export function getLangFromUrl(pathname: string): langs {
  const paths = pathname.split("/");
  const lang = import.meta.env.BASE_URL ? paths[2] : paths[1];
  if (lang in appConfig.langTranslates) return lang as langs;
  return appConfig.defaultLang;
}

/**
 * Avoir le lien par rapport à une langue
 *
 * @export
 * @param {string} lang
 * @param {?string} [name]
 * @returns {string}
 */
export function getLink(lang: string, name?: string): string {
  const path = name ? `/${lang}/${name}` : `/${lang}`;

  return import.meta.env.BASE_URL + path;
}

/**
 * Avoir le lien d'un post
 *
 * @export
 * @param {string} currentLang
 * @param {string} slug
 * @param {string} folder
 * @returns {string}
 */
export function getLinkPost(
  currentLang: string,
  slug: string,
  folder: string
): string {
  const path = slug.slice(2);
  return getLink(currentLang, `${folder}${path}`);
}

/**
 * Permet de transformer une clé par rapport à un texte de langue
 *
 * @export
 * @param {langs} lang
 * @returns {(key: string) => any}
 */
export function useTranslations(lang: langs) {
  return function t(key: translate) {
    return (
      appConfig.langTranslates[lang][key] ||
      appConfig.langTranslates[appConfig.defaultLang][key]
    );
  };
}
