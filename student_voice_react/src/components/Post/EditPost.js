import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom'; 
import { editPost, updateAction } from "../../store/AsyncMethod/PostMethod";
import { EDIT_POSTS_RESET} from '../../store/types/postTypes';
import Loader from '../OtherComponent/Loader';
import { Editor  } from 'primereact/editor';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const EditPost = (props) => {
  const {postId} = useParams();
  const [content, setContent] = useState('');
  const [length, setLength] = useState(0);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [alreadySaveImagePreview, setAlreadySaveImagePreview] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const dispatch = useDispatch();
  const location = useLocation();
  const {loading, redirect} = useSelector((state)=> state.PostReducers);
  const {post, postStatus} = useSelector((state)=> state.FetchEditPost);
  const { updateErrors } = useSelector((state)=> state.UpdatePost);

  const renderHeader = () => {
    return (
        <span className="ql-formats">
            <button className="ql-bold" aria-label="Bold"></button>
            <button className="ql-italic" aria-label="Italic"></button>
            <button className="ql-underline" aria-label="Underline"></button>
        </span>
    );
};

const header = renderHeader();

  const handleImageChange = (event) => {
    event.preventDefault();
    setIsDisabled(false);
  
    if (event.target.files.length !== 0) {
      
      setImage(event.target.files[0]);

      const reader = new FileReader();
      reader.onloadend = () => {
          setImagePreview(reader.result);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const updatedPost = (e) =>{
    e.preventDefault(); 

    const formData =  new FormData();
    formData.append('content', content);
    formData.append('image', image);
    formData.append('id', post._id);

    dispatch(updateAction(formData));
  };
  

  useEffect(()=>{
    if (postStatus) {
        setContent(post.content);
        setAlreadySaveImagePreview(post.image);
        dispatch({type: EDIT_POSTS_RESET});
    }else{
        dispatch(editPost(postId));
    }
    
  }, [post]);

  useEffect(()=>{
    if(redirect){
        props.history.push('/profile');
      }
    if (updateErrors.length !== 0) {
        updateErrors.map((err) => toast.error(err.msg));
    }
  }, [updateErrors, redirect]);

  const formats = [
    'bold',
    'underline',
    'italic'
  ];

  const sanitizeDelta = (delta) => {
    return {
      ops: delta.ops.filter(op => {
        if (op.attributes) {
          return (op.attributes.bold || op.attributes.underline || op.attributes.italic);
        } else {
          return true;
        }
      })
    };
  }

  return !loading ? 
  <div className="post-container">
  <div className='sub-container-1'>
    <h1 className='create-post-heading'>Edit Post</h1>
    <form  onSubmit={updatedPost}>
        <div className="form-group">
          <label htmlFor="content">Content</label>
            <Editor  
                placeholder='Enter your Content...' 
                theme="snow" 
                id= 'content'
                name= 'content'
                value={content} 
                onTextChange={(e) => {
                  setLength(e.textValue.length-1)
                  setContent(e.htmlValue)
                  setIsDisabled(false)
                  }}
                maxLength= {300} 
                headerTemplate={header}
                formats={formats}
                modules={{ clipboard: { matchVisual: false } }}
                sanitizeDelta={sanitizeDelta}
                style={{ height: '200px', fontSize: '1.2rem' }}
              />
          <span className='word-counter'> {length} / 300  </span>
        </div>
        <div className="form-group">
        <label htmlFor="image" className='image_label'>{image ? image.name : 'Choose Image'}</label>
        <input type="file" id="image" onChange={handleImageChange} accept="image/*"/>
        </div>
        <button type="submit" className="btn btn-primary" disabled = {isDisabled}>
        Update Post
        </button> 
    </form>
  </div>
  
  <div className="sub-container-2">
  <h1 className='create-post-heading'>Preview Post</h1>
  <div className="card-body">
  <span className='label'>{content ? "Content" : ''}</span>
  <div className='content mt-3'>{ReactHtmlParser(content)}</div>
  <span className='label'>{imagePreview || alreadySaveImagePreview ? 'Image' : ''}</span>
    {!imagePreview ? (alreadySaveImagePreview ? <img className="card-img-top" src={`/images/${alreadySaveImagePreview}`} alt="Post image"  /> : '') : <img className="card-img-top" src={imagePreview} alt="Post image"  />}
  </div>
</div>

<Toaster position="top-center" reverseOrder={false} />
</div> : <Loader /> ;
};

export default EditPost;
























































          {/* <textarea 
            class="form-control special-text-area" 
            id="content" 
            value={content} 
            rows="10" 
            name='content' 
            onChange={(e) => {
                setContent(e.target.value)
                setIsDisabled(false);
                console.log('e.target.value',e.target.value, 'con', content)
                if(content === e.target.value){
                  console.log('tt','true')
                  setIsDisabled(true);
                }
            }} 
            maxLength = {300} 
            placeholder = 'Enter your Content...'
            onKeyDown={handleKeyDown}
          /> */}



          {/* <textarea 
            class="form-control special-text-area" 
            id="content" 
            value={content} 
            rows="10" 
            name='content' 
            onChange={(e) => {
                setContent(e.target.value)
                setIsDisabled(false);
                console.log('e.target.value',e.target.value, 'con', content)
                if(content === e.target.value){
                  console.log('tt','true')
                  setIsDisabled(true);
                }
            }} 
            maxLength = {300} 
            placeholder = 'Enter your Content...'
            onKeyDown={handleKeyDown}
          /> */}




// import { createAction } from "../../store/AsyncMethod/PostMethod";


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