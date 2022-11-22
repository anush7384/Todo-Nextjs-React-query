import { QueryClient, QueryClientProvider } from "react-query";

import "../styles/globals.css";

const queryClient = new QueryClient();

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
