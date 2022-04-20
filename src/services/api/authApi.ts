import { axiosCall } from "@/utils/apiHelpers";
import { API_ENDPOINTS } from "./apiConstants";

const { API_AUTH_LOGIN, API_AUTH_LOGOUT } = API_ENDPOINTS;

export function createToken(createTokenParams: {
  email: string;
  password: string;
}) {
  return axiosCall({
    method: API_AUTH_LOGIN.method,
    url: API_AUTH_LOGIN.url,
    data: createTokenParams,
  });
}

export function logout() {
  return axiosCall({
    method: API_AUTH_LOGOUT.method,
    url: API_AUTH_LOGOUT.url,
  });
}
