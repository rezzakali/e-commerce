import moment from 'moment';
import React from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { BiArrowBack } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import UserSidebar from '../components/UserSidebar';
import { useGetOrdersQuery } from '../features/order/orderApi';
import classes from '../styles/CartPageTable.module.css';
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

  function getDeliveryDate(createdAt) {
    const deliveryDays = Math.floor(Math.random() * 3) + 5; // get a random delivery time between 5-7 days
    const createdAtDate = new Date(createdAt); // create a new Date object from the createdAt time
    const deliveryDate = new Date(
      createdAtDate.getTime() + deliveryDays * 24 * 60 * 60 * 1000
    ); // add the delivery time to the createdAt time

    return moment(deliveryDate.toISOString()).format('ll'); // return the delivery date in ISO format
  }

  let grandTotal = 0;

  return (
    <Layout
      title={'e-Shop -Your Orders'}
      keywords={''}
      author={'Rezzak'}
      description={'orders page'}
    >
      <Row className="pt-1" style={{ height: '100vh' }}>
        <Col sm={12} md={2} lg={2} className="shadow">
          <UserSidebar />
        </Col>
        <Col sm={12} md={10} lg={10}>
          <p className="fs-4 py-2">
            {orders?.orders?.length !== 0 && 'My orders'}
          </p>
          {isLoading && <Loading />}
          {isError && <p>Something went wrong</p>}

          {orders?.orders?.length === 0 ? (
            <>
              <div className="p-5 d-flex align-items-center justify-content-center flex-column">
                <h5 className="py-3">You have no orders</h5>
                <Button
                  size="sm"
                  className={`w-auto d-flex align-items-center justify-content-center rounded-0 ${styles.product_card_button}`}
                  style={{ textTransform: 'uppercase' }}
                  onClick={() => navigate('/')}
                >
                  <BiArrowBack role="button" className="mx-1" size={20} />
                  Shop now
                </Button>
              </div>
            </>
          ) : (
            <>
              <div
                className={`shadow-sm border-0 rounded-0 ${classes.table_container}`}
              >
                <Table className="text-center">
                  <thead
                    className="sticky-top bg-light"
                    style={{ zIndex: '100' }}
                  ></thead>
                  <tbody>
                    {orders?.orders?.map((order) => {
                      const products = order.products.map((product) => {
                        const { quantity, productId, productName, price } =
                          product;
                        return {
                          quantity,
                          productId,
                          productName,
                          price,
                        };
                      });
                      const {
                        createdAt,
                        delivery_status,
                        payment_status,
                        total,
                        shipping,
                      } = order;

                      grandTotal += total;

                      return (
                        <tr
                          key={order._id}
                          style={{
                            textAlign: 'center',
                            verticalAlign: 'middle',
                          }}
                        >
                          {products.map((product, index) => {
                            return (
                              <React.Fragment key={index}>
                                <td>
                                  <img
                                    src={`http://127.0.0.1:9000/api/v1/products/get-product-image/${product.productId}`}
                                    alt="product_image"
                                    style={{
                                      width: '60px',
                                      height: '80px',
                                    }}
                                  />
                                </td>
                                <td style={{ textTransform: 'uppercase' }}>
                                  {product.productName}
                                  <br />
                                  <span>Qty : {product.quantity}</span>
                                  <br />
                                  <span className="fw-bold">
                                    {' '}
                                    ₹ {product.price * product.quantity}.00
                                  </span>
                                </td>
                              </React.Fragment>
                            );
                          })}
                          <td>
                            Status: <br />
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
                            </span>{' '}
                            <br />
                            <span style={{ textTransform: 'capitalize' }}>
                              Order on <br />{' '}
                            </span>
                            {moment(createdAt).format('ll')}
                          </td>
                          <td>
                            <span>Expected Delivery by </span> <br />
                            <span className="fw-bold">
                              {getDeliveryDate(createdAt)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <p className="mt-2">
                  Payment Status: <span className="text-success">Paid </span>{' '}
                </p>
                <p className="fw-bold">
                  Total Paid: ₹ {grandTotal.toLocaleString()}.00
                </p>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Layout>
  );
}

export default Orders;
