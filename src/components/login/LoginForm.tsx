import { Button, Theme, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";

import { createToken } from "@/services/api/authApi";
import ControlledTextField from "@/components/common/ControlledTextField";
import ControlledPasswordField from "@/components/common/ControlledPasswordField";
import { Loading } from "../Loading";
import { HOME } from "@/constants/routerConstants";
import { ACCESS_TOKEN } from "@/constants/constants";

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

export type UpdateTeamFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { handleSubmit, control } = useForm<UpdateTeamFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutationOptions = {
    onError: (err: Error) => {
      console.error(err.message);
    },
    onSuccess: (data: any) => {
      queryClient.refetchQueries();
      localStorage.setItem(ACCESS_TOKEN, data.access_token);
      router.push(HOME);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  };

  const createMutation = useMutation<any, Error, any>(
    createToken,
    mutationOptions
  );

  const onSubmit = (formData: UpdateTeamFormValues) => {
    createMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.formContainer}>
      <Typography variant="h4">Login</Typography>

      <ControlledTextField
        control={control}
        name="email"
        label="Email"
        rules={{
          required: "Email is required",
        }}
      />

      <ControlledPasswordField
        control={control}
        name="password"
        label="Password"
      />

      {createMutation.isLoading && (
        <Loading
          isLoading={createMutation.isLoading}
          loadingMessage="Logging in..."
          isError={createMutation.isError}
          error={createMutation.error}
        />
      )}

      <div className={classes.buttonsContainer}>
        {/* <Button onClick={handleClose} type="button" variant="contained">
          Cancel
        </Button> */}
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
