import React from 'react';
import { Col, Row } from 'react-bootstrap';
import aboutImage from '../assets/about.jpg';
import Layout from '../components/Layout';

function About() {
  return (
    <Layout
      title={'e-Shop -About Us'}
      author={'Rezzak'}
      description={'this is about us page'}
      keywords={'about us, about company, e-shop'}
    >
      <h4 className="pt-4">About Company</h4>
      <Row className="py-3">
        <Col sm={12} md={6} lg={6}>
          <img src={aboutImage} alt="about image" className="w-100 h-100" />
        </Col>
        <Col sm={12} md={6} lg={6}>
          <p className="text-justify">
            <strong style={{ color: '#e84e4e', fontSize: '30px' }}>
              E-Shop{' '}
            </strong>{' '}
            is a premier e-commerce business that offers a wide variety of
            products ranging from clothes to shoes to watches. This online
            shopping platform is designed to provide customers with a seamless
            shopping experience by offering a vast selection of{' '}
            <strong>high-quality products at affordable prices</strong>.
          </p>
          <p>
            At E-Shop, customers can browse through a vast collection of
            clothing items, ranging from{' '}
            <strong>casual wear to formal wear</strong>. The clothing section
            features a wide range of items, including dresses, shirts, t-shirts,
            jeans, trousers, and more. Customers can choose from a variety of
            styles, colors, and sizes to find the perfect outfit for any
            occasion.
          </p>
          <p>
            The shoe collection at E-Shop is equally impressive, offering a
            range of options for both <strong>men and women</strong>. Customers
            can choose from a variety of styles, including sneakers, boots,
            sandals, and more. Each product is crafted with the utmost care to
            ensure that customers receive a product that is comfortable,
            durable, and stylish.
          </p>
          <p>
            The watch collection at E-Shop is designed to cater to customers of
            all tastes. Whether you're looking for a{' '}
            <strong>classic timepiece or a modern smartwatch</strong>, E-Shop
            has got you covered. Each watch is designed with precision and
            attention to detail, ensuring that customers receive a product that
            is reliable and stylish.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            At E-Shop, the focus is on <strong>customer satisfaction</strong>.
            The platform offers a user-friendly interface that makes it easy for
            customers to browse through products, place orders, and track their
            shipments. The company also provides excellent customer support,
            ensuring that customers have a{' '}
            <strong>hassle-free shopping experience</strong>.
          </p>
        </Col>
      </Row>
      <Row>
        <p>
          In summary, E-Shop is the go-to destination for anyone looking for
          high-quality, <strong>affordable clothing, shoes, and watches</strong>
          . With a vast selection of products and an emphasis on customer
          satisfaction, E-Shop is the perfect platform for all your shopping
          needs.
        </p>
      </Row>
    </Layout>
  );
}

export default About;
