import axios from 'axios';
import { SET_LOADER, CLOSE_LOADER, REGISTER_ERRORS, SET_TOKEN , LOGIN_ERRORS} from "../types/userTypes";

export const postRegister = (state) =>{
    return (dispatch) =>{
        dispatch({type: SET_LOADER});
        axios.post("/register", state)
        .then((response) => {
            dispatch({type: CLOSE_LOADER});
            localStorage.setItem('myToken', response.data.token)
            dispatch({type: SET_TOKEN, payLoad: response.data.token});
        }).catch((error) => {
            dispatch({type: CLOSE_LOADER});
            dispatch({type: REGISTER_ERRORS, payLoad: error.response.data.errors})
            console.log(error.response);
        });
    }
};

export const postLogin = (state) =>{
    return (dispatch) =>{
        dispatch({type: SET_LOADER});
        axios.post("/login-user", state)
        .then((response) => {
            dispatch({type: CLOSE_LOADER});
            localStorage.setItem('myToken', response.data.token)
            dispatch({type: SET_TOKEN, payLoad: response.data.token});
        }).catch((error) => {
            dispatch({type: CLOSE_LOADER});
            dispatch({type: LOGIN_ERRORS, payLoad: error.response.data.errors})
            console.log(error.response);
        });
    }
};

export const postGoogle = (state) =>{
    return (dispatch) =>{
        dispatch({type: SET_LOADER});
        axios.post("/google", state)
        .then((response) => {
            dispatch({type: CLOSE_LOADER});
            localStorage.setItem('myToken', response.data.token)
            dispatch({type: SET_TOKEN, payLoad: response.data.token});
        }).catch((error) => {
            dispatch({type: CLOSE_LOADER});
            dispatch({type: LOGIN_ERRORS, payLoad: error.response.data.errors})
            console.log(error.response);
        });
    }
};