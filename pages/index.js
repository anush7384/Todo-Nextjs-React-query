import Login from "./login";
import { QueryClient, QueryClientProvider } from "react-query";

import * as R from "ramda";

import { getCookie } from "../utils/helper";

const queryClient = new QueryClient();

const isNilOrEmpty = R.anyPass([R.isNil, R.isEmpty]);

const HomePage = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Login></Login>
    </QueryClientProvider>
  );
};

export default HomePage;

export const getServerSideProps = async (context) => {
  const cookies = context.req.headers?.cookie;
  const refreshToken = getCookie(cookies);

  if (isNilOrEmpty(refreshToken)) {
    return {
      props: {},
    };
  }

  return {
    redirect: {
      destination: "/home",
      permanent: false,
    },
  };
};
