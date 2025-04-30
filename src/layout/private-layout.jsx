import React from "react";
import withUser from "../hoc/with-user";
import { Outlet } from "react-router-dom";

// We don't need a separate component since withUser is our HOC
const PrivateLayout = withUser(Outlet);

export default PrivateLayout;
