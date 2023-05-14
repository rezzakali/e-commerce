import React from 'react';
import { Row } from 'react-bootstrap';
import Layout from '../components/Layout';

const Shipping = () => {
  return (
    <Layout title={`Shipping & Delivery -e-Shop`}>
      <Row className="mt-4 mb-5 px-4">
        <h4>Delivery & Shipping</h4>
        <p>
          We offer fast and reliable delivery services for all our products. Our
          shipping rates are calculated based on the weight and size of your
          order, and we strive to keep our prices competitive and affordable.
        </p>
        <h4>Processing Time</h4>
        <p>
          All orders are processed within 1-2 business days, and you will
          receive a confirmation email once your order has been shipped. Please
          note that we do not ship on weekends or holidays.
        </p>
        <h4>Shipping Options</h4>
        <p>
          {' '}
          We offer several shipping options to choose from, including standard
          shipping, express shipping, and same-day delivery (available in select
          locations). Shipping rates and delivery times vary depending on your
          location and the shipping option you choose.
        </p>
        <h4>Tracking Your Order</h4>
        <p>
          Once your order has been shipped, you will receive a tracking number
          via email. You can use this tracking number to track the status of
          your order on our website or on the shipping carrier's website.
        </p>
        <h4>Shipping Restrictions</h4>
        <p>
          Please note that we do not ship to PO boxes, APO/FPO addresses, or
          international destinations at this time. We also cannot ship certain
          products to certain states or countries due to legal restrictions. If
          you have any questions or concerns about shipping restrictions, please
          contact our customer service team.
        </p>
        <h4>Shipping Damage</h4>
        <p>
          In the unlikely event that your order arrives damaged or defective,
          please contact us within 48 hours of receiving your order. We will
          work with you to replace or refund your order as quickly as possible.
        </p>
        <h4>Free Shipping</h4>
        <p>
          We offer free standard shipping on orders over $50 (excluding taxes
          and shipping fees) within the continental United States. This offer is
          subject to change without notice.
        </p>
      </Row>
    </Layout>
  );
};

export default Shipping;
