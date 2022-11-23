import { QueryClient, QueryClientProvider } from "react-query";

import "../styles/globals.css";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import Router from "next/router";

const queryClient = new QueryClient();

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen bg-gray-200">
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
