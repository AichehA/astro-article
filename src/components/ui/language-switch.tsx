import appConfig from "app.config";
import { type CollectionEntry } from "astro:content";

const langs = appConfig.langs;

interface LanguageSwitchProps {
  currentURL: string;
  collectionArticles: CollectionEntry<"articles">[];
}

export function LanguageSwitch({
  currentURL,
  collectionArticles,
}: LanguageSwitchProps) {
  console.log("currentURL", currentURL);
  console.log("collectionArticles", collectionArticles);

  // const t: CollectionEntry<"articles"> = [];

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

  // const [allData, setAllData] = useState<CollectionEntry<"articles">[]>();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const articles = await getCollection("articles");

  //     setAllData(articles);
  //   };

  //   fetchData();
  // }, []);

  // console.log("window.location.pathname", window.location.pathname);
  console.log("potentialPath", potentialPath);
  // console.log("allData", allData);

  return (
    <>
      <ul>
        {/* {collectionArticles
          .filter((doc) => {
            return potentialPath.includes(
              getPathDoc(doc.slug, doc.data.folder)
            );
          })
          .map((doc) => (
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
          ))} */}
        {collectionArticles.map((doc) => (
          <li>{doc.id}</li>
        ))}
      </ul>
    </>
  );
}
