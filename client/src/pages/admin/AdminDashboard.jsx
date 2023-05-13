import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { FaBox } from 'react-icons/fa';
import { GiConfirmed, GiReceiveMoney } from 'react-icons/gi';
import { ImCancelCircle } from 'react-icons/im';
import { TbTruckDelivery } from 'react-icons/tb';
import Layout from '../../components/Layout';
import AdminGreeting from '../../components/admin/AdminGreeting';
import AdminSidebar from '../../components/admin/AdminSidebar';
import DashboardCard from '../../components/admin/DashboardCard';
import DashboardTable from '../../components/admin/DashboardTable';
import { useGetAllOrdersQuery } from '../../features/order/orderApi';
import { useGetProductsQuery } from '../../features/product/productApi';

function AdminDashboard() {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();

  const totalProducts = products?.products?.length;

  const {
    data: orders,
    isLoading: isOrderLoading,
    isError: isOrderError,
    error: orderError,
  } = useGetAllOrdersQuery();

  // total orders length
  const totalOrders = orders?.orders?.length;

  // total amount || All product || All orders
  const totalAmount = orders?.orders?.reduce(
    (acc, order) => acc + order.total,
    0
  );

  // find out only the cancel orders length
  const cencelOrdersLength = orders?.orders?.filter(
    (order) => order.delivery_status === 'cancel'
  )?.length;

  // find out only the delivered orders length
  const deliveredOrdersLength = orders?.orders?.filter(
    (order) => order.delivery_status === 'delivered'
  )?.length;

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isOrderError) {
      toast.error(orderError?.data?.message);
    }
  }, [isError, isOrderError]);

  return (
    <Layout title="Admin - Dashboard">
      <Row className="mt-1" style={{ height: '100vh' }}>
        <Col sm={12} md={2} lg={2} className="shadow">
          <AdminSidebar />
        </Col>
        <Col sm={12} md={10} lg={10}>
          <AdminGreeting />
          <hr />
          <Row xs={1} md={3} className="g-3">
            <DashboardCard
              title="Total Products"
              amount={totalProducts}
              icon={<FaBox size={30} color="yellowgreen" />}
              isLoading={isLoading}
            />
            <DashboardCard
              title="Total Orders"
              amount={totalOrders}
              icon={<BsFillCartCheckFill size={35} color="#262A56" />}
              isLoading={isOrderLoading}
            />
            <DashboardCard
              title="Confirm Orders"
              amount={totalOrders}
              icon={<GiConfirmed size={35} color="green" />}
            />
            <DashboardCard
              title="Total Delivered"
              amount={deliveredOrdersLength}
              icon={<TbTruckDelivery size={35} color="#FC4F00" />}
            />
            <DashboardCard
              title="Cancel Orders"
              amount={cencelOrdersLength}
              icon={<ImCancelCircle size={35} color="red" />}
            />
            <DashboardCard
              title="Total Earnings"
              amount={`₹ ${totalAmount}.00`}
              icon={<GiReceiveMoney size={35} color="#FFD95A" />}
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
