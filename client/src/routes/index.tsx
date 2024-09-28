import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/home";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Detail from "../pages/detail";
import Contact from "../pages/contact";
import Shop from "../pages/shop";
export type MyRouterObject = RouteObject;
export enum RoutePaths {
  MAIN = "/",
  HOME = "/home",
  REGISTER = "/register",
  LOGIN = "/login",
  DETAIL = "/detail/:id",
  CONTACT = "/contact",
  SHOP = "/shop",
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
        path: RoutePaths.DETAIL,
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
