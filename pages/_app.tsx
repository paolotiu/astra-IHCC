import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import type { AppProps } from 'next/app';
import React from 'react';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins',
    allVariants: {
      fontFamily: 'Poppins',
    },
  },
  palette: {
    primary: {
      main: '#6DBD76',
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
