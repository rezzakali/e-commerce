import React, { useEffect, useState } from 'react';
import CookieConsent from 'react-cookie-consent';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminRouteProtect from './admin/AdminDashboard';
import ScrollToTopButton from './components/ScrollToTop';
import Terms from './components/Terms';
import UserPrivateRoute from './components/routes/UserPrivateRoute';
import useAuthCheck from './hooks/useAuthCheck';
import About from './pages/About';
import AllCategoriesProducts from './pages/AllCategoriesProducts';
import Cart from './pages/Cart';
import CategoryWiseProducts from './pages/CategoryWiseProducts';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Orders from './pages/Orders';
import PaymentSuccess from './pages/PaymentSuccess';
import Privacy from './pages/Privacy';
import Refund from './pages/Refund';
import Register from './pages/Register';
import Shipping from './pages/Shipping';
import SingleProduct from './pages/SingleProduct';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import Categories from './pages/admin/Categories';
import Customers from './pages/admin/Customers';
import Products from './pages/admin/Products';
import Settings from './pages/admin/Settings';
import UserDashboard from './pages/user/UserDashboard';

function App() {
  // spinner while rending ui
  const spinner = document.getElementById('spinner');

  if (spinner && !spinner.hasAttribute('hidden')) {
    spinner.setAttribute('hidden', 'true');
  }

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
        <Route
          path="/categories/all-categories"
          element={<AllCategoriesProducts />}
        />
        <Route path="/category/:slug" element={<CategoryWiseProducts />} />
        <Route path="/products/:id" element={<SingleProduct />} />

        {/* login / register */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/terms" element={<Terms />} />

        {/* payment success */}
        <Route path="/payment-success" element={<PaymentSuccess />} />

        {/* user dashboard */}
        <Route path="/user" element={<UserPrivateRoute />}>
          <Route path="" element={<UserDashboard />} />
          <Route path="/user/orders" element={<Orders />} />
          <Route path="cart" element={<Cart />} />
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

      <ToastContainer position="bottom-left" autoClose={3000} />

      <CookieConsent
        location="bottom"
        buttonText="Accept Cookies"
        buttonStyle={{ color: '#e84e4e' }}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </React.Fragment>
  );
}

export default App;
