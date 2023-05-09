import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { BsCart4 } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import { useGetSingleProductQuery } from '../features/product/productApi';
import styles from '../styles/ProductCardButton.module.css';

function SingleProduct() {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetSingleProductQuery(id);
  const { name, price, description } = product?.product || {};

  return (
    <Layout>
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
            <h3>{name}</h3>
            <h2>₹ {price}.00</h2>
            <p>{description}</p>
            <div>
              <Button
                size="sm"
                className={`w-auto rounded-0 ${styles.product_card_button}`}
              >
                <BsCart4 role="button" /> Add to cart
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </Layout>
  );
}

export default SingleProduct;
