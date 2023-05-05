import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { AiOutlineShopping } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import styles from '../styles/UserSideBarLists.module.css';

function UserSidebar() {
  const UserSidebarDatas = [
    {
      id: 1,
      title: 'Profile',
      link: '/dashboard/user',
      icon: <FaRegUser />,
    },
    {
      id: 2,
      title: 'Orders',
      link: '/dashboard/user/orders',
      icon: <AiOutlineShopping />,
    },
  ];
  return (
    <>
      <ListGroup as="ol">
        {UserSidebarDatas.map(({ title, id, link, icon }) => (
          <ListGroup.Item key={id} as="li" className="border-0 my-1">
            <div
              className={`d-flex flex-row align-items-center ${styles.user_side_bar_lists}`}
            >
              <span className="mx-1">{icon}</span>
              <NavLink
                to={link}
                className="text-decoration-none text-dark mt-1"
              >
                {title}
              </NavLink>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default UserSidebar;
