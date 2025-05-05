import React from "react";
import withAuth from "../hoc/with-auth";
import { Outlet } from "react-router-dom";
import CustomHeader from "../shared/customHeader";
import CustomFooter from "../shared/customFooter";

const NewOutlet = withAuth(Outlet);

const AuthLayout = () => {
  return (
    <>
      <CustomHeader />
      <NewOutlet />
      <CustomFooter />
    </>
  );
};
export default AuthLayout;
