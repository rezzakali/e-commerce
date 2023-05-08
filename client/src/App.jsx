import React, { useEffect, useState } from 'react';
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

import ScrollToTopButton from './components/ScrollToTop';
import SingleProduct from './pages/SingleProduct';
import Categories from './pages/admin/Categories';
import Customers from './pages/admin/Customers';
import Products from './pages/admin/Products';
import Settings from './pages/admin/Settings';

function App() {
  const authCheck = useAuthCheck();

  const [showScrollButton, setShowScrollButton] = useState(false);

  // scroll to top
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<SingleProduct />} />

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
      {showScrollButton && <ScrollToTopButton />}
    </React.Fragment>
  );
}

export default App;
