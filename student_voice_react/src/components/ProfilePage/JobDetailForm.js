import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useQuery, useMutation } from 'react-query';
import { programs } from './ProgramList';
import { Calendar } from 'primereact/calendar';
import { useFormik } from 'formik';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {  SET_TOKEN } from "../../store/types/userTypes";
import { queryClient } from '../../reactQuery';
import ShowEducation from './ShowEducation';
import { InputText } from 'primereact/inputtext';
import ShowJob from './ShowJob';

function JobDetailForm({currentUserJob}){
    const sortedCurrentUserJob = currentUserJob.sort((a, b) => new Date(b.create) - new Date(a.create));
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formErrorMsg,setFormErrorMsg] = useState('');
    const items = Array.from({ length: 31 }).map((_, i) => ({ label: `${i} years`, value: i }));
    const {user, token} = useSelector((state)=> state.AuthReducers);

  const mutation = useMutation(
    async ({jobTitle, company, experience, avalability}) => {
      const config = {
        headers: {
            Authorization: `Bearer ${token}` 
        }
      } 
      const response = await axios.post(`/job-detail/${user._id}`, {jobTitle, company, experience, avalability}, config);
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
        jobTitle: '',
        company: '',
        experience: '',
        avalability: '',
    },
    validate: (data) => {
        let errors = {};
        if (data.jobTitle.length === 0) {
            errors.jobTitle = '*Required'
        }
        if (data.company.length === 0) {
            errors.company = '*Required'
        }
        if (data.experience.length === 0) {
            errors.experience = '*Required'
        }
        if (data.avalability.length === 0) {
            errors.avalability = '*Required'
        }

        return errors;
    },
    onSubmit: async (data, { setSubmitting, setErrors }) => {
      const {jobTitle, company, experience, avalability} = data;
      setLoading(true);
      mutation.mutate({jobTitle, company, experience, avalability});
    }
  });

  const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
      return isFormFieldInvalid(name) ? <small className="p-error mb-4" style={{color: '#de622c'}}>{(formik.errors[name])}</small> : <small className="p-error">{''}</small>;
  };

  const handleShowForm = () =>{
    if (currentUserJob.length >= 2) {
        setShowForm(false);
        setFormErrorMsg('Reach limit! Delete previous for add more.')

    }else{
        setShowForm(true);
        setFormErrorMsg('');
    }
  }

   
    return(
        <div className='w-12 border-round-md px-4' style={{border: '1px solid #ced4da'}}>
        <div className='flex flex-column justify-content-center my-5'>
            <Button onClick={handleShowForm} className='w-6 sm:w-4 md:w-3 lg:w-3 xl:w-3 mx-auto' label="Add Job" icon="pi pi-plus" style={{background: '#222d82', border: 'none'}}/>
            <p className='text-center mt-3' >{formErrorMsg}</p>
        </div>

        {showForm && (
            <form onSubmit={formik.handleSubmit}>
            <div className="inline md:flex md:gap-3 lg:flex lg:gap-4 xl:flex xl:gap-4">
                <div className="w-12 md:w-6 lg:w-6 xl:w-6 mt-4">
                    <span className="p-float-label">
                        <InputText className='w-12' value={formik.values.jobTitle} onChange={(e) => formik.setFieldValue('jobTitle', e.target.value)} maxLength={50} id='jobTile' />
                        <label htmlFor="jobTitle" className='font-medium'>Job Title</label>
                    </span>
                    {getFormErrorMessage('jobTitle')}
                </div>
                <div className="w-12 md:w-6 lg:w-6 xl:w-6 mt-4">
                    <span className="p-float-label">
                        <InputText className='w-12' value={formik.values.company} onChange={(e) => formik.setFieldValue('company', e.target.value)} maxLength={50} id='company'/>
                        <label htmlFor="company" className='font-medium'>Company Name</label>
                    </span>
                    {getFormErrorMessage('company')}
                </div>
            </div>

            <div className="inline md:flex md:gap-3 lg:flex lg:gap-4 xl:flex xl:gap-4 mt-4">
                <div className="w-12 md:w-6 lg:w-6 xl:w-6 mt-4">
                    <span className="p-float-label">
                    <Dropdown 
                        value={formik.values.experience} 
                        onChange={(e) => formik.setFieldValue('experience', e.target.value)} 
                        options={items} 
                        virtualScrollerOptions={{ itemSize: 38 }} 
                        className="w-full" 
                        id='experience'
                        />
                        <label htmlFor="experience" className='font-medium'>Experience</label>
                    </span>
                    {getFormErrorMessage('experience')}
                </div>
                <div className='w-12 md:w-6 lg:w-6 xl:w-6 mt-4 '>
                        <span className="p-float-label">
                            <Dropdown 
                                value={formik.values.avalability} 
                                id="avalability" 
                                type="text" 
                                className = "w-12" 
                                options={[
                                    { label: 'Open', value: 'Open' },
                                    { label: 'Close', value: 'Close' },
                                ]}
                                onChange={(e) => {
                                    formik.setFieldValue('avalability', e.target.value);
                                }}
                                name= 'avalability'
                            />
                            <label htmlFor="avalability" className='font-medium'>Avalability</label>
                        </span>
                    {getFormErrorMessage('avalability')}
                </div>
            </div>
            <div className='flex justify-content-center mb-5 mt-4'>
                <Button type='submit' className='' label={loading ? '...' : 'Submit'} icon={loading ? '' : "pi pi-check"} style={{background: '#222d82', border: 'none'}}/>
            </div>
        </form>
        )}

       <p className='inline lg:flex lg:flex-wrap xl:flex xl:flex-wrap'>
        {sortedCurrentUserJob.length > 0 ?  sortedCurrentUserJob.map((job) => (
            <ShowJob key={job._id} job = {job} delBtnShow = {true}/>
        )) : ''}
       </p>
    </div>
    );
}

export default JobDetailForm;














  // Set the universities and filtered universities when the data is loaded
//   useEffect(() => {
//     setUniversities(allUniversities);
//     setFilteredUniversities(allUniversities);
//   }, [allUniversities]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error fetching universities.</div>;
//   }