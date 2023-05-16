import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import { BsBox, BsCartCheck } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { RxDashboard } from 'react-icons/rx';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { BiLogOutCircle } from 'react-icons/bi';
import { Logout } from '../../features/auth/authSlice';

function AdminSidebar() {
  const dashboardDatas = [
    {
      id: 1,
      title: 'Dashboard',
      link: '/dashboard/admin',
      icon: <RxDashboard />,
    },
    {
      id: 2,
      title: 'Orders',
      link: '/dashboard/admin/orders',
      icon: <BsCartCheck />,
    },
    {
      id: 3,
      title: 'All Customers',
      link: '/dashboard/admin/customers',
      icon: <FiUsers />,
    },
    {
      id: 4,
      title: 'All Products',
      link: '/dashboard/admin/products',
      icon: <BsBox />,
    },
    {
      id: 5,
      title: 'Categories',
      link: '/dashboard/admin/categories',
      icon: <BiCategoryAlt />,
    },
    {
      id: 6,
      title: 'Settings',
      link: '/dashboard/admin/settings',
      icon: <AiOutlineSetting />,
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(Logout());
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <>
      <ListGroup as="ol">
        {dashboardDatas.map(({ title, id, link, icon }) => (
          <ListGroup.Item
            key={id}
            as="li"
            className="border-0 my-1 d-flex align-items-center"
            role="button"
          >
            <div className="d-flex flex-row align-items-center">
              <span className="mx-1">{icon}</span>
              <NavLink to={link} className="text-decoration-none text-dark">
                {title}{' '}
              </NavLink>
            </div>
          </ListGroup.Item>
        ))}

        <ListGroup.Item
          className="border-0 my-1"
          role="button"
          onClick={handleLogout}
        >
          <BiLogOutCircle /> Logout
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}

export default AdminSidebar;
