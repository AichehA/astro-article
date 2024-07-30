import { getLangFromUrl, useTranslations } from "@/i18n/utils";
import { href, useAllDocs, type DocInfo } from "@/lib/useDocs";
import { cn } from "@/lib/utils";
import { Button } from "@/ui-shadcn/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/ui-shadcn/command";
import * as React from "react";

export function Search({ className }) {
  const currentPathname = window.location.pathname;
  const currentLang = getLangFromUrl(currentPathname);
  const t = useTranslations(currentLang);
  const [open, setOpen] = React.useState(false);
  const [allDoc, setAllDoc] = React.useState<DocInfo[]>([]);

  React.useEffect(() => {
    useAllDocs()
      .then((docs) => docs.filter((doc) => doc.slug.includes(currentLang)))
      .then((doc) => setAllDoc(doc));

    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  console.log("allDoc :", allDoc);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        className={cn("border", className)}
        onClick={() => setOpen((open) => !open)}
      >
        <span className="inline-flex mr-2">{t("search.search_bar_name")}</span>
        <kbd className="pointer-events-none right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span>⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command
          filter={(itemId, search) => {
            const idDocArray = allDoc
              .filter((docs) => {
                return JSON.stringify(
                  `${docs.title} ${docs.description} ${docs.body}`.toLowerCase()
                ).includes(search.toLowerCase());
              })
              .map((doc) => {
                console.log(doc.slug);

                return href(doc);
              });
            if (idDocArray.includes(itemId)) return 1;
            return 0;
          }}
        >
          <CommandInput placeholder={t("search.placeholder")} />
          <CommandList>
            <CommandEmpty>{t("search.search_not_found")}</CommandEmpty>
            <CommandGroup heading="Documentation">
              {allDoc.map((doc) => {
                return (
                  <CommandItem
                    key={href(doc)}
                    value={href(doc)}
                    className="flex-col items-start"
                    onSelect={(href: string) => {
                      if (href) {
                        window.location.replace(href);
                        setOpen(false);
                      }
                    }}
                  >
                    <span>
                      {doc.title} {doc.slug}
                    </span>
                    <span className="text-xs">{doc.description}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
