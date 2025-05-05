import React from "react";
import { Outlet } from "react-router-dom";
import CustomFooter from "../shared/customFooter";
import CustomHeader from "../shared/customHeader";

const PublicLayout = () => {
  return (
    <>
      <CustomHeader />
      <Outlet />
      <CustomFooter />
    </>
  );
};

export default PublicLayout;
