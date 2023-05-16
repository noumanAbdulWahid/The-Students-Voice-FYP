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

function EducationDetailForm({currentUserEducation}){
    const [showForm, setShowForm] = useState(false);
    const [universities, setUniversities] = useState([]);
    const [filteredUniversities, setFilteredUniversities] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(false);
    // const [currentUserEducation, setCurrentUserEducation] = useState([]);
    const [formErrorMsg,setFormErrorMsg] = useState('');
     // const [selectedQualification, setSelectedQualification] = useState('');
    // const [selectedUniversity, setSelectedUniversity] = useState(null);
     // const [fromDate, setfromDate] = useState(new Date());
    // const [toDate, setToDate] = useState(null);
     // const [selectProgram, setselectProgram] = useState('');

    const sortedCurrentUserEducation = currentUserEducation.sort((a, b) => new Date(b.create) - new Date(a.create));
    const {user, token} = useSelector((state)=> state.AuthReducers);

       // Define a query to fetch the university data from the API
  const { isLoading, isError, data: allUniversities = [] } = useQuery('universities', () => {
    return fetch('http://universities.hipolabs.com/search?country=Pakistan')
      .then(response => response.json())
      .then(data => {
        const universitiesWithCountry = data.map(u => ({ label: `${u.name} (${u.country})`, value: `${u.name} (${u.country})`}));
        setUniversities(universitiesWithCountry);
        setFilteredUniversities(universitiesWithCountry);
        return universitiesWithCountry;
      });
  }, { cacheTime: 0 });

  // Define a mutation to update the selected university
//   const updateSelectedUniversity = useMutation((newUniversity) => {
//     setSelectedUniversity(newUniversity);
//   });

  // Filter the universities based on the input text and set the filtered universities
  const filterUniversities = (text) => {
    setFilterText(text);
    const filtered = universities.filter(u => u.label.toLowerCase().includes(text.toLowerCase()));
    setFilteredUniversities(filtered);
  };

//   const { data: currentUsers} = useQuery('currentUser', async ()=>{
//     await axios.get( `/current-user/${user._id}`, { cache: 'default' })
//     .then(response => {
//        setCurrentUserEducation(response.data.response.education);
//        return response.data.response
//      })
//      .catch(error => {
//        console.error(error);
//      });
//    });
//    console.log('cu', currentUserEducation);

  const mutation = useMutation(
    async ({qualification, program, university, from, to}) => {
      const config = {
        headers: {
            Authorization: `Bearer ${token}` 
        }
      } 
      const response = await axios.post(`/education/${user._id}`, {qualification, program, university, from, to}, config);
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
        qualification: '',
        university: '',
        program: '',
        from: new Date(),
        to: ''
    },
    validate: (data) => {
        let errors = {};

        if (data.qualification.length === 0) {
            errors.qualification = '*Required'
        }
        if (data.program.length === 0) {
            errors.program = '*Required'
        }
        if (data.university.length === 0) {
            errors.university = '*Required'
        }
        if (data.from.length === 0) {
            errors.from = '*Required'
        }
        if (data.to.length === 0) {
            errors.to = '*Required'
        }
        if (data.from.getFullYear() >= new Date().getFullYear()) {
            errors.to = '***Invalid Year'
        }

        return errors;
    },
    onSubmit: async (data, { setSubmitting, setErrors }) => {
      const {qualification, program, university, from, to} = data;
      setLoading(true);
      mutation.mutate({qualification, program, university, from, to});
    }
  });

  const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
      return isFormFieldInvalid(name) ? <small className="p-error mb-4" style={{color: '#de622c'}}>{(formik.errors[name])}</small> : <small className="p-error">{''}</small>;
  };

  const handleShowForm = () =>{
    if (currentUserEducation.length >= 3) {
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
            <Button onClick={handleShowForm} className='w-6 sm:w-5 md:w-4 lg:w-4 xl:w-4 mx-auto' label="Add Education" icon="pi pi-plus" style={{background: '#222d82', border: 'none'}}/>
            <p className='text-center mt-3' >{formErrorMsg}</p>
        </div>

        {showForm && (
            <form onSubmit={formik.handleSubmit}>
            <div className="inline md:flex md:gap-3 lg:flex lg:gap-4 xl:flex xl:gap-4">
                <div className="w-12 md:w-6 lg:w-6 xl:w-6 mt-4">
                    <span className="p-float-label">
                        <Dropdown 
                            value={formik.values.qualification} 
                            id="qualification" 
                            type="text" 
                            className = "w-12" 
                            options={[
                                { label: 'BS', value: 'BS' },
                                { label: 'MS', value: 'MS' },
                                { label: 'PHD', value: 'PHD' }
                            ]}
                            onChange={(e) => {
                                formik.setFieldValue('qualification', e.target.value);
                            }}
                            name= 'qualification'
                        />
                        <label htmlFor="qualification" className='font-medium'>Qualification Level</label>
                    </span>
                    {getFormErrorMessage('qualification')}
                </div>
                <div className="w-12 md:w-6 lg:w-6 xl:w-6 mt-4">
                    <span className="p-float-label">
                    <Dropdown 
                        value={formik.values.program} 
                        options={programs} 
                        onChange={(e) => {
                            formik.setFieldValue('program', e.target.value);
                        }}
                        filter 
                        showClear 
                        filterBy="label" 
                        className='w-12' 
                        name='program'
                        id='program'
                    />
                        <label htmlFor="program" className='font-medium'>Program</label>
                    </span>
                    {getFormErrorMessage('program')}
                </div>
            </div>

            <div className="inline md:flex md:gap-3 lg:flex lg:gap-4 xl:flex xl:gap-4 mt-4">
                <div className="w-12 md:w-6 lg:w-6 xl:w-6 mt-4">
                    <span className="p-float-label">
                        <Dropdown
                            value={formik.values.university}
                            options={filteredUniversities}
                            filter
                            filterBy="label"
                            showClear={true}
                            onFilter={(e) => filterUniversities(e.target.value)}
                            itemTemplate={(option) => (
                            <div className="p-d-flex p-ai-center">
                                <div className="p-mr-2">{option.label}</div>
                                <div className="p-ml-auto">{option.value.country}</div>
                            </div>
                            )}
                            // onChange={(e) => updateSelectedUniversity.mutate(e.value)}
                            onChange={(e) => {
                                formik.setFieldValue('university', e.target.value);
                            }}
                            className= 'w-12'
                            name='institute'
                            id='institute'
                        />
                        <label htmlFor="institute" className='font-medium'>Institute</label>
                    </span>
                    {getFormErrorMessage('university')}
                </div>
                <div className='w-12 md:w-6 lg:w-6 xl:w-6 mt-4 '>
                    <div className="flex gap-3" style={{marginBottom: '-2px'}}>
                        <span className="p-float-label w-6">
                            <Calendar 
                                name='fromDate' 
                                value={formik.values.from} 
                                onChange={(e) => {
                                    formik.setFieldValue('from', e.target.value);
                                }} 
                                view="year" 
                                dateFormat="yy" 
                                id='fromDate'
                            />
                            <label htmlFor="fromDate" className='font-medium'>From</label>
                        </span>
                        {/* {getFormErrorMessage('from')} */}
                        <span className="p-float-label w-6">
                            <Calendar 
                                name='toDate' 
                                minDate={new Date(`${formik.values.from.getFullYear()+1}-12-31`)} 
                                maxDate={new Date(`${formik.values.from.getFullYear()+5}-12-31`)}  
                                value={formik.values.to} 
                                onChange={(e) => {
                                    formik.setFieldValue('to', e.target.value);
                                }} 
                                view="year" 
                                dateFormat="yy" 
                                id='toDate'
                            />
                            <label htmlFor="toDate" className='font-medium'>To</label>
                        </span>
                    </div>
                    {getFormErrorMessage('to')}
                </div>
            </div>
            <div className='flex justify-content-center mb-5 mt-4'>
                <Button type='submit' className='' label={loading ? '...' : 'Submit'} icon={loading ? '' : "pi pi-check"} style={{background: '#222d82', border: 'none'}}/>
            </div>
        </form>
        )}

       <p className='inline lg:flex lg:flex-wrap xl:flex xl:flex-wrap'>
        {sortedCurrentUserEducation.length > 0 ?  sortedCurrentUserEducation.map((education) => (
            <ShowEducation key={education._id} education = {education} delBtnShow = {true}/>
        )) : ''}
       </p>
    </div>
    );
}

export default EducationDetailForm;














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