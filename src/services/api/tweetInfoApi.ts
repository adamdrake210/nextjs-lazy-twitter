import { ACCESS_TOKEN } from "@/constants/constants";
import { TweetInfo } from "@/types/types";
import { axiosCall } from "@/utils/apiHelpers";
import { API_ENDPOINTS } from "./apiConstants";

const { API_GET_ALL_TWEET_INFO, API_CREATE_TWEET_INFO, API_UPDATE_TWEET_INFO } =
  API_ENDPOINTS;

export function getAllTweetInfo() {
  return axiosCall({
    method: API_GET_ALL_TWEET_INFO.method,
    url: API_GET_ALL_TWEET_INFO.url,
    headers: {
      Authorization: `Bearer ${localStorage[ACCESS_TOKEN]}`,
    },
  });
}

export function createTweetInfo(createTweetInfoParams: TweetInfo) {
  return axiosCall({
    method: API_CREATE_TWEET_INFO.method,
    url: API_CREATE_TWEET_INFO.url,
    headers: {
      Authorization: `Bearer ${localStorage[ACCESS_TOKEN]}`,
    },
    data: createTweetInfoParams,
  });
}

export function updateTweetInfo(
  updateTweetInfoParams: Partial<TweetInfo>,
  id: string
) {
  return axiosCall({
    method: API_UPDATE_TWEET_INFO.method,
    url: `${API_UPDATE_TWEET_INFO.url}/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage[ACCESS_TOKEN]}`,
    },
    data: updateTweetInfoParams,
  });
}
