import appConfig from "app.config";
import { getCollection } from "astro:content";
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

  console.log("potentialPath", potentialPath);

  const getPathDoc = (slug: string, folder: string) => {
    const slugArray = slug.split("/");
    if (folder) {
      slugArray.splice(1, 0, folder);
    }
    return slugArray.join("/");
  };

  const [allData, setAllData] = useState<
    {
      slug: string;
      folder: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const articles = (await getCollection("articles")).map((doc) => {
        return {
          slug: doc.slug,
          folder: doc.data.folder,
        };
      });
      const pages = (await getCollection("pages")).map((doc) => {
        return {
          slug: doc.slug,
          folder: doc.data.folder,
        };
      });

      setAllData([...articles, ...pages]);
    };

    fetchData();
  }, []);

  /**
   * Permet de filtrer si l'article est disponible dans plusieurs langues.
   * Le résultat des boutons est retourné dans ordre du tableau de configuration "appConfig.langs" fr/using-mdx
   */
  const getLangs = allData.filter((doc) => {
    return potentialPath.includes(getPathDoc(doc.slug, doc.folder));
  });

  return (
    <>
      <ul>
        {getLangs.map((doc) => (
          <li key={doc.slug}>
            <a
              href={`${import.meta.env.BASE_URL}/${getPathDoc(
                doc.slug,
                doc.folder
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
