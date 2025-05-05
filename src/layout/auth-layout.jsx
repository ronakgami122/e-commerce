import React from "react";
import withAuth from "../hoc/with-auth";
import { Outlet } from "react-router-dom";
import CustomHeader from "../shared/customHeader";
import CustomFooter from "../shared/customFooter";
import { Box } from "@mui/material";
import { COLORS } from "../utils/colors";

const NewOutlet = withAuth(Outlet);

const AuthLayout = () => {
  return (
    <>
      <CustomHeader />
      <Box sx={{ backgroundColor: COLORS.background }}>
        <NewOutlet />
      </Box>
      <CustomFooter />
    </>
  );
};
export default AuthLayout;
