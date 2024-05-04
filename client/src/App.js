import { Routes, Route } from "react-router-dom"
import React from 'react';
import Signup from "./pages/Auth/signup";
import Login from "./pages/Auth/login";
import axios from "axios"
import { AuthProvider } from "./context/auth";
import GlobalStyle from './globalStyles';
import Admindashboard from "./pages/Admin/Admindashboard";
import Users from "./pages/Admin/users";
import Orders from "./pages/Admin/orders";
import CreateCategory from "./pages/Admin/catagory";
import Products from "./pages/Admin/products";
import "./App.css"
import CreateProduct from "./pages/Admin/createproducts";
import UpdateProduct from "./pages/Admin/updateproducts";

import OrderDetails from "./pages/Admin/orderDetails";


axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.withCredentials = true



function App() {

  const authData = JSON.parse(localStorage.getItem("auth"));
  return (
    <AuthProvider>
       <GlobalStyle />
      <>
        <Routes>
          {authData === null ? (
            // <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Login />} />
          )
            :
            (
              <>
                  <Route path="/" element={<Admindashboard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/catagory" element={<CreateCategory />} />
                  <Route path="/create-product" element={<CreateProduct />} />
                  <Route path="/update-product/:id" element={<UpdateProduct />} />
                  <Route path="/order/:id" element={<OrderDetails />} />
        
              </>
            )}
        </Routes>
      </>
    </AuthProvider>
  );
}

export default App;
