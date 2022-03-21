import { Control, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

type Props = {
  control: Control<any>;
  name: string;
  label: string;
  rules: any;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
};

export default function ControlledTextField({
  control,
  name,
  label,
  rules,
  type,
  disabled,
  placeholder,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <TextField
          sx={{ my: 2, minWidth: 250 }}
          label={label}
          variant="outlined"
          fullWidth
          type={type}
          error={!!error}
          placeholder={placeholder}
          helperText={error ? error.message : null}
          value={field.value}
          disabled={disabled}
          onChange={field.onChange}
        />
      )}
      rules={rules}
    />
  );
}
