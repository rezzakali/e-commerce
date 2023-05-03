import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { AiFillLock } from 'react-icons/ai';
import { GrMail } from 'react-icons/gr';
import { NavLink, useNavigate } from 'react-router-dom';
import loginImage from '../assets/signin.png';
import Layout from '../components/Layout';
import TextInput from '../components/TextInput';
import { useLoginMutation } from '../features/auth/authApi';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const [login, { data, isSuccess, isError, error, isLoading }] =
    useLoginMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      navigate('/');
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, data]);

  return (
    <Layout>
      <Row className="p-3">
        <Col>
          <img
            src={loginImage}
            alt="login image"
            className="object-fit-cover h-100 w-100"
          />
        </Col>
        <Col>
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
              Login
            </Button>
          </form>
          <div className="my-3">
            I don't have any account! <NavLink to="/register">Register</NavLink>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default Login;
