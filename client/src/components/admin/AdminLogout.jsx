import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { BiLogOutCircle } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../../features/auth/authSlice';

function AdminLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(Logout());
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <ListGroup as="ol" className="fixed-bottom">
      <ListGroup.Item as="li" className="border-0 my-1">
        <div className="d-flex" onClick={handleLogout}>
          <span className="mx-1" role="button">
            <BiLogOutCircle /> Logout
          </span>
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default AdminLogout;
