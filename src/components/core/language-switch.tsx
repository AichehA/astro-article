import { getPathDoc, href, useAllDocs, type DocInfo } from "@/lib/use-docs";
import { cn } from "@/lib/utils";
import appConfig from "app.config";
import * as React from "react";

const langs = appConfig.langs;
const defaultLang = appConfig.defaultLang;

interface LanguageSwitchUi {
  slug: string;
  href: string;
  lang: string;
}

export function LanguageSwitch() {
  const currentPathname = window.location.pathname;
  const potentialPath = langs.map((lang) => {
    const slugArray = currentPathname
      .replace(import.meta.env.BASE_URL, "")
      .split("/")
      .splice(2);
    return slugArray.length ? lang + "/" + slugArray.join("/") : lang;
  });

  const [allDoc, setAllDoc] = React.useState<DocInfo[]>([]);

  React.useEffect(() => {
    useAllDocs().then((docs) => setAllDoc(docs));
  }, []);

  /**
   * Permet de filtrer si l'article est disponible dans plusieurs langues.
   * Le résultat des boutons est retourné dans ordre du tableau de configuration "appConfig.langs" fr/using-mdx
   */
  const getLangs: LanguageSwitchUi[] = allDoc
    .filter((doc) => potentialPath.includes(getPathDoc(doc)))
    .map((doc: DocInfo) => {
      return {
        slug: doc.slug,
        href: href(doc),
        lang: doc.lang ? doc.lang : defaultLang,
      };
    })
    .sort(
      (langA, langB) => langs.indexOf(langA.lang) - langs.indexOf(langB.lang)
    );

  return (
    <>
      {getLangs.map((doc: LanguageSwitchUi) => (
        <a
          key={doc.slug}
          href={doc.href}
          className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-9 px-4 py-2 ",
            `${currentPathname == doc.href ? "font-bold border-2" : ""}`
          )}
        >
          {doc.lang.toUpperCase()}
        </a>
      ))}
    </>
  );
}
