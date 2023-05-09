import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { BsCart4 } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import { useGetCategoryNameQuery } from '../features/category/categoryApi';
import {
  useGetSimilarProductsQuery,
  useGetSingleProductQuery,
} from '../features/product/productApi';
import styles from '../styles/ProductCardButton.module.css';

function SingleProduct() {
  const { id } = useParams();

  const { data: product, isLoading, isError } = useGetSingleProductQuery(id);
  const { name, price, description } = product?.product || {};

  const cid = product?.product?.category;
  const { data: similarProducts } = useGetSimilarProductsQuery({
    pid: id,
    cid,
  });
  const { data: category } = useGetCategoryNameQuery(cid);

  return (
    <Layout>
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
                className={`w-auto rounded-0 ${styles.product_card_button}`}
                style={{ textTransform: 'uppercase' }}
              >
                <BsCart4 role="button" size={20} /> Add to cart
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
        {similarProducts?.products?.map((p) => {
          const { price, name, description, _id } = p || {};
          return (
            <ProductCard
              key={_id}
              id={_id}
              name={name}
              price={price}
              description={description}
            />
          );
        })}
      </Row>
    </Layout>
  );
}

export default SingleProduct;
