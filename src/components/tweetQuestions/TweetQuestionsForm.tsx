import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  Box,
  Button,
  IconButton,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

import { RQ_KEY_TWEETINFO } from "@/constants/constants";
import { useFieldArray, useForm } from "react-hook-form";
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

type FormDataValues = { questions: Array<{ question: string }> };

export const TweetQuestionsForm = ({
  handleClose,
  tweetInfo,
}: TweetQuestionsFormProps) => {
  const classes = useStyles();
  const queryClient = useQueryClient();

  const { handleSubmit, control } = useForm<FormDataValues>();

  const { fields, append, remove } = useFieldArray({
    name: "questions",
    control,
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

  const onSubmit = (formData: FormDataValues) => {
    const updatedTweetQuestions = formData.questions.map((question) => {
      return question.question;
    });

    editMutation.mutate({
      id: tweetInfo?.id,
      tweetquestions: updatedTweetQuestions.filter((el) => el),
    });
  };

  useEffect(() => {
    if (tweetInfo) {
      tweetInfo.tweetquestions.forEach((question) => {
        append({ question: question });
      });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.formContainer}>
      <Typography variant="h4" gutterBottom>
        Tweet Questions
      </Typography>

      {fields.map((field, index) => {
        return (
          <Box
            key={field.id}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ControlledTextField
              control={control}
              name={`questions.${index}.question`}
              label={`Question #${index + 1}`}
              rules={{
                maxLength: {
                  value: 120,
                  message: "String can be maximum 120 characters",
                },
              }}
            />

            <Tooltip title="Remove this question">
              <IconButton color="error" onClick={() => remove(index)}>
                <RemoveCircleOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      })}
      <Tooltip title="Add a question">
        <IconButton color="primary" onClick={() => append({ question: "" })}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Tooltip>

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
