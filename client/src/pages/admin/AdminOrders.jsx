import moment from 'moment';
import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useGetAllOrdersQuery } from '../../features/order/orderApi';

function AdminOrders() {
  const { data: orders, isLoading, isError } = useGetAllOrdersQuery();

  return (
    <Layout>
      <Row style={{ height: '100vh' }}>
        <Col sm={12} md={2} lg={2} className="shadow">
          <AdminSidebar />
        </Col>
        <Col sm={12} md={10} lg={10}>
          <p className="fs-4 my-3">All Orders</p>
          <div>
            {isLoading && <Loading />}
            {isError && <p>Something went wrong</p>}
            <div className="shadow-sm border-0 rounded-0">
              <Table
                className="table-hover text-center"
                style={{ width: '100%' }}
              >
                <thead
                  className="sticky-top bg-light"
                  style={{ zIndex: '100' }}
                >
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Delivery Status</th>
                    <th>Payment Status</th>
                    <th>Shipping Address</th>
                    <th>Products(Id)</th>
                    <th>ProductName</th>
                    <th>ProductImage</th>
                    <th>Product Quantity</th>
                    <th>Price(₹)</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  {orders?.orders?.map((order, index) => (
                    <tr key={order._id}>
                      <td>{index + 1}</td>
                      <td>{moment(order.createdAt).format('ll')}</td>
                      <td>{order.delivery_status}</td>
                      <td
                        className="text-success"
                        style={{ textTransform: 'capitalize' }}
                      >
                        {order.payment_status}
                      </td>
                      <td>{`${order.shipping.address.line1}, ${order.shipping.address.city}, ${order.shipping.address.state}, ${order.shipping.address.country} - ${order.shipping.address.postal_code}`}</td>
                      <td>
                        {order.products.map((product) => (
                          <span key={product.productId}>
                            {product.productId}
                            <br />
                          </span>
                        ))}
                      </td>

                      <td>
                        {order.products.map((product) => (
                          <span key={product.productId}>
                            {product.productName} <br />
                          </span>
                        ))}
                      </td>
                      <td>
                        {order.products.map((product) => (
                          <span key={product.productId}>
                            <img
                              src={`http://127.0.0.1:9000/api/v1/products/get-product-image/${product.productId}`}
                              alt=""
                              style={{
                                width: '70px',
                                height: '70px',
                              }}
                              className="p-1"
                            />
                          </span>
                        ))}
                      </td>
                      <td>
                        {order.products.map((product) => (
                          <span key={product.productId}>
                            {product.quantity} <br />
                          </span>
                        ))}
                      </td>
                      <td>
                        {order.products.map((product) => (
                          <span key={product.productId}>
                            {product.price}.00 <br />
                          </span>
                        ))}
                      </td>
                      <td className="fw-bold">Rs. {order.total}.00</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default AdminOrders;
