import { cn } from "@/lib/utils";
import appConfig from "app.config";
import { getCollection } from "astro:content";
import { useEffect, useState } from "react";

const langs = appConfig.langs;

interface LanguageSwitchProps {
  currentURL: string;
}

interface DocInfo {
  slug: string;
  folder: string;
}

interface LanguageSwitchUi {
  slug: string;
  href: string;
  langLabelle: string | undefined;
}

export function LanguageSwitch({ currentURL }: LanguageSwitchProps) {
  const potentialPath = appConfig.langs.map((lang) => {
    const slugArray = currentURL
      .replace(import.meta.env.BASE_URL, "")
      .split("/")
      .splice(2);
    return slugArray.length ? lang + "/" + slugArray.join("/") : lang;
  });

  const getPathDoc = ({ slug, folder }: DocInfo) => {
    const slugArray = slug.split("/");
    if (folder) {
      slugArray.splice(1, 0, folder);
    }
    return slugArray.join("/");
  };

  const [allDoc, setAllDoc] = useState<DocInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const articles: DocInfo[] = (await getCollection("articles")).map(
        (doc) => {
          return {
            slug: doc.slug,
            folder: doc.data.folder,
          };
        }
      );
      const pages: DocInfo[] = (await getCollection("pages")).map((doc) => {
        return {
          slug: doc.slug,
          folder: doc.data.folder,
        };
      });

      setAllDoc([...articles, ...pages]);
    };

    fetchData();
  }, []);

  /**
   * Retourne l'url par rapport au document passer en paramètre
   *
   * @param doc Le document
   * @returns L'url au format "string"
   */
  const href = (doc: DocInfo) => {
    return `${import.meta.env.BASE_URL}/${getPathDoc(doc)}`;
  };

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
        langLabelle: langs
          .find((lang) => doc.slug.includes(lang))
          ?.toUpperCase(),
      };
    });

  return (
    <ul>
      {getLangs.map((doc: LanguageSwitchUi) => (
        <li key={doc.slug}>
          <a
            href={doc.href}
            className={cn(
              `${currentURL == doc.href ? "font-bold underline" : ""}`
            )}
          >
            {doc.langLabelle}
          </a>
        </li>
      ))}
    </ul>
  );
}
