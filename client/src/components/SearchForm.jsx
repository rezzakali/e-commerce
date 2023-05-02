import React from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from '../styles/SearchForm.module.css';

function SearchForm() {
  return (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search"
        className={`me-1 ${styles.search_form}`}
        aria-label="Search"
      />
      <Button className={`bg-light text-dark ${styles.button}`}>Search</Button>
    </Form>
  );
}

export default SearchForm;
