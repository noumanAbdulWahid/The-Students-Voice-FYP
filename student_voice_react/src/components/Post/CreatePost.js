import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from "react-redux";
import { createAction } from "../../store/AsyncMethod/PostMethod";
import toast, { Toaster } from 'react-hot-toast';
import { Editor  } from 'primereact/editor';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const CreatePost = (props) => {

  const [content, setContent] = useState('');
  const [length, setLength] = useState(0);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const {user:{_id, name}} = useSelector((state)=> state.AuthReducers);
  const {loading, createErrors, redirect} = useSelector((state)=> state.PostReducers);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

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
    if (event.target.files.length !== 0) {
      setImage(event.target.files[0]);

      const reader = new FileReader();
      reader.onloadend = () => {
          setImagePreview(reader.result);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data, such as send it to the server
    const formData =  new FormData();
    formData.append('content', content);
    formData.append('image', image);
    formData.append('name', name);
    formData.append('id', _id);

    dispatch(createAction(formData));
  };
  

  useEffect(()=>{
    if(redirect){
      history.push(location.state === '/' ? location.state : '/profile');
    }
    if (createErrors.length > 0) {
        createErrors.map((err) => toast.error(err.msg));
    }
  }, [createErrors, redirect]);

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

  return (
    <div className="post-container">
      <div className='sub-container-1'>
        <h1 className='create-post-heading'>Create Post</h1>
        <form onSubmit={handleSubmit}>

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
            <button type="submit" className="btn btn-primary">
            {loading ? '...' : 'Create Post'}
            </button>
        </form>
      </div>
      
      <div className="sub-container-2">
      <h1 className='create-post-heading'>Preview Post</h1>
      <div className="card-body">
      <span className='label'>{content ? "Content" : ''}</span>
      <div className='content mt-3'>{ReactHtmlParser(content)}</div>
      <span className='label'>{imagePreview ? 'Image' : ''}</span>
        {imagePreview ? <img className="card-img-top" src={imagePreview} alt="Post image"  /> : ''}
      </div>
    </div>

    <Toaster position="top-center" reverseOrder={false} />
    </div>
    
  );
};

export default CreatePost;








































{/* <textarea 
                class="form-control special-text-area" 
                id="content" 
                value={content} 
                rows="10" 
                name='content' 
                onChange={handleContent} 
                maxLength = {300} 
                placeholder = 'Enter your Content...'
                onKeyDown={handleKeyDown}
              /> */}









                // const handleKeyDown = (event) => {
  //   if (event.keyCode === 13) {
  //     event.preventDefault();
  //     setContent(content + "<br>");
  //   }
  // };

  // const handleContent = (e) => {
  //   setContent(e.target.value);
  // };


  // import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';