import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { Layout } from "@/layout/Layout";
import { TweetTopicsList } from "@/components/tweetTopics/TweetTopicsList";
import { ACCESS_TOKEN, RQ_KEY_TWEETINFO } from "@/constants/constants";
import { LOGIN } from "@/constants/routerConstants";
import { User, UserWithTweetInfo } from "@/types/types";
import { Loading } from "@/components/Loading";
import { getOneUser, getUserProfile } from "@/services/api/userApi";
import { TweetQuestionsList } from "@/components/tweetQuestions/TweetQuestionsList";

export default function UserDashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage[ACCESS_TOKEN]) {
      router.push(LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery<User, Error>(["profile"], () => getUserProfile());

  const userId = userData?.id;

  const {
    data: tweetInfoData,
    isIdle,
    isLoading: tweetInfoIsLoading,
    isError: tweetInfoIsError,
    error: tweetInfoError,
  } = useQuery<UserWithTweetInfo, Error>(
    [RQ_KEY_TWEETINFO],
    () => getOneUser(userId || 0),
    {
      enabled: !!userId,
    }
  );

  return (
    <Layout title="Home">
      <Typography component="h1" variant="h3" gutterBottom>
        Your Dashboard
      </Typography>
      <Loading
        isLoading={isLoading || tweetInfoIsLoading || isIdle}
        isError={isError || tweetInfoIsError}
        error={error || tweetInfoError}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TweetQuestionsList tweetInfoData={tweetInfoData} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TweetTopicsList tweetInfoData={tweetInfoData} />
          </Grid>
        </Grid>
      </Loading>
    </Layout>
  );
}
