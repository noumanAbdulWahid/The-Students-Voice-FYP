import React, { useEffect, useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import axios from 'axios';
import { queryClient } from '../../reactQuery';
import { useSelector } from 'react-redux';

function EditUserAbout({currentUserAbout}){
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [about, setAbout] = useState(currentUserAbout)
    const {user, token} = useSelector((state)=> state.AuthReducers);

    const mutation = useMutation(
        async ({about}) => {
          const config = {
            headers: {
                Authorization: `Bearer ${token}` 
            }
          } 
          const response = await axios.post(`/set-about/${user._id}`, {about}, config);
          return response.data;
        },
        {
          onSuccess: ()=>{
            setLoading(false);
            formik.resetForm();
            setShowForm(false);
            queryClient.invalidateQueries('currentUser');
          },
          onError: (error)=>{
            // setCommentError(error.response.data.error);
            setLoading(false);
            console.log(error);
          }
        }
      );

    const formik = useFormik({
        initialValues: {
            about: about
        },
        validate: (data) => {
            let errors = {};
            if (data.about.length === 0) {
                errors.about = '*Required'
            }
            return errors;
        },
        onSubmit: async (data, { setSubmitting, setErrors }) => {
          const {about} = data;
          setLoading(true);
          mutation.mutate({about});
        }
      });
    
      const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);
    
      const getFormErrorMessage = (name) => {
          return isFormFieldInvalid(name) ? <small className="p-error mb-4" style={{color: '#de622c'}}>{(formik.errors[name])}</small> : <small className="p-error">{''}</small>;
      };
    return(
        <div className='w-12 border-round-md px-4' style={{border: '1px solid #ced4da'}}>
            <p className='m-1 text-lg font-medium'>{currentUserAbout}</p>
            
            <div className='flex flex-column justify-content-center my-5'>
                <Button onClick={()=> setShowForm(true)} className='w-5 sm:w-4 md:w-3 lg:w-3 xl:w-3 mx-auto' label="Edit About" icon="pi pi-pencil" style={{background: '#222d82', border: 'none'}}/>
            </div>

            {showForm && (
            <form onSubmit={formik.handleSubmit}>
                <InputTextarea className='w-12' autoResize value={formik.values.about} onChange={(e) => formik.setFieldValue('about', e.target.value)} rows= {2} placeholder= 'Enter something about yourself...' maxLength={300} />
                {getFormErrorMessage('about')}
                <small className='font-medium text-lg' style={{float: 'right', color: '#222d82'}}>{formik.values.about.length} / 300</small>
                
                <div className='flex justify-content-center mb-5 mt-4'>
                    <Button type='submit' className='' label={loading ? '...' : 'Submit'} icon={loading ? '' : "pi pi-check"} style={{background: '#222d82', border: 'none'}}/>
                </div>
            </form>
            )}
        </div>
    );
}

export default EditUserAbout;