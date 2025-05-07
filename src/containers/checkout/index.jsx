import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../assets";
import { COLORS } from "../../utils/colors";
import CustomButton from "../../shared/customButton";
import { URLS } from "../../constants/urls";

const Checkout = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate(URLS.PRODUCTS);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 3,
        }}
      >
        {/* Clock Icon */}
        <Box sx={{ width: 80, height: 80 }}>
          <img
            src={IMAGES.clock}
            alt="Clock"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Box>

        {/* Right/Check Mark */}
        <Box sx={{ width: 60, height: 60 }}>
          <img
            src={IMAGES.right}
            alt="Success"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Box>

        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: COLORS.text,
            mb: 1,
          }}
        >
          Your Order Is Completed!
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            color: COLORS.gray,
            maxWidth: 500,
            mb: 2,
          }}
        >
          Thank you for your order! Your order is being processed and will be
          completed within 3-6 hours. You will receive an email confirmation
          when your order is completed.
        </Typography>

        {/* Continue Shopping Button */}
        <CustomButton
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </CustomButton>
      </Box>
    </Container>
  );
};

export default Checkout;
