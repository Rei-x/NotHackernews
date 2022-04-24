import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "react-query";

const darkTheme = createTheme({
  type: "dark",
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </NextUIProvider>
  );
}

export default MyApp;
