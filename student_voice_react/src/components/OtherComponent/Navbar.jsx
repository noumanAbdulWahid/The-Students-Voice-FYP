import React, {useRef, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { RiHome2Fill } from "react-icons/ri";
import { FaRegComments } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import SearchBar from './SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import {RxFace} from 'react-icons/rx';
import { InputText } from 'primereact/inputtext';
import { Menu } from 'primereact/menu';
import { LOGOUT } from '../../store/types/userTypes';
import { ConfirmDialog } from 'primereact/confirmdialog';        

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const [showDelDialog, setShowDelDialog] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const {user} = useSelector((state)=> state.AuthReducers);
  
    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    }

    const menu = useRef(null);
    const items = [
        {
            label: 'View Profile',
            icon: <img className='w-2 h-2 mr-3 border-circle' src={user.profileImg === 'user.png' ? user.imageUrl : `/profile/${user.profileImg}`}/>,
            command: () => {
              setIsOpen(false);
              history.push('/profile');
            }
        },
        {
            label: 'Change Password',
            icon: <div className='w-2 h-2 mr-3'><i className='pi pi-unlock ml-2'></i></div>,
            command: () =>{
              setIsOpen(false);
              history.push(`/change-password/${user.email}`, user.email);
            }
        },
        {
          label: 'Log out',
          icon: <div className='w-2 h-2 mr-3'><i className='pi pi-sign-out ml-2'></i></div>,
          command:  () =>{
            setShowDelDialog(true);
          }
      }
    ];

    const accept = () => {
      setIsOpen(false);
      localStorage.removeItem('myToken');
      dispatch({type: LOGOUT});
    }
  
    const reject = () => {
      setShowDelDialog(false);
    }

    const profileIcon = user ? (
      <li className="nav-item">
        <Menu model={items} popup ref={menu} className= ''/>
        <i className="nav-link" onClick={(e) => menu.current.toggle(e)}><img className='user-image' src={user.profileImg === 'user.png' ? user.imageUrl : `/profile/${user.profileImg}`}/></i>
      </li>
    ): 
    (
    <li className="nav-item">
      <Link className="nav-link" to={"/login"} onClick= {(e)=> setIsOpen(false)}><CgProfile /></Link>
    </li>
   );


  return (
    <nav className="navbar navbar-expand-md">
      <div className="container-fluid">
        <div className="navbar-brand">
            <div className='logo'>
              <Link to={'/'}>
                <p className='upperWord'>Students'</p>
                <p className='lowerWord'>vOICE</p>
              </Link>
            </div>
        </div>
        <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={isOpen ? "collapse navbar-collapse show" : "collapse navbar-collapse"} id="navbarNav">
          <ul className="navbar-nav nav-icons">
            <li className="nav-item">
              <Link className="nav-link" to={'/'} onClick= {(e)=> setIsOpen(false)}><RiHome2Fill /></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/newsEvents"} onClick= {(e)=> setIsOpen(false)}><MdEventAvailable /></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/notifications"} onClick= {(e)=> setIsOpen(false)}><IoIosNotifications /></Link>
            </li>
            <li className="nav-item">
            {/* <span className="p-input-icon-left search-bar p-1" style={{backgroundColor: '#ffffff'}}>
              <i className="pi pi-search" />
               <InputText placeholder="Search User" className='w-12 h-2rem inputText bg-white' style={{outline: 'none', border: 'none', boxShadow: 'none'}}/>
            </span> */}
            <SearchBar />
            </li>
            {/* profile Icon check user avability */}
            {profileIcon}
          </ul>
        </div>
      </div>

      <ConfirmDialog 
        message= 'Do you want to Log out of your acount?' 
        header= 'Log out confirmation'
        icon= 'pi pi-power-off'
        acceptClassName= 'p-button-danger'
        accept= {accept}
        reject= {reject}
        acceptLabel= 'Log out'
        visible={showDelDialog} onHide={() => setShowDelDialog(false)}
        />

    </nav>
  );
}

export default Navbar;