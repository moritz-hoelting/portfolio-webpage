import type { MatomoOptions } from ".";

export function initMatomo(options: MatomoOptions): void {
    const _paq = (window._paq = window._paq || []);

    if (options?.disableCookies) _paq.push(["disableCookies"]);
    if (options?.heartBeatTimer)
        _paq.push(["enableHeartBeatTimer", options.heartBeatTimer]);
    if (options?.setCookieDomain)
        _paq.push(["setCookieDomain", options.setCookieDomain]);
    if (options?.respectDoNotTrack) _paq.push(["setDoNotTrack", true]);
    if (options?.domains) _paq.push(["setDomains", options.domains]);
    if (options?.enableCrossDomainLinking)
        _paq.push(["enableCrossDomainLinking"]);
    if (options?.customCampaignParameters?.name)
        _paq.push([
            "setCampaignNameKey",
            options.customCampaignParameters.name,
        ]);
    if (options?.customCampaignParameters?.keyword)
        _paq.push([
            "setCampaignKeywordKey",
            options.customCampaignParameters.keyword,
        ]);

    _paq.push(["trackPageView"]);
    _paq.push(["enableLinkTracking"]);

    if (options?.debug) {
        console.warn("Matomo debug mode enabled!");
        window._mtm = window._mtm || [];
        window._mtm.push(["enableDebugMode"]);
    }

    (function () {
        const u = options?.url;

        _paq.push(["setTrackerUrl", u + (options?.trackerUrl || "matomo.php")]);
        _paq.push(["setSiteId", options?.siteId]);

        const d = document,
            g = d.createElement("script"),
            s = d.getElementsByTagName("script")[0];

        g.id = "matomo-script";
        g.type = "text/javascript";
        g.async = true;
        g.defer = true;
        g.src = u + (options?.srcUrl || "matomo.js");
        if (s.parentNode != null && u) s.parentNode.insertBefore(g, s);
    })();
}

export function preconnectMatomo(options: MatomoOptions): void {
    if (!options?.url) return;

    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = options?.url;
    document.head.appendChild(link);
}
