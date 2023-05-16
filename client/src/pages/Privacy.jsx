import React from 'react';
import { Row } from 'react-bootstrap';
import Layout from '../components/Layout';

function PrivacyPolicy() {
  return (
    <Layout title={`Privacy Policy -e-Shop`}>
      <Row className="p-3 mt-4 mb-5">
        <h1 style={{ color: '#e84e4e' }}>Privacy & Policy</h1>
        <p>
          At E-SHOP, we value your privacy and are committed to protecting your
          personal information. This privacy policy explains how we collect,
          use, and protect the information we collect from you when you use our
          website and services.
        </p>
        <h4>Information We Collect</h4>
        <p>
          We may collect personal information from you when you create an
          account, place an order, or interact with our website and services.
          This information may include your name, email address, shipping and
          billing addresses, payment information, and other details relevant to
          your order or account. We may also collect non-personal information
          such as your IP address and browser information to help us improve our
          website and services.
        </p>
        <h4>How We Use Your Information</h4>
        <p>
          We use the information we collect from you to provide and improve our
          website and services, process your orders, communicate with you about
          your orders and account, and personalize your experience on our
          website. We may also use your information to send you marketing
          communications and promotions, but you can opt out of these at any
          time.
        </p>
        <h4>How We Protect Your Information</h4>
        <p>
          We take appropriate measures to protect the personal information we
          collect from you, including using secure servers and implementing
          physical and electronic safeguards. We also limit access to your
          information to those who need it to perform their job
          responsibilities.
        </p>
        <h4>Sharing Your Information</h4>
        <p>
          We may share your information with third-party service providers who
          help us operate our website and services, process your orders, and
          deliver your products. We may also share your information with law
          enforcement agencies or other third parties when required by law.
        </p>
        <h4>Cookies</h4>
        <p>
          We use cookies and other tracking technologies to improve your
          experience on our website, personalize your experience, and analyze
          how our website is used. You can control cookies through your browser
          settings.
        </p>
        <h4>Your Rights</h4>
        <p>
          You have the right to access, correct, and delete your personal
          information at any time. You can do so by logging into your account or
          contacting us directly. You also have the right to object to the
          processing of your personal information or withdraw your consent.
        </p>
        <h4>Updates to Our Privacy Policy</h4>
        <p>
          We may update this privacy policy from time to time to reflect changes
          in our practices or for other operational, legal, or regulatory
          reasons. We encourage you to review this policy periodically for any
          updates.
        </p>
        <h4>Contact Us</h4>
        <p>
          If you have any questions or concerns about our privacy policy or how
          we handle your personal information, please contact us at
          <strong> contact@e-shop.com</strong>.
        </p>
      </Row>
    </Layout>
  );
}

export default PrivacyPolicy;
