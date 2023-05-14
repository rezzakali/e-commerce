import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
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
    dispatch(setSearchTerm(input));
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <Form
      className="border-0 d-flex align-items-center justify-content-center w-50 mx-auto"
      onSubmit={handleSubmit}
    >
      <Form.Control
        type="search"
        size="sm"
        placeholder="Search by name only"
        className={`rounded-0 w-100 ${styles.search_form}`}
        aria-label="Search"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </Form>
  );
}

export default SearchForm;
