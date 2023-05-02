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
  const categoriesItems = [
    {
      id: 1,
      link: '/',
      title: 'T-Shirt',
    },
    {
      id: 2,
      link: '/',
      title: 'Shirt',
    },
    {
      id: 3,
      link: '/',
      title: 'Lehenga Choli',
    },
    {
      id: 4,
      link: '/',
      title: 'Kurta Pyjama',
    },
    {
      id: 5,
      link: '/',
      title: 'Shoes',
    },
    {
      id: 6,
      link: '/',
      title: 'Clock',
    },
  ];
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
    <footer className="container-fluid bg-dark text-white py-5">
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
            <CategoriesLists items={categoriesItems} />
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
    </footer>
  );
}

export default Footer;
