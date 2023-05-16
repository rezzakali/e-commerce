import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useGetCategoriesQuery } from '../../features/category/categoryApi';
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from '../../features/product/productApi';
import styles from '../../styles/ProductCardButton.module.css';
import TextInput from '../TextInput';

function AddProductModal({
  show,
  handleClose,
  name: editName,
  price: editPrice,
  quantity: editQuantity,
  description: editDescription,
  category: editCategory,
  shipping: editShipping,
  id,
}) {
  // fetch all categories
  const { data: categories } = useGetCategoriesQuery();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [shipping, setShipping] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    setCategory(editCategory);
    setName(editName);
    setDescription(editDescription);
    setQuantity(editQuantity);
    setPrice(editPrice);
    setShipping(editShipping);
  }, [
    editName,
    editPrice,
    editCategory,
    editDescription,
    editQuantity,
    editShipping,
    id,
  ]);

  const resetForm = () => {
    setName('');
    setPrice('');
    setQuantity('');
    setCategory('');
    setDescription('');
    setImage('');
    setShipping('');
  };

  const [addProduct, { data: response, isLoading, isSuccess, isError, error }] =
    useAddProductMutation();

  // udpate product
  const [
    updateProduct,
    {
      data: editResponse,
      isLoading: editIsLoading,
      isSuccess: editIsSuccess,
      isError: editIsError,
      error: editError,
    },
  ] = useUpdateProductMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(response?.message);
      handleClose(true);
      resetForm();
    }
  }, [response, isError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('name', name);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('shipping', shipping);
    formData.append('image', image);

    addProduct(formData);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('name', name);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('shipping', shipping);
    formData.append('image', image);

    updateProduct({ data: formData, id });
  };

  // update success
  useEffect(() => {
    if (editIsSuccess) {
      toast.success(editResponse?.message);
      resetForm();
      handleClose(false);
    }
    if (editIsError) {
      toast.error(editError?.data?.message);
    }
  }, [editIsSuccess, editIsError]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={true}
      centered
    >
      <Modal.Header closeButton>
        <h5>{`${id ? 'Update Product' : 'Add Product'}`}</h5>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={id ? handleEdit : handleSubmit}>
          <TextInput
            type="text"
            placeholder="Product name"
            size="sm"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <TextInput
            type="number"
            placeholder="Price"
            size="sm"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <TextInput
            type="number"
            placeholder="Quantity"
            size="sm"
            required
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <br />
          <Form.Select
            size="sm"
            className={`${styles.text_input}`}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value={id ? category : ''} hidden defaultValue>
              {id ? category : 'Select product category'}
            </option>
            {categories?.categories?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </Form.Select>
          <br />
          <TextInput
            as="textarea"
            type="text"
            placeholder="Description"
            size="sm"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ height: '100px' }}
          />
          <br />
          <Form.Control
            type="file"
            name="image"
            accept="image/*"
            size="sm"
            className={`${styles.text_input}`}
            onChange={(e) => setImage(e.target.files[0])}
          />
          <br />
          {id && (
            <img
              src={`http://127.0.0.1:9000/api/v1/products/get-product-image/${id}`}
              alt={name}
              style={{ height: '60px', width: '60px' }}
            />
          )}

          {image && (
            <div className="text-center">
              <img
                src={URL.createObjectURL(image)}
                alt="product_image"
                style={{ height: '100px' }}
              />
            </div>
          )}
          <br />
          <Form.Select
            className={`${styles.text_input}`}
            size="sm"
            onChange={(e) => setShipping(e.target.value)}
          >
            <option value="" hidden defaultValue>
              {id ? (shipping ? 'Yes' : 'No') : 'Shipping'}
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Form.Select>
          <br />
          <Button
            className={`w-auto ${styles.product_card_button}`}
            size="sm"
            type="submit"
          >
            {isLoading || editIsLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              `${id ? 'Update Product' : 'Add Product'}`
            )}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddProductModal;
