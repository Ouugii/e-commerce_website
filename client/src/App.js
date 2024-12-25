import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./component/header/header";
import Home from "./pages/Home/index";
import About from "./pages/About/index";
import Login from "./pages/Access/Login";
import Register from "./pages/Access/Register";
import Profile from "./pages/Profile/Profile";
import ShopManager from "./pages/Shop/S_Manager/ShopManager";
import ShopProduct from "./pages/Shop/S_Product/ShopProduct";
import ShopProfile from "./pages/Shop/S_Profile/ShopProfile";
import ShopOrder from "./pages/Shop/S_Order/ShopOrder";
import Listing from "./pages/Listing/Listing";
import Footer from "./component/footer/footer";
import ProductDetail from "./pages/Detail/ProductDetail";
import InCart from "./pages/InCart/InCart";
import Success from "./pages/Success/Success";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route exact={true} path="/" element={<Home />} />
        <Route exact={true} path="/About" element={<About />} />
        <Route exact={true} path="/Login" element={<Login />} />
        <Route exact={true} path="/Register" element={<Register />} />
        <Route exact={true} path="/my-profile" element={<Profile />} />
        <Route exact={true} path="/List" element={<Listing />} />
        <Route exact={true} path="/List/:id" element={<ProductDetail />} />
        <Route exact={true} path="/Cart" element={<InCart />} />
        <Route exact={true} path="/Cart/Success" element={<Success />} />

        <Route path="/Shop/*" element={<ShopManager />}>
          <Route path="profile" element={<ShopProfile />} />
          <Route path="Orders" element={<ShopOrder />} />
          <Route path="Products" element={<ShopProduct />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
