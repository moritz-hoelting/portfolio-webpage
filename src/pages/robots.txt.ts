import type { APIRoute } from "astro";

const aibotUserAgents = [
    "AddSearchBot",
    "AI2Bot",
    "AI2Bot-DeepResearchEval",
    "Ai2Bot-Dolma",
    "aiHitBot",
    "amazon-kendra",
    "Amazonbot",
    "AmazonBuyForMe",
    "Amzn-SearchBot",
    "Amzn-User",
    "Andibot",
    "Anomura",
    "anthropic-ai",
    "ApifyBot",
    "ApifyWebsiteContentCrawler",
    "Applebot",
    "Applebot-Extended",
    "atlassian-bot",
    "Awario",
    "AzureAI-SearchBot",
    "bedrockbot",
    "bigsur.ai",
    "Bravebot",
    "Brightbot 1.0",
    "BuddyBot",
    "Bytespider",
    "CCBot",
    "Channel3Bot",
    "ChatGLM-Spider",
    "ChatGPT Agent",
    "ChatGPT-User",
    "Claude-SearchBot",
    "Claude-User",
    "Claude-Web",
    "ClaudeBot",
    "Cloudflare-AutoRAG",
    "CloudVertexBot",
    "cohere-ai",
    "cohere-training-data-crawler",
    "Cotoyogi",
    "Crawl4AI",
    "Crawlspace",
    "Datenbank Crawler",
    "DeepSeekBot",
    "Devin",
    "Diffbot",
    "DuckAssistBot",
    "Echobot Bot",
    "EchoboxBot",
    "ExaBot",
    "FacebookBot",
    "facebookexternalhit",
    "Factset_spyderbot",
    "FirecrawlAgent",
    "FriendlyCrawler",
    "Gemini-Deep-Research",
    "Google-CloudVertexBot",
    "Google-Extended",
    "Google-Firebase",
    "Google-NotebookLM",
    "GoogleAgent-Mariner",
    "GoogleOther",
    "GoogleOther-Image",
    "GoogleOther-Video",
    "GPTBot",
    "iAskBot",
    "iaskspider",
    "iaskspider/2.0",
    "IbouBot",
    "ICC-Crawler",
    "ImagesiftBot",
    "imageSpider",
    "img2dataset",
    "ISSCyberRiskCrawler",
    "kagi-fetcher",
    "Kangaroo Bot",
    "KlaviyoAIBot",
    "KunatoCrawler",
    "laion-huggingface-processor",
    "LAIONDownloader",
    "LCC",
    "LinerBot",
    "Linguee Bot",
    "LinkupBot",
    "Manus-User",
    "meta-externalagent",
    "Meta-ExternalAgent",
    "meta-externalfetcher",
    "Meta-ExternalFetcher",
    "meta-webindexer",
    "MistralAI-User",
    "MistralAI-User/1.0",
    "MyCentralAIScraperBot",
    "netEstate Imprint Crawler",
    "NotebookLM",
    "NovaAct",
    "OAI-SearchBot",
    "omgili",
    "omgilibot",
    "OpenAI",
    "Operator",
    "PanguBot",
    "Panscient",
    "panscient.com",
    "Perplexity-User",
    "PerplexityBot",
    "PetalBot",
    "PhindBot",
    "Poggio-Citations",
    "Poseidon Research Crawler",
    "QualifiedBot",
    "QuillBot",
    "quillbot.com",
    "SBIntuitionsBot",
    "Scrapy",
    "SemrushBot-OCOB",
    "SemrushBot-SWA",
    "ShapBot",
    "Sidetrade indexer bot",
    "Spider",
    "TavilyBot",
    "TerraCotta",
    "Thinkbot",
    "TikTokSpider",
    "Timpibot",
    "TwinAgent",
    "VelenPublicWebCrawler",
    "WARDBot",
    "Webzio-Extended",
    "webzio-extended",
    "wpbot",
    "WRTNBot",
    "YaK",
    "YandexAdditional",
    "YandexAdditionalBot",
    "YouBot",
    "ZanistaBot",
];

const robotsTxt = `
# As a condition of accessing this website, you agree to
# abide by the following content signals:

# (a)  If a content-signal = yes, you may collect content
# for the corresponding use.
# (b)  If a content-signal = no, you may not collect content
# for the corresponding use.
# (c)  If the website operator does not include a content
# signal for a corresponding use, the website operator
# neither grants nor restricts permission via content signal
# with respect to the corresponding use.

# The content signals and their meanings are:

# search: building a search index and providing search
# results (e.g., returning hyperlinks and short excerpts
# from your website's contents).  Search does not include
# providing AI-generated search summaries.
# ai-input: inputting content into one or more AI models
# (e.g., retrieval augmented generation, grounding, or other
# real-time taking of content for generative AI search
# answers).
# ai-train: training or fine-tuning AI models.

# ANY RESTRICTIONS EXPRESSED VIA CONTENT SIGNALS ARE EXPRESS
# RESERVATIONS OF RIGHTS UNDER ARTICLE 4 OF THE EUROPEAN
# UNION DIRECTIVE 2019/790 ON COPYRIGHT AND RELATED RIGHTS
# IN THE DIGITAL SINGLE MARKET.

${aibotUserAgents.map((userAgent) => `User-agent: ${userAgent}`).join("\n")}
Disallow: /

User-agent: *
Content-Signal: ai-train=no, search=yes, ai-input=no
Disallow: /qualifications/
Allow: /

Sitemap: ${new URL("sitemap-index.xml", import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
    return new Response(robotsTxt, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
};
