import type { AstroIntegration } from "astro";

export type MatomoOptions = {
    enabled: boolean;
    url: string;
    siteId: number;
    trackerUrl?: string;
    srcUrl?: string;
    heartBeatTimer?: number;
    setCookieDomain?: string;
    disableCookies?: boolean;
    preconnect?: boolean;
    debug?: boolean;
    respectDoNotTrack?: boolean;
    domains?: string[];
    enableCrossDomainLinking?: boolean;
    customCampaignParameters?: {
        name?: string;
        keyword?: string;
    };
};

export default function matomoIntegration(
    options: MatomoOptions
): AstroIntegration {
    if (!options?.url.endsWith("/")) {
        options.url += "/";
    }

    let script: string;

    if (options?.enabled) {
        script = `import { initMatomo, preconnectMatomo } from "@integrations/matomo/matomo"; initMatomo(${JSON.stringify(
            options
        )});`;

        if (options?.preconnect) {
            script += `preconnectMatomo(${JSON.stringify(options)});`;
        }
    } else {
        console.info(
            "\x1b[43m",
            "Matomo",
            "\x1b[0m",
            "\x1b[34m",
            "Is disabled.",
            "\x1b[0m"
        );

        script = "";
    }

    return {
        name: "matomo",
        hooks: {
            "astro:config:setup": async ({ injectScript }) => {
                if (options?.enabled) {
                    injectScript("page", script);
                    console.info(
                        "\x1b[42m",
                        "Matomo",
                        "\x1b[0m",
                        "\x1b[34m",
                        "was integrated successfully.",
                        "\x1b[0m"
                    );
                }
            },
        },
    };
}
