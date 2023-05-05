import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { FaBox } from 'react-icons/fa';
import { GiConfirmed, GiReceiveMoney } from 'react-icons/gi';
import { ImCancelCircle } from 'react-icons/im';
import { TbTruckDelivery } from 'react-icons/tb';
import Layout from '../../components/Layout';
import AdminGreeting from '../../components/admin/AdminGreeting';
import AdminLogout from '../../components/admin/AdminLogout';
import AdminSidebar from '../../components/admin/AdminSidebar';
import DashboardCard from '../../components/admin/DashboardCard';
import DashboardTable from '../../components/admin/DashboardTable';

function AdminDashboard() {
  return (
    <Layout title="Admin - Dashboard">
      <Row className="mt-1" style={{ height: '100vh' }}>
        <Col sm={12} md={2} lg={2} className="shadow">
          <AdminSidebar />
          <AdminLogout />
        </Col>
        <Col sm={12} md={10} lg={10}>
          <AdminGreeting />
          <hr />
          <Row xs={1} md={3} className="g-3">
            <DashboardCard
              title="Total Products"
              amount={98}
              icon={<FaBox size={35} />}
            />
            <DashboardCard
              title="Total Orders"
              amount={50}
              icon={<BsFillCartCheckFill size={35} />}
            />
            <DashboardCard
              title="Confirm Orders"
              amount={24}
              icon={<GiConfirmed size={35} />}
            />
            <DashboardCard
              title="Total Delivered"
              amount={20}
              icon={<TbTruckDelivery size={35} />}
            />
            <DashboardCard
              title="Cancel Orders"
              amount={2}
              icon={<ImCancelCircle size={35} />}
            />
            <DashboardCard
              title="Total Earnings"
              amount={`$154201.00`}
              icon={<GiReceiveMoney size={35} />}
            />
          </Row>
          <Row>
            <h4 className="my-4">Recent Orders</h4>
            <hr />
            <DashboardTable />
          </Row>
        </Col>
      </Row>
    </Layout>
  );
}

export default AdminDashboard;
