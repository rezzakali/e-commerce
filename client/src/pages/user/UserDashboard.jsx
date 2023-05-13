import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Layout from '../../components/Layout';
import UserSidebar from '../../components/UserSidebar';
import UserProfile from './UserProfile';

function UserDashboard() {
  return (
    <Layout title="User-dashboard">
      <Row className="pt-1" style={{ height: '100vh' }}>
        <Col sm={12} md={2} lg={2} className="shadow-sm">
          <UserSidebar />
        </Col>
        <Col sm={12} md={10} lg={10} className="">
          <div className="m-5">
            <h4>Profile</h4>
            <hr />
            <UserProfile />
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default UserDashboard;
