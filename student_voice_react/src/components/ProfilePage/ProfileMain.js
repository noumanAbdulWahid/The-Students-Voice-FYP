import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Profile from './Profile';
import { Helmet } from 'react-helmet';
import FetchUserPost from '../Post/FetchUserPost';
import { REDIRECT_FALSE, REMOVE_MESSAGE } from '../../store/types/postTypes';
import toast, { Toaster } from 'react-hot-toast';
import { queryClient } from '../../reactQuery';
import { Divider } from 'primereact/divider';

function ProfileMain() {
  

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
    queryClient.invalidateQueries('postList');
    queryClient.invalidateQueries('allPost');
  }, [message]);

  return (
    <>
      <Helmet>
        <title>Profile - SV</title>
        <meta name='description' content='Profile Page Student Voice ' />
      </Helmet>
      <div className="mb-7">
        <Profile />

        <Divider type="solid" align='center' className='w-11 mx-auto' style={{color: '#222d82', borderTop: '3px solid #222d82'}} />

        <div className='w-12'>
          <div className='w-12 md:w-10 lg:w-8 xl:w-7'>
            <FetchUserPost />
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default ProfileMain;

































    // dispatch(fetchPost(_id));

      
  // useEffect(() => {
  //   dispatch(fetchPost(_id));

  // }, []);


  // import { fetchPost } from '../../store/AsyncMethod/PostMethod';