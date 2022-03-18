import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Grid, Typography } from "@mui/material";

import { Layout } from "@/layout/Layout";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  console.log("session: ", session);

  return {
    props: {
      session,
    },
  };
};

export default function UserDashboard() {
  return (
    <Layout title="Home">
      <Typography component="h1" variant="h3" gutterBottom>
        Your Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Typography>Howdy</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography>This is a secret dashboard!</Typography>
        </Grid>
      </Grid>
    </Layout>
  );
}
