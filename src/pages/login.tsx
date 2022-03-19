import React from "react";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Box, Typography } from "@mui/material";

import { HOME } from "@/constants/routerConstants";

import { COMPANY_NAME } from "@/constants/constants";
import { green } from "@mui/material/colors";
import { Layout } from "@/layout/Layout";
import LoginForm from "@/components/login/LoginForm";

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
// const session = await getSession({ req });
// if (!session) {
//   res.statusCode = 403;
//   return { props: {} };
// }

// return {
//   redirect: {
//     destination: HOME,
//     permanent: false,
//   },
// };
// };

export default function Login() {
  return (
    <Layout title="Lazy Twitter">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minHeight: "90vh",
        }}
      >
        <Typography component="h1" variant="h3" gutterBottom textAlign="center">
          Welcome to <span style={{ color: green[600] }}>{COMPANY_NAME}</span>
        </Typography>
        <LoginForm />
      </Box>
    </Layout>
  );
}
