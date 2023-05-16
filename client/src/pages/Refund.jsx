import React from 'react';
import { Row } from 'react-bootstrap';
import Layout from '../components/Layout';

const Refund = () => {
  return (
    <Layout title={`Refund & Exchange -e-Shop`}>
      <h2 className="text-center font-weight-bold my-4">
        Refund and Exchange Policies for E-SHOP
      </h2>
      <Row className="mt-3 mb-5">
        <p className="text-justify">
          At E-SHOP, we understand that shopping online can sometimes lead to a
          product not meeting your expectations. That's why we have developed a
          comprehensive refund and exchange policy to ensure that you are
          satisfied with your purchase every time.
        </p>
        <p>
          Our refund policy allows you to return any unwanted items within 30
          days of receiving your order. All we ask is that the product is in its
          original condition, with all tags and packaging intact. Once we have
          received and inspected the item, we will issue a refund to your
          original payment method. Please note that shipping fees are
          non-refundable.
        </p>
        <p>
          If you would like to exchange an item, simply follow the same process
          as our refund policy and let us know which product you would like in
          exchange. We will then process the exchange and ship the new item to
          you. If the new item is of higher value, we will contact you to
          arrange payment for the difference.
        </p>
        <p>
          In the unlikely event that you receive a defective or damaged product,
          please contact our customer service team within 7 days of receiving
          your order. We will work with you to resolve the issue and either
          provide a replacement or issue a full refund, depending on your
          preference.
        </p>
        <p>
          To make the refund and exchange process as easy as possible, we have
          created an online portal that allows you to initiate the process and
          track the progress of your request. Simply log in to your account and
          select the item you wish to return or exchange. You will then be
          guided through the necessary steps to complete the process.
        </p>
        <p>
          At E-SHOP, we take pride in our commitment to customer satisfaction.
          If you have any questions or concerns about our refund and exchange
          policies, please don't hesitate to contact us. Our customer service
          team is available 24/7 to assist you in any way we can.
        </p>
      </Row>
    </Layout>
  );
};

export default Refund;
