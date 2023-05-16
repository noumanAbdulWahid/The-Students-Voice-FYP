import jwt_decode from "jwt-decode";
import { SET_LOADER, CLOSE_LOADER, REGISTER_ERRORS, SET_TOKEN, LOGOUT, LOGIN_ERRORS } from "../types/userTypes";

const initState = {
    loading: false,
    registrationErrors: [],
    loginErrors: [],
    token: '',
    user: ''
};

const verifyToken = (token)=> {
    const decodeToken = jwt_decode(token); 
    const expireIn = new Date(decodeToken.exp *1000);
    if (new Date() > expireIn) {
        localStorage.removeItem('myToken');
        return null;
    }
    else{
        return decodeToken;
    }
}; 

const token = localStorage.getItem('myToken');
if (token) {
    const decoded = verifyToken(token);
    initState.token = token;
    const {user} = decoded;
    initState.user = user;
};

const AuthReducers = (state = initState, action)=>{
    if (action.type === SET_LOADER) {
        return {...state, loading: true};
    }
    else if (action.type === CLOSE_LOADER) {
        return {...state, loading: false};
    }
    else if (action.type === REGISTER_ERRORS) {
        return {...state, registrationErrors: action.payLoad};
    }
    else if (action.type === SET_TOKEN) {
        const decoded = verifyToken(action.payLoad);
        const {user} = decoded;
        return {...state, token: action.payLoad, user: user, loginErrors: [], registrationErrors: []};
    }
    else if (action.type === LOGOUT) {
        return {...state, token: '', user: ''};
    }
    else if (action.type === LOGIN_ERRORS) {
        return {...state, loginErrors : action.payLoad};
    }
    else{
        return state;
    }
};

export default AuthReducers;