import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { LocationState, Location } from "../utils/models";
import { FC } from "react";

interface IPrivateRouting {
  children: React.ReactNode;
}
interface IDecodedValue {
  isAdmin?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}
const PrivateRouting: FC<IPrivateRouting> = ({ children }) => {
  const token = localStorage.getItem("token") ?? "";
  const decoded: IDecodedValue = token ? jwtDecode(token) : { isAdmin: false };
  const location = useLocation() as Location<LocationState>;

  if (!decoded?.isAdmin) {
    return (
      <Navigate
        to="/login"
        state={{ url: location.pathname + location.search }}
        replace={true}
      />
    );
  }
  return <>{children}</>;
};

export default PrivateRouting;