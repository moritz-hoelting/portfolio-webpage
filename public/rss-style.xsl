<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" encoding="UTF-8" />

  <xsl:template match="/">
    <html>
      <head>
        <style>
          @font-face {
            font-family: "DepartureMono";
            src: url("/fonts/DepartureMono-Regular.woff") format("woff");
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: "FiraCode";
            src: url("/fonts/FiraCode-Regular.woff") format("woff");
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: "FiraCode";
            src: url("/fonts/FiraCode-Bold.woff") format("woff");
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
          body {
            font-family: "FiraCode", monospace;
            background: #1a1a1a;
            color: #ccc;
            image-rendering: pixelated;
            max-width: 768px;
            margin-inline: auto;
          }
          * {
            box-sizing: border-box;
          }
          h1, h2 {
            font-family: "DepartureMono", monospace;
          }
          #backContainer {
            margin-block: 1rem;
          }
          #backButton {
            color: #ccc;
            text-decoration: none;
            padding: 0.5rem 1rem;
            background: #555;
            border-radius: calc(infinity * 1px);;
          }
          .item {
            border: 2px solid #ccc;
            padding: 1rem;
            margin-bottom: 1rem;
          }
          .item > h2 > a {
            color: #ccc;
            text-decoration: none;
          }
          .item > .pills {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            gap: 1rem;
          }
          .item > .pills > * {
            color: #ccc;
            text-decoration: none;
            text-transform: capitalize;
            background: #555;
            padding: 0.5rem 1rem;
            border-radius: calc(infinity * 1px);;
          }
          h1, h2 {
            margin: 0 0 1rem 0;
          }
        </style>
      </head>

      <body>
        <h1><xsl:value-of select="rss/channel/title" /></h1>
        <div id="backContainer">
          <a id="backButton" href="/">Back to the main page</a>
        </div>

        <xsl:for-each select="rss/channel/item">
          <div class="item">
            <h2><a  href="{link}"><xsl:value-of select="title" /></a></h2>
            <div class="pills">
              <a class="type" href="/{entryType}/"><xsl:value-of select="entryType" /></a>
              <span class="date"><xsl:value-of select="pubDate" /></span>
            </div>
            <p><xsl:value-of select="description" /></p>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>