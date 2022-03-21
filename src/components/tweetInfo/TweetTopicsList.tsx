import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useQuery } from "react-query";

import { useOpen } from "@/hooks/useOpen";
import { getAllTweetInfo } from "@/services/api/tweetInfoApi";
import { TweetInfo } from "@/types/types";

import { Loading } from "../Loading";
import ModalContainer from "../common/modal/ModalContainer";
import { TweetTopicsForm } from "./TweetTopicsForm";
import { RQ_KEY_TWEETINFO } from "@/constants/constants";

export const TweetTopicsList = () => {
  const { open, handleClose, handleOpen } = useOpen();

  const { data, isLoading, isError, error } = useQuery<TweetInfo[], Error>(
    [RQ_KEY_TWEETINFO],
    () => getAllTweetInfo()
  );

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
      <Box>
        <Button color="primary" variant="contained" onClick={handleOpen}>
          Edit Topics
        </Button>
      </Box>
      <ModalContainer handleClose={handleClose} open={open}>
        <TweetTopicsForm
          handleClose={handleClose}
          tweetInfo={data && data[0]}
          isEditing={data && data[0].tweettopics.length > 0}
        />
      </ModalContainer>
    </Loading>
  );
};
