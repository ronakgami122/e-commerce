import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { COLORS } from "../../utils/colors";

const CustomButton = ({
  children,
  loading = false,
  disabled = false,
  variant = "contained",
  color = COLORS.pink,
  size = "medium",
  fullWidth = false,
  sx = {},
  ...props
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      sx={{
        color: "white",
        textTransform: "none",
        boxShadow: "none",
        fontWeight: 600,
        backgroundColor: color,
        ...sx,
      }}
      {...props}
    >
      {loading ? <CircularProgress color="inherit" size={24} /> : children}
    </Button>
  );
};

export default CustomButton;
