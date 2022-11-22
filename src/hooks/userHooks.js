import { useRouter } from "next/router";
import { useMutation } from "react-query";

import requestMethod from "../services/requestMethods";
import { setCookie } from "../utils/helper";

const loginUser = async (data) => {
  const url = "users/login";
  return await requestMethod(url, "POST", data);
};

const registerUser = async (data) => {
  const url = "users";
  return await requestMethod(url, "POST", data);
};

export const useLoginUser = () => {
  let router = useRouter();
  const { mutate, isLoading } = useMutation(loginUser, {
    onSuccess: (data) => {
      setCookie(data.token);
      router.push("/home");
    },
  });
  return { mutate, isLoading };
};

export const useSignupUser = () => {
  let router = useRouter();
  const { mutate, isLoading } = useMutation(registerUser, {
    onSuccess: (data) => {
      setCookie(data.token);
      router.push("/home");
    },
  });
  return { mutate, isLoading };
};
