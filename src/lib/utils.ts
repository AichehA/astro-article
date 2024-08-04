import appConfig from "app.config";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateToString(date: string, currentLang: string) {
  return new Date(date).toLocaleDateString(appConfig.langs[currentLang], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
