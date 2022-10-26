import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="logoipsum.svg" type="image/svg+xml" />
        <meta
          name="description"
          content="A use case sent by Homa for frontend position"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
