import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui-shadcn/sheet";
import { cn } from "@/lib/utils";
import { LanguageSwitch } from "@/ui/language-switch";
import appConfig from "app.config";
import * as React from "react";

interface NavMobileProps {
  children?: React.ReactNode;
}

export function NavMobile(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <span
            className={cn(
              "flex items-center space-x-2 cursor-pointer md:hidden"
            )}
          >
            {appConfig.title}
          </span>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <a href="/" className={cn("space-x-2 font-bold")}>
              {appConfig.title}
            </a>
            <SheetClose asChild>
              <div className="flex">
                <LanguageSwitch currentURL={"fr"} />
              </div>
            </SheetClose>
          </SheetHeader>
          Ajouter la navigation : Passer le composant astro Nav en tsx
        </SheetContent>
      </Sheet>
    </>
  );
}
