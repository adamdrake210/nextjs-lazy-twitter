import React from "react";
import { GetServerSideProps } from "next";
import { Grid, Typography } from "@mui/material";

import { Layout } from "@/layout/Layout";
import { UserProfileDetails } from "@/components/profile/UserProfileDetails";
import { TweetTopicsList } from "@/components/tweetInfo/TweetTopicsList";

export default function UserDashboard() {
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
