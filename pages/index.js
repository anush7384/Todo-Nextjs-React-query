import LoginPage from "../components/Login/LoginPage";

import { getCookie, isNilOrEmpty } from "../src/utils/helper";

const Login = () => {
  return <LoginPage />;
};

export default Login;

export const getServerSideProps = async (context) => {
  const cookies = context.req.headers?.cookie;
  const refreshToken = getCookie(cookies);

  if (!isNilOrEmpty(refreshToken)) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
