import React from 'react';
import { Row } from 'react-bootstrap';
import Layout from './Layout';

const Terms = () => {
  return (
    <Layout title={`Terms & Conditions -e-Shop`}>
      <Row className="px-3 mt-4 mb-5 text-justify">
        <h4>Terms and Conditions</h4>
        <p>
          Welcome to e-Shop. Please read these Terms and Conditions carefully
          before using our website. By accessing or using our website, you agree
          to be bound by these Terms and Conditions. If you do not agree with
          all of the terms and conditions, then you are prohibited from using
          our website.
        </p>
        <h4>Intellectual Property</h4>
        <p>
          All content included on our website, such as text, graphics, logos,
          button icons, images, audio clips, digital downloads, data
          compilations, and software, is the property of e-Shop or its content
          suppliers and protected by international copyright laws. The
          compilation of all content on our website is the exclusive property of
          e-Shop and protected by international copyright laws.
        </p>
        <h4>License and Site Access</h4>
        <p>
          e-Shop grants you a limited license to access and make personal use of
          our website. This license does not include any resale or commercial
          use of our website or its contents; any collection and use of any
          product listings, descriptions, or prices; any derivative use of our
          website or its contents; any downloading or copying of account
          information for the benefit of another merchant; or any use of data
          mining, robots, or similar data gathering and extraction tools. Our
          website or any portion of our website may not be reproduced,
          duplicated, copied, sold, resold, visited, or otherwise exploited for
          any commercial purpose without express written consent of e-Shop.
        </p>
        <h4>Account</h4>
        <p>
          To access certain features of our website, you may be required to
          register for an account. When you register for an account, you agree
          to provide true, accurate, current, and complete information. You are
          solely responsible for maintaining the confidentiality of your account
          and password and for restricting access to your computer, and you
          agree to accept responsibility for all activities that occur under
          your account or password. e-Shop reserves the right to refuse service,
          terminate accounts, remove or edit content, or cancel orders in its
          sole discretion.
        </p>
        <h4>Products</h4>
        <p>
          e-Shop attempts to be as accurate as possible in our product
          descriptions. However, we do not warrant that product descriptions or
          other content on our website are accurate, complete, reliable,
          current, or error-free. If a product offered by e-Shop is not as
          described, your sole remedy is to return it in unused condition.
        </p>
        <h4>Pricing</h4>
        <p>
          All prices on our website are in US dollars and are subject to change
          without notice. e-Shop reserves the right to refuse or cancel any
          orders placed for products listed at an incorrect price, whether or
          not the order has been confirmed and your credit card charged. If your
          credit card has already been charged for the purchase and your order
          is canceled, e-Shop will issue a credit to your credit card account in
          the amount of the incorrect price.
        </p>
        <h4>Termination</h4>
        <p>
          These Terms and Conditions are effective unless and until terminated
          by either you or e-Shop. You may terminate these Terms and Conditions
          at any time by discontinuing use of our website. e-Shop may also
          terminate these Terms and Conditions at any time and may do so
          immediately without notice, and accordingly deny you access to our
          website, if in e-Shop’s sole discretion you fail to comply with any
          term or provision of these Terms and Conditions.
        </p>
        <h4>Limitation of Liability</h4>
        <p>
          e-Shop shall not be liable for any direct, indirect, incidental,
          special, or consequential damages that result from the use of, or the
          inability to use, our website or materials on or from our website,
          even if e-Shop has been advised of the possibility of such damages.
          Applicable law may not allow the limitation or exclusion of liability
          for incidental or consequential damages, so the above limitation or
          exclusion may not apply to you.
        </p>
        <h4>Governing Law</h4>
        <p>
          By visiting e-Shop, you agree that the laws of the United States and
          the State of California, without regard to principles of conflict of
          laws, will govern these Terms and Conditions
        </p>
      </Row>
    </Layout>
  );
};

export default Terms;
