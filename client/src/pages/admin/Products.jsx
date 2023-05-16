import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import Layout from '../../components/Layout';
import AddProductModal from '../../components/admin/AddProductModal';
import AdminSidebar from '../../components/admin/AdminSidebar';
import ProductsTable from '../../components/admin/ProductsTable';

function Products() {
  // for add product modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Layout>
      <Row style={{ height: '100vh' }}>
        <Col sm={12} md={2} lg={2} className="shadow">
          <AdminSidebar />
        </Col>
        <Col sm={12} md={10} lg={10}>
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="mt-2">All Products</h4>
            <AddProductModal show={show} handleClose={handleClose} />
            <div>
              <AiOutlineAppstoreAdd
                role="button"
                className="fs-4"
                onClick={() => setShow(true)}
              />
            </div>
          </div>
          <hr />
          <div style={{ height: '500px', overflowY: 'auto' }}>
            <ProductsTable />
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default Products;
