import { useMapRoutes } from "./routes";

function App() {
 
  console.log("APPPPP RERENDER");
  
  const myRoute = useMapRoutes();
  console.log("myRoute", myRoute);
  
  return <>{myRoute}</>;
}

export default App;
