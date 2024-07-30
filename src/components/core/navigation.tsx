import { getLink, useTranslations, type langs } from "@/i18n/utils";
import { cn } from "@/lib/utils";
import appConfig from "app.config";

interface NavigationProps {
  currentLang: langs;
  currentSlug: string;
  isMobile: boolean;
}

interface routerModel {
  title: any;
  link: string;
  lang: string[];
}

const router: routerModel[] = appConfig.menuNavigation;

export function Navigation({
  currentLang,
  currentSlug,
  isMobile = false,
}: NavigationProps) {
  const t = useTranslations(currentLang);

  return (
    <nav
      className={cn(
        isMobile
          ? "flex flex-col space-y-3 ml-3"
          : "hidden md:flex md:items-center md:space-x-4 md:text-sm md:font-medium"
      )}
    >
      {router
        .filter((value) => value.lang.includes(currentLang))
        .map((value, index) => (
          <a
            key={index}
            className={cn(
              "transition-colors hover:text-foreground/80 text-foreground/60",
              getLink(currentLang, value.link) === currentSlug
                ? "transition-colors hover:text-foreground/80 text-foreground"
                : ""
            )}
            href={getLink(currentLang, value.link)}
          >
            {t(value.title)}
          </a>
        ))}
    </nav>
  );
}
