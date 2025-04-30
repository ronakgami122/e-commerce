import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const CustomButton = ({
  children,
  loading = false,
  disabled = false,
  variant = "contained",
  color = "primary",
  size = "medium",
  fullWidth = true,
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
        textTransform: "none",
        borderRadius: 2,
        fontWeight: 600,
        letterSpacing: 0.5,
        boxShadow: "none",
        transition: "0.3s",
        "&:hover": {
          boxShadow: `0 4px 20px rgba(0, 0, 0, 0.1)`,
        },
        "&:active": {
          transform: "scale(0.98)",
        },
        ...sx,
      }}
      {...props}
    >
      {loading ? <CircularProgress color="inherit" size={24} /> : children}
    </Button>
  );
};

export default CustomButton;
