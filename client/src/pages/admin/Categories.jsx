import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import Layout from '../../components/Layout';
import AddCategoryModal from '../../components/admin/AddCategoryModal';
import AdminSidebar from '../../components/admin/AdminSidebar';
import CategoriesTable from '../../components/admin/CategoriesTable';

function Categories() {
  // for update profile modal
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
            <h4 className="mt-2">All Categories</h4>
            <AddCategoryModal
              show={show}
              handleClose={handleClose}
              handleShow={handleShow}
            />
            <div>
              <AiOutlineAppstoreAdd
                role="button"
                className="fs-4"
                onClick={() => handleShow(true)}
              />
            </div>
          </div>
          <hr />
          <CategoriesTable />
        </Col>
      </Row>
    </Layout>
  );
}

export default Categories;
