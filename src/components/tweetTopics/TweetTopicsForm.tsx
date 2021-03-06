import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Box,
  Button,
  IconButton,
  Theme,
  Typography,
  Tooltip,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

import { RQ_KEY_TWEETINFO } from "@/constants/constants";
import { TweetInfo } from "@/types/types";
import { updateTweetInfo } from "@/services/api/tweetInfoApi";
import { Loading } from "../Loading";
import ControlledTextField from "@/components/common/fields/ControlledTextField";
import ShowError from "../common/ShowError";

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

type TweetTopicsFormProps = {
  handleClose: () => void;
  tweetInfo?: TweetInfo;
};

type FormDataValues = { topics: Array<{ topic: string }> };

export const TweetTopicsForm = ({
  handleClose,
  tweetInfo,
}: TweetTopicsFormProps) => {
  const classes = useStyles();
  const queryClient = useQueryClient();

  const { handleSubmit, control } = useForm<FormDataValues>();

  const { fields, append, remove } = useFieldArray({
    name: "topics",
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
    const updatedTweetTopics = formData.topics.map((topic) => {
      return topic.topic;
    });

    editMutation.mutate({
      id: tweetInfo?.id,
      tweettopics: updatedTweetTopics.filter((el) => el),
    });
  };

  useEffect(() => {
    if (tweetInfo) {
      tweetInfo.tweettopics.forEach((topic) => {
        append({ topic: topic });
      });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.formContainer}>
      <Typography variant="h4" gutterBottom>
        Tweet Topics
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
              name={`topics.${index}.topic`}
              label={`Topic #${index + 1}`}
              rules={{
                maxLength: {
                  value: 24,
                  message: "String can be maximum 24 characters",
                },
              }}
            />

            <Tooltip title="Remove this topic">
              <IconButton color="error" onClick={() => remove(index)}>
                <RemoveCircleOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      })}
      <Tooltip title="Add a topic">
        <IconButton color="primary" onClick={() => append({ topic: "" })}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Tooltip>

      {editMutation.isLoading && (
        <Loading
          isLoading={editMutation.isLoading}
          loadingMessage="Updating Topics..."
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
