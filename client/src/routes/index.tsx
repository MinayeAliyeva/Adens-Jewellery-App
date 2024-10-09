import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home";

import Detail from "../pages/home/detail";
import Contact from "../pages/contact";
import Shop from "../pages/shop";
import Register from "../pages/auth/register";
import Login from "../pages/auth/login";
import About from "../pages/about";
import Favorite from "../pages/favorites";
import Products from "../pages/home/Products";
import Error from "../pages/error";
import FAQPage from "../pages/fag";
import UserProfile from "../pages/profile";
export type MyRouterObject = RouteObject;
export enum RoutePaths {
  MAIN = "/",
  HOME = "/home",
  REGISTER = "/register",
  LOGIN = "/login",
  PRODUCT_DETAIL = "/product/detail/:id",
  CONTACT = "/contact",
  SHOP = "/shop",
  ABOUT = "/about",
  FAVORITE = "/favorite",
  PRODUCTS = "/products",
  FAG = "/fag",
  PROFILE = "/profile",
  ERROR = "*",
}

export const routes: MyRouterObject[] = [
  {
    path: RoutePaths.MAIN,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={RoutePaths.HOME} />,
      },
      {
        path: RoutePaths.HOME,
        element: <Home />,
      },
      {
        path: RoutePaths.REGISTER,
        element: <Register />,
      },
      {
        path: RoutePaths.LOGIN,
        element: <Login />,
      },
      {
        path: RoutePaths.PRODUCT_DETAIL,
        element: <Detail />,
      },
      {
        path: RoutePaths.CONTACT,
        element: <Contact />,
      },
      {
        path: RoutePaths.SHOP,
        element: <Shop />,
      },
      {
        path: RoutePaths.ABOUT,
        element: <About />,
      },
      {
        path: RoutePaths.FAVORITE,
        element: <Favorite />,
      },
      {
        path: RoutePaths.PRODUCTS,
        element: <Products />,
      },
      {
        path: RoutePaths.FAG,
        element: <FAQPage />,
      },
      {
        path: RoutePaths.PROFILE,
        element: <UserProfile />,
      },
      {
        path: RoutePaths.ERROR,
        element: <Error />,
      },
    ],
  },
];
export const usehMap = (routes: MyRouterObject[]) => {
  return routes.map((route) => {
    return route;
  });
};

export const useMapRoutes = () => {
  return useRoutes(usehMap(routes));
};
