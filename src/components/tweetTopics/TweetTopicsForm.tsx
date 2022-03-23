import React, { useCallback, useEffect, useMemo, useState } from "react";
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

const getDefaultValues = (tweettopics: TweetInfo["tweettopics"]) => {
  const obj = tweettopics.reduce((acc, cur) => ({ ...acc, [cur]: cur }), {});
  return obj;
};

export const TweetTopicsForm = ({
  handleClose,
  tweetInfo,
}: TweetTopicsFormProps) => {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const [tweetTopics, setTweetTopics] = useState<string[]>([]);
  const [inputFieldCount, setInputFieldCount] = useState(["random"]);

  const { handleSubmit, control, unregister } = useForm<any>({
    defaultValues: tweetInfo ? getDefaultValues(tweetInfo.tweettopics) : null,
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
      tweettopics: Object.values(formData).filter((el) => el),
    });
  };

  const handleRemoveItem = (topic: string) => {
    const updatedTopics = tweetTopics.filter((tt) => {
      return tt !== topic;
    });
    setTweetTopics(updatedTopics);
    unregister(topic);
  };

  useEffect(() => {
    if (tweetInfo) {
      setTweetTopics(tweetInfo.tweettopics);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.formContainer}>
      <Typography variant="h4" gutterBottom>
        Tweet Topics
      </Typography>

      {tweetTopics.map((topic, index) => {
        return (
          <Box
            key={`${topic + index}`}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ControlledTextField
              control={control}
              name={topic}
              label={`Topic #${index + 1}`}
              rules={{
                maxLength: {
                  value: 24,
                  message: "String can be maximum 24 characters",
                },
              }}
            />
            <IconButton color="error" onClick={() => handleRemoveItem(topic)}>
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
              name={`tweettopic${index}`}
              label="Add Topic"
              rules={{
                maxLength: {
                  value: 24,
                  message: "String can be maximum 24 characters",
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
          loadingMessage="Updating Topics..."
          isError={editMutation.isError}
          error={editMutation.error}
        />
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
          Save Tweet Topics
        </Button>
      </div>
    </form>
  );
};
