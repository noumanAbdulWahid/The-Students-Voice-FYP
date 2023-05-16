import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import EditUserProfilePic from './EditUserProfilePic';
import { useSelector } from 'react-redux';
import { Tooltip } from 'primereact/tooltip';
import EducationDetailForm from './EducationDetailForm';
import EditUserAbout from './EditUserAbout';
import JobDetailForm from './JobDetailForm';

function EditProfile({currentUserEducation, currentUserAbout, currentUserJob}){

    const [editProfileDialog, setEditProfileDialog] = useState(false);

    const {user: {_id, profileImg, imageUrl}} = useSelector((state)=> state.AuthReducers);

    // const footerContent = (
    //     <div>
    //         <Button style={{color: '#222d82'}} label="No" icon="pi pi-times" onClick={() => setEditProfileDialog(false)} className="p-button-text" />
    //         <Button style={{background: '#222d82', border: 'none'}} label="Update" icon="pi pi-check" onClick={() => setEditProfileDialog(false)} autoFocus />
    //     </div>
    // );

    return(
        <div>
            <Button className='w-10' style={{background: '#222d82', border: 'none', float: 'right'}} label="Edit Profile" icon="pi pi-pencil" iconPos="right"  onClick={() => {
            document.body.style.overflow = 'hidden';
            setEditProfileDialog(true)
          }}/>
            
            <Dialog className='z-5 w-11 xl:w-7 lg:w-9 md:w-10 sm:w-11' header='Edit Profile' maximizable visible={editProfileDialog} onHide={() => {setEditProfileDialog(false); document.body.style.overflow = 'auto'} } >
                
                <p className='font-bold text-lg mt-5' style={{color: '#222d82'}}>Profile Pic</p>
                <div className='custom-target-icon header-image-frame ml-4'
                    data-pr-tooltip="Click to Edit your Profile Pic."
                    data-pr-position="right"
                    data-pr-my="left center-2"
                >
                    <Tooltip target=".custom-target-icon" />
                    <EditUserProfilePic userId = {_id} userImg = {profileImg} googleImg = {imageUrl} />
                </div>

                <p className='font-bold text-lg mt-3' style={{color: '#222d82'}}>About</p>

                <EditUserAbout currentUserAbout ={currentUserAbout}/>
            
                <p className='font-bold text-lg mt-3' style={{color: '#222d82'}}>Education info</p>
                
                <EducationDetailForm currentUserEducation={currentUserEducation} />

                <p className='font-bold text-lg mt-3' style={{color: '#222d82'}}>Job info</p>
                
                <JobDetailForm currentUserJob= {currentUserJob}/>
            </Dialog>
        </div>
    );
}

export default EditProfile;