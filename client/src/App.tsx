import { useMapRoutes } from "./routes";

function App() {
  const myRoute = useMapRoutes();
  return <>{myRoute}</>;
}

export default App;
