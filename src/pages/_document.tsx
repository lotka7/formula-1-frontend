import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="flex justify-center items-center overflow-auto my-4">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
