import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import TextInput from './TextInput';

function UserProfileUpdateModal({ show, handleClose, setShow }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <h5>Update your profile</h5>
      </Modal.Header>
      <Modal.Body>
        <form>
          <TextInput type="email" required placeholder="email" size="sm" />
          <br />
          <TextInput
            type="text"
            required
            placeholder="enter your favourite sports name provided during registration"
            size="sm"
          />
          <br />
          <TextInput
            type="password"
            required
            placeholder="enter new password"
            size="sm"
          />
          <br />
          <Button
            className="w-100 bg-light text-dark border border-gray"
            size="sm"
            type="submit"
          >
            Update Profile
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default UserProfileUpdateModal;
