import { getCollection } from "astro:content";

export interface DocInfo {
  title: string;
  description: string;
  body: string;
  slug: string;
  folder: string;
}

export async function useAllDocs(): Promise<DocInfo[]> {
  return Promise.all([
    await getCollection("pages"),
    await getCollection("articles"),
  ]).then(([pages, articles]) =>
    [...pages, ...articles].map((doc) => ({
      title: doc.data.title,
      description: doc.data.description,
      body: doc.body,
      slug: doc.slug,
      folder: doc.data.folder,
    }))
  );
}

export const getPathDoc = ({ slug, folder }: DocInfo) => {
  const slugArray = slug.split("/");
  if (folder) {
    slugArray.splice(1, 0, folder);
  }
  return slugArray.join("/");
};

/**
 * Retourne l'url par rapport au document passer en paramètre
 *
 * @param doc Le document
 * @returns L'url au format "string"
 */
export const href = (doc: DocInfo) => {
  return `${import.meta.env.BASE_URL}/${getPathDoc(doc)}`;
};
