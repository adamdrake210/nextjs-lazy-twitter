export type TweetInfo = {
  id?: number;
  tweettopics: string[];
  tweetquestions: string[];
};

export type User = {
  id: number;
  email: string;
  twitterhandle: string;
};
