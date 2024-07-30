import { LanguageSwitch } from "@/components/core/language-switch";
import { Navigation } from "@/components/core/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui-shadcn/sheet";
import { getLangFromUrl, getLink } from "@/i18n/utils";
import { cn } from "@/lib/utils";
import appConfig from "app.config";
import * as React from "react";

export function NavigationMobile() {
  const currentPathname = window.location.pathname;
  const currentLang = getLangFromUrl(currentPathname);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTitle>
          <SheetTrigger asChild>
            <span
              className={cn(
                "flex items-center space-x-2 cursor-pointer md:hidden"
              )}
            >
              {appConfig.title}
            </span>
          </SheetTrigger>
        </SheetTitle>
        <SheetContent side="left">
          <SheetHeader>
            <a
              href={getLink(currentLang)}
              className={cn("space-x-2 font-bold")}
            >
              {appConfig.title}
            </a>
            <SheetClose asChild>
              <div className="flex">
                <LanguageSwitch />
              </div>
            </SheetClose>
          </SheetHeader>
          <Navigation isMobile={true} />
        </SheetContent>
      </Sheet>
    </>
  );
}
