import React from 'react';
import Footer from './Footer';
import Nav from './Nav';

function Layout({ children }) {
  return (
    <React.Fragment>
      <Nav />
      <main style={{ minHeight: '80vh' }}>{children}</main>
      <Footer />
    </React.Fragment>
  );
}

export default Layout;
