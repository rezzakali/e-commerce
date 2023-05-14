import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AiOutlineMail } from 'react-icons/ai';
import { BsTelephoneInbound } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';
import { NavLink } from 'react-router-dom';
import InformationsLists from './InformationsLists';
import SocialMedia from './SocialMedia';
import CategoriesLists from './categoriesLists';

function Footer() {
  const informationItems = [
    {
      id: 1,
      link: '/',
      title: 'About',
    },
    {
      id: 2,
      link: '/',
      title: 'Contact',
    },
    {
      id: 3,
      link: '/',
      title: 'Privacy Policy',
    },
    {
      id: 4,
      link: '/',
      title: 'Refund & Exchange',
    },
    {
      id: 5,
      link: '/',
      title: 'Delivery & Shipping',
    },
    {
      id: 6,
      link: '/',
      title: 'Terms & Conditions',
    },
  ];

  return (
    <footer
      className="container-fluid bg-dark text-white pt-4 pb-1"
      style={{ position: 'relative' }}
    >
      <Container fluid>
        <Row>
          <Col sm={12} md={6} lg={3}>
            <h5 className="text-uppercase">About e-shop</h5>
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatum illum quod dignissimos odio repellat labore debitis
              ullam ea. Dolorum, repellendus voluptates. Vitae earum, magnam
              officiis vero excepturi architecto unde illo.
            </p>
          </Col>
          <Col sm={12} md={6} lg={3}>
            <h5 className="text-uppercase">categories</h5>
            <CategoriesLists />
          </Col>
          <Col sm={12} md={6} lg={3}>
            <h5 className="text-uppercase">information</h5>
            <InformationsLists items={informationItems} />
          </Col>
          <Col sm={12} md={6} lg={3}>
            <h5 className="text-uppercase">contact</h5>
            <ul className="list-unstyled">
              <li className="my-2">
                <GoLocation /> Dharai, Lakhipur, Goalpara, Assam (India), 783132
              </li>
              <NavLink
                to="mailto:contact@gmail.com"
                className="text-decoration-none text-white"
              >
                <li className="my-2">
                  <AiOutlineMail /> contact@gmail.com
                </li>
              </NavLink>
              <NavLink
                to="tel:1245874512"
                className="text-decoration-none text-white"
              >
                <li className="my-2">
                  <BsTelephoneInbound /> +91 1245874512
                </li>
              </NavLink>
              <li>
                <SocialMedia />
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <hr />
      <Row>
        <Col sm={12} md={6} lg={6} className="text-start">
          <p>&copy; {new Date().getFullYear()} Inc. All rights reserved.</p>
        </Col>
        <Col className="text-end" sm={12} md={6} lg={6}>
          <p>
            Developed By {''}
            <NavLink
              to="https://developer-rezzak.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              Rezzak
            </NavLink>
          </p>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
