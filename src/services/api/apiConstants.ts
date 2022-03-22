export const API_ENDPOINTS = {
  // USER API ENDPOINTS

  API_USER_LOGIN: {
    method: "post",
    url: "auth/login",
  },
  API_USER_REGISTER: {
    method: "post",
    url: "register",
  },
  API_USER_PROFILE: {
    method: "get",
    url: "profile",
  },
  API_GET_ONE_USER: {
    method: "get",
    url: "users",
  },

  // TweetInfo

  API_GET_ALL_TWEET_INFO: {
    method: "get",
    url: "tweetinfo",
  },
  API_CREATE_TWEET_INFO: {
    method: "post",
    url: "tweetinfo",
  },
  API_UPDATE_TWEET_INFO: {
    method: "patch",
    url: "tweetinfo",
  },
};
