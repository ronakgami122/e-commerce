import React, { useState } from "react";
import { useField } from "formik";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { COLORS } from "../../utils/colors";

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
      sx={{
        my: 1,
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: COLORS.gray,
          },
          "&:hover fieldset": {
            borderColor: COLORS.gray,
          },
          "&.Mui-focused fieldset": {
            borderColor: COLORS.pink,
            borderWidth: "1px",
          },
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: COLORS.pink,
        },
      }}
      InputProps={{
        endAdornment: password && (
          <InputAdornment position="end">
            <IconButton
              onClick={handleTogglePassword}
              edge="end"
              sx={{
                color: COLORS.pink,
              }}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CustomInput;
