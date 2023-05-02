import React from 'react';
import Footer from './Footer';
import Navigation from './Navigation';

function Layout({ children }) {
  return (
    <React.Fragment>
      <Navigation />
      <main style={{ minHeight: '80vh' }} className="container-fluid">
        {children}
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default Layout;
