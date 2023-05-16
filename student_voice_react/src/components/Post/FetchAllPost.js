import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Post from './Post';
import Loader from '../OtherComponent/Loader';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FetchAllPost = () => {

  const [allPosts, setAllPosts] = useState([]);
  const [users , setUsers] = useState([]);
  const {user, token} = useSelector((state)=> state.AuthReducers);
  
  const {isLoading: loadingPost, data:posts} = useQuery('allPost', async ()=>{
        await axios.get('/all-posts')
        .then(response => {
            setAllPosts(response.data.response)
            return response.data.response
        })
        .catch(error => {
            console.error(error);
        });
    });

  const {isLoading: loadingComment, data: allusers} = useQuery('Users', async ()=>{
    await axios.get('/all-users', { cache: 'default' })
    .then(response => {
       setUsers(response.data.response)
       return response.data.response
     })
     .catch(error => {
       console.error(error);
     });
   });


  return (
    <div className="user-posts">
      {!loadingPost ? allPosts.length > 0 ?  allPosts.map((post) => (
        <Post key={post._id} post={post} user= {user} postLikes= {post.likes} postComments = {post.comments} allUsers = {users} postUser={users.find((user) => user._id === post.userId) ? users.find((user) => user._id === post.userId) : ''}/>
        )) : 
        <div class="no-posts w-11 mx-auto">
          <div class="illustration w-3 h-3">
            <img className='w-12 h-12' src="/project_image/no-post.png" alt="No Posts Illustration"/>
          </div>
          <div class="message">
            <h2>No Posts Yet</h2>
            <p>It's okay, take your time to create something beneficial.</p>
            <Link to={'/create-post'} class="button">Create Post</Link>
          </div>
        </div>: <Loader />}
    </div>
  );
};

export default FetchAllPost;




