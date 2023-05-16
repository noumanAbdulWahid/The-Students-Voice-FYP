import React, { useState, useRef, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik';
import { InputMask } from "primereact/inputmask";
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { SET_LOADER, CLOSE_LOADER, SET_MESSAGE} from "../../store/types/postTypes";

const ResetPassword = () => {
  // const [otp, setOtp] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [validated, setValidated] = useState(false);
  // const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(60);

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const email = location.state;
  const toast = useRef(null);

  const show = () => {
    toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.value });
};

  const formik = useFormik({
    initialValues: {
        otp: '',
        password: '',
        confirmPassword: ''
    },
    validate: (data) => {
        let errors = {};

         if (data.otp.length !== 6) {
            errors.otp = '6 digits OTP required.';
          }
          if (data.password.length === 0) {
            errors.password = 'Password Required'
          }else if (calculatePasswordStrength(data.password) < 4) {
             errors.password = 'Password should be Strong'
          }
          if (data.confirmPassword !== data.password) {
            errors.confirmPassword = 'Password do not matched.'
         }

        return errors;
    },
    onSubmit: async (data, { setSubmitting, setErrors }) => {
      const {otp, password} = data;
      setLoading(true);
      try {
        const response = await axios.post('/reset-password', {email, otp, password });
        setLoading(false);
        dispatch({type: SET_MESSAGE, payLoad: response.data.message});
        history.push('/login');
        formik.resetForm();
      } catch (error) {
        setLoading(false);
        setErrors({ otp: error.response.data.message });
        setSubmitting(false);
      }
    }
  });

  const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
      return isFormFieldInvalid(name) ? <small className="p-error mb-4" style={{color: '#de622c'}}>***{(formik.errors[name])}</small> : <small className="p-error">{''}</small>;
  };

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) {
      score += 2;
    }
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      score += 1;
    }
    if (/\d/.test(password)) {
      score += 1;
    }
    if (/[!@#$%^&*()\-_=+[\]{};':"\\|,.<>/?]/.test(password)) {
      score += 1;
    }
    return score;
  };

  const header = <div className="font-bold mb-3"></div>;
  const footer = (
      <>
          <Divider className="font-bold" />
          <p className="mt-2">Suggestions</p>
          <ul className="pl-2 ml-2 mt-0 mb-0 line-height-3">
              <li>At least one lowercase</li>
              <li>At least one uppercase</li>
              <li>At least one numeric</li>
              <li>Minimum 8 characters</li>
          </ul>
      </>
  );

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.stopPropagation();
  //   } else {
  //       try {
  //           const response = await axios.post('/reset-password', {email, otp, password });
  //           setMessage(response.data.message);
  //         } catch (error) {
  //           setMessage(error.response.data.message);
  //         }
  //       };
  //   setValidated(true);
  // };
  const handleLogin = () => {
    history.push('/login');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="reset-password-form">
      <h2 className="reset-title">Reset Password</h2>
      <hr className="reset-title-line"></hr>
      <form onSubmit={formik.handleSubmit}>
        {/* <Form.Group controlId="formOtp">
          <Form.Label>Enter 6-digit OTP</Form.Label>
          <Form.Control
            type="number"
            pattern="[0-9]*"
            inputMode="numeric"
            placeholder="Enter OTP"
            min="100000"
            max="999999"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid 6-digit OTP.
          </Form.Control.Feedback>
        </Form.Group> */}

        <span className="p-float-label mt-5">
          <InputMask
              id="otp"
              name="otp"
              value={formik.values.otp}
              onChange={(e) => {
                  formik.setFieldValue('otp', e.target.value);
              }}
              mask="999999"
              className={classNames({ 'p-invalid': isFormFieldInvalid('otp') })}
          />
          <label className="font-bold text-lg opacity-80 text-white" htmlFor="otp">OTP</label>
        </span>
        {/* <small className="p-error" style={{color: '#de622c'}}>{getFormErrorMessage('otp')? '' : message}</small> */}
        {getFormErrorMessage('otp')}
        <div className="" style={{color: '#de622c', float: 'right'}}>
          {time > 0 ? `Time left: ${time} seconds` : <Link style={{color: '#de622c'}} to={'/forgot-password'}>Try Again!</Link>}
        </div>
      
        <span className="p-float-label mt-5">
            <Password 
                className= {classNames({ 'p-invalid': isFormFieldInvalid('password') })}
                value = {formik.values.password} 
                onChange={(e) => {
                  formik.setFieldValue('password', e.target.value);
                }} 
                id="password" 
                name="password"
                header={header} 
                footer={footer}
                promptLabel="Choose a password"
                weakLabel="Weak Password"
                mediumLabel="Medium Password"
                strongLabel="Strong Password"
                toggleMask
              />
            <label className="font-bold text-lg opacity-80 text-white" htmlFor="password">Password</label>
        </span>
        {getFormErrorMessage('password')}

        <span className="p-float-label mt-5">
            <Password
                className= {classNames({ 'p-invalid': isFormFieldInvalid('confirmPassword') })}
                value = {formik.values.confirmPassword} 
                onChange={(e) => {
                  formik.setFieldValue('confirmPassword', e.target.value);
                }} 
                id="confirmPassword" 
                name="confirmPassword"
                toggleMask
                feedback= {false}
              />
            <label className="font-bold text-lg opacity-80 text-white confirm-password" htmlFor="confirmPassword">Confirm Password</label>
        </span>
        {getFormErrorMessage('confirmPassword')}

        {/* <Form.Group controlId="formPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a new password.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            isInvalid={password !== confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            Passwords do not match.
          </Form.Control.Feedback>
        </Form.Group> */}

        <button type="submit" className="btn btn-warning h-3rem p-0 mt-4 border-noround opacity-100">
        {loading ? '...' : 'Reset Password'}
        </button>

        <div className="text-center text-white font-bold">
          Remembered your password? <span className="link" onClick={handleLogin}>Login</span>
        </div>
      </form>
    </div>
  );
};
export default ResetPassword;
