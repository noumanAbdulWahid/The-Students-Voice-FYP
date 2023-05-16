import { Button } from 'primereact/button';
import React, {useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import FetchAllPost from '../Post/FetchAllPost';
import{ FaRegEdit } from 'react-icons/fa'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';


function HomeMain() {

  const history = useHistory();
  const location = useLocation();
  
  return (
    <>
      <Helmet>
        <title>Students' Voice</title>
        <meta name='description' content='This is Home of Students Voice ' />
      </Helmet>

      {/* <div className='w-12'>
        <div className=' w-12 md:w-10 lg:w-8 xl:w-7'>
          <div className='w-12 flex'>
            <Button onClick={()=> history.push('/create-post')} icon='pi pi-file-edit' label='Create Post' className=' text-lg border-round-3xl w-5 md:w-3 lg:w-3 xl:w-3 ml-auto mr-auto' style={{background: '#222d82'}}/>
          </div>
          <div className='w-12'>
            <FetchAllPost />
          </div>
        </div> */}
        {/* <div className='col-5 '>
          <div className=' bg-white h-screen mx-5 border-round-xl'>
            <h1>FOR YOU</h1>
          </div>
        </div> */}
      {/* </div> */}

      <div className="home-screen">
        <div className="left-side w-12 lg:w-7 xl:w-7">
          {/* content that will be scrollable */}
          <div className='w-12 flex mb-3'>
            <button className='for-you-btn w-11 sm:w-9 md:w-8 lg:w-8 xl:w-7 text-3xl font-bold border-round-3xl px-7 mx-auto shadow-3 p-1 lg:hidden xl:hidden' style={{background: '#222d82', color: 'white'}} >FOR YOU</button>
          </div>

          <div className='w-12 flex mb-3'>
            <button onClick={()=> history.push('/create-post', location.pathname)} className='w-11 sm:w-9 md:w-8 lg:w-8 xl:w-7 text-2xl font-bold border-round-3xl px-7 mx-auto shadow-3 p-2' style={{background: '#222d82', color: 'white'}} ><FaRegEdit className='text-4xl mb-1 mr-3' />   Create Post</button>
          </div>
          <div className=''>
            <FetchAllPost />
          </div>
        </div>
        <div className="right-side w-5 hidden lg:inline xl:inline">
          {/* content that will not be scrollable */}
          <div className='bg-white xl:mx-8 lg:mx-3 h-screen border-round-2xl'>
            <h1 className='right-side-label'>For You</h1>
          </div>
        </div>
    </div>
    </>
  );
}

export default HomeMain;