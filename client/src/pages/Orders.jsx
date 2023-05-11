import React, { useEffect } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import UserSidebar from '../components/UserSidebar';
import { useGetOrdersQuery } from '../features/order/orderApi';
import styles from '../styles/ProductCardButton.module.css';

function Orders() {
  const { user } = useSelector((state) => state.auth);

  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useGetOrdersQuery(user._id);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(orders?.orders);
  }, [orders]);

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
        <Col sm={12} md={10} lg={10}>
          <p className="fs-4 py-2">My orders</p>
          {isLoading && <Loading />}
          {isError && <p>Something went wrong</p>}

          {orders?.orders?.length === 0 ? (
            <>
              <div className="d-flex align-items-center justify-content-center flex-column">
                <h5 className="mt-2">You have no orders</h5>

                <Button
                  size="sm"
                  className={`w-auto d-flex align-items-center justify-content-center rounded-0 ${styles.product_card_button}`}
                  style={{ textTransform: 'uppercase' }}
                  onClick={() => navigate('/')}
                >
                  <BiArrowBack role="button" className="mx-1" size={20} />
                  Shopping
                </Button>
              </div>
            </>
          ) : (
            <>
              <Table>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.orders?.map((order) => {
                    const product = order.products.map((product) => {
                      return (
                        <span key={product._id}>
                          <img
                            src={`http://127.0.0.1:9000/api/v1/products/get-product-image/${product.productId}`}
                            alt=""
                            style={{ width: '60px', height: '80px' }}
                          />
                        </span>
                      );
                    });
                    const {
                      createdAt,
                      delivery_status,
                      payment_status,
                      total,
                      shipping,
                    } = order;
                    return (
                      <tr key={order._id}>
                        <td>{product}</td>
                        <td>
                          name here
                          <br />
                          {/* {product} */}
                        </td>
                        <td>
                          status: <br />
                          <span
                            className={`${
                              delivery_status === 'pending'
                                ? 'text-warning'
                                : delivery_status === 'shipped'
                                ? 'text-primary'
                                : delivery_status === 'delivered'
                                ? 'text-success'
                                : delivery_status === 'cancel'
                                ? 'text-danger'
                                : ''
                            }`}
                          >
                            {delivery_status}
                          </span>
                        </td>
                        <td>
                          {shipping.address.line1} {shipping.address.line2},
                          {shipping.address.city} {shipping.address.state},
                          {shipping.address.postal_code}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </>
          )}
        </Col>
      </Row>
    </Layout>
  );
}

export default Orders;
