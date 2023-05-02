import React from 'react';
import { Button, Form } from 'react-bootstrap';

function SearchForm() {
  return (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-1"
        aria-label="Search"
      />
      <Button className="bg-light text-dark border border-secondary">
        Search
      </Button>
    </Form>
  );
}

export default SearchForm;
