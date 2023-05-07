import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../../features/product/productApi';
import Loading from '../Loading';
import AddProductModal from './AddProductModal';

function ProductsTable() {
  // for add product modal || START
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // for add product modal || END

  // for edit product (states)
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [id, setId] = useState('');
  const [shipping, setShipping] = useState('');

  // for get products || RTK Query API Request || START
  const { data: products, isLoading, isError, error } = useGetProductsQuery();
  // for get products || RTK Query API Request || END

  // for delete product || RTK Query thunk || API Request || START
  const [
    deleteProduct,
    {
      data: response,
      isError: isDeleteError,
      error: deleteError,
      isLoading: deleteIsLoading,
      isSuccess,
    },
  ] = useDeleteProductMutation();

  // for delete product || RTK Query thunk || API Request || END

  // edit product handler
  const handleProductEdit = (product) => {
    setShow(true);
    const { name, price, quantity, category, description, _id, shipping } =
      product || {};
    const { name: categoryName } = category || {};
    setName(name);
    setId(_id);
    setPrice(price);
    setQuantity(quantity);
    setCategory(categoryName);
    setDescription(description);
    setShipping(shipping);
  };

  // delete product handler
  const handleDelete = (id) => {
    deleteProduct(id);
  };

  // use effect for getting response after delete a product
  useEffect(() => {
    if (isSuccess) {
      toast.success(response?.message);
    }
    if (isDeleteError) {
      toast.error(deleteError?.message);
    }
  }, [isDeleteError, isSuccess]);

  // for product get related || START
  let content = null;

  if (isLoading) content = <Loading />;

  if (!isLoading && isError) content = <p>{error?.message}</p>;

  if (!isLoading && !isError && products?.products?.length === 0)
    content = (
      <tr>
        <td>No products found!</td>
      </tr>
    );

  if (!isLoading && !isError && products?.products?.length > 0)
    content = products.products.map((product) => {
      const { _id, category, name, price, quantity, createdAt, shipping } =
        product;
      const { name: categoryName } = category;

      return (
        <tr key={_id}>
          <td>{_id}</td>
          <td>{name}</td>
          <td>
            <img src="" alt={name} />
          </td>
          <td>{price}</td>
          <td>{quantity}</td>
          <td>{categoryName}</td>
          <td>{shipping ? 'Yes' : 'No'}</td>
          <td>{moment(createdAt).format('MMMM Do YYYY')}</td>
          <td>
            <RiDeleteBin5Line
              role="button"
              className="text-danger mx-1"
              onClick={() => handleDelete(_id)}
              disabled={deleteIsLoading}
            />
            <FaRegEdit
              role="button"
              className="text-primary mx-2"
              onClick={() => handleProductEdit(product)}
            />
          </td>
        </tr>
      );
    });

  // for product get related || END

  return (
    <>
      <Table className="table-hover text-center">
        {!isLoading && products?.products?.length !== 0 && (
          <thead>
            <tr>
              <th>_id</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Shipping</th>
              <th>CreatedAt</th>
              <th>Operation</th>
            </tr>
          </thead>
        )}
        <tbody>{content}</tbody>
      </Table>
      <AddProductModal
        show={show}
        handleClose={handleClose}
        name={name}
        price={price}
        quantity={quantity}
        description={description}
        category={category}
        shipping={shipping}
        id={id}
      />
    </>
  );
}

export default ProductsTable;
