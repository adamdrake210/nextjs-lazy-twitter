import React from "react";
import { Typography } from "@mui/material";

type Props = {
  message: string;
};

const ShowError = ({ message }: Props) => (
  <Typography variant="body2" sx={{ color: "error.light" }}>
    An error occurred: {message}.
  </Typography>
);

export default ShowError;
