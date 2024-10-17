import { Navigate, useRoutes } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import { TypeRouteObject } from "../utils/models";
import Login from "../pages/auth";
import Products from "../pages/products";
import PrivateRouting from "./PrivateRouting";
import MainLayout from "../layout/MainLayout";
import Category from "../pages/categories";
import UsersTable from "../pages/users/UsersTable";
import Brand from "../pages/brands";
import SettingsPage from "../pages/settings";
import Users from "../pages/users";

const routes: TypeRouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    auth: true,
    children: [
      { index: true, element: <Navigate to="/products" /> , auth: true},
      { path: "/products", element: <Products />,  auth: true},
      { path: "/categories", element: <Category />,  auth: true},
      { path: "/brands", element: <Brand />,  auth: true},
      { path: "/users", element: <Users />,  auth: true},
      { path: "/settings", element: <SettingsPage />,  auth: true},
    ],
  },
  {
    path: "/login",
    element: <AuthLayout />,
    children: [{ index: true, element: <Login /> }],
  },
] as TypeRouteObject[];

const authMap = (routes: TypeRouteObject[]) => {
  return routes.map((route: TypeRouteObject) => {
    
    if (route.auth){
        
        route.element = <PrivateRouting>{route.element}</PrivateRouting>;
    }
    if (route.children) route.children = authMap(route.children);
    return route;
  });
};

export const useCustomRoutes = () => {
  return useRoutes(authMap(routes));
};
