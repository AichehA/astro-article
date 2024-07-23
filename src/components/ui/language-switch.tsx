import appConfig from "app.config";
import { getCollection, type CollectionEntry } from "astro:content";
import { useEffect, useState } from "react";

const langs = appConfig.langs;

interface LanguageSwitchProps {
  currentURL: string;
}

export function LanguageSwitch({ currentURL }: LanguageSwitchProps) {
  const potentialPath = appConfig.langs.map((lang) => {
    const slugArray = currentURL
      .replace(import.meta.env.BASE_URL, "")
      .split("/")
      .splice(2);
    return slugArray.length ? lang + "/" + slugArray.join("/") : lang;
  });

  const getPathDoc = (slug: string, folder: string) => {
    const slugArray = slug.split("/");
    slugArray.splice(1, 0, folder);
    return slugArray.join("/");
  };

  const [allData, setAllData] = useState<CollectionEntry<"articles">[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const articles = await getCollection("articles");

      setAllData(articles);
    };

    fetchData();
  }, []);

  /**
   * Permet de filtrer si l'article est disponible dans plusieurs langues.
   * Le résultat des boutons est retourné dans ordre du tableau de configuration "appConfig.langs" fr/using-mdx
   */
  const getLangs = allData.filter((doc) => {
    return potentialPath.includes(getPathDoc(doc.slug, doc.data.folder));
  });

  return (
    <>
      <ul>
        {getLangs.map((doc) => (
          <li key={doc.id}>
            <a
              href={`${import.meta.env.BASE_URL}/${getPathDoc(
                doc.slug,
                doc.data.folder
              )}`}
            >
              {langs.find((lang) => doc.slug.includes(lang))?.toUpperCase()}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
