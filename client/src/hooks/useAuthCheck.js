import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Login } from '../features/auth/authSlice';

const useAuthCheck = () => {
  const [authCheck, setAuthCheck] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = localStorage?.getItem('auth');
    if (auth) {
      const isAuth = JSON.parse(auth);
      if (isAuth?.accessToken && isAuth?.user) {
        dispatch(
          Login({
            accessToken: isAuth.accessToken,
            user: isAuth.user,
          })
        );
      }
    }
    setAuthCheck(true);
  }, [authCheck, dispatch]);

  return authCheck;
};

export default useAuthCheck;
