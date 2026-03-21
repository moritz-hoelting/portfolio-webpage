import type { CollectionEntry } from "astro:content";
import { createEffect, createSignal, For, Show } from "solid-js";
import ArrowCard from "@/components/ArrowCard";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify-icon/solid";

type Props = {
    tags: string[];
    data: CollectionEntry<"projects">[];
};

export default function Projects({ data, tags }: Props) {
    function filterProjects(): CollectionEntry<"projects">[] {
        return data.filter((entry) =>
            Array.from(filter()).every((value) =>
                entry.data.tags.some(
                    (tag: string) =>
                        tag.toLowerCase() === String(value).toLowerCase(),
                ),
            ),
        );
    }

    const [filter, setFilter] = createSignal(new Set<string>());
    const [projects, setProjects] =
        createSignal<CollectionEntry<"projects">[]>(filterProjects());

    createEffect(() => {
        setProjects(filterProjects());
    });

    function toggleTag(tag: string) {
        setFilter(
            (prev) =>
                new Set(
                    prev.has(tag)
                        ? [...prev].filter((t) => t !== tag)
                        : [...prev, tag],
                ),
        );
    }

    return (
        <div class="not-noscript:grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-1 noscript:hidden">
                <div class="sticky top-24">
                    <div class="text-sm font-semibold font-departure uppercase mb-2 text-black dark:text-white">
                        Filter
                    </div>
                    <ul class="flex flex-wrap sm:flex-col gap-1.5">
                        <For each={tags}>
                            {(tag) => (
                                <li>
                                    <button
                                        onClick={() => toggleTag(tag)}
                                        class={cn(
                                            "w-full px-2 py-1 rounded font-departure",
                                            "whitespace-nowrap overflow-hidden overflow-ellipsis",
                                            "flex gap-2 items-center",
                                            "bg-black/5 dark:bg-white/10",
                                            "hover:bg-black/10 hover:dark:bg-white/15",
                                            "transition-colors duration-300 ease-in-out",
                                            filter().has(tag) &&
                                                "text-black dark:text-white",
                                        )}
                                    >
                                        <div
                                            class={cn(
                                                "relative size-5 fill-black/50 dark:fill-white/50",
                                                "transition-colors duration-300 ease-in-out",
                                                filter().has(tag) &&
                                                    "fill-black dark:fill-white",
                                            )}
                                        >
                                            <Icon icon="pixelarticons:square" />
                                            <Icon
                                                icon="pixel:check"
                                                class={cn(
                                                    "absolute top-0 right-0",
                                                    filter().has(tag)
                                                        ? "block"
                                                        : "hidden",
                                                )}
                                            />
                                        </div>
                                        {tag}
                                    </button>
                                </li>
                            )}
                        </For>
                    </ul>
                </div>
            </div>
            <div class="col-span-3 sm:col-span-2">
                <div class="flex flex-col">
                    <div class="text-sm font-departure uppercase mb-2">
                        SHOWING {projects().length} OF {data.length} PROJECTS
                    </div>
                    <ul class="flex flex-col gap-3">
                        {projects().map((project) => (
                            <li>
                                <ArrowCard entry={project} />
                            </li>
                        ))}
                        <Show when={projects().length == 0}>
                            <h3 class="mt-5 text-2xl font-departure">
                                There seem to be no projects matching the
                                filters yet...
                            </h3>
                        </Show>
                    </ul>
                </div>
            </div>
        </div>
    );
}
