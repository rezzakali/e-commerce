import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { FaCamera } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import TextInput from '../../components/TextInput';
import UserProfileUpdateModal from '../../components/UserProfileUpdateModal';
import { useUpdateUserProfilePictureMutation } from '../../features/auth/authApi';

function AdminInfo() {
  const [profile, setProfile] = useState();

  const { user } = useSelector((state) => state.auth);
  const { name, email, phone, address, answer, _id } = user || {};

  // for update profile modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // API request for udpate profile picture
  const [
    updateUserProfilePicture,
    { data: response, isLoading, isError, error },
  ] = useUpdateUserProfilePictureMutation();

  // handle change || profile picture handle
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfile(file);

    // set form data
    const formData = new FormData();
    formData.append('profilePicture', file);
    // requesting api using RTK Query
    updateUserProfilePicture({ profilePicture: formData, id: _id });
  };

  // handler to open file after clicking on the div || input
  const handleClick = () => {
    document.getElementById('fileInput').click();
  };

  // get the response and show the toast on the ui
  useEffect(() => {
    if (response) {
      toast.success(response.message);
    }
    if (isError) {
      toast.error(error?.message || 'Something went wrong');
    }
  }, [isError, response]);

  return (
    <Row className="p-5">
      <Col sm={6} md={6} lg={3}>
        <div style={{ position: 'relative' }}>
          {isLoading ? (
            'uploading'
          ) : (
            <img
              src={
                profile
                  ? URL.createObjectURL(profile)
                  : `http://127.0.0.1:9000/api/v1/auth/get-user-profile-image/${_id}`
              }
              alt="user_profile_image"
              className="object-fit-cover rounded-circle border p-1"
              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
            />
          )}
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              position: 'absolute',
              marginTop: '-15px',
              marginLeft: '50',
              backgroundColor: '#d9dada',
              cursor: 'pointer',
            }}
            onClick={handleClick}
          >
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <FaCamera />
          </div>
        </div>

        <br />
        <hr />
        <h5>{name}</h5>
      </Col>
      <Col sm={6} md={6} lg={9}>
        <Form>
          <TextInput value={name} disabled />
          <br />
          <TextInput value={email} disabled />
          <br />
          <TextInput value={phone} disabled />
          <br />
          <TextInput value={address} disabled />
          <br />
          <TextInput value={answer} disabled />
        </Form>
        <br />
        <UserProfileUpdateModal
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
          setShow={setShow}
        />
        <div className="d-flex align-items-center justify-content-end mb-2">
          <Button
            onClick={() => setShow(true)}
            className="bg-light text-dark border border-gray mb-5"
            size="sm"
            type="submit"
          >
            Update Profile
          </Button>
        </div>
      </Col>
    </Row>
  );
}

export default AdminInfo;
