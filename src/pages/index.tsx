import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";

import { Layout } from "@/layout/Layout";
import { UserProfileDetails } from "@/components/profile/UserProfileDetails";
import { TweetTopicsList } from "@/components/tweetInfo/TweetTopicsList";
import { ACCESS_TOKEN } from "@/constants/constants";
import { LOGIN } from "@/constants/routerConstants";

export default function UserDashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage[ACCESS_TOKEN]) {
      router.push(LOGIN);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title="Home">
      <Typography component="h1" variant="h3" gutterBottom>
        Your Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <UserProfileDetails />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TweetTopicsList />
        </Grid>
      </Grid>
    </Layout>
  );
}
