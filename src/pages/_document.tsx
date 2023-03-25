import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <Main />
        <NextScript />
        <script
          type='text/javascript'
          src='//dapi.kakao.com/v2/maps/sdk.js?appkey=4d8c337f255e4d10bce42da9f269c2a1&libraries=services,clusterer'
        ></script>
      </body>
    </Html>
  );
}
