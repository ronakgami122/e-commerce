import React, { useState } from "react";
import { useField } from "formik";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const CustomInput = ({
  label,
  placeholder = "",
  fullWidth = true,
  variant = "outlined",
  size = "medium",
  password = false,
  ...props
}) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      {...field}
      label={label}
      placeholder={placeholder}
      fullWidth={fullWidth}
      variant={variant}
      size={size}
      type={password && !showPassword ? "password" : "text"}
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.touched && meta.error ? meta.error : ""}
      sx={{ my: 1 }}
      InputProps={{
        endAdornment: password && (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CustomInput;
