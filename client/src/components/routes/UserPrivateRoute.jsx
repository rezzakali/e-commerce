import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';

function UserPrivateRoute() {
  const [resOk, setResOk] = useState(false);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth && auth.accessToken) {
      setResOk(true);
    } else {
      setResOk(false);
    }
  }, [auth?.accessToken, resOk]);

  return resOk ? <Outlet /> : <Spinner />;
}

export default UserPrivateRoute;
