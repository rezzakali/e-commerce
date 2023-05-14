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
      link: '/about',
      title: 'About',
    },
    {
      id: 2,
      link: '/contact',
      title: 'Contact',
    },
    {
      id: 3,
      link: '/privacy',
      title: 'Privacy Policy',
    },
    {
      id: 4,
      link: '/refund',
      title: 'Refund & Exchange',
    },
    {
      id: 5,
      link: '/shipping',
      title: 'Delivery & Shipping',
    },
    {
      id: 6,
      link: '/terms',
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
            <h5 className="text-uppercase">About Company</h5>
            <p className="text-justify">
              E-SHOP is a reliable e-commerce platform that offers customers a
              wide range of high-quality products at competitive prices. With
              fast and secure payment methods, easy navigation, and excellent
              customer service, E-SHOP is the perfect destination for all your
              online shopping needs.
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
              className="text-decoration-none text-warning"
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
