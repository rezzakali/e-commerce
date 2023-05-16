import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { useGetProductsQuery } from '../features/product/productApi';
import PaginationComponent from './PaginationComponent';
import ProductCard from './ProductCard';

function HomePageProducts() {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const { searchTerm } = useSelector((state) => state.filter);

  const { paginateProductsLists } = useSelector((state) => state.products);

  const { filterWord, priceRange } = useSelector((state) => state.filter);

  let filteredProducts = paginateProductsLists;

  // price range state
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(9999);

  // price range
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
    filteredProducts = paginateProductsLists?.filter((product) => {
      if (filterWord === '') {
        return true;
      } else {
        return product.category.name === filterWord;
      }
    });
  }

  if (priceRange) {
    filteredProducts = paginateProductsLists?.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  }

  return (
    <>
      {isLoading && <Loading />}
      {isError && <p className="text-center">Something went wrong</p>}
      <p className="mt-3 fs-4">All Collections</p>
      {!isLoading && (
        <Row>
          {filteredProducts
            ?.filter((p) => {
              if (searchTerm === '') return p;
              const regex = new RegExp(searchTerm, 'i');
              return (
                regex.test(p.name.toLowerCase()) ||
                regex.test(p.description.toLowerCase()) ||
                regex.test(p.price)
              );
            })
            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </Row>
      )}
      <PaginationComponent />
    </>
  );
}

export default HomePageProducts;
