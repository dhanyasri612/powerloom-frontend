import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AdminRoute from "./components/AdminRoute";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/Dashboard";
import Contracts from "./components/Contracts";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Admin from "./Admin";
import ManageProducts from "./pages/ManageProducts";
import ManageOrders from "./pages/ManageOrders";
import UserDashboard from "./pages/UserDashboard";

export default function App() {
  return (
    <BrowserRouter basename="/powerloom">
      <Layout>
        <div className="container my-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
            <Route path="/user" element={<UserDashboard />} />
            <Route
              path="/manage-products"
              element={
                <AdminRoute>
                  <ManageProducts />
                </AdminRoute>
              }
            />
            <Route
              path="/manage-orders"
              element={
                <AdminRoute>
                  <ManageOrders />
                </AdminRoute>
              }
            />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Layout>
    </BrowserRouter>
  );
}
