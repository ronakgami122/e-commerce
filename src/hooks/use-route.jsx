import { useMemo } from "react";
import { URLS } from "../constants/urls";
import Login from "../containers/auth/login";
import Home from "../containers/home";
import Products from "../containers/products";
import ProductDetails from "../containers/productDetail";
import Cart from "../containers/cart";
import Favorites from "../containers/favorites";
import Checkout from "../containers/checkout";
import NotFound from "../components/notFound";
import Contact from "../containers/contact";

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
        element: <ProductDetails />,
        isPublic: true,
        noLayout: true,
      },
      {
        id: "wishlist",
        path: URLS.WISHLIST,
        element: <Favorites />,
        isPublic: true,
      },
      {
        id: "contact",
        path: URLS.CONTACT,
        element: <Contact />,
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
        element: <Cart />,
        isPrivate: true,
      },
      {
        id: "checkout",
        path: URLS.CHECKOUT,
        element: <Checkout />,
        isPrivate: true,
      },
      {
        id: "404",
        path: "*",
        element: <NotFound />,
        isPublic: true,
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
