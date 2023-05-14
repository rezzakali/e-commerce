import React, { useEffect, useState } from 'react';
import { Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import { useGetProductsBasedOnSlugNameQuery } from '../features/product/productApi';
import styles from '../styles/TextInput.module.css';

function CategoryWiseProducts() {
  const { slug } = useParams();
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsBasedOnSlugNameQuery(slug);

  const { searchTerm } = useSelector((state) => state.filter);

  const [sortedProducts, setSortedProducts] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value && value !== '') {
      if (value === 'low to high') {
        setSortedProducts(
          [...products?.products].sort((a, b) => a.price - b.price)
        );
      } else if (value === 'high to low') {
        setSortedProducts(
          [...products?.products].sort((a, b) => b.price - a.price)
        );
      } else {
        setSortedProducts(products?.products);
      }
    }
  };

  useEffect(() => {
    setSortedProducts(products?.products);
  }, [products]);

  let content = null;
  if (isLoading) content = <Loading />;
  if (!isLoading && isError) content = <>Something went wrong</>;
  if (!isLoading && !isError && products?.products?.length === 0)
    content = <>No products found!</>;
  if (!isLoading && !isError && products?.products?.length > 0)
    content = (
      <Row className="mt-5 mx-1">
        <div className="d-flex align-items-center justify-content-between">
          <p className="fs-5">
            {slug.toUpperCase()}({products?.products?.length})
          </p>
          <Form.Select
            size="sm"
            className={`${styles.text_input}`}
            style={{ width: 'auto' }}
            onChange={handleChange}
          >
            <option value="sorting" hidden defaultValue>
              sort by price
            </option>
            <option value="low to high">Low to High</option>
            <option value="high to low">High to Low</option>
          </Form.Select>
        </div>

        {sortedProducts
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
    );

  return <Layout title={`e-Shop -Category`}>{content}</Layout>;
}

export default CategoryWiseProducts;
