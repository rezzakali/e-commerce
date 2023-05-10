import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { AiOutlineShopping } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import styles from '../styles/UserSideBarLists.module.css';

function UserSidebar() {
  return (
    <ListGroup as="ol">
      <NavLink
        to={`/user`}
        className={`text-decoration-none text-dark my-1 rounded-0 d-flex flex-row align-items-center border-0 mx-1 bg-transparent shadow-sm p-2 w-100 ${styles.user_side_bar_lists}`}
      >
        <FaRegUser /> Profile
      </NavLink>
      <NavLink
        to={`/user/orders`}
        className={`text-decoration-none text-dark my-1 rounded-0 d-flex flex-row align-items-center border-0 mx-1 bg-transparent shadow-sm p-2 w-100 ${styles.user_side_bar_lists}`}
      >
        <AiOutlineShopping /> Orders
      </NavLink>
    </ListGroup>
  );
}

export default UserSidebar;
