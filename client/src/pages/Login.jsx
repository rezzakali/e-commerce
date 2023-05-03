import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Toast from 'react-hot-toast';
import { AiFillLock } from 'react-icons/ai';
import { GrMail } from 'react-icons/gr';
import { NavLink } from 'react-router-dom';
import loginImage from '../assets/signin.png';
import Layout from '../components/Layout';
import TextInput from '../components/TextInput';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    Toast.success('Here is your taost');
  };

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
