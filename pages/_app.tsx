import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import PageLoader from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";

import { useProviderConfig } from "@/components/hooks";
import { ThemeProvider } from "@/components/providers";
import { trpc } from "@/server";

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider>
    <ThirdwebProvider {...useProviderConfig()}>
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
      <PageLoader color="black" />
      <Component {...pageProps} />
    </ThirdwebProvider>
  </ThemeProvider>
);

export default trpc.withTRPC(App);
