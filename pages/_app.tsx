import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '@themes';
import { store } from '@store/index';
import '@styles/globals.css';
import AppWrapper from '@store/Wrapper';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <Provider store={store}>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <AppWrapper>
              <Component {...pageProps} />
            </AppWrapper>
          </ThemeProvider>
        </Provider>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
