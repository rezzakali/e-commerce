import React, { useEffect, useState } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { BsCart4 } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCartItem } from '../features/cart/cartSlice';
import styles from '../styles/ProductCardButton.module.css';
import truncateString from '../utils/truncateString';

function ProductCard({ product }) {
  const { _id: id, name, description, price, quantity } = product || {};
  const { cartItems } = useSelector((state) => state.cart);
  const [totalCartQuantity, setTotalCartQuantity] = useState(0);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // Calculate total quantity of the product in the cart
  useEffect(() => {
    const productInCart = cartItems.find((item) => item._id === id);
    const totalQuantity = productInCart ? productInCart.cartQuantity : 0;
    setTotalCartQuantity(totalQuantity);
  }, [cartItems, id]);

  const navigate = useNavigate();

  // add to cart handler
  const addToCartHandler = (product) => {
    if (user && user.role === 'user') {
      dispatch(setCartItem(product));
    } else {
      toast.warning('Need an account!');
      navigate('/login');
    }
  };

  return (
    <Col sm={6} lg={3} className="p-2 mb-3">
      <Card sm={6} md={4} lg={3} className="shadow-none border-0 rounded-0">
        <Link to={`/products/${id}`}>
          <Card.Img
            variant="top"
            src={`http://127.0.0.1:9000/api/v1/products/get-product-image/${id}`}
            style={{ height: '300px', width: '100%', objectFit: 'cover' }}
            className="rounded-0"
          />
        </Link>

        <Card.Body>
          <p className="fs-5" style={{ textTransform: 'uppercase' }}>
            {name}
          </p>
          <p className="fs-5">₹ {price}.00</p>
          <Card.Text className="text-justify">
            {truncateString(description, 50)}
          </Card.Text>
          <div>
            <Button
              size="sm"
              className={`w-auto d-flex align-items-center justify-content-center rounded-0 ${styles.product_card_button}`}
              style={{ textTransform: 'uppercase' }}
              onClick={() => addToCartHandler(product)}
              disabled={quantity === 0 || totalCartQuantity >= quantity}
            >
              <BsCart4 role="button" className="mx-1" size={20} />
              {quantity === 0 || totalCartQuantity >= quantity
                ? ' out of stock'
                : 'Add to cart'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductCard;
