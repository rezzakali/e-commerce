import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserPrivateRoute from './components/routes/UserPrivateRoute';
import useAuthCheck from './hooks/useAuthCheck';
import About from './pages/About';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';
import Men from './pages/Men';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Women from './pages/Women';
import Dashboard from './pages/admin/Dashboard';
import UserDashboard from './pages/user/UserDashboard';

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
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* admin */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
