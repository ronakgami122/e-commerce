import React from "react";
import { Outlet } from "react-router-dom";
import CustomFooter from "../shared/customFooter";
import CustomHeader from "../shared/customHeader";
import { COLORS } from "../utils/colors";
import { Box } from "@mui/material";

const PublicLayout = () => {
  return (
    <>
      <CustomHeader />
      <Box sx={{ backgroundColor: COLORS.background }}>
        <Outlet />
      </Box>
      <CustomFooter />
    </>
  );
};

export default PublicLayout;
