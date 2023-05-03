import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  if (user) {
    if (user?.role === 0) {
      return children;
    } else if (user?.role === 1) {
      navigate('/admin/dashboard');
    } else {
      navigate('/');
    }
  }
};

export default PrivateRoute;
