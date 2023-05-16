import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { BsCart4 } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import { setCartItem } from '../features/cart/cartSlice';
import { useGetCategoryNameQuery } from '../features/category/categoryApi';
import {
  useGetSimilarProductsQuery,
  useGetSingleProductQuery,
} from '../features/product/productApi';
import styles from '../styles/ProductCardButton.module.css';

function SingleProduct() {
  const { id } = useParams();

  const { data: product, isLoading, isError } = useGetSingleProductQuery(id);
  const { name, price, description, quantity } = product?.product || {};

  const cid = product?.product?.category;
  const { data: similarProducts } = useGetSimilarProductsQuery({
    pid: id,
    cid,
  });
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const { data: category } = useGetCategoryNameQuery(cid);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchTerm } = useSelector((state) => state.filter);

  const [totalCartQuantity, setTotalCartQuantity] = useState(0);

  // Calculate total quantity of the product in the cart
  useEffect(() => {
    const productInCart = cartItems.find((item) => item._id === id);
    const totalQuantity = productInCart ? productInCart.cartQuantity : 0;
    setTotalCartQuantity(totalQuantity);
  }, [cartItems, id]);

  const addToCartHandler = (product) => {
    if (user && user.role === 'user') {
      dispatch(setCartItem(product));
    } else {
      toast.warning('Need an account!');
      navigate('/login');
    }
  };

  return (
    <Layout title={`e-Shop -Single Product`}>
      {isError && <p>Something went wrong</p>}
      {isLoading ? (
        <Loading />
      ) : (
        <Row className="m-5">
          <Col sm={12} md={4} lg={4}>
            <img
              src={`http://127.0.0.1:9000/api/v1/products/get-product-image/${id}`}
              alt="single_product"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </Col>
          <Col sm={12} md={8} lg={8}>
            {/* product title */}
            <h3 style={{ textTransform: 'uppercase' }}>{name}</h3>
            <p className="fs-6" style={{ textTransform: 'uppercase' }}>
              Category: {category?.category?.name}
            </p>
            <h2>₹ {price}.00</h2>
            <p>{description}</p>
            <div>
              <Button
                size="sm"
                className={`w-auto d-flex align-items-center justify-content-center rounded-0 ${styles.product_card_button}`}
                style={{ textTransform: 'uppercase' }}
                onClick={() => addToCartHandler(product?.product)}
                disabled={quantity === 0 || totalCartQuantity >= quantity}
              >
                <BsCart4 role="button" size={20} className="mx-1" />
                {quantity === 0 || totalCartQuantity >= quantity
                  ? ' out of stock'
                  : 'Add to cart'}
              </Button>
            </div>
          </Col>
        </Row>
      )}
      <hr />
      <Row className="mx-1">
        {similarProducts?.products?.length < 1 && (
          <p className="text-center">No Similar Products</p>
        )}
        <p className="fs-4" style={{ textTransform: 'uppercase' }}>
          similar Products
        </p>
        {similarProducts?.products
          ?.filter((p) => {
            if (searchTerm === '') return p;
            const regex = new RegExp(searchTerm, 'i');
            return (
              regex.test(p.name.toLowerCase()) ||
              regex.test(p.description.toLowerCase()) ||
              regex.test(p.price)
            );
          })
          ?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </Row>
    </Layout>
  );
}

export default SingleProduct;
