import React, {useState, useEffect} from 'react';
import moment from 'moment';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { ConfirmDialog } from 'primereact/confirmdialog';
import axios from 'axios';
import { queryClient } from '../../reactQuery';

function PostComments({ comment, postId, commentUser }) {

    const [showDelDialog, setShowDelDialog] = useState(false);

    const [truncatedContent, setTruncatedContent] = useState("");
    const [showFullContent, setShowFullContent] = useState(false);

    const [time, setTime] = useState(moment(comment.date).fromNow());
    const {user, token} = useSelector((state)=> state.AuthReducers);


    function handleShowFullContent() {
      setShowFullContent(true);
    }
    function handleShowLessContent() {
      setShowFullContent(false);
    }
  
    useEffect(() => {
      if (comment.comment.length > 100) {
        setTruncatedContent(comment.comment.slice(0, 100) + '  ');
      } else {
        setTruncatedContent(comment.comment);
      }
    }, [comment.comment]);

    const deleteBtn = user._id === commentUser._id ? (
      <div className="mt-2" style={{float: 'right', color: 'red'}}>
        {/* <Menu model={items} popup ref={menu} className= '' /> */}
        <Button icon="pi pi-trash font-bold text-lg" style={{background: 'none',border: 'none',color: 'inherit',font: 'inherit',lineHeight: 'normal',padding: '0', outline: 'none', boxShadow: 'none'}} 
        // onClick={(e) => menu.current.toggle(e)} 
            onClick = {()=> setShowDelDialog(true)}
        />
      </div>
    ): 
    (
    <div></div>
   );

    const mutation = useMutation(
        async () => {
          const config = {
            headers: {
                Authorization: `Bearer ${token}` 
            }
          } 
          const response = await axios.post(`/delete-comment/${postId}/${comment._id}`, comment._id, config);
          return response.data;
        },
        {
          onSuccess: ()=>{
            queryClient.invalidateQueries('postList');
            queryClient.invalidateQueries('allPost');
          }
        }
      );

    const accept = async () => {
        // dispatch({type: SET_LOADER});
        // try {
        //     const config = {
        //         headers: {
        //             Authorization: `Bearer ${token}` 
        //         }
        //     }
        //     const {data: {msg}} = await axios.post(`/delete-post/${postId}`, postId, config);
        //     dispatch({type: CLOSE_LOADER});
        //     history.push('/profile');
        //     dispatch({type: SET_MESSAGE, payLoad: msg});
        // } catch (error) {
        //     dispatch({type: CLOSE_LOADER});
        //     console.log(error.response);
        // }
        mutation.mutate();
      }
    
      const reject = () => {
        setShowDelDialog(false);
      }

    useEffect(() => {
        const intervalId = setInterval(() => {
        setTime(moment(comment.date).fromNow()); // update the time every 10 seconds
        }, 10000);

        return () => clearInterval(intervalId); // cleanup function to clear interval
    }, [comment.date]);

    return (
        <div className="comment-card shadow-2" style={{border: 'none'}}>
            <ConfirmDialog 
                message= 'Do you want to delete this comment?' 
                header= 'Delete Confirmation'
                icon= 'pi pi-info-circle'
                acceptClassName= 'p-button-danger'
                accept= {accept}
                reject= {reject}
                acceptLabel= 'Delete'
                visible={showDelDialog} 
                onHide={() => setShowDelDialog(false)}
                />

                {deleteBtn}
                
            <div className="user-info">
                <img src={commentUser.profileImg === 'user.png' ? commentUser.imageUrl : `/profile/${commentUser.profileImg}`} alt="User Image" />
                <div className="name-time">
                    <p className="name" style={{color: '#222d82'}}>{commentUser.name}</p>
                    <p className="time" style={{color: '#222d82'}}>{time}</p>
                </div>
            </div>
            {/* <p className="comment">{comment.comment}</p> */}

            {showFullContent ? (
                <div>
                    <span className='show-content'>
                        {comment.comment}
                        {comment.comment.length > 100 && (
                            <button className='show-content-btn font-bold' onClick={handleShowLessContent}> ...Show less</button>
                        )}
                    </span>
                </div>
            ): (
            <span className='show-content'>
                {truncatedContent}
                {comment.comment.length > 100 && !showFullContent && (
                <button className='show-content-btn font-bold' onClick={handleShowFullContent}> ...See more</button>
                )}
            </span>
            )}
        </div>
    );

}

export default PostComments;














































// import { useQuery } from 'react-query';
// import axios from 'axios';
// import { response } from 'express';
// import { Menu } from 'primereact/menu




    // try {
    //     const data = axios.post(`/comment-user/${comment.userId}`);
    //     console.log('daata',data);
    // } catch (error) {
    //     console.log(error);
    // }

    // const menu = useRef(null);
    // const items = [
    //     {
    //         label: 'Edit Post',
    //         icon: 'pi pi-pencil',
    //         command: () => {
                
    //         }
    //     },
    //     {
    //         label: 'Delete Post',
    //         icon: 'pi pi-trash',
    //         command: () =>{}
    //     }
    // ];
