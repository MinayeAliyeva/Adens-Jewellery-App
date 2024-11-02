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
import Error from "../pages/not-fount";
import FAQPage from "../pages/fag";
import UserProfile from "../pages/profile";
import Products from "../pages/products";
import PrivateRouting from "../layouts/PrivateRouting";
export type MyRouterObject = RouteObject;

export type TypeRouteObject = MyRouterObject & { auth?: boolean };

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

export const routes: TypeRouteObject[] = [
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
        auth: true,
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
        auth: true,
      },
      {
        path: RoutePaths.ERROR,
        element: <Error />,
      },
    ],
  },
] as TypeRouteObject[];

const authMap = (routes: TypeRouteObject[]) => {
  return routes.map((route: TypeRouteObject) => {
    if (route.auth)
      route.element = <PrivateRouting>{route.element}</PrivateRouting>;
    if (route.children) route.children = authMap(route.children);
    return route;
  });
};

export const useMapRoutes = () => {
  return useRoutes(authMap(routes));
};
