import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { Layout } from "@/layout/Layout";
import { UserProfileDetails } from "@/components/profile/UserProfileDetails";
import { TweetTopicsList } from "@/components/tweetInfo/TweetTopicsList";
import { ACCESS_TOKEN } from "@/constants/constants";
import { LOGIN } from "@/constants/routerConstants";
import { User } from "@/types/types";
import { Loading } from "@/components/Loading";
import { getUserProfile } from "@/services/api/userApi";

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

  return (
    <Layout title="Home">
      <Typography component="h1" variant="h3" gutterBottom>
        Your Dashboard
      </Typography>
      <Loading isLoading={isLoading} isError={isError} error={error}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <UserProfileDetails userData={userData || null} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TweetTopicsList userId={userData?.id} />
          </Grid>
        </Grid>
      </Loading>
    </Layout>
  );
}
