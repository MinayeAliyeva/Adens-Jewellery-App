import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../shared/helpers/authStorage";
import { isEmpty } from "lodash";

interface IPrivateRouting {
  children: React.ReactNode;
}

const PrivateRouting: React.FC<IPrivateRouting> = ({children}) => {
   const userData=getUserFromToken();

  if(!isEmpty(userData)){
    return <Navigate to="/login" />
  }
  return (
    <>
      {children}
    </>
  )
}

export default PrivateRouting;