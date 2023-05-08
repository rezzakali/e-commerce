import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Layout from '../../components/Layout';
import AdminInfo from '../../components/admin/AdminInfo';
import AdminSidebar from '../../components/admin/AdminSidebar';

function Settings() {
  return (
    <Layout>
      <Row style={{ height: '100vh' }}>
        <Col sm={12} md={2} lg={2} className="shadow">
          <AdminSidebar />
        </Col>
        <Col sm={12} md={10} lg={10}>
          <div className="m-5">
            <h4>Settings</h4>
            <AdminInfo />
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default Settings;
