import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Layout from '../components/Layout';
import UserSidebar from '../components/UserSidebar';

function Orders() {
  return (
    <Layout
      title={'Orders - e-shop'}
      keywords={''}
      author={'Rezzak'}
      description={'orders page'}
    >
      <Row className="pt-1" style={{ height: '100vh' }}>
        <Col sm={12} md={2} lg={2} className="shadow">
          <UserSidebar />
        </Col>
        <Col sm={12} md={10} lg={10} className="">
          <h1>All orders</h1>
        </Col>
      </Row>
    </Layout>
  );
}

export default Orders;
