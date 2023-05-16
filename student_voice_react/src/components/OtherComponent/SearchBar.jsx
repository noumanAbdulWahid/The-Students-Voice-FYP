import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { ListBox } from 'primereact/listbox';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Divider } from 'primereact/divider';
import { useHistory } from 'react-router-dom';
import { queryClient } from '../../reactQuery';
import { useSelector } from 'react-redux';
        

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const {user} = useSelector((state)=> state.AuthReducers);

//   const { isLoading, isError, data } = useQuery(['search-users', query], () =>{
//     const response = axios(`/search?query=${query}`).then((res) => res.data)
//     return response;
// },{
//   cacheTime: 0,
// });

// console.log('dat',data);

  const handleInputChange = async (e) => {
    setQuery(e.target.value);
    setIsLoading(true);
    await axios(`/search?query=${e.target.value}`)
      .then((res) =>{
        setResult(res.data);
        setIsLoading(false);
      })
  };

  return (
    <div className='relative w-12'>

      <span className="p-input-icon-right search-bar p-1" style={{backgroundColor: '#ffffff'}}>
          <i className={isLoading? 'pi pi-spin pi-spinner' : "pi pi-search"} />
          <InputText
            placeholder="Search users..."
            onChange={handleInputChange}
            className= 'w-12 h-2rem inputText bg-white'
            style={{outline: 'none', border: 'none', boxShadow: 'none'}}
          />
      </span>
      {query.length > 0 && (
        <ListBox
          className='absolute mt-1 w-12'
          options={result}
          optionLabel="name"
          value= {query}
          itemTemplate={(user) => (
           <div className='white-space-nowrap overflow-hidden text-overflow-ellipsis'>
              <img className='border-circle' src={user.profileImg === 'user.png' ? user.imageUrl : `/profile/${user.profileImg}`} height={35} width={35}/>
              <span className='ml-3 font-semibold'>{user.name}</span>
           </div>
           
          )}
          onChange={(e)=>{
            if(user._id === e.value._id){
              history.push(`/profile`);
              setQuery('');
            }else{
              setQuery('');
              history.push(`/profile/${e.value._id}`);
            }
          }}
        />
      )}
    </div>
  );
};

export default SearchBar;






















































// import React, { useState } from "react";
// import { InputText } from "primereact/inputtext";
// import { AutoComplete } from "primereact/autocomplete";
// import { useQuery } from "react-query";
// import { getUsersByName } from "./getUsersByName";

// export default function SearchBar() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const { isLoading, data: users } = useQuery(
//     ["users", searchTerm],
//     getUsersByName,
//     {
//       enabled: false,
//     }
//   );

//   function handleSearch() {
//     getUsersByName(searchTerm).then(() => {
//       // Query will automatically refetch when search term changes
//     });
//   }

//   function handleSelectUser(user) {
//     console.log(user);
//     // Do something with the selected user
//     setSearchTerm("");
//   }

//   function renderUser(user) {
//     return (
//       <div className="p-d-flex p-ai-center">
//         <img
//           alt={user.name}
//           src={user.avatar}
//           className="p-mr-2"
//           width="32"
//           height="32"
//         />
//         <div>{user.name}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-d-flex p-ai-center">
//       <AutoComplete
//         value={searchTerm}
//         suggestions={users}
//         completeMethod={() => {}}
//         field="name"
//         itemTemplate={renderUser}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         onSelect={(e) => handleSelectUser(e.value)}
//       />
//     </div>
//   );
// }























































// import React, {useState} from 'react';
// import axios from 'axios';
// import { AutoComplete } from 'primereact/autocomplete';
        


// function SearchBar() {

//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);

//   const handleQueryChange = async (event) => {
//     const value = event.target.value;
//     setQuery(value);

//     if (value) {
//       const response = await axios.get(`/search?q=${encodeURIComponent(value)}`);
//       setSuggestions(response.data);
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleSelected = (event) => {
//     // window.location.href = `/profile/${event.value.username}`;
//   };

//   return (
//     <div>
//       <AutoComplete
//         value={query}
//         suggestions={suggestions}
//         completeMethod={handleQueryChange}
//         field="username"
//         dropdown
//         itemTemplate={(user) => (
//           <div className="p-d-flex p-ai-center">
//             <img src={user.profilePicture} alt={user.username} className="p-mr-2" width="32" height="32" />
//             <span>{user.username}</span>
//           </div>
//         )}
//         onSelect={handleSelected}
//       />
//     </div>
//   );
// }

// export default SearchBar;