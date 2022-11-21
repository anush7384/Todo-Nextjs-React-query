import { QueryClient, QueryClientProvider } from "react-query";
import * as R from "ramda";

import SignupPage from "../components/Signup/SignupPage";
import { getCookie } from "../utils/helper";

const queryClient = new QueryClient();

const isNilOrEmpty = R.anyPass([R.isNil, R.isEmpty]);

export default function SignUp() {
  return (
    <QueryClientProvider client={queryClient}>
      <SignupPage />
    </QueryClientProvider>
  );
}

export const getServerSideProps = async (context) => {
  const { req } = context;
  const cookies = req.headers.cookie;

  const accessToken = getCookie(cookies);
  console.log(accessToken);
  console.log(isNilOrEmpty(accessToken));

  if (isNilOrEmpty(accessToken)) {
    return {
        props:{},
    };
  }
else 
  return {
    redirect: {
      destination: "/home",
      permanent: true,
    },
  };
};
