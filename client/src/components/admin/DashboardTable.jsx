import moment from 'moment';
import React from 'react';
import { Form, Table } from 'react-bootstrap';
import {
  useGetAllOrdersQuery,
  useOrderStatusChangeMutation,
} from '../../features/order/orderApi';
import styles from '../../styles/TextInput.module.css';
import Loading from '../Loading';

function DashboardTable() {
  const { data: orders, isLoading, isError } = useGetAllOrdersQuery();

  const [orderStatusChange, {}] = useOrderStatusChangeMutation();

  const handleStatusChange = ({ event, id, userId }) => {
    orderStatusChange({
      statusText: event,
      id,
      userId,
    });
  };

  return (
    <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
      {isLoading && <Loading />}
      {isError && <p>Something went wrong</p>}
      <div className="shadow-sm border-0 rounded-0">
        <Table className="table-hover text-center">
          <thead className="sticky-top bg-light" style={{ zIndex: '100' }}>
            <tr>
              <th>_id</th>
              <th>user_id</th>
              <th>total_payment</th>
              <th>order_on</th>
              <th>payment_status</th>
              <th>delivery_status</th>
            </tr>
          </thead>
          <tbody>
            {orders?.orders?.map((order) => {
              const {
                _id,
                payment_status,
                delivery_status,
                total,
                userId,
                createdAt,
              } = order;

              return (
                <tr
                  key={_id}
                  style={{
                    textAlign: 'center',
                    verticalAlign: 'middle',
                  }}
                >
                  <td>{_id}</td>
                  <td>{userId}</td>
                  <td>₹ {total}.00</td>
                  <td>{moment(createdAt).format('ll')}</td>
                  <td className="text-success">{payment_status}</td>
                  <td>
                    <Form.Select
                      size="sm"
                      value={delivery_status}
                      className={`${styles.text_input}`}
                      onChange={(e) =>
                        handleStatusChange({
                          event: e.target.value,
                          id: _id,
                          userId,
                        })
                      }
                    >
                      <option value="pending">Pending</option>

                      <option value="shipped">Shipped</option>

                      <option value="delivered">Delivered</option>
                      <option value="cancel">Cancel</option>
                    </Form.Select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default DashboardTable;
