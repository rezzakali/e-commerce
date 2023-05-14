import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useUpdateUserInfoMutation } from '../features/auth/authApi';
import styles from '../styles/ProductCardButton.module.css';
import TextInput from './TextInput';

function UserProfileUpdateModal({ show, handleClose, setShow }) {
  const { user } = useSelector((state) => state.auth);
  const { name, email, phone, address, answer, _id } = user || {};

  const [updateName, setUpdateName] = useState(name);
  const [updateEmail, setUpdateEmail] = useState(email);
  const [updatePhone, setUpdatePhone] = useState(phone);
  const [updateAddress, setUpdateAddress] = useState(address);
  const [updateAnswer, setUpdateAnswer] = useState(answer);

  const [updateUserInfo, { data: response, isLoading, isError, error }] =
    useUpdateUserInfoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !address || !answer) {
      toast.warning('Every field must be required!');
    } else {
      updateUserInfo({
        data: {
          updateName,
          updateEmail,
          updatePhone,
          updateAddress,
          updateAnswer,
        },
        id: _id,
      });
    }
  };

  useEffect(() => {
    if (response) {
      toast.success(response.message);
      setShow(false);
    }
    if (isError) {
      toast.error(error?.message);
    }
  }, [response, isError]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      top="true"
    >
      <Modal.Header closeButton>
        <h5>Update your profile</h5>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            required
            placeholder="full name"
            size="sm"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
          />
          <br />
          <TextInput
            type="email"
            required
            placeholder="email"
            size="sm"
            value={updateEmail}
            disabled
          />
          <br />
          <TextInput
            type="number"
            required
            placeholder="phone"
            size="sm"
            value={updatePhone}
            onChange={(e) => setUpdatePhone(e.target.value)}
          />
          <br />
          <TextInput
            type="text"
            required
            placeholder="address"
            size="sm"
            value={updateAddress}
            onChange={(e) => setUpdateAddress(e.target.value)}
          />
          <br />
          <TextInput
            type="text"
            required
            placeholder="your favourite sports"
            size="sm"
            value={updateAnswer}
            onChange={(e) => setUpdateAnswer(e.target.value)}
          />
          <br />
          <Button
            className={`w-100  border border-gray ${styles.product_card_button}`}
            size="sm"
            type="submit"
          >
            {isLoading ? 'Loading...' : 'Update Profile'}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default UserProfileUpdateModal;
