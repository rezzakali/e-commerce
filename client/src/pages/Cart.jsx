import React, { useEffect } from 'react';
import { Button, Card, Col, ListGroup, Row, Table } from 'react-bootstrap';
import { BiArrowBack } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import {
  decreaseCartItem,
  getTotalAmount,
  removeAllCartItem,
  removeCartItem,
  setCartItem,
} from '../features/cart/cartSlice';
import { usePaymentMutation } from '../features/payment/paymentApi';
import classes from '../styles/CartPageTable.module.css';
import styles from '../styles/ProductCardButton.module.css';

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { totalAmount } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getTotalAmount());
  }, [dispatch, cartItems]);

  useEffect(() => {
    dispatch(getTotalAmount());
  }, [dispatch, cartItems]);

  // increase cart item
  const handleIncrease = (product) => {
    dispatch(setCartItem(product));
  };

  // decrease cart item
  const handleDecrease = (product) => {
    dispatch(decreaseCartItem(product));
  };

  // remove cart item
  const handleRemove = (product) => {
    dispatch(removeCartItem(product));
  };
  let grandTotal = 0;

  const [payment, { data: response, isLoading, isError, error }] =
    usePaymentMutation();

  // payment handler
  const handlePayment = () => {
    const newCartItems = cartItems.map((item) => {
      const { description, createdAt, updatedAt, quantity, ...rest } = item;
      return rest;
    });
    payment({ cartItems: newCartItems, userId: user?._id });
  };

  useEffect(() => {
    if (response) {
      window.location.href = response.url;
    }
  }, [response, isError]);

  useEffect(() => {
    if (isError) {
      toast.warning(error?.data?.message);
    }
  }, [isError, error, response]);

  return (
    <Layout
      title={'e-Shop -Cart'}
      keywords={'men,shirt, t-shirt, kurta pyjama'}
      author={'Rezzak'}
      description={'cart page'}
    >
      {cartItems?.length === 0 ? (
        <div className="d-flex align-items-center justify-content-center flex-column">
          <img
            src={`/EmptyCart.png`}
            alt="empty_cart"
            style={{ width: '300px', height: 'auto' }}
            className="mt-5"
          />
          <h5 className="mt-2">Your Cart is Empty</h5>
          <p>
            Looks like you have not added anything to your your. Go ahead &
            explore top categories
          </p>
          <Button
            size="sm"
            className={`w-auto d-flex align-items-center justify-content-center rounded-0 ${styles.product_card_button}`}
            style={{ textTransform: 'uppercase' }}
            onClick={() => navigate('/')}
          >
            <BiArrowBack role="button" className="mx-1" size={20} />
            Home
          </Button>
        </div>
      ) : (
        <Row className="my-5 mx-1">
          <Col sm={12} md={8} lg={8}>
            <p>Shopping cart</p>
            <div
              className={`shadow-sm border-0 rounded-0 ${classes.table_container}`}
            >
              <Table className="text-center">
                <thead
                  className="sticky-top bg-light"
                  style={{ zIndex: '100' }}
                >
                  <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => {
                    grandTotal += item.price * item.cartQuantity;
                    return (
                      <tr key={item._id}>
                        <td>
                          <img
                            src={`http://127.0.0.1:9000/api/v1/products/get-product-image/${item._id}`}
                            style={{
                              height: '60px',
                              width: '25%',
                              objectFit: 'cover',
                            }}
                            className="rounded-0"
                            alt={item.name}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>₹ {item.price}</td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            <Button
                              className="w-100 border-0 bg-light rounded-0 text-dark"
                              size="sm"
                              onClick={() => handleIncrease(item)}
                            >
                              +
                            </Button>
                            <span>{item.cartQuantity}</span>
                            <Button
                              className="w-100 border-0 bg-light rounded-0 text-dark"
                              size="sm"
                              onClick={() => handleDecrease(item)}
                            >
                              -
                            </Button>
                          </div>
                        </td>
                        <td>₹ {item.price * item.cartQuantity}</td>
                        <td>
                          <RiDeleteBin5Line
                            role="button"
                            className="text-danger mx-1"
                            onClick={() => handleRemove(item)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <p
                className="text-danger mt-2"
                style={{ textTransform: 'uppercase', width: 'auto' }}
                role="button"
                onClick={() => dispatch(removeAllCartItem())}
              >
                Clear all
              </p>
            </div>
          </Col>
          <Col sm={12} md={4} lg={4}>
            <p className="text-center">Cart summery</p>
            <Card className="shadow-sm border-0 rounded-0">
              <Card.Body className="rounded-0 border-0">
                <Card.Title className="mx-3">Total</Card.Title>
                <ListGroup as="ol" className="rounded-0 border-0">
                  <ListGroup.Item className="border-0 d-flex align-items-center justify-content-between">
                    <p>Subtotal</p>
                    <p className="fs-5">₹ {grandTotal}.00</p>
                  </ListGroup.Item>
                  <ListGroup.Item className="border-0 d-flex align-items-center justify-content-between">
                    <p>Delivery</p>
                    <p>Free</p>
                  </ListGroup.Item>
                  <hr />
                  <ListGroup.Item className="border-0 d-flex align-items-center justify-content-between fw-bold">
                    <p>
                      <span>Total (VAT Included) </span>
                    </p>
                    <p className="fs-5">₹ {totalAmount}.00</p>
                  </ListGroup.Item>
                  <ListGroup.Item className="border-0">
                    <Button
                      size="sm"
                      className={`w-100 py-2 rounded-0 ${styles.product_card_button}`}
                      style={{ textTransform: 'uppercase' }}
                      onClick={handlePayment}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Loading...' : 'proceed to checkout'}
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Layout>
  );
}

export default Cart;
