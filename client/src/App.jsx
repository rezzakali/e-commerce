import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';
import Men from './pages/Men';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Women from './pages/Women';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Men />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
