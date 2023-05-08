import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Layout from '../../components/Layout';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AllCustomersTable from '../../components/admin/AllCustomersTable';

function Customers() {
  return (
    <Layout>
      <Row style={{ height: '100vh' }}>
        <Col sm={12} md={2} lg={2} className="shadow">
          <AdminSidebar />
        </Col>
        <Col sm={12} md={10} lg={10}>
          <h4>All Customers</h4>
          <hr />
          <AllCustomersTable />
        </Col>
      </Row>
    </Layout>
  );
}

export default Customers;
