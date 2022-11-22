import SignupPage from "../components/Signup/SignupPage";
import { getCookie, isNilOrEmpty } from "../src/utils/helper";

const SignUp = () => {
  return <SignupPage />;
};
export default SignUp;

export const getServerSideProps = async (context) => {
  const { req } = context;
  const cookies = req.headers.cookie;
  const accessToken = getCookie(cookies);

  if (isNilOrEmpty(accessToken)) {
    return {
      props: {},
    };
  } else
    return {
      redirect: {
        destination: "/home",
        permanent: true,
      },
    };
};
