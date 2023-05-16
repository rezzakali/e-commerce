import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { BsTelephoneInboundFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';
import contactImage from '../assets/contact.jpg';
import GoogleMap from '../components/GoogleMap';
import Layout from '../components/Layout';
import TextInput from '../components/TextInput';
import styles from '../styles/ProductCardButton.module.css';

function Contact() {
  return (
    <Layout
      title={'e-Shop -Contact Us'}
      description={'Contact us page'}
      author={'Rezzak'}
      keywords={'contact us, learn more, how to chat with e-shop'}
    >
      <h4 className="pt-4">Contact Us</h4>
      <Row className="text-center">
        <Col sm={12} md={4} lg={4} className="p-2 shadow-sm mx-auto">
          <p className="m-2">contact@gmail.com</p>
        </Col>
        <Col sm={12} md={4} lg={3} className="p-2 shadow-sm mx-auto">
          <p className="m-2">WhatsApp: +91 1234587548</p>
        </Col>
        <Col sm={12} md={4} lg={4} className="p-2 shadow-sm mx-auto">
          <p className="m-2">Mobile: +91 1234587548</p>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6} lg={6} className="py-5">
          <img src={contactImage} alt="contact image" className="w-100 h-100" />
        </Col>
        <Col sm={12} md={6} lg={6} className="py-5">
          <form>
            <TextInput
              placeholder={`full name`}
              icon={<FaUserAlt />}
              required
            />
            <br />
            <TextInput placeholder="email address" icon={<GrMail />} required />
            <br />
            <TextInput
              placeholder="phone"
              icon={<BsTelephoneInboundFill />}
              required
            />
            <br />
            <TextInput
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '120px' }}
            />
            <br />
            <Button
              className={`w-100 border border-gray ${styles.product_card_button}`}
              type="submit"
            >
              Send
            </Button>
          </form>
        </Col>
      </Row>
      <Row>
        <GoogleMap />
      </Row>
    </Layout>
  );
}

export default Contact;
