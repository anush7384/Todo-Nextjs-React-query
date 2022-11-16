import { QueryClient, QueryClientProvider } from "react-query";

import LoginPage from "../components/Login/LoginPage";

const queryClient = new QueryClient();

export default function Login() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginPage />
    </QueryClientProvider>
  );
}
