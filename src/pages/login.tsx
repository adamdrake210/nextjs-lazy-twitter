import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";

import { HOME } from "@/constants/routerConstants";

import { ACCESS_TOKEN, COMPANY_NAME } from "@/constants/constants";
import { green } from "@mui/material/colors";
import { Layout } from "@/layout/Layout";
import LoginForm from "@/components/login/LoginForm";
import { useRouter } from "next/router";

export default function Login() {
  return (
    <Layout title="Login">
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
