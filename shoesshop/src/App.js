import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.js";
import ProductDetail from "./pages/productDetail/productDetail.js";
import Admin from "./layouts/Admin/Admin.js";
import Products from "./pages/Products/Products.js";
import ProductAdmin from "./pages/ProductAdmin/ProductAdmin.js";
import CategoryAdmin from "./pages/CategoryAdmin/CategoryAdmin.js";
import Register from "./pages/Register/Register.js";
import Login from "./pages/Login/Login.js";
import Loading from "./components/Loading/Loading.js";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.userInfo);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home {...user} />} />
          {!user.ID ? (
            <Route path="/users/login" element={<Login />} />
          ) : (
            <Route path="/users/login" element={<Home />} />
          )}
          <Route path="/register" element={<Register />} />
          <Route path="/products/">
            <Route index element={<Products />} />
            <Route path=":id" element={<ProductDetail />} />
          </Route>
          <Route path="/admin/">
            <Route index element={<ProductAdmin />} />
            <Route path="category" element={<CategoryAdmin />} />
            <Route path="loading" element={<Loading />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
