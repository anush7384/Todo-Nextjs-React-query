import LoginPage from "../components/Login/LoginPage";

import { isNilOrEmpty } from "../src/utils/helper";
import { getCookie } from "../src/utils/tokenhelpers";

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
