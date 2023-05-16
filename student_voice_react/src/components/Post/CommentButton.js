import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { useSelector } from 'react-redux';
import {FaRegComment} from 'react-icons/fa';
import PostComments from './PostComments';
import PostContent from './PostContent';
import { useMutation, useQuery} from 'react-query';
import {queryClient} from '../../reactQuery'
import axios from 'axios';

function CommentButton({post, comments, allUsers}) {
    
    const [commentDialog, setCommentDialog] = useState(false);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState('');
    // const [commentUser, setCommentUser] = useState([]);
    const {user, token} = useSelector((state)=> state.AuthReducers);

    const sortedComment = comments.sort((a, b) => new Date(b.date) - new Date(a.date));

    const mutation = useMutation(
      async ({formData, postId}) => {
        const config = {
          headers: {
              Authorization: `Bearer ${token}` 
          }
        } 
        const response = await axios.post(`/comment-post/${postId}`, formData, config);
        return response.data;
      },
      {
        onSuccess: ()=>{
          queryClient.invalidateQueries('postList');
          queryClient.invalidateQueries('allPost');
        },
        onError: (error)=>{
          setCommentError(error.response.data.error);
        }
      }
    );

  //  useEffect(() =>{
  //       comments.map((comment)=>{
  //         axios
  //         .post(`/comment-user/${comment.userId}`)
  //         .then((res) => {
  //           setCommentUser([...commentUser, res.data.response])
  //         }).catch((err)=>{
  //           console.log('errror comment user fetching',err);
  //         })
  //       })
  //     }, [comments]);

    const submitComment = () => {

        const formData =  new FormData();
        formData.append('userId', user._id);
        formData.append('comment', comment);
        const {_id: postId}  = post;

        mutation.mutate({formData, postId});
       
        setComment('');
      
      }
      
    
      const enterComment = () =>{
        if (user) {
          return(
            <>
              <span className='m-1 text-red-700 font-bold' style={{float: 'left'}}>{commentError}</span>
              <span className="p-input-icon-right w-12 mt-2">
                <InputTextarea className='w-12 border-round-3xl surface-100' style={{outline: 'none', boxShadow: 'none',border: '2px solid #222d82'}} placeholder='Enter comment here...' value={comment} onChange={(e) => setComment(e.target.value)} autoFocus maxLength={500} rows={1} autoResize/>
                <i className="pi pi-send cursor-pointer text-xl" style={{color: '#222d82'}} onClick={submitComment}/>
              </span>
              <span className='mr-2 font-semibold mt-1'>{comment.length} / 500</span>
            </>
          )
        } else {
          return(
            <div></div>
          )
        }
      };


    return(
        <>
        <div>
          <FaRegComment className='comment' onClick={() => {
            document.body.style.overflow = 'hidden';
            setCommentDialog(true)
          }} />
          <span className="count font-bold text-xl">{comments.length}</span>
        </div>
        <Dialog className='z-5 w-11 xl:w-4 lg:w-5 md:w-8 sm:w-10' maximizable header={post.userName} visible={commentDialog} onHide={() => {setCommentDialog(false); document.body.style.overflow = 'auto'; setCommentError('')} } footer={enterComment} >
            
            <PostContent content = {post.content} image = {post.image} />

            <p className='font-bold text-xl my-2' style={{color: '#222d82'}}>Comments</p>

            { sortedComment.length > 0 ? sortedComment.map((comment) => (
                <PostComments key={comment._id} comment={comment} postId = {post._id} commentUser={allUsers.find((user) => user._id === comment.userId) ? allUsers.find((user) => user._id === comment.userId) : ''}/>
            )) : 'No Comments'}
    
            </Dialog>
        </>
    );
}
export default CommentButton;






















    // const dispatch = useDispatch();

    // const {commentErrors, postsComments} = useSelector((state)=> state.PostComments);
    // const [allComments, setAllComment] = useState(commentErrorMsg ? postsComments : post.comments);
    // const {redirect, loading} = useSelector((state)=> state.PostReducers);

    // Set up a WebSocket connection to the server
    
    // useEffect(()=>{
    //   setSocket(io('http://localhost:5000'))
    // }, [])

    // useEffect(()=>{
    //   if (!socket) return; 
    //     socket.on('data', (data)=>{
    //       console.log(data);
    //     })
    // }, [socket])

  //   useEffect(() => {
  //     // fetch initial comments from the server
  //     axios.get(`/comment-post/${post._id}`)
  //       .then((response) => {
  //         setComments(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });

  //        // listen for new comments
  //   socket.on('newComment', (newPostId) => {
  //     if (newPostId === post._id) {
  //       axios.get(`/comment-post/${post._id}`)
  //         .then((response) => {
  //           setComments(response.data);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     }
  //   });

  //   // clean up the socket listener
  //   return () => {
  //     socket.off('newComment');
  //   };
  // }, [post._id]);




   // useEffect(() => {
      //   if (commentErrors !== '') {
      //       setCommentErrorMsg(commentErrors);
      //   }
      // }, [ commentErrors]);



      // import { io } from 'socket.io-client';
// import Loader from '../OtherComponent/Loader';
// import { Card, Button, Form } from 'react-bootstrap';
// import ReactHtmlParser from 'react-html-parser';
// import { postComments } from '../../store/AsyncMethod/PostMethod';


// const [socket, setSocket] = useState(null);
 // const [commentErrorMsg, setCommentErrorMsg] = useState(false);


   // const {isLoading, error, data} = useQuery('commentList', ()=>{
  
    //   return axios.get(`/fetch-post-comments/${post._id}`);
    // })

    // console.log(data, 'error', error)



      // dispatch(postComments(formData, post._id));
        // setAllComment(postsComments)



        // const {_id: userId}  = user;