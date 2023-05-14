import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Layout from '../../components/Layout';
import UserSidebar from '../../components/UserSidebar';
import UserProfile from './UserProfile';

function UserDashboard() {
  return (
    <Layout title="e-Shop -User Dashboard">
      <Row className="p-1">
        <Col sm={12} md={2} lg={2}>
          <UserSidebar />
        </Col>
        <Col sm={12} md={10} lg={10} className="p-3 shadow-sm">
          <h4>Profile</h4>
          <hr />
          <UserProfile />
        </Col>
      </Row>
    </Layout>
  );
}

export default UserDashboard;
