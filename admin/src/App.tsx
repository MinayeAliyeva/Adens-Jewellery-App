import { useCustomRoutes } from "./routes/useRoutes";
import ErrorBoundary from "./utils/components/ErrorBoundary";

function App() {
  const routes = useCustomRoutes();
  return <ErrorBoundary> {routes}</ErrorBoundary>;
}

export default App;
