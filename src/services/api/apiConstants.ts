export const API_ENDPOINTS = {
  // AUTH API ENDPOINTS

  API_AUTH_LOGOUT: {
    method: "post",
    url: "auth/logout",
  },
  API_AUTH_LOGIN: {
    method: "post",
    url: "auth/login",
  },
  API_AUTH_REGISTER: {
    method: "post",
    url: "register",
  },

  // USER API ENDPOINTS

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
