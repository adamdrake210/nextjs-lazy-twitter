import { ACCESS_TOKEN } from "@/constants/constants";
import { axiosCall } from "@/utils/apiHelpers";
import { API_ENDPOINTS } from "./apiConstants";

const { API_USER_PROFILE } = API_ENDPOINTS;

export function getUserProfile() {
  return axiosCall({
    method: API_USER_PROFILE.method,
    url: API_USER_PROFILE.url,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  });
}
