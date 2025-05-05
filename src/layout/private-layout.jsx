import React from "react";
import withUser from "../hoc/with-user";
import { Outlet } from "react-router-dom";
import CustomHeader from "../shared/customHeader";
import CustomFooter from "../shared/customFooter";

const NewOutlet = withUser(Outlet);
const PrivateLayout = () => {
  return (
    <>
      <CustomHeader />
      <NewOutlet />
      <CustomFooter />
    </>
  );
};

export default PrivateLayout;
