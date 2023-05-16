import React, { useEffect, useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import { AiFillLock } from 'react-icons/ai';
import { BsTelephoneInboundFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';
import { HiLocationMarker } from 'react-icons/hi';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import TextInput from '../components/TextInput';
import { useRegisterMutation } from '../features/auth/authApi';
import styles from '../styles/ProductCardButton.module.css';
import isEmailValid from '../utils/isEmailValid';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [answer, setAnswer] = useState('');
  const [profile, setProfile] = useState('');

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
      toast.warning('Password mismatched!');
    } else {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('address', address);
      formData.append('answer', answer);
      formData.append('profile', profile);

      // hit API
      register(formData);
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
    <Layout title={`e-Shop - Register`}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Row>
          <h4 className="py-1">Register</h4>
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
            <TextInput
              type="file"
              required
              size="sm"
              name="profile"
              onChange={(e) => setProfile(e.target.files[0])}
            />
            <br />
            {profile && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(profile)}
                  alt="profile"
                  style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            )}
            <Button
              type="submit"
              className={`w-100 border border-gray ${styles.product_card_button}`}
              disabled={isLoading}
              size="sm"
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
          <div className="mb-5 d-flex mt-2">
            <p className="mx-1"> Already have an account ! </p>{' '}
            <NavLink to="/login" className="text-decoration-none">
              Login
            </NavLink>
          </div>
        </Row>
      </div>
    </Layout>
  );
}

export default Register;
