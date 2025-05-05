import React from "react";
import withUser from "../hoc/with-user";
import { Outlet } from "react-router-dom";
import CustomHeader from "../shared/customHeader";
import CustomFooter from "../shared/customFooter";
import { Box } from "@mui/material";
import { COLORS } from "../utils/colors";

const NewOutlet = withUser(Outlet);
const PrivateLayout = () => {
  return (
    <>
      <CustomHeader />
      <Box sx={{ backgroundColor: COLORS.background}}>
        <NewOutlet />
      </Box>
      <CustomFooter />
    </>
  );
};

export default PrivateLayout;
