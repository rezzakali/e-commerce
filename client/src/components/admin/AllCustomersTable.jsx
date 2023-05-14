import moment from 'moment';
import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { RiDeleteBin5Line } from 'react-icons/ri';
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from '../../features/auth/authApi';
import AdminLoading from '../admin/AdminLoading';

function AllCustomersTable() {
  const { data: users, isLoading, isError, error } = useGetAllUsersQuery();
  const [
    deleteUser,
    {
      data: deleteUserRes,
      isSuccess,
      isError: deleteUserIsError,
      error: deleteUserError,
    },
  ] = useDeleteUserMutation();

  const handleDelete = (id) => {
    deleteUser(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(deleteUserRes?.message);
    }
    if (deleteUserIsError) {
      toast.error(deleteUserError?.message);
    }
  }, [isSuccess, deleteUserIsError]);

  let content = null;
  if (isLoading) content = <AdminLoading />;

  if (!isLoading && isError) content = toast.error(error?.message);

  if (!isLoading && !isError && users?.users?.length === 0)
    content = <p>No users found!</p>;

  if (!isLoading && !isError && users?.users?.length > 0)
    content = users?.users.map(
      ({ _id, name, email, phone, address, createdAt }, index) => {
        return (
          <tr key={_id}>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{address}</td>
            <td>{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
            <td>
              <RiDeleteBin5Line
                role="button"
                onClick={() => handleDelete(_id)}
                className="text-danger"
              />
            </td>
          </tr>
        );
      }
    );

  return (
    <Table className="table-hover text-center">
      {!isLoading && users?.users?.length !== 0 && (
        <thead className="sticky-top bg-light" style={{ zIndex: '100' }}>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>CreatedAt</th>
            <th>Operation</th>
          </tr>
        </thead>
      )}
      <tbody>{content}</tbody>
    </Table>
  );
}

export default AllCustomersTable;
