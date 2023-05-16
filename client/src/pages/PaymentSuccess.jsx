import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { BsCheckCircleFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { removeAllCartItem } from '../features/cart/cartSlice';
import styles from '../styles/ProductCardButton.module.css';

function PaymentSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(removeAllCartItem());
    localStorage.removeItem('cartItems');
  }, [dispatch]);

  return (
    <Layout title={`e-Shop -Payment Success`}>
      <h3 className="text-center p-5">Your order has been received</h3>
      <div
        className="d-flex align-items-center justify-content-center flex-column p-5"
        // style={{ height: '70vh' }}
      >
        <BsCheckCircleFill size={70} color="green" />
        <p className="mt-3 fs-4">Thank you for your purchase !</p>
        <Button
          size="sm"
          className={`mt-2 p-2 w-auto d-flex align-items-center justify-content-center rounded-0 ${styles.product_card_button}`}
          style={{ textTransform: 'uppercase' }}
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </Button>
      </div>
    </Layout>
  );
}

export default PaymentSuccess;
