import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminRouteProtect from './admin/AdminDashboard';
import UserPrivateRoute from './components/routes/UserPrivateRoute';
import useAuthCheck from './hooks/useAuthCheck';
import About from './pages/About';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';
import Men from './pages/Men';
import NotFound from './pages/NotFound';
import Orders from './pages/Orders';
import Register from './pages/Register';
import Women from './pages/Women';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import UserDashboard from './pages/user/UserDashboard';

import Categories from './pages/admin/Categories';
import Customers from './pages/admin/Customers';
import Products from './pages/admin/Products';
import Settings from './pages/admin/Settings';

function App() {
  const authCheck = useAuthCheck();

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/cart" element={<Cart />} />

        {/* login / register */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* user dashboard */}
        <Route path="/dashboard" element={<UserPrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>

        {/* admin */}
        <Route path="/dashboard" element={<AdminRouteProtect />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/categories" element={<Categories />} />
          <Route path="admin/customers" element={<Customers />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
