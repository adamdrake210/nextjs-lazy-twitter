import { axiosCall } from "@/utils/apiHelpers";
import { API_ENDPOINTS } from "./apiConstants";

const { API_USER_LOGIN } = API_ENDPOINTS;

export function createToken(createTokenParams: {
  email: string;
  password: string;
}) {
  return axiosCall({
    method: API_USER_LOGIN.method,
    url: API_USER_LOGIN.url,
    data: createTokenParams,
  });
}
