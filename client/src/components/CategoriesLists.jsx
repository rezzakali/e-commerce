import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useGetCategoriesQuery } from '../features/category/categoryApi';

function CategoriesLists() {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  return (
    <>
      {!isLoading && (
        <ul>
          {categories?.categories?.map((item) => (
            <li key={item._id}>
              <LinkContainer to={`/category/${item.slug}`}>
                <Nav.Link to={`/category/${item.slug}`}>{item.name}</Nav.Link>
              </LinkContainer>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default CategoriesLists;
