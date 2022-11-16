import React from "react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import * as R from "ramda";

import { getCookie } from "../utils/helper";

import Todo from "../components/Home/Todo";

const queryClient = new QueryClient();

const isNilOrEmpty = R.anyPass([R.isNil, R.isEmpty]);

const Home = () => {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <Todo />
    </QueryClientProvider>
  );
};

export const getServerSideProps = async (context) => {
  const { req } = context;
  const cookies = req.headers.cookie;

  const accessToken = getCookie(cookies);
  console.log();

  if (isNilOrEmpty(accessToken)) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
