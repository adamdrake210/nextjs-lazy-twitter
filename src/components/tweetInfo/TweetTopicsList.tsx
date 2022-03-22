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
import { TweetInfo, UserWithTweetInfo } from "@/types/types";

import { Loading } from "../Loading";
import ModalContainer from "../common/modal/ModalContainer";
import { TweetTopicsForm } from "./TweetTopicsForm";
import { RQ_KEY_TWEETINFO } from "@/constants/constants";
import { getOneUser } from "@/services/api/userApi";

type TweetTopicsListProps = {
  userId: number | undefined;
};

export const TweetTopicsList = ({ userId }: TweetTopicsListProps) => {
  const { open, handleClose, handleOpen } = useOpen();

  const { data, isLoading, isError, error } = useQuery<
    UserWithTweetInfo,
    Error
  >([RQ_KEY_TWEETINFO], () => getOneUser(userId || 0));

  return (
    <Loading isLoading={isLoading} isError={isError} error={error}>
      <Typography variant="h4" component="h2">
        Tweet Topics
      </Typography>
      {data && data.tweetinfo.tweettopics.length > 0 ? (
        <>
          <List dense>
            {data.tweetinfo.tweettopics.map((topic: string) => {
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
          tweetInfo={data && data.tweetinfo}
        />
      </ModalContainer>
    </Loading>
  );
};
