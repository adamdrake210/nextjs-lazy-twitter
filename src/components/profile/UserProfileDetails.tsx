import React from "react";
import { Box, Typography } from "@mui/material";

import { User } from "@/types/types";

type UserProfileDetailsProps = {
  userData: User | null;
};

export const UserProfileDetails = ({ userData }: UserProfileDetailsProps) => {
  return (
    <>
      {userData ? (
        <>
          <Typography>Welcome {userData.email}</Typography>
          <Typography>{userData.twitterhandle}</Typography>
        </>
      ) : (
        <Box sx={{ mt: 2 }}>
          <Typography component="p" color="error">
            No user information found. Please try again.
          </Typography>
        </Box>
      )}
    </>
  );
};
