import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  postLogin } from "../../store/AsyncMethod/AuthMethod";
import toast, { Toaster } from 'react-hot-toast';
import OAuthGoogle from "./OAuthGoogle";
import {Link} from 'react-router-dom';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { useLocation } from 'react-router-dom';
        
const Login = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  // const message = location.state.msg ? location.state.msg : '';
  const {loading, loginErrors, user} = useSelector((state)=> state.AuthReducers);


  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const handleInputs = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  useEffect(()=>{
    if (loginErrors.length > 0) {
        loginErrors.map((error) => toast.error(error.msg));
    }
  }, [loginErrors, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(postLogin(state)); 
  };

  const handleGoogleAuth = () => {
    // TODO: handle Google OAuth login
  };

  const handleForgotPassword = () => {
    // TODO: handle forgot password logic

  };

  // useEffect(() => {
  //   if (message) {
  //     toast.success(message);
  //   }
  // }, [message]);

  return (
    <div className="container">
      <h1 className="loginTitle">Login</h1>
      <hr className="titleLine"></hr>
      <form onSubmit={handleSubmit}>

          <span className="p-float-label mt-5">
              <InputText className="w-12 appearance-none outline-none" type='email' value={state.email} onChange={handleInputs} id="email" name="email" />
              <label className="font-bold text-lg opacity-80 text-white" htmlFor="email">Email</label>
          </span>
          
          <span className="p-float-label mt-5 login-password login-password">
              <Password feedback={false} className="w-12 appearance-none outline-none login-password" value={state.password} onChange={handleInputs} id="password" name="password" toggleMask />
              <label className="font-bold text-lg opacity-80 text-white" htmlFor="password">Password</label>
          </span>
    
        <button type="submit" className="btn btn-warning h-3rem p-0 mt-5 border-noround opacity-100">
        {loading ? '...' : 'Log In'}
        </button>
      </form>
      <div className="mt-3">
       
     <Link to={'/forgot-password'}>
      <button className="btn btn-danger h-3rem p-0 border-noround opacity-100 hover:opacity-80 mt-3" onClick={handleForgotPassword}>
          Forgot Password
        </button>
        </Link>
      </div>
      <div className="mt-3">
          <OAuthGoogle />
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
    
  );
};

export default Login;
