import { getAllTweetInfo } from "@/services/api/tweetInfoApi";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { Loading } from "../Loading";

export const TweetTopicsList = () => {
  const { data, isLoading, isError, error } = useQuery<any, Error>(
    ["tweetinfo"],
    () => getAllTweetInfo()
  );

  return (
    <Loading isLoading={isLoading} isError={isError} error={error}>
      {data && data[0].tweettopics.length > 0 ? (
        <>
          <Typography>Tweet Topics</Typography>
          <ul>
            {data[0].tweettopics.map((topic: string) => {
              return <li key={topic}>{topic}</li>;
            })}
          </ul>
        </>
      ) : (
        <Box sx={{ mt: 2 }}>
          <Typography component="p">Some shit went wrong </Typography>
        </Box>
      )}
    </Loading>
  );
};
