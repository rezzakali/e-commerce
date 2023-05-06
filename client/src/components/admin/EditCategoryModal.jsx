import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useEditCategoryMutation } from '../../features/category/categoryApi';
import TextInput from '../TextInput';

function EditCategoryModal({
  show,
  handleClose,
  editCategoryName,
  editCategoryId,
}) {
  const [name, setName] = useState('');
  const [id, setId] = useState(null);

  const [
    editCategory,
    { data: response, isLoading, isSuccess, isError, error },
  ] = useEditCategoryMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '') {
      toast.error('Field is empty!');
    } else {
      editCategory({ data: name, id });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(response?.message);
      handleClose(true);
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    setName(editCategoryName);
    setId(editCategoryId);
  }, [editCategoryName, editCategoryId]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <h5>Edit Category</h5>
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
          <Button className="w-auto bg-success" size="sm" type="submit">
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              'Edit Category'
            )}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default EditCategoryModal;
