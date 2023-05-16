import React, { useEffect, useState } from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useMutation } from 'react-query';
import { queryClient } from '../../reactQuery';

function ShowJob({job, delBtnShow}){
    const [showDelDialog, setShowDelDialog] = useState(false);

    const {user, token} = useSelector((state)=> state.AuthReducers);

    const mutation = useMutation(
        async () => {
          const config = {
            headers: {
                Authorization: `Bearer ${token}` 
            }
          } 
          const response = await axios.post(`/delete-job/${user._id}/${job._id}`, job._id, config);
          return response.data;
        },
        {
          onSuccess: ()=>{
            queryClient.invalidateQueries('currentUser');
          }
        }
      );

    const accept = async () => {
       
        mutation.mutate();
      }
    
      const reject = () => {
        setShowDelDialog(false);
      }


    return(         
          <div className="w-12 px-2 md:w-6 md:px-2 lg:w-6 lg:px-2 xl:w-6 xl:px-4">
            <ConfirmDialog 
                  message= 'Do you want to delete this comment?' 
                  header= 'Delete Confirmation'
                  icon= 'pi pi-info-circle'
                  acceptClassName= 'p-button-danger'
                  accept= {accept}
                  reject= {reject}
                  acceptLabel= 'Delete'
                  visible={showDelDialog} 
                  onHide={() => setShowDelDialog(false)}
                />       
            <div className='text-xl mb-1  white-space-nowrap overflow-hidden text-overflow-ellipsis' ><b>Job Title:</b> {job.jobTitle} <i className={delBtnShow ? 'pi pi-trash text-red-900 ml-3 font-bold cursor-pointer' : ''} onClick = {()=> setShowDelDialog(true)}></i></div>
            <div className='text-xl mb-1  white-space-nowrap overflow-hidden text-overflow-ellipsis'><b>Company:</b> {job.company}</div>
            <div className='text-xl mb-1  white-space-nowrap overflow-hidden text-overflow-ellipsis'><b>Experience:</b> {job.experience + ' years'}</div>
            <div className='text-xl mb-1  white-space-nowrap overflow-hidden text-overflow-ellipsis'><b>Avalability:</b> {job.avalability === 'Open' ? <span style={{color:'#de622c', fontWeight: '600'}}>{job.avalability}</span> : <span style={{fontWeight: '600'}}>{job.avalability}</span>}</div>
          </div>
    );
}

export default ShowJob;