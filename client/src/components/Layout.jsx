import React from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Footer from './Footer';
import Navigation from './Navigation';

Layout.defaultProps = {
  description: 'full stact mern web application',
  keywords: 'mern, node,express,mongoose,mongodb,react,vite,react-bootstrap',
  author: 'Rezzak',
  title: 'e-shop - shop now',
};

function Layout({ children, description, keywords, author, title }) {
  const { user } = useSelector((state) => state.auth);
  return (
    <React.Fragment>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Navigation />
      <main style={{ minHeight: '80vh' }} className="container-fluid">
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        {children}
      </main>
      {user?.role === 'admin' ? '' : <Footer />}
    </React.Fragment>
  );
}

export default Layout;
