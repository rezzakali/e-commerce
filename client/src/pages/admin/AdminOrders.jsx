import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Layout from '../../components/Layout';
import AdminLogout from '../../components/admin/AdminLogout';
import AdminSidebar from '../../components/admin/AdminSidebar';

function AdminOrders() {
  return (
    <Layout>
      <Row style={{ height: '100vh' }}>
        <Col sm={12} md={2} lg={2} className="shadow">
          <AdminSidebar />
          <AdminLogout />
        </Col>
        <Col sm={12} md={10} lg={10}>
          <h1>Orders</h1>
        </Col>
      </Row>
    </Layout>
  );
}

export default AdminOrders;
