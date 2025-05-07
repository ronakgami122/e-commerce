import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../constants/urls";
import { COLORS } from "../../utils/colors";
import { IMAGES } from "../../assets";
import CustomButton from "../../shared/customButton";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate(URLS.INITIAL);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "calc(100vh - 200px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        textAlign: "center",
      }}
    >
      {/* Main Image */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          mb: 4,
        }}
      >
        <img
          src={IMAGES.notfound}
          alt="404 Error"
          style={{
            width: "100%",
            height: "45%",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* Error Message */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          color: COLORS.text,
          mb: 2,
        }}
      >
        oops! The page you requested was not found!
      </Typography>

      {/* Back to Home Button */}
      <CustomButton onClick={handleBackToHome}>Back To Home</CustomButton>

      {/* Logo Grid */}
      <div className="mt-6 items-center justify-center flex">
        <img src={IMAGES.login} />
      </div>
    </Container>
  );
};

export default NotFound;
