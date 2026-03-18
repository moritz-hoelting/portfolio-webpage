import type { Site, Page, Links, Socials } from "@/types";

// Global
export const SITE: Site = {
    TITLE: "Portfolio",
    DESCRIPTION: "Welcome to my portfolio website.",
    AUTHOR: "Moritz Hölting",
};

// Qualifications Page
export const QUALIFICATIONS: Page = {
    TITLE: "Work & Education",
    DESCRIPTION: "My work and education history.",
};

// Blog Page
export const BLOG: Page = {
    TITLE: "Blog",
    DESCRIPTION: "Writing on topics I am passionate about.",
};

// Projects Page
export const PROJECTS: Page = {
    TITLE: "Projects",
    DESCRIPTION: "Recent projects I have worked on.",
};

// Search Page
export const SEARCH: Page = {
    TITLE: "Search",
    DESCRIPTION: "Search all posts and projects by keyword.",
};

// Links
export const LINKS: Links = [
    {
        TEXT: "Home",
        HREF: "/",
    },
    {
        TEXT: "Qualifications",
        HREF: "/qualifications/",
    },
    {
        TEXT: "Blog",
        HREF: "/blog/",
    },
    {
        TEXT: "Projects",
        HREF: "/projects/",
    },
];

// Socials
export const SOCIALS: Socials = [
    {
        NAME: "Email",
        ICON: "pixelarticons:at-sign",
        TEXT: "moritz@hoelting.dev",
        HREF: "mailto:moritz@hoelting.dev",
    },
    {
        NAME: "Github",
        ICON: "pixel:github",
        TEXT: "moritz-hoelting",
        HREF: "https://github.com/moritz-hoelting",
    },
    {
        NAME: "LinkedIn",
        ICON: "pixel:linkedin",
        TEXT: "moritz-hölting",
        HREF: "https://www.linkedin.com/in/moritz-h%C3%B6lting/",
    },
];
