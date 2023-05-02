import React from 'react';
import { Col, Row } from 'react-bootstrap';
import aboutImage from '../assets/about.jpg';
import Layout from '../components/Layout';

function About() {
  return (
    <Layout>
      <h4 className="pt-4">About Company</h4>
      <Row>
        <Col sm={12} md={6} lg={6} className="py-5">
          <img src={aboutImage} alt="about image" className="w-100 h-100" />
        </Col>
        <Col sm={12} md={6} lg={6} className="py-5">
          <p className="text-justify">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur
            dolores, necessitatibus accusantium beatae laborum laboriosam nam
            totam, dolore officiis soluta eius similique natus unde quasi vitae
            aliquid nihil ipsa expedita quae earum architecto minima assumenda!
            Rem quas distinctio voluptatum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo iusto
            sed, esse quos maiores ex aperiam architecto laborum obcaecati error
            non. Molestiae, assumenda recusandae. Similique, tempore? Odit illo
            vero et.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            reprehenderit optio explicabo autem deleniti pariatur non modi
            voluptas, sint veniam, sapiente eum, fuga minus ut cupiditate dicta
            veritatis dolor consectetur?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            reprehenderit optio explicabo autem deleniti pariatur non modi
            voluptas, sint veniam, sapiente eum, fuga minus ut cupiditate dicta
            veritatis dolor consectetur?
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque odit
            laudantium esse doloremque cum! Ad nisi nihil hic atque rerum ipsam,
            pariatur blanditiis, sint reprehenderit officia vitae asperiores
            dignissimos explicabo.
          </p>
        </Col>
      </Row>
    </Layout>
  );
}

export default About;
