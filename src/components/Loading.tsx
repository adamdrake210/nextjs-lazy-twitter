import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

type Props = {
  error?: any;
  isLoading?: boolean;
  isError?: boolean;
  children?: any;
  loadingMessage?: string;
};

export const Loading = ({
  isLoading,
  loadingMessage,
  isError,
  error,
  children = null,
}: Props) => {
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
        <Typography variant="subtitle1" sx={{ my: 2 }}>
          {loadingMessage || "Loading..."}
        </Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="error">
          There was a problem loading this request - {error && error.message}
        </Typography>
      </Box>
    );
  }

  return children;
};
