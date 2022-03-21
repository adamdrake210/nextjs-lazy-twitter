import { getAllTweetInfo } from "@/services/api/tweetInfoApi";
import { TweetInfo } from "@/types/types";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { Loading } from "../Loading";

export const TweetTopicsList = () => {
  const { data, isLoading, isError, error } = useQuery<TweetInfo[], Error>(
    ["tweetinfo"],
    () => getAllTweetInfo()
  );

  console.log("data: ", data);

  return (
    <Loading isLoading={isLoading} isError={isError} error={error}>
      <Typography variant="h4" component="h2">
        Tweet Topics
      </Typography>
      {data && data[0].tweettopics.length > 0 ? (
        <>
          <List dense>
            {data[0].tweettopics.map((topic: string) => {
              return (
                <ListItem key={topic}>
                  <ListItemText primary={topic} />
                </ListItem>
              );
            })}
          </List>
        </>
      ) : (
        <Box sx={{ mt: 2 }}>
          <Typography component="p">
            You currently don&apos;t have any Tweet Topics
          </Typography>
        </Box>
      )}
    </Loading>
  );
};
