import axios from "axios";
import { API_ENDPOINTS } from "./apiConstants";

const { API_USER_PROFILE } = API_ENDPOINTS;

export async function getUserProfile() {
  return await axios({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    method: "get",
    url: API_USER_PROFILE.url,
  });
}
