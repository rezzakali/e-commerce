import gravatarUrl from 'gravatar-url';
import React, { useState } from 'react';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import UserProfileUpdateModal from '../../components/UserProfileUpdateModal';

function UserProfile() {
  const { user } = useSelector((state) => state.auth);
  const { name, email, phone, address, answer } = user || {};

  // for update profile modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Row className="p-5 shadow mx-auto">
      <Col sm={6} md={6} lg={3}>
        <div>
          <img
            src={gravatarUrl(email, { size: 80 })}
            alt="admn_image"
            className="object-fit-cover rounded-circle"
          />
          <hr />
          <h5>{name}</h5>
        </div>
      </Col>
      <Col sm={6} md={6} lg={9}>
        <ListGroup as="ol">
          <ListGroup.Item className="border-0">
            Full Name : <span className="fw-bold">{name}</span>
          </ListGroup.Item>
          <ListGroup.Item className="border-0">
            Email : <span className="fw-bold">{email}</span>
          </ListGroup.Item>
          <ListGroup.Item className="border-0">
            Phone : <span className="fw-bold">{phone} </span>
          </ListGroup.Item>
          <ListGroup.Item className="border-0">
            Address : <span className="fw-bold">{address}</span>
          </ListGroup.Item>
          <ListGroup.Item className="border-0">
            Favourite : <span className="fw-bold">{answer}</span>
          </ListGroup.Item>
        </ListGroup>
        <UserProfileUpdateModal
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
          setShow={setShow}
        />
        <div className="d-flex align-items-center justify-content-end">
          <Button onClick={() => setShow(true)}>Update Profile</Button>
        </div>
      </Col>
    </Row>
  );
}

export default UserProfile;
