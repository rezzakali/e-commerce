import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from '../../features/category/categoryApi';
import AdminLoading from '../admin/AdminLoading';
import EditCategoryModal from './EditCategoryModal';

function CategoriesTable() {
  // for edit category modal
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useGetCategoriesQuery();

  const [
    deleteCategory,
    {
      data: response,
      isError: isErrorDeleteCategory,
      isSuccess,
      error: errorDeleteCategory,
    },
  ] = useDeleteCategoryMutation();

  const handleDelete = (id) => {
    deleteCategory(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(response?.message);
    }
    if (isErrorDeleteCategory) {
      toast.error(errorDeleteCategory?.message);
    }
  }, [isErrorDeleteCategory, isSuccess]);

  const handleEdit = (item) => {
    setShow(true);
    setEditCategoryName(item.name);
    setEditCategoryId(item._id);
  };

  let content = null;
  if (isLoading) content = <AdminLoading />;
  if (!isLoading && isError) content = <p>{error?.message}</p>;
  if (!isLoading && !isError && categories?.categories?.length === 0)
    content = (
      <tr>
        <td>No categories found!</td>
      </tr>
    );
  if (!isLoading && !isError && categories?.categories?.length > 0)
    content = categories.categories.map((item, index) => {
      const { name, slug, _id } = item;
      return (
        <tr key={_id}>
          <td>{index + 1}</td>
          <td>{name}</td>
          <td>{slug}</td>
          <td>
            <RiDeleteBin5Line
              role="button"
              onClick={() => handleDelete(_id)}
              className="text-danger mx-1"
            />
            <FaRegEdit
              role="button"
              className="text-primary mx-2"
              onClick={() => handleEdit(item)}
            />
          </td>
        </tr>
      );
    });

  return (
    <>
      <EditCategoryModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        editCategoryName={editCategoryName}
        editCategoryId={editCategoryId}
      />
      <Table className="table-hover text-center">
        {!isLoading && categories?.categories?.length !== 0 && (
          <thead className="sticky-top bg-light" style={{ zIndex: '100' }}>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Operation</th>
            </tr>
          </thead>
        )}
        <tbody>{content}</tbody>
      </Table>
    </>
  );
}

export default CategoriesTable;
