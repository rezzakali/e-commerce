import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function CategoriesLists({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <LinkContainer to={item.link}>
            <Nav.Link to={item.link}>{item.title}</Nav.Link>
          </LinkContainer>
        </li>
      ))}
    </ul>
  );
}

export default CategoriesLists;
