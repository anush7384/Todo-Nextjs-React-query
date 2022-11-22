import { todoApi } from "../utils/api";
import { getCookie } from "../utils/helper";

const requestMethod = async (path, method, data) => {
  const cookies = document.cookie;
  const token = getCookie(cookies);
  const getMethod = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const postMethod = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  const deleteMethod = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  const patchMethod = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  const putMethod = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(
    todoApi.concat(path),
    method === "POST"
      ? postMethod
      : method === "GET"
      ? getMethod
      : method === "DELETE"
      ? deleteMethod
      : method === "PATCH"
      ? patchMethod
      : putMethod
  );
  return response.json();
};

export default requestMethod;
