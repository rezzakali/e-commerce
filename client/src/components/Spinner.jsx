import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

function BorderExample() {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => --prevCount);
    }, 1000);
    count === 0 &&
      navigate(
        `${
          user?.role === 'admin'
            ? '/dashboard/admin'
            : user?.role === 'user'
            ? '/dashboard/user'
            : '/login'
        }`,
        {
          state: location.pathname,
        }
      );
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: '100vh' }}
    >
      <p>Redirecting to you in {count} second</p>
      <Spinner animation="border" />
    </div>
  );
}

export default BorderExample;
