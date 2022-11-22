import { getCookie, isNilOrEmpty } from "../src/utils/helper";
import Todo from "../components/Home/Todo";

const Home = () => {
  return <Todo />;
};

export const getServerSideProps = async (context) => {
  const { req } = context;
  const cookies = req.headers.cookie;
  const accessToken = getCookie(cookies);

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
