import { Icons } from "@/components/core/icons";
import type { DocInfo } from "@/lib/use-docs";
import { useReadingTimeToNumeric } from "@/lib/use-reading-time";
import { dateToString } from "@/lib/utils";

export function PostsDateAndReadTime(doc: DocInfo, currentLang: string) {
  return (
    <div className="w-full text-sm font-medium leading-5 md:flex md:items-center md:justify-between">
      <span className="flex items-center mb-4">
        <Icons.calendarClock className="mr-1" width={20} height={20} />
        {dateToString(doc.pubDate.toDateString(), currentLang)}
      </span>
      <span className="flex items-center mb-4">
        <Icons.hourglass className="mr-1" width={20} height={20} />
        {useReadingTimeToNumeric(doc.readTime)}{" "}
      </span>
    </div>
  );
}
