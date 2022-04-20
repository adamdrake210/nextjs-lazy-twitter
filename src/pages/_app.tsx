import React, { useEffect } from "react";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { CacheProvider } from "@emotion/react";
import {
  ThemeProvider,
  CssBaseline,
  PaletteMode,
  createTheme,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { EmotionCache } from "@emotion/cache";

import getDesignTokens from "styles/theme";
import createEmotionCache from "@/styles/createEmotionCache";

const queryClient = new QueryClient();
const clientSideEmotionCache = createEmotionCache();

const App = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: AppProps & { emotionCache: EmotionCache }) => {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // material ui
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(() => {
    if (prefersDarkMode) {
      setMode("dark");
    }
  }, [prefersDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
