import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import { BsBox, BsCartCheck } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { RxDashboard } from 'react-icons/rx';
import { NavLink } from 'react-router-dom';

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

  return (
    <>
      <ListGroup as="ol">
        {dashboardDatas.map(({ title, id, link, icon }) => (
          <ListGroup.Item key={id} as="li" className="border-0 my-1">
            <div className="d-flex flex-row">
              <span className="mx-1">{icon}</span>
              <NavLink to={link} className="text-decoration-none text-dark">
                {title}{' '}
              </NavLink>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default AdminSidebar;
