import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { BsCart4 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styles from '../styles/ProductCardButton.module.css';
import truncateString from '../utils/truncateString';

function ProductCard({ id, name, description, price }) {
  return (
    <Col sm={6} lg={3} className="p-2 mb-3">
      <Card sm={6} md={4} lg={3} className="shadow-none border-0 rounded-0">
        <Link to={`/products/${id}`}>
          <Card.Img
            variant="top"
            src={`http://127.0.0.1:9000/api/v1/products/get-product-image/${id}`}
            style={{ height: '300px', width: '100%', objectFit: 'cover' }}
            className="rounded-0"
          />
        </Link>

        <Card.Body>
          <p className="fs-5">{name}</p>
          <p className="fs-5">₹ {price}.00</p>
          <Card.Text className="text-justify">
            {truncateString(description, 50)}
          </Card.Text>
          <div>
            <Button
              size="sm"
              className={`w-auto rounded-0 ${styles.product_card_button}`}
            >
              <BsCart4 role="button" /> Add to cart
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductCard;
