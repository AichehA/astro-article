import { useBodyToMinutes } from "@/lib/use-reading-time";
import appConfig from "app.config";
import { getCollection } from "astro:content";

export interface DocInfo {
  title: string;
  description: string;
  body: string;
  slug: string;
  folder: string;
  lang: string | null;
  pubDate: Date;
  cover?: string;
  readTime: number;
}

/**
 * Permet de récupérer tout les documents
 *
 * @returns {Promise<DocInfo[]>}
 */
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
      lang: appConfig.langs.find((lang) => doc.id.includes(lang)) || null,
      pubDate: doc.data.pubDate,
      cover: doc.data.cover,
      readTime: useBodyToMinutes(doc.body),
    }))
  );
}

/**
 * Récupérer le chemin du document
 *
 * @param {string} slug
 * @param {string} folder
 * @returns {string} Retourne la nouvelle url
 */
export const getPathDoc = ({ slug, folder }: DocInfo): string => {
  const slugArray = slug.split("/");
  if (folder) {
    slugArray.splice(1, 0, folder);
  }
  return slugArray.join("/");
};

/**
 * Retourne l'url par rapport au document passer en paramètre
 *
 * @param {DocInfo} doc Le document
 * @returns {string} L'url au format "string"
 */
export const href = (doc: DocInfo) => {
  return `${import.meta.env.BASE_URL}/${getPathDoc(doc)}`;
};
