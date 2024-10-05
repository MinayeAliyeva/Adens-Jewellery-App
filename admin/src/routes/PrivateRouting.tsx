import { Navigate, useLocation } from "react-router-dom";
// import { useAuthStateContext } from "../context-api/AuthContext";
import { jwtDecode } from "jwt-decode";
import { LocationState, Location } from "../models";

interface IPrivateRouting {
  children: React.ReactNode;
}

const PrivateRouting: React.FC<IPrivateRouting> = ({children}) => {
  // const {isLogined} = useAuthStateContext();
  // const token = localStorage.getItem("token");
  const decoded = jwtDecode(localStorage.getItem("token") as string);
  console.log({decoded});
  
  const location = useLocation() as  Location<LocationState>;

  // if(!isLogined){
  //   return <Navigate to="/login"  state={{url: location.pathname + location.search}} replace={true} />
  // }
  return (
    <>
      {children}
    </>
  )
}

export default PrivateRouting;