import gravatarUrl from 'gravatar-url';
import React from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function AdminInfo() {
  const { user } = useSelector((state) => state.auth);
  const { email, name, phone, address } = user || {};

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
          <ListGroup.Item className="border-0 fs-5">
            Full Name : <span className="fw-bold">{name}</span>
          </ListGroup.Item>
          <ListGroup.Item className="border-0 fs-5">
            Email : <span className="fw-bold">{email}</span>
          </ListGroup.Item>
          <ListGroup.Item className="border-0 fs-5">
            Phone : <span className="fw-bold">{phone} </span>
          </ListGroup.Item>
          <ListGroup.Item className="border-0 fs-5">
            Address : <span className="fw-bold">{address}</span>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
}

export default AdminInfo;
