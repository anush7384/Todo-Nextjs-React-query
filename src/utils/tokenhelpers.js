export function setCookie(token) {
  document.cookie = "token=" + token;
}

export function getCookie(cookie) {
  let name = "token=";
  let decodedCookie = "";
  if (typeof window !== "undefined") decodedCookie = decodeURIComponent(cookie);
  let ca = cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    let s = c.substring(1, name.length + 1);
    if (name === s) return c.substring(name.length + 1);
  }
  return "";
}

export function clearCookie() {
  document.cookie =
    "token" + "=; Path=/; expires=Sat, 19 Nov 2022 00:00:01 GMT;";
}
