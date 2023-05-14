import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../features/filter/filterSlice';
import styles from '../styles/SearchForm.module.css';

function SearchForm() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = input.trim().replace(/\s+/g, ' ').toLowerCase();
    dispatch(setSearchTerm(value));
  };

  return (
    <Form
      className="border-0 d-flex align-items-center justify-content-center w-50 mx-auto"
      onSubmit={handleSubmit}
    >
      <Form.Control
        type="search"
        size="sm"
        placeholder="Search"
        className={`rounded-0 w-100 ${styles.search_form}`}
        aria-label="Search"
        value={input}
        onChange={handleChange}
      />
      <Button
        type="submit"
        size="sm"
        className="mx-1 bg-light text-dark border rounded-0"
      >
        Search
      </Button>
    </Form>
  );
}

export default SearchForm;
