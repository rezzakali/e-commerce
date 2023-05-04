import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { AiFillLock } from 'react-icons/ai';
import { GrMail } from 'react-icons/gr';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import loginImage from '../assets/signin.png';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import Layout from '../components/Layout';
import TextInput from '../components/TextInput';
import { useLoginMutation } from '../features/auth/authApi';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // for forgot password modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const location = useLocation();

  const [login, { data, isSuccess, isError, error, isLoading }] =
    useLoginMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      navigate(
        location.state ||
          `/${data?.user?.role === 'admin' ? 'dashboard/admin' : ''}`
      );
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, data]);

  return (
    <Layout>
      <Row className="p-3">
        <Col sm={12} md={6} lg={6}>
          <img
            src={loginImage}
            alt="login image"
            className="object-fit-cover h-100 w-100"
          />
        </Col>
        <Col sm={12} md={6} lg={6}>
          <h1 className="my-5">Login</h1>
          <form onSubmit={handleSubmit}>
            <TextInput
              type="email"
              icon={<GrMail />}
              required
              placeholder={'Email'}
              size={'sm'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <br />
            <TextInput
              type="password"
              icon={<AiFillLock />}
              required
              placeholder={'Password'}
              size={'sm'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <br />
            <Button
              type="submit"
              className="w-100 bg-light text-dark border border-gray"
              disabled={isLoading}
            >
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                'Login'
              )}
            </Button>
          </form>
          <div className="my-3 d-flex flex-row mx-auto justify-content-between ">
            <div>
              I don't have any account!{' '}
              <NavLink to="/register" className="text-decoration-none">
                Register
              </NavLink>
            </div>
            <ForgotPasswordModal
              show={show}
              handleClose={handleClose}
              handleShow={handleShow}
              setShow={setShow}
            />
            <div>
              <NavLink onClick={handleShow} className="text-decoration-none">
                Forgot password
              </NavLink>
            </div>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default Login;
