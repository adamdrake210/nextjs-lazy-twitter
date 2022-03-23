import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Box, Button, IconButton, Theme, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

import { RQ_KEY_TWEETINFO } from "@/constants/constants";
import { useForm } from "react-hook-form";
import { TweetInfo } from "@/types/types";
import { updateTweetInfo } from "@/services/api/tweetInfoApi";
import { Loading } from "../Loading";
import ControlledTextField from "@/components/common/fields/ControlledTextField";
import ShowError from "../common/ShowError";
import { convertArrayToObj } from "@/utils/convertArrayToObj";

const useStyles = makeStyles<Theme>((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 400,
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "70%",
    margin: theme.spacing(2, 0),
  },
}));

type TweetQuestionsFormProps = {
  handleClose: () => void;
  tweetInfo?: TweetInfo;
};

export const TweetQuestionsForm = ({
  handleClose,
  tweetInfo,
}: TweetQuestionsFormProps) => {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const [tweetQuestions, setTweetQuestions] = useState<string[]>([]);
  const [inputFieldCount, setInputFieldCount] = useState(["random"]);

  const { handleSubmit, control, unregister } = useForm<any>({
    defaultValues:
      tweetInfo && tweetInfo?.tweetquestions.length > 0
        ? convertArrayToObj(tweetInfo.tweetquestions, "tweetquestion")
        : null,
  });

  const mutationOptions = {
    onError: (err: Error) => {
      console.error(err.message);
    },
    onSuccess: () => {
      queryClient.refetchQueries([RQ_KEY_TWEETINFO]);
      handleClose();
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries([RQ_KEY_TWEETINFO]);
    },
  };

  const editMutation = useMutation<TweetInfo, Error, Partial<TweetInfo>>(
    updateTweetInfo,
    mutationOptions
  );

  const onSubmit = (formData: { [key: string]: string }) => {
    editMutation.mutate({
      id: tweetInfo?.id,
      tweetquestions: Object.values(formData).filter((el) => el),
    });
  };

  const handleRemoveItem = (question: string) => {
    const updatedQuestions = tweetQuestions.filter((tt) => {
      return tt !== question;
    });
    setTweetQuestions(updatedQuestions);
    unregister(`tweetquestion${tweetQuestions.indexOf(question)}`);
  };

  useEffect(() => {
    if (tweetInfo) {
      setTweetQuestions(tweetInfo.tweetquestions);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.formContainer}>
      <Typography variant="h4" gutterBottom>
        Tweet Topics
      </Typography>

      {tweetQuestions.map((question, index) => {
        return (
          <Box
            key={`${index}`}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ControlledTextField
              control={control}
              name={`tweetquestion${tweetQuestions.indexOf(question)}`}
              label={`Question #${index + 1}`}
              rules={{
                maxLength: {
                  value: 120,
                  message: "String can be maximum 120 characters",
                },
              }}
            />
            <IconButton
              color="error"
              onClick={() => handleRemoveItem(question)}
            >
              <RemoveCircleOutlineOutlinedIcon />
            </IconButton>
          </Box>
        );
      })}

      {inputFieldCount.map((count, index) => {
        return (
          <Box
            key={`topic${index}`}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ControlledTextField
              control={control}
              name={`newtweetquestion${index}`}
              label="Add Question"
              rules={{
                maxLength: {
                  value: 120,
                  message: "String can be maximum 120 characters",
                },
              }}
            />
            <IconButton
              color="primary"
              onClick={() => setInputFieldCount([...inputFieldCount, "random"])}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>
        );
      })}

      {editMutation.isLoading && (
        <Loading
          isLoading={editMutation.isLoading}
          loadingMessage="Updating Questions..."
          isError={editMutation.isError}
          error={editMutation.error}
        />
      )}

      {editMutation.isError && (
        <ShowError message={editMutation.error.message} />
      )}

      <div className={classes.buttonsContainer}>
        <Button
          onClick={handleClose}
          type="button"
          variant="outlined"
          color="secondary"
          disabled={editMutation.isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={editMutation.isLoading}
        >
          Save
        </Button>
      </div>
    </form>
  );
};
