import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { AiFillLock } from 'react-icons/ai';
import { BsTelephoneInboundFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';
import { HiLocationMarker } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import registerImage from '../assets/signup.png';
import Layout from '../components/Layout';
import TextInput from '../components/TextInput';
import { useRegisterMutation } from '../features/auth/authApi';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');

  const [register, { isLoading, isSuccess: isError, error }] =
    useRegisterMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <Row className="p-3">
        <Col>
          <img
            src={registerImage}
            alt="register image"
            className="h-100 w-100 object-fit-cover"
          />
        </Col>
        <Col className="p-5">
          <form onSubmit={handleSubmit}>
            <TextInput
              type="text"
              icon={<FaUserAlt />}
              placeholder={'Full Name'}
              size={'sm'}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
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
              type="text"
              icon={<BsTelephoneInboundFill />}
              required
              placeholder={'Phone'}
              size={'sm'}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <br />
            <TextInput
              type="text"
              icon={<HiLocationMarker />}
              required
              placeholder={'Address'}
              size={'sm'}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
            <TextInput
              type="password"
              icon={<AiFillLock />}
              required
              placeholder={'Confirm Password'}
              size={'sm'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <br />
            <Button
              type="submit"
              className="w-100 bg-light text-dark border border-gray"
            >
              Register
            </Button>
          </form>
          <br />
          <div>
            Already have an account! <NavLink to="/login">Login</NavLink>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default Register;
