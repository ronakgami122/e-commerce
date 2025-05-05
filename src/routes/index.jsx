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
      {/* Routes without layout */}
      {[...publicRoutes, ...authRoutes, ...privateRoutes]
        .filter((route) => route.noLayout)
        .map(({ id, element, path }) => (
          <Route key={id} path={path} element={element} />
        ))}

      {/* Public routes */}
      <Route element={<PublicLayout />}>
        {publicRoutes
          .filter((route) => !route.noLayout)
          .map(({ id, element, path, ...otherData }) => (
            <Route key={id} path={path} element={element} {...otherData} />
          ))}
      </Route>

      {/* Auth routes */}
      <Route element={<WithAuth />}>
        {authRoutes
          .filter((route) => !route.noLayout)
          .map(({ id, element, path, ...otherData }) => (
            <Route key={id} path={path} element={element} {...otherData} />
          ))}
      </Route>

      {/* Private routes */}
      <Route element={<WithUser />}>
        {privateRoutes
          .filter((route) => !route.noLayout)
          .map(({ id, element, path, ...otherData }) => (
            <Route key={id} path={path} element={element} {...otherData} />
          ))}
      </Route>

      {/* 404 route */}
      <Route path="*" element={<p>404 | Not Found</p>} />
    </Routes>
  );
};

export default Routing;
