import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useAddCategoryMutation } from '../../features/category/categoryApi';
import styles from '../../styles/ProductCardButton.module.css';
import TextInput from '../TextInput';

function AddCategoryModal({ show, handleClose }) {
  const [name, setName] = useState('');
  const [addCategory, { data, isLoading, isError, isSuccess, error }] =
    useAddCategoryMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === '') {
      toast.error('Category field is empty!');
    } else {
      addCategory({ name });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      handleClose(true);
      setName('');
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <h5>Add Category</h5>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Category name"
            size="sm"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <Button
            className={`w-auto ${styles.product_card_button}`}
            size="sm"
            type="submit"
          >
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              'Add Category'
            )}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddCategoryModal;
