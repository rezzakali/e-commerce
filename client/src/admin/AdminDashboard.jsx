import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Spinner from '../components/Spinner';

const AdminRouteProtect = () => {
  const [ok, setOk] = useState(false);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth?.user?.role === 'admin') {
      setOk(true);
    } else {
      setOk(false);
    }
  }, [auth?.accessToken]);

  return ok ? <Outlet /> : <Spinner />;
};

export default AdminRouteProtect;
