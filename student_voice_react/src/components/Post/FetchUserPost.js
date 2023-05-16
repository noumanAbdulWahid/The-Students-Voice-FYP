import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Post from './Post';
import Loader from '../OtherComponent/Loader';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FetchUserPost = () => {

  const [allPosts, setAllPosts] = useState([]);
  const [users , setUsers] = useState([]);
  const {user, token} = useSelector((state)=> state.AuthReducers);
  
  const {isLoading: loadingPost, data:posts} = useQuery('postList', async ()=>{
    const config = {
      headers: {
          Authorization: `Bearer ${token}` 
      }
  }
  await axios.post(`/post/${user._id}`, user._id, config)
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
        <Post key={post._id} post={post} user= {user} postLikes= {post.likes} postComments = {post.comments} allUsers = {users} postUser={user}/>
        )) : 
        <div class="no-posts w-8 mx-auto">
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

export default FetchUserPost;




















// const {loading} = useSelector((state)=> state.PostReducers);
// const {posts} = useSelector((state)=> state.FetchPosts);

    // const {isLoading:loadingComment, error:errComment, data: commentData} = useQuery('commentList', ()=>{
  
    //   return axios.get(`/fetch-post-comments/${postId}`);
    // })



    // const [postId, setPostId] = useState('')