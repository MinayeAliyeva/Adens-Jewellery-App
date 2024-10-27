import { ToastContainer } from "react-toastify";
import { useMapRoutes } from "./routes";
import ErrorBoundary from "./shared/components/ErrorBoundary";

function App() {
  const myRoute = useMapRoutes();
  return <ErrorBoundary>
    {myRoute} 
    <ToastContainer />
  </ErrorBoundary>;
}

export default App;
