import React from 'react';
import { Card, Col } from 'react-bootstrap';

function DashboardCard({ title, amount, icon, isLoading }) {
  return (
    <Col>
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex flex-row justify-content-around">
            <div
              className="d-flex justify-content-center align-items-center border rounded-circle"
              style={{ width: '70px', height: '70px' }}
            >
              {icon}
            </div>
            <div>
              <p className="fs-6">{title}</p>
              <Card.Text className="fw-bold">
                {isLoading ? 'fetching...' : amount}
              </Card.Text>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default DashboardCard;
