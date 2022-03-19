import React from "react";
import { Control } from "react-hook-form";

import ControlledTextField from "./ControlledTextField";

type Props = {
  control: Control<any>;
  name: string;
  label: string;
};

export default function ControlledPasswordField({
  control,
  name,
  label,
}: Props) {
  return (
    <ControlledTextField
      control={control}
      name={name}
      type="password"
      label={label}
      rules={{
        required: `${label} is required`,
        minLength: {
          value: 8,
          message: "Password must have at least 8 characters",
        },
      }}
    />
  );
}
