import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Profile from './Profile';
import { Helmet } from 'react-helmet';
import FetchUserPost from '../Post/FetchUserPost';
import { REDIRECT_FALSE, REMOVE_MESSAGE } from '../../store/types/postTypes';
import toast, { Toaster } from 'react-hot-toast';
import { queryClient } from '../../reactQuery';
import { Divider } from 'primereact/divider';
import SearchUserProfile from './SearchUserProfile';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import FetchSearchUserPost from '../Post/FetchSearchUserPost';

function SearchUserProfileMain() {
    const { id } = useParams();

    // const [searchUser, setSearchUser] = useState([]);
    // console.log(searchUser);

    // const {} = useQuery('currentSearchUser', async ()=>{
    //     await axios.get( `/current-user/${id}`, { cache: 'default' })
    //     .then(response => {
    //        setSearchUser(response.data.response)
    //        return response.data.response
    //      })
    //      .catch(error => {
    //        console.error(error);
    //      });
    //    });

//   const { redirect, message} = useSelector((state)=> state.PostReducers);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (redirect) {
//       dispatch({type: REDIRECT_FALSE});
//     }
//     if (message) {
//       toast.success(message);
//       dispatch({type: REMOVE_MESSAGE});
//     }
//     queryClient.invalidateQueries('postList');
//     queryClient.invalidateQueries('allPost');
//   }, [message]);

  return (
    <>
      <Helmet>
        <title>Profile - SV</title>
        <meta name='description' content='Profile Page Student Voice ' />
      </Helmet>
      <div className="mb-7">
        <SearchUserProfile userId = {id}/>

        <Divider type="solid" align='center' className='w-11 mx-auto' style={{color: '#222d82', borderTop: '3px solid #222d82'}} />

        <div className='w-12'>
          <div className='w-12 md:w-10 lg:w-8 xl:w-7'>
            <FetchSearchUserPost userId = {id}/>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default SearchUserProfileMain;

































    // dispatch(fetchPost(_id));

      
  // useEffect(() => {
  //   dispatch(fetchPost(_id));

  // }, []);


  // import { fetchPost } from '../../store/AsyncMethod/PostMethod';