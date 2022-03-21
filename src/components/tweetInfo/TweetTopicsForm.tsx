import React, { useState } from "react";
import { Button, IconButton, Theme, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useMutation, useQueryClient } from "react-query";
import { RQ_KEY_TWEETINFO } from "@/constants/constants";
import { useForm } from "react-hook-form";
import { TweetInfo } from "@/types/types";
import { updateTweetInfo } from "@/services/api/tweetInfoApi";
import { Loading } from "../Loading";
import ControlledTextField from "../common/fields/ControlledTextField";
import { HdrPlus } from "@mui/icons-material";

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
    width: "100%",
    margin: theme.spacing(2, 0),
  },
}));

type TweetTopicsFormProps = {
  handleClose: () => void;
  tweetInfo?: TweetInfo;
  isEditing?: boolean;
};

const getDefaultValues = (tweetInfo: TweetInfo) => {
  const obj = tweetInfo.tweettopics.reduce(
    (acc, cur) => ({ ...acc, [cur]: cur }),
    {}
  );
  return obj;
};

export const TweetTopicsForm = ({
  handleClose,
  tweetInfo,
  isEditing,
}: TweetTopicsFormProps) => {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const [inputFieldCount, setInputFieldCount] = useState(["0"]);
  const { handleSubmit, control } = useForm<any>({
    defaultValues: tweetInfo ? getDefaultValues(tweetInfo) : null,
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

  const onSubmit = (formData: { god: string }) => {
    console.log("formData: ", formData);

    editMutation.mutate({
      id: tweetInfo?.id,
      tweettopics: Object.values(formData).filter((el) => el),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.formContainer}>
      <Typography variant="h4">Tweet Topics</Typography>

      {isEditing &&
        tweetInfo &&
        tweetInfo.tweettopics.map((topic, index) => {
          return (
            <ControlledTextField
              key={`${topic + index}`}
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
          );
        })}

      {inputFieldCount.map((count, index) => {
        return (
          <ControlledTextField
            key={`count${index}`}
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
        );
      })}

      <IconButton
        color="primary"
        onClick={() => setInputFieldCount([...inputFieldCount, "some"])}
      >
        <HdrPlus />
      </IconButton>

      {editMutation.isLoading && (
        <Loading
          isLoading={editMutation.isLoading}
          loadingMessage="Updating Team..."
          isError={editMutation.isError}
          error={editMutation.error}
        />
      )}

      <div className={classes.buttonsContainer}>
        <Button type="submit" variant="contained" color="primary">
          Add Tweet Topics
        </Button>
        <Button onClick={handleClose} type="button" variant="outlined">
          Cancel
        </Button>
      </div>
    </form>
  );
};
