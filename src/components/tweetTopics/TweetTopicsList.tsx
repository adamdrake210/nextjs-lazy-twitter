import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

import { useOpen } from "@/hooks/useOpen";
import { UserWithTweetInfo } from "@/types/types";

import ModalContainer from "../common/modal/ModalContainer";
import { TweetTopicsForm } from "./TweetTopicsForm";

type TweetTopicsListProps = {
  tweetInfoData: UserWithTweetInfo | undefined;
};

export const TweetTopicsList = ({ tweetInfoData }: TweetTopicsListProps) => {
  const { open, handleClose, handleOpen } = useOpen();

  return (
    <>
      <Typography variant="h4" component="h2">
        Tweet Topics
      </Typography>
      {tweetInfoData && tweetInfoData.tweetinfo.tweettopics.length > 0 ? (
        <>
          <List dense>
            {tweetInfoData?.tweetinfo.tweettopics.map((topic: string) => {
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
          tweetInfo={tweetInfoData?.tweetinfo}
        />
      </ModalContainer>
    </>
  );
};
