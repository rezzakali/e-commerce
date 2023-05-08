import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { useGetProductsQuery } from '../features/product/productApi';
import ProductCard from './ProductCard';

function HomePageProducts() {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  const { filterWord, priceRange } = useSelector((state) => state.filter);

  let filteredProducts = products?.products;

  // price range state
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(9999);

  useEffect(() => {
    if (priceRange === '99-199') {
      setMinPrice(99);
      setMaxPrice(199);
    } else if (priceRange === '200-299') {
      setMinPrice(200);
      setMaxPrice(299);
    } else if (priceRange === '300-399') {
      setMinPrice(300);
      setMaxPrice(399);
    } else if (priceRange === '400-499') {
      setMinPrice(400);
      setMaxPrice(499);
    } else if (priceRange === '500-599') {
      setMinPrice(500);
      setMaxPrice(599);
    } else if (priceRange === '600-9999') {
      setMinPrice(600);
      setMaxPrice(9999);
    }
  }, [priceRange]);

  // filter by search keyword
  if (filterWord) {
    filteredProducts = filteredProducts?.filter((product) => {
      if (filterWord === '') {
        return true;
      } else {
        return product.category.name === filterWord;
      }
    });
  }

  if (priceRange) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  }

  const length = filteredProducts?.length;

  useEffect(() => {
    if (length === 0) {
      toast.error('No products');
    }
  }, [length]);

  return (
    <>
      {isLoading && <Loading />}
      {isError && <p className="text-center">Something went wrong</p>}
      <Row>
        <p className="mt-3 fs-4">All Collections</p>
        {filteredProducts?.map((product) => {
          const { _id, name, description, price } = product || {};

          return (
            <ProductCard
              key={_id}
              id={_id}
              name={name}
              price={price}
              description={description}
              length={length}
            />
          );
        })}
      </Row>
    </>
  );
}

export default HomePageProducts;
