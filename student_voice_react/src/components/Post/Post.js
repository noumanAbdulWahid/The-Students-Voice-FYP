import React from 'react';
import LikeButton from './LikeButton';
import PostContent from './PostContent';
import CommentButton from './CommentButton';
import PostHeader from './PostHeader';
import { Card } from 'primereact/card';

function Post({ post, user, postLikes, postComments, allUsers, postUser }) {

  const header = (
    <div className="">
      <PostHeader userImg = {postUser.profileImg} userName = {post.userName} postTime = {post.createdAt} postId = {post._id} googleImg = {postUser.imageUrl} postUserId = {post.userId}/>
    </div>
  );

  const footer = (
    <div className="flex flex-wrap justify-content-between">
        <LikeButton postId = {post._id} likes = {postLikes} />
        <CommentButton post = {post} comments = {postComments} allUsers= {allUsers} />
        <div></div>
    </div>
  );

  return (
    <div className='w-12 flex justify-content-center ml-1'>
      <Card className="post-card w-11 md:w-8 sm:w-9 lg:w-10 xl:w-7 p-3 mx-auto" header={header} footer={footer} title= {false} subTitle= {false}>
        <PostContent content = {post.content} image = {post.image} />
      </Card>
    </div>
  );
}
export default Post;

//w-11 md:w-8 sm:w-8 lg:w-8 xl:w-7 sm:ml-auto sm:mr-auto md:ml-5 lg:ml-7 xl:ml-7 ml-3 p-3 








































// import { useSelector, useDispatch } from 'react-redux';
// import { useQuery } from 'react-query';
// import axios from 'axios';

// const [commentDialog, setCommentDialog] = useState(false);
// const [socket, setSocket] = useState(null);
// const [allComments, setAllComment] = useState([]);;
// const [comment, setComment] = useState('');
// const dispatch = useDispatch();
// const {commentErrors, postsComments} = useSelector((state)=> state.PostComments);

// import Comments from './Comments';
// import { Dialog } from 'primereact/dialog';
// import {FaRegComment} from 'react-icons/fa';
// import { InputText } from 'primereact/inputtext';
// import { Link } from 'react-router-dom';
// import PostComments from './PostComments';
// import { postComments } from '../../store/AsyncMethod/PostMethod';


   // const {isLoading, error, data} = useQuery(['likedList', post._id], ()=>{
    //   return axios.get(`/post-likes/${post._id}`, post._id);
    // })

    // console.log('dlll', data);

    // const {isLoading, error, data} = useQuery('commentList', ()=>{
  
    //   return axios.get(`/fetch-post-comments/${post._id}`);
    // })
    // console.log('commentData', data)

{/* <div className="dropdown">
                <button className="dropdown-button" >
                  
                  
                </button>
                <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                  <ConfirmDialog visible={showDelDialog} onHide={() => setShowDelDialog(false)}/>
                  <li><Link onClick={confirmDel}>Delete post</Link></li>
                  <li><Link to={`/edit-post/${post._id}`}>Edit post</Link></li>
                </ul>
              </div>
              <Menu model={items} popup ref={menu}/>
              <BsThreeDots className='post-menu-icon dropdown-button' onClick={(e) => menu.current.toggle(e)} />


const [showDelDialog, setShowDelDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(moment(post.createdAt).fromNow());

  const {token} = useSelector((state)=> state.AuthReducers);
  const {redirect} = useSelector((state)=> state.PostReducers);

  const dispatch = useDispatch();
  const history = useHistory();

  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {window.removeEventListener('scroll', handleScroll)};
  }, []);

  useEffect(() => {
    if (redirect) {
      history.push('/profile');
    }
  }, [redirect]); */}


//   import { useSelector, useDispatch } from 'react-redux';
// import { Link, useHistory } from 'react-router-dom';
// import axios from 'axios';
// import { SET_LOADER, CLOSE_LOADER, REDIRECT_TRUE, SET_MESSAGE} from "../../store/types/postTypes";

// import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
// import { Menu } from 'primereact/menu';

// import { Message } from 'primereact/message';
// import toast, { Toaster } from 'react-hot-toast';
// import PostComments from './PostComments';
// import Loader from '../OtherComponent/Loader';
// import {FaRegComment} from 'react-icons/fa';
// import { Image } from 'primereact/image';
// import moment from 'moment';
// import {BsThreeDots} from 'react-icons/bs';
// import ReactHtmlParser from 'react-html-parser';



        {/* <>
        <FaRegComment className='comment' onClick={comments} />
        <Dialog header={post.userName} visible={commentDialog} style={{ width: '35vw' }} onHide={() => setCommentDialog(false)} footer={enterComment} >
            
            <PostContent content = {post.content} image = {post.image} />

            <p className='font-bold text-xl my-2' style={{color: '#222d82'}}>Comments</p>

            { allComments.length > 0 ? allComments.map((comment) => (
                <PostComments key={comment._id} comment={comment}/>
            )) : 'No Comments'}
    
            </Dialog>
        </> */}
        {/* <> */}
            {/* <Link to={{ pathname: `/post-comments/${post._id}`, state: { post, user } }}><FaRegComment className='comment' /></Link> */}
            {/* <Dialog header={post.userName} visible={commentDialog} style={{ width: '38vw' }} onHide={() => setCommentDialog(false)} footer= {enterComment}>

            <PostContent content = {post.content} image = {post.image} />

            <p className='font-bold text-xl my-2' style={{color: '#222d82'}}>Comments</p>
              
          </Dialog> */}
        {/* </> */}


          // const handleSubmit = (e) => {
  //   e.preventDefault();
    
  //   const formData =  new FormData();
  //   formData.append('userId', user._id);
  //   formData.append('userName', user.name);
  //   formData.append('userImg', user.profileImg);
  //   formData.append('comment', comment);
  //   dispatch(postComments(formData, post._id));
  // };

  // const comments = () =>{
  //   if (postsComments.length > 0) {
  //     setAllComment(postsComments)
  //   }else{
  //     setAllComment(post.comments)
  //   }
  //   setCommentDialog(true);
  // }

  // const enterComment = (
  //   <>
  //     {/* <span className='m-1 text-red-700' style={{float: 'left'}}>{commentErrorMsg}</span> */}
  //     <span className="p-input-icon-right w-12 mt-2">
  //       <InputText className='w-12' style={{outline: 'none', boxShadow: 'none'}} placeholder='Enter comment here...' value={comment} onChange={(e) => setComment(e.target.value)} />
  //       <i className="pi pi-send cursor-pointer" onClick={handleSubmit}/>
  //     </span>
  //   </>
  // );
