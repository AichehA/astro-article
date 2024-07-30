import { Icons } from "@/components/utils/icons";
import { cn } from "@/lib/utils";
import appConfig from "app.config";

function getIcon(type: string) {
  switch (type) {
    case "Github":
      return <Icons.gitHub className={cn("inline-flex")} />;
    case "Twitter":
      return <Icons.twitterX className={cn("inline-flex")} />;
    case "Youtube":
      return <Icons.youtube className={cn("inline-flex")} />;

    default:
      return "";
  }
}

export function FooterContent() {
  return (
    <>
      <div className={cn("flex items-center")}>
        {appConfig.socials.map((value, index) => (
          <a
            key={index}
            href={value.link}
            aria-label={value.type}
            target="_blank"
            className={cn("w-12 text-center")}
            title={value.type}
          >
            {getIcon(value.type)}
          </a>
        ))}
      </div>
      <p>{appConfig.copyright}</p>
    </>
  );
}
