import React from "react";
import { useQuery } from "react-query";

import { getUserProfile } from "@/services/api/userApi";
import { Loading } from "../Loading";
import { Box, Typography } from "@mui/material";
import { User } from "@/types/types";

export const UserProfileDetails = () => {
  const { data, isLoading, isError, error } = useQuery<User, Error>(
    ["profile"],
    () => getUserProfile()
  );

  return (
    <Loading isLoading={isLoading} isError={isError} error={error}>
      {data ? (
        <>
          <Typography>Welcome {data.email}</Typography>
          <Typography>{data.twitterhandle}</Typography>
        </>
      ) : (
        <Box sx={{ mt: 2 }}>
          <Typography component="p">Some shit went wrong </Typography>
        </Box>
      )}
    </Loading>
  );
};
