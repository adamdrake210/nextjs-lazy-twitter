import { ACCESS_TOKEN } from "@/constants/constants";
import { axiosCall } from "@/utils/apiHelpers";
import { API_ENDPOINTS } from "./apiConstants";

const { API_GET_ALL_TWEET_INFO } = API_ENDPOINTS;

export function getAllTweetInfo() {
  return axiosCall({
    method: API_GET_ALL_TWEET_INFO.method,
    url: API_GET_ALL_TWEET_INFO.url,
    headers: {
      Authorization: `Bearer ${localStorage[ACCESS_TOKEN]}`,
    },
  });
}
