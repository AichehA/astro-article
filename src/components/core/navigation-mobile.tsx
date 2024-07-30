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
import type { langs } from "@/i18n/utils";
import { cn } from "@/lib/utils";
import appConfig from "app.config";
import * as React from "react";

interface NavigationMobileProps {
  currentLang: langs;
  currentSlug: string;
}

export function NavigationMobile({
  currentLang,
  currentSlug,
}: NavigationMobileProps) {
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
            <a href="/" className={cn("space-x-2 font-bold")}>
              {appConfig.title}
            </a>
            <SheetClose asChild>
              <div className="flex">
                <LanguageSwitch currentURL={currentSlug} />
              </div>
            </SheetClose>
          </SheetHeader>
          <Navigation
            currentLang={currentLang}
            currentSlug={currentSlug}
            isMobile={true}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
