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

import ModalContainer from "@/components/common/modal/ModalContainer";
import { TweetQuestionsForm } from "./TweetQuestionsForm";

type TweetQuestionsListProps = {
  tweetInfoData: UserWithTweetInfo | undefined;
};

export const TweetQuestionsList = ({
  tweetInfoData,
}: TweetQuestionsListProps) => {
  const { open, handleClose, handleOpen } = useOpen();

  return (
    <>
      <Typography variant="h4" component="h2">
        Tweet Questions
      </Typography>
      {tweetInfoData && tweetInfoData.tweetinfo.tweetquestions.length > 0 ? (
        <>
          <List dense>
            {tweetInfoData.tweetinfo.tweetquestions.map((topic: string) => {
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
          Edit Questions
        </Button>
      </Box>
      <ModalContainer handleClose={handleClose} open={open}>
        <TweetQuestionsForm
          handleClose={handleClose}
          tweetInfo={tweetInfoData && tweetInfoData.tweetinfo}
        />
      </ModalContainer>
    </>
  );
};
