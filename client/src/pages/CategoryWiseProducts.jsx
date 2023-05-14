import React from 'react';
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import { useGetProductsBasedOnSlugNameQuery } from '../features/product/productApi';

function CategoryWiseProducts() {
  const { slug } = useParams();
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsBasedOnSlugNameQuery(slug);

  const { searchTerm } = useSelector((state) => state.filter);

  let content = null;
  if (isLoading) content = <Loading />;
  if (!isLoading && isError) content = <>Something went wrong</>;
  if (!isLoading && !isError && products?.products?.length === 0)
    content = <>No products found!</>;
  if (!isLoading && !isError && products?.products?.length > 0)
    content = (
      <Row className="mt-5 mx-1">
        <p className="fs-5">
          {slug.toUpperCase()}({products?.products?.length})
        </p>
        {products.products
          .filter((p) => {
            if (searchTerm === '') return p;
            return p.name.toLowerCase().includes(searchTerm.toLowerCase());
          })
          .map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </Row>
    );

  return <Layout title={`e-Shop -Category`}>{content}</Layout>;
}

export default CategoryWiseProducts;
