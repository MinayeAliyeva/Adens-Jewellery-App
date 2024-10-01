import { Route, Routes } from "react-router-dom";
import Sidenav from "./layout/Sidenav";
import Product from "./pages/products";
import Users from "./pages/users";


function App() {
  return (
      <Routes>
        <Route path="/" element={<Sidenav />}>
          <Route path="products" element={<Product />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
  );
}

export default App;
