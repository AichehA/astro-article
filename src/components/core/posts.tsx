import { cn } from "@/lib/utils";
import { PostsDateAndReadTime } from "./posts-date-read";
import * as React from "react";
import { useAllDocs, type DocInfo } from "@/lib/use-docs";
import { getLangFromUrl, getLink, getLinkPost } from "@/i18n/utils";

interface PostsProps {
  children?: React.ReactNode;
  featuredPostTitle: string;
  featuredPostBtn: string;
  allPostsTitle: string;
  allPostsBtn: string;
}

export function Posts({
  featuredPostTitle,
  featuredPostBtn,
  allPostsTitle,
  allPostsBtn,
}: PostsProps) {
  const [allDoc, setAllDoc] = React.useState<DocInfo[]>([]);

  React.useEffect(() => {
    useAllDocs().then((docs) => setAllDoc(docs));
  }, []);

  const currentPathname = window.location.pathname;
  const currentLang = getLangFromUrl(currentPathname);

  const allData = allDoc.filter((data) => data.lang === currentLang);
  const features = allData
    .filter((docs) => docs.folder.length !== 0)
    .sort((docA, docB) => {
      return (
        new Date(docB.pubDate).valueOf() - new Date(docA.pubDate).valueOf()
      );
    })
    .slice(0, 5);

  const firstFeatures = features.shift();

  return (
    <div className="w-full max-md:max-w-full">
      <section className="flex flex-col items-stretch max-md:w-full max-md:ml-0 mt-10">
        <h2
          className={cn(
            "mb-4 text-4xl font-semibold leading-10 tracking-tighter"
          )}
        >
          {featuredPostTitle}
        </h2>
        {firstFeatures
          ? FeaturePostsDocs(firstFeatures, featuredPostBtn, currentLang)
          : null}
      </section>
      <section className="flex flex-col items-stretch max-md:w-full max-md:ml-0 mt-10">
        <h2
          className={cn(
            "mb-4 text-4xl font-semibold leading-10 tracking-tighter"
          )}
        >
          {allPostsTitle}
        </h2>
        <div className="flex grow flex-col items-stretch max-md:max-w-full md:flex-row md:flex-wrap gap-2 lg:gap-4 md:justify-between">
          {features.map((doc) => PostsDocs(doc, currentLang))}
        </div>
        <div className="flex justify-center items-center mt-4 mb-4">
          <a
            href={getLinkPost(currentLang, "fr", "articles")}
            title={"all docs"}
            className={cn(
              "text-lg font-bold leading-6 px-16 py-4 self-start inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90"
            )}
          >
            {allPostsBtn}
          </a>
        </div>
      </section>
    </div>
  );
}

function FeaturePostsDocs(
  doc: DocInfo,
  featuredPostBtn: string,
  currentLang: string
) {
  return (
    <div className="border border-muted-foreground flex justify-around flex-col w-full p-4 md:p-6 border-solid mb-2 bg-card gap-5 text-card-foreground md:flex-row">
      {doc.cover ? (
        <div className="flex flex-col items-stretch w-[45%] max-md:w-full max-md:ml-0">
          <img
            className="aspect-[1.50] object-cover object-center w-full overflow-hidden grow max-md:max-w-full"
            src={`${import.meta.env.BASE_URL}${doc.cover}`}
            alt="Next.js Logo"
            width={1500}
            height={1500}
          />
        </div>
      ) : null}

      <div className="flex flex-col justify-between items-stretch w-[55%] max-md:w-full max-md:ml-0">
        <div>
          {PostsDateAndReadTime(doc, currentLang)}
          <h3 className="text-3xl font-bold leading-10 tracking-tighter self-stretch max-md:max-w-full">
            {doc.title}
          </h3>
          <p className="text-base leading-7 self-stretch mt-5 max-md:max-w-full">
            {doc.description}
          </p>
        </div>
        <a
          href={getLinkPost(currentLang, doc.slug, doc.folder)}
          title={doc.title}
          className={cn(
            "text-lg font-bold leading-6 mt-9 px-10 py-4 self-start max-md:px-5 inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90"
          )}
        >
          {featuredPostBtn}
        </a>
      </div>
    </div>
  );
}

function PostsDocs(doc: DocInfo, currentLang: string) {
  return (
    <a
      className="border border-muted-foreground flex flex-col p-4 md:p-6 items-start max-md:max-w-full bg-card hover:bg-card/70 text-card-foreground md:w-[49%]"
      href={getLinkPost(currentLang, doc.slug, doc.folder)}
      title={doc.title}
      key={doc.slug}
    >
      {PostsDateAndReadTime(doc, currentLang)}
      <h3 className="text-2xl font-bold leading-8">{doc.title}</h3>
      <p className="leading-8 mt-2">{doc.description}</p>
    </a>
  );
}
