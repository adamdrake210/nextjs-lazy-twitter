import axios from "axios";
import { API_ENDPOINTS } from "./apiConstants";

const { API_USER_LOGIN } = API_ENDPOINTS;

export async function createToken(createTokenParams: {
  email: string;
  password: string;
}) {
  return await axios({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    method: "post",
    url: API_USER_LOGIN.url,
    data: createTokenParams,
  });
}
