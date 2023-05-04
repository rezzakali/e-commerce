import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useLocation, useNavigate } from 'react-router-dom';

function BorderExample() {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => --prevCount);
    }, 1000);
    count === 0 &&
      navigate('/login', {
        state: location.pathname,
      });
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
