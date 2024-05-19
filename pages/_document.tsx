import { Html, Head, Main, NextScript } from "next/document";

const title = "Nexeth Explorer";
const description =
  "Nexeth unifies your search across Ethereum and L2s (including testnets). Explore networks, tokens, NFTs, and transactions – all from a single powerful interface. Try entering an address, transaction hash, token name or ENS to get started.";
const image = "/preview.png";
const url = "https://explorer.nexeth.xyz";

const AppDocument = () => (
  <Html lang="en">
    <Head>
      <meta charSet="UTF-8" />
      <meta name="description" content={description} />
      <meta httpEquiv="Content-Language" content="en" />

      {/* Open Graph meta tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* SEO Tags */}
      <meta name="keywords" content="Nexeth" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default AppDocument;
