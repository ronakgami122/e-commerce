import React from "react";
import withUser from "../hoc/with-user";
import { Outlet } from "react-router-dom";
import CustomHeader from "../shared/customHeader";
import CustomFooter from "../shared/customFooter";
import { Box } from "@mui/material";
import { COLORS } from "../utils/colors";
import Breadcrumb from "../components/breadcrumb";

const NewOutlet = withUser(Outlet);
const PrivateLayout = () => {
  return (
    <>
      <CustomHeader />
      <Breadcrumb />
      <Box sx={{ backgroundColor: COLORS.background }}>
        <NewOutlet />
      </Box>
      <CustomFooter />
    </>
  );
};

export default PrivateLayout;
