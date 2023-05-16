import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { AiOutlineLock, AiOutlineShopping } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import styles from '../styles/UserSideBarLists.module.css';
import ForgotPasswordModal from './ForgotPasswordModal';

function UserSidebar() {
  // for forgot password modal

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <ListGroup as="ol">
      <NavLink
        to={`/user`}
        className={`text-decoration-none text-dark my-1 rounded-0 d-flex flex-row align-items-center border-0 mx-1 bg-transparent shadow-sm p-2 w-100 ${styles.user_side_bar_lists}`}
      >
        <FaRegUser className="mx-1" /> Profile
      </NavLink>
      <div
        className={`text-decoration-none text-dark my-1 rounded-0 d-flex flex-row align-items-center border-0 mx-1 bg-transparent shadow-sm p-2 w-100 ${styles.user_side_bar_lists}`}
        role="button"
        onClick={() => setShow(true)}
      >
        <AiOutlineLock className="mx-1" /> Change Password
      </div>
      <NavLink
        to={`/user/orders`}
        className={`text-decoration-none text-dark my-1 rounded-0 d-flex flex-row align-items-center border-0 mx-1 bg-transparent shadow-sm p-2 w-100 ${styles.user_side_bar_lists}`}
      >
        <AiOutlineShopping className="mx-1" /> Orders
      </NavLink>
      {/* forgot password modal */}
      <ForgotPasswordModal
        show={show}
        handleClose={handleClose}
        setShow={setShow}
      />
    </ListGroup>
  );
}

export default UserSidebar;
