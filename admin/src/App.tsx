import { Route, Routes } from "react-router-dom";
import Sidenav from "./layout/MainLayout";
import Product from "./pages/products";
import Users from "./pages/users";
import { useCustomRoutes } from "./routes/useRoutes";


function App() {
  const routes = useCustomRoutes();
  return (
     <> {routes}</>
      // <Routes>
      //   <Route path="/" element={<Sidenav />}>
      //     <Route path="products" element={<Product />} />
      //     <Route path="users" element={<Users />} />
      //   </Route>
      // </Routes>
  );
}

export default App;
