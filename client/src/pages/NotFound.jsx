import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Layout from '../components/Layout';

function NotFound() {
  return (
    <Layout
      title={'e-Shop -Not Found'}
      keywords={'not found'}
      author={'Rezzak'}
      description={'page not found'}
    >
      <div
        className="d-flex flex-column justify-content-center align-items-center "
        style={{
          minHeight: '65vh',
        }}
      >
        <h1>404</h1>
        <h2>Oops ! Page Not Found</h2>
        <br />
        <LinkContainer to="/">
          <Button className="bg-light text-dark border border-gray">
            Go Home
          </Button>
        </LinkContainer>
      </div>
    </Layout>
  );
}

export default NotFound;
