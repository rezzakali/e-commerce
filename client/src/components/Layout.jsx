import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import Navigation from './Navigation';

Layout.defaultProps = {
  description: 'full stact mern web application',
  keywords: 'mern, node,express,mongoose,mongodb,react,vite,react-bootstrap',
  author: 'Rezzak',
  title: 'e-shop - shop now',
};

function Layout({ children, description, keywords, author, title }) {
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
        {children}
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default Layout;
