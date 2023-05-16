import React,{useState, useEffect} from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postRegister } from "../../store/AsyncMethod/AuthMethod";
import toast, { Toaster } from 'react-hot-toast';

const Registration = (props) => {

  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  });

  const {loading, registrationErrors, user} = useSelector((state)=> state.AuthReducers);

  const dispatch = useDispatch();

  const handleInputs = (e) => {
    setState({
        ...state,
        [e.target.name]: e.target.value
    });
  };

  const userRegistration = (e) =>{
    e.preventDefault();
    // code is in asyncMethod folder AuthMethod file
    dispatch(postRegister(state));    
  };

  useEffect(()=>{
    if (registrationErrors.length > 0) {
        registrationErrors.map((error) => toast.error(error.msg));
    }
  }, [registrationErrors, user]);

  return (
    <div className="registration-form">
      <h1 className="text-center">Registration Form</h1>
      <Form onSubmit={userRegistration}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" name="name" value={state.name} onChange= {handleInputs}/>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" value={state.email} onChange= {handleInputs}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" value={state.password} onChange= {handleInputs}/>
        </Form.Group>

        <Button variant="primary" type="submit" block>{loading ? '...' : 'Register'}</Button>
        <Toaster position="top-center" reverseOrder={false} />
      </Form>
    </div>
  );
};

export default Registration;
