import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '@/utils/createEmotionCache';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='manifest' href='/manifest.json' />
          {/* favicon */}
          <link href='/favicons/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
          <link href='/favicons/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
          {/* app icon */}
          <link rel='apple-touch-icon' href='/icons/icon-192x192.png'></link>
          {/* splash screen */}
          <meta name='apple-mobile-web-app-capable' content='yes'></meta>
          <meta name='apple-mobile-web-app-title' content='골라밥'></meta>
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
            href='/splashscreens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
            href='/splashscreens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
            href='/splashscreens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
            href='/splashscreens/10.5__iPad_Air_portrait.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
            href='/splashscreens/10.2__iPad_portrait.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
            href='/splashscreens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
            href='/splashscreens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
            href='/splashscreens/10.5__iPad_Air_landscape.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
            href='/splashscreens/8.3__iPad_Mini_landscape.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
            href='/splashscreens/11__iPad_Pro__10.5__iPad_Pro_portrait.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
            href='/splashscreens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
            href='/splashscreens/10.9__iPad_Air_landscape.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
            href='/splashscreens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
            href='/splashscreens/iPhone_14_Pro_portrait.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
            href='/splashscreens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
            href='/splashscreens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
            href='/splashscreens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
            href='/splashscreens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
            href='/splashscreens/iPhone_11__iPhone_XR_portrait.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
            href='/splashscreens/iPhone_11__iPhone_XR_landscape.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
            href='/splashscreens/11__iPad_Pro__10.5__iPad_Pro_landscape.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
            href='/splashscreens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
            href='/splashscreens/iPhone_14_Pro_Max_portrait.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
            href='/splashscreens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
            href='/splashscreens/iPhone_14_Pro_landscape.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
            href='/splashscreens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
            href='/splashscreens/10.9__iPad_Air_portrait.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
            href='/splashscreens/10.2__iPad_landscape.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
            href='/splashscreens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
            href='/splashscreens/12.9__iPad_Pro_portrait.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
            href='/splashscreens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
            href='/splashscreens/12.9__iPad_Pro_landscape.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
            href='/splashscreens/8.3__iPad_Mini_portrait.png'
          />
          <link
            rel='apple-touch-startup-image'
            media='screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
            href='/splashscreens/iPhone_14_Pro_Max_landscape.png'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          // @ts-ignore
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style data-emotion={`${style.key} ${style.ids.join(' ')}`} key={style.key} dangerouslySetInnerHTML={{ __html: style.css }} />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
