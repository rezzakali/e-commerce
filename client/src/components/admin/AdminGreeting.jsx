import React from 'react';
import { useSelector } from 'react-redux';

function AdminGreeting() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="">
      <h6>Hello,{user?.name}</h6>
      <p>Welcome to Admin Dashboard</p>
    </div>
  );
}

export default AdminGreeting;
