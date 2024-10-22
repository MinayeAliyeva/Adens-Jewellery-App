import { ToastContainer } from "react-toastify";
import { useMapRoutes } from "./routes";

function App() {
  const myRoute = useMapRoutes();
  return <>{myRoute} <ToastContainer /></>;
}

export default App;
