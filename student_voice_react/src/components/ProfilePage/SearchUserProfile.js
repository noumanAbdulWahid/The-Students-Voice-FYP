import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Panel } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import { Divider } from 'primereact/divider';
import EditProfile from './EditProfile';
import { useQuery } from 'react-query';
import axios from 'axios';
import ShowEducation from './ShowEducation';
import ShowJob from './ShowJob';


const SearchUserProfile = ({userId}) => {

  const [currentUserEducation, setCurrentUserEducation] = useState([]);
  const sortedCurrentUserEducation = currentUserEducation.sort((a, b) => new Date(b.create) - new Date(a.create));
  const [currentUserAbout, setCurrentUserAbout] = useState('');
  const [currentUserJob, setCurrentUserJob] = useState([]);
  const sortedCurrentUserJob = currentUserJob.sort((a, b) => new Date(b.create) - new Date(a.create));
  const [searchUser, setSearchUser] = useState([]);

  const {_id, name, profileImg, imageUrl, userID , session, currentSemester, department} = searchUser;

  const {user} = useSelector((state)=> state.AuthReducers);

  const {refetch} = useQuery('currentUser', async ()=>{
    await axios.get( `/current-user/${userId}`, { cache: 'default' })
    .then(response => {
       setCurrentUserEducation(response.data.response.education);
       setCurrentUserAbout(response.data.response.about);
       setCurrentUserJob(response.data.response.job)
       setSearchUser(response.data.response)
       return response.data.response
     })
     .catch(error => {
       console.error(error);
     });
   });

   useEffect(()=>{
    refetch();
   },[userId])
   


  const template1 = (options) => {
    const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
    const className = `${options.className} justify-content-start`;
    const titleClassName = `${options.titleClassName} ml-2`;
    const style = { fontSize: '1.25rem', color: '#222d82' };

    return (
        <div className={className}>
            <button className={options.togglerClassName} onClick={options.onTogglerClick}>
                <span className={toggleIcon}></span>
                <Ripple />
            </button>
            <span className={titleClassName} style={style}>About</span>
        </div>
      );
    };
    const template2 = (options) => {
      const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
      const className = `${options.className} justify-content-start`;
      const titleClassName = `${options.titleClassName} ml-2`;
      const style = { fontSize: '1.25rem', color: '#222d82' };
  
      return (
          <div className={className}>
              <button className={options.togglerClassName} onClick={options.onTogglerClick}>
                  <span className={toggleIcon}></span>
                  <Ripple />
              </button>
              <span className={titleClassName} style={style}>Education</span>
          </div>
        );
      };

      const template3 = (options) => {
        const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
        const className = `${options.className} justify-content-start`;
        const titleClassName = `${options.titleClassName} ml-2`;
        const style = { fontSize: '1.25rem', color: '#222d82' };
    
        return (
            <div className={className}>
                <button className={options.togglerClassName} onClick={options.onTogglerClick}>
                    <span className={toggleIcon}></span>
                    <Ripple />
                </button>
                <span className={titleClassName} style={style}>Job</span>
            </div>
          );
        };

  return (
    <div>
      <div className="header w-11 mx-auto flex sm:flex-column md:flex-row lg:flex-row xl:flex-row" style={{flexDirection:'column'}}>
        <div className='flex'>
          <div className='header-image-frame'>
            <img className='w-full h-full border-circle' style={{}} src={profileImg === 'user.png' ? imageUrl : `/profile/${profileImg}`}/>
          </div>
          <div className='header-content ml-5'>
            <h2 className='font-bold'>{name}</h2>
            <p className='mb-2'><b>Student ID: </b>{userID ? userID : 'N/A'}</p>
            <p className='mb-2'><b>Department: </b>{department ? department : 'N/A'}</p>
            <p className='mb-2'><b>Current Semester: </b>{currentSemester ? currentSemester + ' (expected)' : 'N/A'}</p>
            <p className='mb-2'><b>Session: </b>{session ? session : 'N/A'}</p>
          </div>
        </div>
        <div className='md:mr-0 lg:mr-0 xl:mr-0 md:w-3 lg:w-3 xl:w-2' style={{marginLeft: 'auto', marginRight: 'auto', width: '60%', marginTop:'10px'}}>
          {user._id === _id ? <EditProfile currentUserEducation={currentUserEducation} currentUserAbout = {currentUserAbout} currentUserJob= {currentUserJob} /> : ''}
        </div>
      </div>
      {/* <i className='pi pi-pencil' style={{float: 'right'}}></i> */}
      <Divider type="solid" align='center' className='w-11 mx-auto' style={{color: '#222d82', borderTop: '3px solid #222d82'}} />

      <div>
      <Panel headerTemplate={template1} toggleable className='w-11 mx-auto border-round-xl'>
          <p className="mx-3 my-1 text-lg font-medium">
              {currentUserAbout}
          </p>
      </Panel>

      <Panel headerTemplate={template2} toggleable className='w-11 mx-auto border-round-xl mt-3'>
        <div className="m-0 flex flex-wrap">
          {sortedCurrentUserEducation.length > 0 ?  sortedCurrentUserEducation.map((education) => (
                <ShowEducation key={education._id} education = {education} delBtnShow = {false}/>
            )) : ''}
          </div>
      </Panel>

      <Panel headerTemplate={template3} toggleable className='w-11 mx-auto border-round-xl mt-3'>
          <div className="m-0 flex flex-wrap">
            {sortedCurrentUserJob.length > 0 ?  sortedCurrentUserJob.map((job) => (
                <ShowJob key={job._id} job = {job} delBtnShow = {false}/>
            )) : ''}
          </div>
      </Panel>

      </div>
    </div>
  );
};

export default SearchUserProfile;






























{/* <p className='text-xl mb-1 w-4 text-overflow-ellipsis'><b>BS </b> Computer Science</p>
            <p className='text-lg mb-1 w-4 text-overflow-ellipsis'>FAST - National University of Computer and Emerging Sciences (NUCES) (Pakistan)</p>
            <p className='text-lg mb-1 w-4 text-overflow-ellipsis'>Under-Graduate</p>
            <p className='text-lg mb-1 w-4 text-overflow-ellipsis'>2017-2021*</p> */}
















 {/* <EditUserProfilePic userId = {_id} userImg = {profileImg} googleImg = {imageUrl} />
        
        <h1 className='error'>{name}</h1>
        <h2 className='error_msg'>{email}</h2>
        <h2 className='error_msg'>{userID}</h2>
        <h2 className='error_msg'>{session}</h2>
        <h2 className='error_msg'>{currentSemester}</h2>
        <h2 className='error_msg'>{department}</h2>
        <button className='home-link' onClick={logout}>log out</button> */}



        // <div className='flex w-4 overflow-hidden align-items-center justify-content-center px-2 overflow-hidden'>
        //         <p className='inline-block w-12 text-xl mb-1 white-space-nowrap text-overflow-ellipsis hover:white-space-normal hover:overflow-visible'><b>BS </b> Computer Science</p>
        //       </div>
        //       <div className='flex w-4 overflow-hidden align-items-center justify-content-center px-2 overflow-hidden'>
        //         <p className='inline-block w-12 text-xl mb-1 white-space-nowrap text-overflow-ellipsis hover:white-space-normal hover:overflow-visible'>FAST - National University of Computer and Emerging Sciences (NUCES) (Pakistan)</p>
        //       </div>
        //       <div className='flex w-4 overflow-hidden align-items-center justify-content-center px-2 overflow-hidden'>
        //         <p className='inline-block w-12 text-xl mb-1 white-space-nowrap text-overflow-ellipsis hover:white-space-normal hover:overflow-visible'>Under-Graduate</p>
        //       </div>
        //       <div className='flex w-4 overflow-hidden align-items-center justify-content-center px-2 overflow-hidden'>
        //         <p className='inline-block w-12 text-xl mb-1 white-space-nowrap text-overflow-ellipsis hover:white-space-normal hover:overflow-visible'>2017-2021*</p>
        //       </div>




  // const { redirect, message} = useSelector((state)=> state.PostReducers);
  // const [image, setImage] = useState(null);
  // const [imagePreview, setImagePreview] = useState('');
  // const [storeImg, setStoreImg] = useState(null);
  // const [image, setImage] = useState(null);
  // const [isHovering, setIsHovering] = useState(false);

  // const handleImageChange = (event) => {
  //   const imageFile = event.target.files[0];
  //   const imageUrl = URL.createObjectURL(imageFile);
  //   setImage(imageUrl);
  // };

  // const handleDelete = () => {
  //   setImage(null);
  // };

  // const handleMouseEnter = () => {
  //   setIsHovering(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovering(false);
  // };

   // const profileImgShow = storeImg.map(item => item.imgCrop);



// const handleImageChange = (event) => {
  //   event.preventDefault();
  //   if (event.target.files.length !== 0) {
  //     setImage(event.target.files[0]);

  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //         setImagePreview(reader.result);
  //     };

  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // };
  
  // useEffect(() => {
  //   if (redirect) {
  //     dispatch({type: REDIRECT_FALSE});
  //   }
  //   if (message) {
  //     toast.success(message);
  //     dispatch({type: REMOVE_MESSAGE});
  //   }
  // }, [message]);
  
  // useEffect(() => {
  //   dispatch(fetchPost(_id));

  // }, []);


  {/* <form>
        <div className="form-group">
            <label htmlFor="add-image" className='add-image-label'>
              {imagePreview ? 
                <div className='user-profile-image'>
                  <img className='image-preview' src={imagePreview} />
                  <div className='user-profile-image-btn'>
                    <li><a className='user-profile-image-btn-1'>Add Profile</a></li>
                    <li><a className='user-profile-image-btn-1'>Crop Profile</a></li>
                  </div>
                  </div> : <RiUserAddLine />}
            </label>
            <input type="file" id="add-image" onChange={handleImageChange} />
            </div>
        </form> */}
        {/* <div
          className="image-button-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {image ? (
            <div className="image-preview"> */}
              {/* {isHovering && (
                <div className="hover-buttons">
                  <button className="delete-button" onClick>Add Profile</button>
                  <button className="edit-button" onClick = {handleDelete}>Delete Profile</button>
                </div>
              )} */}
              {/* <img src={image}/>
            </div>
          ) : (
            <label htmlFor='image' className="image-upload">
              <input type="file" id='image' accept="image/*" onChange={handleImageChange} />
              Upload Image
            </label>
          )}
        </div> */}


        {/* <img src={imageUrl} height = {'120px'} width={'120px'} style = {{borderRadius: '50%'}}/> */}

        {/* <Toaster position="top-center" reverseOrder={false} /> */}


//         import { fetchPost } from '../../store/AsyncMethod/PostMethod';
// import { REDIRECT_FALSE, REMOVE_MESSAGE } from '../../store/types/postTypes';
// import toast, { Toaster } from 'react-hot-toast';
// import {RiUserAddLine} from 'react-icons/ri';




