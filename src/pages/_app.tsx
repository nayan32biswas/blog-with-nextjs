import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import GlobalApiComponent from '@/components/utils/GlobalApiComponent';
import { ColorModeContext } from '@/context/ColorModeContext';
import { UserProvider } from '@/context/UserContext';
import createEmotionCache from '@/createEmotionCache';
import '@/styles/globals.css';
import { ColorModeType, getColorMode, getTheme, setColorMode } from '@/theme';

import Layout from '../components/Layout';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  let defaultMode: ColorModeType = prefersDarkMode === true ? 'dark' : 'light';
  const [mode, setMode] = React.useState<ColorModeType>(defaultMode);
  React.useEffect(() => {
    const localMode = getColorMode();
    if (localMode && mode !== localMode) {
      if (localMode === 'dark') {
        setMode('dark');
        setColorMode('dark');
      } else {
        setMode('light');
        setColorMode('light');
      }
    }
  }, [mode]);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          setColorMode(newMode);
          return newMode;
        });
      }
    }),
    []
  );
  const theme = React.useMemo(() => getTheme(mode), [mode]);

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Blog App</title>
        <meta name="description" content="Blog app general meta description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <UserProvider>
            <GlobalApiComponent />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
}
