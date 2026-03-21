import type { CollectionEntry } from "astro:content";
import { formatDate } from "@/lib/utils";
import { Icon } from "@iconify-icon/solid";

type Props = {
    entry: CollectionEntry<"blog"> | CollectionEntry<"projects">;
    pill?: string;
};

export default function ArrowCard({ entry, pill }: Props) {
    return (
        <a
            href={`/${entry.collection}/${entry.id}/`}
            class="group p-4 gap-3 flex items-center border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out"
        >
            <div class="w-full group-hover:text-black group-hover:dark:text-white blend">
                <div class="flex flex-wrap items-center gap-2">
                    {pill != undefined && (
                        <div class="text-sm capitalize px-2 py-0.5 rounded-full border border-black/15 dark:border-white/25">
                            {pill}
                        </div>
                    )}
                    <div class="text-sm font-departure uppercase">
                        {formatDate(entry.data.date)}
                    </div>
                </div>
                <div class="font-semibold mt-3 text-black dark:text-white">
                    {entry.data.title}
                </div>

                <div class="text-sm line-clamp-2">{entry.data.summary}</div>
                <ul class="flex flex-wrap mt-2 gap-1">
                    {entry.data.tags.map((tag) => (
                        <li class="text-xs font-departure uppercase py-0.5 px-1 rounded bg-black/5 dark:bg-white/20 text-black/75 dark:text-white/75">
                            {tag}
                        </li>
                    ))}
                </ul>
            </div>
            <div class="relative overflow-hidden w-4 h-4">
                <Icon
                    icon="pixelarticons:arrow-right"
                    class="absolute right-0 inset-y-0 text-lg origin-left
                        scale-x-0 group-hover:scale-x-100
                        transition-all duration-300 ease-in-out"
                />
                <Icon
                    icon="pixelarticons:chevron-right"
                    class="absolute right-0 inset-y-0 text-lg
                        group-hover:translate-x-4
                        transition-all duration-300 ease-in-out"
                />
            </div>
        </a>
    );
}
