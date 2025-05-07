import React from "react";
import { Outlet } from "react-router-dom";
import CustomFooter from "../shared/customFooter";
import CustomHeader from "../shared/customHeader";
import { COLORS } from "../utils/colors";
import { Box } from "@mui/material";
import Breadcrumb from "../components/breadcrumb";

const PublicLayout = () => {
  return (
    <>
      <CustomHeader />
      <Breadcrumb />
      <Box sx={{ backgroundColor: COLORS.background }}>
        <Outlet />
      </Box>
      <CustomFooter />
    </>
  );
};

export default PublicLayout;
