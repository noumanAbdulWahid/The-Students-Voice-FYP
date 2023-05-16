import React, { useState, useEffect, useRef } from 'react';
import {useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { SET_LOADER, CLOSE_LOADER, SET_MESSAGE} from "../../store/types/postTypes";
import { Card } from 'react-bootstrap';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { queryClient } from '../../reactQuery';

const PostHeader = ({userImg, userName, postTime, postId, googleImg, postUserId}) => {
    const [showDelDialog, setShowDelDialog] = useState(false);
    const [time, setTime] = useState(moment(postTime).fromNow());

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const {user, token} = useSelector((state)=> state.AuthReducers);

    const menu = useRef(null);
    const items = 
        user._id === postUserId ?
        [
        {
            label: 'Edit Post',
            icon: 'pi pi-pencil',
            command: () => {
                history.push(`/edit-post/${postId}`, location.pathname);
            }
        },
        {
            label: 'Delete Post',
            icon: 'pi pi-trash',
            command: () =>setShowDelDialog(true)
        } ]:
        [
        {
            label: 'Report Post',
            icon: 'pi pi-question-circle',
            command: () =>{}
        } 
        ];

    const accept = async () => {
        dispatch({type: SET_LOADER});
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }
            const {data: {msg}} = await axios.post(`/delete-post/${postId}`, postId, config);
            dispatch({type: CLOSE_LOADER});
            history.push(location.pathname);
            queryClient.invalidateQueries('postList');
            queryClient.invalidateQueries('allPost');
            dispatch({type: SET_MESSAGE, payLoad: msg});
        } catch (error) {
            dispatch({type: CLOSE_LOADER});
            console.log(error.response);
        }
      }
    
      const reject = () => {
        setShowDelDialog(false);
      }

      useEffect(() => {
        const intervalId = setInterval(() => {
          setTime(moment(postTime).fromNow()); // update the time every 10 seconds
        }, 10000);
        return () => clearInterval(intervalId); // cleanup function to clear interval
      }, [postTime]);

    return(
        <>  
            <ConfirmDialog 
                message= 'Do you want to delete this post?' 
                header= 'Delete Confirmation'
                icon= 'pi pi-info-circle'
                acceptClassName= 'p-button-danger'
                accept= {accept}
                reject= {reject}
                acceptLabel= 'Delete'
                visible={showDelDialog} onHide={() => setShowDelDialog(false)}/>
            <div className="" style={{float: 'right', color: '#222d82'}}>
                <Menu model={items} popup ref={menu} className= 'z-5'/>
                <Button icon="pi pi-ellipsis-h font-bold text-lg" style={{background: 'none',border: 'none',color: 'inherit',font: 'inherit',lineHeight: 'normal',padding: '0', outline: 'none', boxShadow: 'none'}} onClick={(e) => menu.current.toggle(e)} />
            </div>
            <img className='user-profile' src={userImg === 'user.png' ? googleImg : `/profile/${userImg}`}/>
            <div className='name-time'>
                <Card.Text className='user-name'>{userName}</Card.Text>
                <small className='post-time'>Posted {time}</small>
            </div>
        </>
    );
}

export default PostHeader