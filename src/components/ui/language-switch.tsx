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
   * Permet de filtrer si l'article est disponible dans plusieurs langues.
   * Le résultat des boutons est retourné dans ordre du tableau de configuration "appConfig.langs" fr/using-mdx
   */
  const getLangs = allDoc.filter((doc) => {
    return potentialPath.includes(getPathDoc(doc));
  });

  /**
   * Retourne l'url par rapport au document passer en paramètre
   *
   * @param doc Le document
   * @returns L'url au format "string"
   */
  const href = (doc: DocInfo) => {
    return `${import.meta.env.BASE_URL}/${getPathDoc(doc)}`;
  };

  return (
    <ul>
      {getLangs.map((doc: DocInfo) => (
        <li key={doc.slug}>
          <a
            href={href(doc)}
            className={cn(
              `${currentURL == href(doc) ? "font-bold underline" : ""}`
            )}
          >
            {langs.find((lang) => doc.slug.includes(lang))?.toUpperCase()}
          </a>
        </li>
      ))}
    </ul>
  );
}
