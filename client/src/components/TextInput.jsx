import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import styles from '../styles/TextInput.module.css';

function TextInput({ icon, placeholder, className, as, ...rest }) {
  return (
    <InputGroup>
      {as !== 'textarea' && icon && <InputGroup.Text>{icon}</InputGroup.Text>}
      <Form.Control
        placeholder={placeholder}
        className={`${className} ${styles.text_input}`}
        {...rest}
      />
    </InputGroup>
  );
}

export default TextInput;
