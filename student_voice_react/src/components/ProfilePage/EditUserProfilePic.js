import React, {useState} from 'react';
import {useDispatch } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Avatar from 'react-avatar-edit'                                       
import { updateImage } from "../../store/AsyncMethod/ProfileMethod";

function EditUserProfilePic({userId, userImg, googleImg}){

    const [dialog, setDialog] = useState(false);
    const [imgCrop, setImgCrop] = useState(false);

    const dispatch = useDispatch();

    const onClose =() => {
        setImgCrop(null)
      }
      
      const onCrop = (view) => {
        setImgCrop(view)
      }
      const SaveImage = (e) =>{
        e.preventDefault();

        const imageFile = dataURLtoFile(imgCrop, 'profile.png');
        const formData =  new FormData();
        formData.append('image', imageFile);
        formData.append('id', userId);
        dispatch(updateImage(formData));
        setDialog(false);
      }
    
      const dataURLtoFile = (dataURL, fileName) => {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], fileName, { type: mime });
      };

    return(
        <div className='profile_img text-center'>
          <div className='div'>
            <img className='w-full h-full border-circle cursor-pointer' src={userImg === 'user.png' ? googleImg : `/profile/${userImg}`} alt= 'Profile Pic' onClick={()=>setDialog(true)} />
            <Dialog visible={dialog} header={() => (
              <p htmlFor= '' className='text-2x1 font-bold textcolor mr-6' style={{ color: '#222d82' }}>Update Profile</p>
            )} 
              onHide = {() => setDialog(false)}
            >
              <div className='confirmation-content flex flex-column align-items-center'>
                <div className='flex flex-column align-items-center mt-2 w-12'>
                <Avatar
                    width={300}
                    height={200}
                    onCrop={onCrop}
                    onClose={onClose}
                  />
                  <div className='flex justify-content-around w-12 mt-4'>
                    <Button onClick={SaveImage} label='Save' icon='pi pi-check' style={{ backgroundColor: '#222d82', border: 'none' }}/>
                  </div>
                </div>
              </div>
            </Dialog> 
          </div>
        </div>
    );
}

export default EditUserProfilePic;