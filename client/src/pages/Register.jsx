import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { AiFillLock } from 'react-icons/ai';
import { BsTelephoneInboundFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';
import { HiLocationMarker } from 'react-icons/hi';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import registerImage from '../assets/signup.png';
import Layout from '../components/Layout';
import TextInput from '../components/TextInput';
import { useRegisterMutation } from '../features/auth/authApi';
import isEmailValid from '../utils/isEmailValid';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [answer, setAnswer] = useState('');

  const navigate = useNavigate();

  const [register, { data, isLoading, isSuccess, isError, error }] =
    useRegisterMutation();

  // debounce handler
  const debounceHandler = (fn, delay) => {
    let timeOutId;
    return (...args) => {
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  // check email
  const checkEmail = (value) => {
    if (isEmailValid(value)) {
      setEmail(value);
    }
  };

  const handleEmail = debounceHandler(checkEmail, 500);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password mismatched!');
    } else {
      register({ name, email, phone, address, password, answer });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      navigate('/login');
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
            src={registerImage}
            alt="register image"
            className="h-100 w-100 object-fit-cover"
          />
        </Col>
        <Col className="p-5" sm={12} md={6} lg={6}>
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
              onChange={(e) => handleEmail(e.target.value)}
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
              type="text"
              icon={<RiQuestionAnswerLine />}
              required
              placeholder={'What is your favourite sports?'}
              size={'sm'}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
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
              disabled={isLoading}
            >
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                'Register'
              )}
            </Button>
          </form>
          <br />
          <div>
            Already have an account!{' '}
            <NavLink to="/login" className="text-decoration-none">
              Login
            </NavLink>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default Register;
