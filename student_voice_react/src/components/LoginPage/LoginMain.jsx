import React, {useEffect} from 'react';
import Login from './Login';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { REDIRECT_FALSE, REMOVE_MESSAGE } from '../../store/types/postTypes';
import toast, { Toaster } from 'react-hot-toast';


function LoginMain() {

  const { redirect, message} = useSelector((state)=> state.PostReducers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (redirect) {
      dispatch({type: REDIRECT_FALSE});
    }
    if (message) {
      toast.success(message);
      dispatch({type: REMOVE_MESSAGE});
    }
  }, [message]);


  return (
    <>
      <Helmet>
        <title>Login - SV</title>
        <meta name='description' content='Login to Student Voice ' />
      </Helmet>
      <div className="">
        <Login />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default LoginMain;