import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import { InputText } from 'primereact/inputtext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post('/forgot-user-password', { email });
      setLoading(false);
      history.push(`/reset-password/${email}`, email);
    } catch (error) {
      setLoading(false);
      setMessage(error.response.data.error);
    }
  };

  const handleLogin = () => {
    history.push('/login');
  };

  return (
    <div className="forgot-password-container">
      <h2 className="forgot-title">Forgot Password</h2>
      <hr className="forgot-title-line"></hr>
      <Form onSubmit={handleSubmit}>

        <span className="p-float-label mt-5">
              <InputText className="w-12 appearance-none outline-none" type='email' value={email} onChange={handleEmailChange} id="email" name="email" required />
              <label className="font-bold text-lg opacity-80 text-white" htmlFor="email">Email</label>
        </span>

        <button type="submit" className="btn btn-warning h-3rem p-0 mt-5 border-noround opacity-100">
        {loading ? '...' : 'Request OTP'}
        </button>

        <div className="mt-3 mb-3 text-center font-bold" style={{color: '#de622c'}}>{message}</div>

        <div className="text-center text-white font-bold">
          Remembered your password? <span className="link" onClick={handleLogin}>Login</span>
        </div>
      </Form>
    </div>
  );
};

export default ForgotPassword;
