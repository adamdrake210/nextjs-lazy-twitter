import React, { ReactNode } from "react";
import Head from "next/head";
import { Box } from "@mui/material";

import { COMPANY_NAME } from "@/constants/constants";
import { Footer } from "@/components/Footer";
import Navigation from "@/components/navigation/Navigation";

type LayoutProps = {
  children: ReactNode;
  title: string;
  cookies?: any;
};

export const Layout = ({ children, title, cookies }: LayoutProps) => {
  return (
    <div>
      <Head>
        <title>
          {title} | {COMPANY_NAME}
        </title>
      </Head>
      <Navigation cookies={cookies} />
      <Box
        component="main"
        maxWidth="lg"
        sx={{
          padding: 2,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
      <Footer />
    </div>
  );
};
