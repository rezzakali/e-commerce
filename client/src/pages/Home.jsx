import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Filters from '../components/Filters';
import HomePageProducts from '../components/HomePageProducts';
import Layout from '../components/Layout';
import Slider from '../components/Slider';

function Home() {
  return (
    <Layout
      title={'e-Shop -Home'}
      description={'this is home page'}
      keywords={'home page,clothes, shoes, clocks, kurta pyjama, lehenga choli'}
      author={'Rezzak'}
    >
      <br />
      <Row>
        <Slider />
      </Row>
      <br />
      <br />
      <Row className="mt-2">
        <Col sm={12} md={2} lg={2} className="p-1">
          <Filters />
        </Col>
        <Col sm={12} md={10} lg={10}>
          <HomePageProducts />
        </Col>
      </Row>
    </Layout>
  );
}

export default Home;
