import axios from 'axios';
import { queryClient } from '../../reactQuery';
import { SET_LOADER, CLOSE_LOADER, REGISTER_ERRORS, SET_TOKEN , LOGIN_ERRORS} from "../types/userTypes";

export const updateImage = (imageData) => {
    return async (dispatch, getState) => {

        const {AuthReducers: {token}} = getState();
        dispatch({type: SET_LOADER});
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }
            const {data} = await axios.post('/update-profile-image', imageData, config);
            dispatch({type: CLOSE_LOADER});
            localStorage.setItem('myToken', data.token)
            queryClient.invalidateQueries('Users');
            dispatch({type: SET_TOKEN, payLoad: data.token});
            
        } catch (error) {
            dispatch({type: CLOSE_LOADER});
            console.log(error.responce);

        }
    };
};