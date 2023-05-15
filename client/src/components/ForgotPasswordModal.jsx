import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-hot-toast';
import { AiFillLock } from 'react-icons/ai';
import { GrMail } from 'react-icons/gr';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { useForgotPasswordMutation } from '../features/auth/authApi';
import styles from '../styles/ProductCardButton.module.css';
import TextInput from './TextInput';

function ForgotPasswordModal({ show, handleClose, setShow }) {
  const [answer, setAnswer] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [forgotPassword, { data, isLoading, isError, error, isSuccess }] =
    useForgotPasswordMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answer || !email || !newPassword) {
      toast.error('Every must be require!');
    } else {
      forgotPassword({ email, answer, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      setShow(false);
    }
    if (isError) {
      toast.error(error?.message);
    }
  }, [isSuccess, isError]);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
      <Modal.Header closeButton>
        <h5>Reset your password</h5>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <TextInput
            type="email"
            required
            icon={<GrMail />}
            placeholder="email"
            size="sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <TextInput
            type="text"
            icon={<RiQuestionAnswerLine />}
            required
            placeholder="enter your favourite sports name provided during registration"
            size="sm"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <br />
          <TextInput
            type="password"
            icon={<AiFillLock />}
            required
            placeholder="enter new password"
            size="sm"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br />
          <Button
            className={`w-100 border border-gray ${styles.product_card_button}`}
            size="sm"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              'Reset'
            )}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ForgotPasswordModal;
