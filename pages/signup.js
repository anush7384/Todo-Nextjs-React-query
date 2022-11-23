import SignupPage from "../components/Signup/SignupPage";
import { isPresent } from "../src/utils/helper";
import { getCookie } from "../src/utils/tokenhelpers";

const SignUp = () => {
  return <SignupPage />;
};
export default SignUp;

export const getServerSideProps = async (context) => {
  const { req } = context;
  const cookies = req.headers.cookie;
  const accessToken = getCookie(cookies);

  if(isPresent(accessToken)) {
    return{
      redirect: {
        destination: "/home",
        permanent: true,
      },
    };
  }
  return {
    props:{}
  };
};
