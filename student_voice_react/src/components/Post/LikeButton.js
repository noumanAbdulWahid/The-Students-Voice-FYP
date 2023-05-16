import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import { useSelector} from 'react-redux';
import { useMutation } from 'react-query';
import {queryClient} from '../../reactQuery';

function LikeButton({postId, likes}) {

  const [liked, setLiked] = useState(false);;
  const {user, token} = useSelector((state)=> state.AuthReducers);

    const mutation = useMutation(
      async () => {
        const config = {
          headers: {
              Authorization: `Bearer ${token}` 
          }
        } 
        const response = await axios.post(`/post/${postId}/${user._id}/likes`, { liked: !liked}, config);
        return response.data;
      },
      {
        onSuccess: ()=>{
          queryClient.invalidateQueries('postList');
          queryClient.invalidateQueries('allPost');
        }
      }
    );

const handleLikeClick = () => {
  if (user) {
    mutation.mutate();
  } else {
    
  }
}

  useEffect(() => {
    setLiked(false);
    for (let i = 0; i < likes.length; i++) {
      if (user._id === likes[i].user) {
        setLiked(true);
        break;
      }
    }
  }, [handleLikeClick])

  return (
    <button
      className={liked ? 'liked' : ''}
      onClick={handleLikeClick}
    >
      <span className="icon">{liked ? <AiFillHeart className='fill-heart' /> : <AiOutlineHeart className='heart' />}</span>
      <span className="count font-bold text-xl">{likes.length}</span>
    </button>
  );
}

export default LikeButton;

























// const mutation = useMutation(
//   async (formData) => {
//     const config = {
//       headers: {
//           Authorization: `Bearer ${token}` 
//       }
//     } 
//     const response = await axios.post('/update-post', formData, config);
//     return response.data;
//   },
//   {
//     onSuccess: ()=>{
//       queryClient.invalidateQueries('postList');
//       props.history.push('/profile');
//     }
//   }
// );

// mutation.mutate(formData);









  // console.log('likes',likes);
  // const {post} = props;
    // const [likeCount, setLikeCount] = useState(0)


     // const {isLoading, error, data} = useQuery('likedList', ()=>{
  //   return axios.get(`/post-likes/${post._id}`, post._id);
  // })

  // console.log('ddd',data);
  // const handleLikeClick = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //           Authorization: `Bearer ${token}` 
  //       }
  //   }
  //     const response = await axios.post(`/post/${post._id}/likes`, { liked: !liked }, config);
  
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

   // useEffect(() => {
  //   setLikeCount(post.likes.length);
  //   for (let i = 0; i < post.likes.length; i++) {
  //     if (post.likes[i].user === post.userId) {
  //       setLiked(true);
  //     }else{
  //       setLiked(false);
  //     }
  //   }
  // }, [props.post]);
