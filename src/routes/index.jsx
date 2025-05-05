import React from "react";
import useRoutes from "../hooks/use-route";
import { Route, Routes } from "react-router-dom";
import WithAuth from "../layout/auth-layout";
import WithUser from "../layout/private-layout";
import PublicLayout from "../layout/public-layout";

const Routing = () => {
  const { authRoutes, privateRoutes, publicRoutes } = useRoutes();

  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        {publicRoutes.map(({ id, element, path, ...otherData }) => (
          <Route key={id} path={path} element={element} {...otherData} />
        ))}
      </Route>

      {/* Auth routes */}
      <Route element={<WithAuth />}>
        {authRoutes.map(({ id, element, path, ...otherData }) => (
          <Route key={id} path={path} element={element} {...otherData} />
        ))}
      </Route>

      {/* Private routes */}
      <Route element={<WithUser />}>
        {privateRoutes.map(({ id, element, path, ...otherData }) => (
          <Route key={id} path={path} element={element} {...otherData} />
        ))}
      </Route>

      {/* 404 route */}
      <Route path="*" element={<p>404 | Not Found</p>} />
    </Routes>
  );
};

export default Routing;
