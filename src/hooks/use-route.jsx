import { useMemo } from "react";
import Login from "../containers/auth/login";
import { URLS } from "../constants/urls";
import Home from "../containers/home";
import Products from "../containers/products";

const useRoutes = () => {
  const allRoutes = useMemo(
    () => [
      {
        id: "root",
        path: URLS.INITIAL,
        element: <Home />,
        isPublic: true,
      },
      {
        id: "products",
        path: URLS.PRODUCTS,
        element: <Products />,
        isPublic: true,
      },
      {
        id: "product",
        path: URLS.PRODUCTS + "/:id",
        element: <div>Single Product Page</div>,
        isPublic: true,
      },
      {
        id: "wishlist",
        path: URLS.WISHLIST,
        element: <div>Favorite Items(Wishlist)</div>,
        isPublic: true,
      },
      {
        id: "login",
        path: URLS.LOGIN,
        element: <Login />,
        isAuth: true,
      },
      {
        id: "cart",
        path: URLS.CART,
        element: <div>Cart Page</div>,
        isPrivate: true,
      },
      {
        id: "checkout",
        path: URLS.CHECKOUT,
        element: <div>Checkout Page</div>,
        isPrivate: true,
      },
      {
        id: "orders",
        path: URLS.ORDERS,
        element: <div>orders Page</div>,
        isPrivate: true,
      },
      {
        id: "order",
        path: URLS.ORDERS + "/:id",
        element: <div>Single order Page</div>,
        isPrivate: true,
      },
    ],
    []
  );

  const publicRoutes = useMemo(
    () => allRoutes.filter((route) => route.isPublic),
    [allRoutes]
  );

  const authRoutes = useMemo(
    () => allRoutes.filter((route) => route.isAuth),
    [allRoutes]
  );
  const privateRoutes = useMemo(
    () => allRoutes.filter((route) => route.isPrivate),
    [allRoutes]
  );

  return { allRoutes, publicRoutes, authRoutes, privateRoutes };
};

export default useRoutes;
