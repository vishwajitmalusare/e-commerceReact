import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import PageNotFound from "./pages/PageNotFound";
import Products from "./pages/Adminpages/Products";
import AddProduct from "./pages/Adminpages/AddProduct";
import Categories from "./pages/Adminpages/Categories";
import AddCategory from "./pages/Adminpages/AddCategory";
import { useSelector } from "react-redux";
import Invoice from "./pages/Invoice";
import OrderManagement from "./pages/Adminpages/OrderManagement";

function App() {  
  const authState = useSelector((state) => state.auth.userinfo);

  return (
    <BrowserRouter>
      <Routes>
        {authState? (
          authState.roles[0].id === 501 ? (
            <>
              <Route path="/products" Component={Products} />
              <Route path="/add-product" Component={AddProduct} />
              <Route path="/categories" Component={Categories} />
              <Route path="/add-category" Component={AddCategory} />
              <Route path="/order-management" Component={OrderManagement} />
              <Route path="*" Component={Products} />
            </>
          ) : (
            <>
              <Route path="/home" Component={Home} />
              <Route path="/productdetails" Component={ProductDetails} />
              <Route path="/cart" Component={Cart} />
              <Route path="/checkout" Component={Checkout} />
              <Route path="/order-history" Component={OrderHistory} />
              <Route path="/invoice" Component={Invoice} />
              <Route path="*" Component={Home} />
            </>
          )
        ) : (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Registration} />
            {/* <Route path='*' Component={PageNotFound} /> */}
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
