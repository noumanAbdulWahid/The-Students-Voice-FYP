import axios from 'axios';
import { queryClient } from '../../reactQuery';
import { SET_LOADER, 
         CLOSE_LOADER, 
         CREATE_ERRORS, 
         REMOVE_ERRORS, 
         REDIRECT_TRUE, 
         REDIRECT_FALSE, 
         SET_MESSAGE, 
         REMOVE_MESSAGE, 
         SET_POSTS, 
         SET_EDIT_POSTS, 
         EDIT_POSTS_REQUEST,
         SET_UPDATE_ERRORS,
         RESET_UPDATE_ERRORS,
         SET_COMMENTS,
         SET_COMMENTS_ERRORS,
         RESET_COMMENTS_ERRORS,
         RESET_COMMENTS
        } from "../types/postTypes";



export const createAction = (postData) => {
    return async (dispatch, getState) => {

        const {AuthReducers: {token}} = getState();

        dispatch({type: SET_LOADER});
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }
            const {data: {msg}} = await axios.post('/create-posts', postData, config);
            dispatch({type: CLOSE_LOADER});
            dispatch({type: REMOVE_ERRORS});
            queryClient.invalidateQueries('postList');
            queryClient.invalidateQueries('allPost');
            dispatch({type: REDIRECT_TRUE});
            dispatch({type: SET_MESSAGE, payLoad: msg});
        } catch (error) {
            const {errors} = error.response.data;
            dispatch({type: CLOSE_LOADER});
            dispatch({type: CREATE_ERRORS, payLoad: errors});
        }
    };
};

export const fetchPost = (id) => {
    return async (dispatch, getState) => {

        const {AuthReducers: {token}} = getState();

        dispatch({type: SET_LOADER});

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }
            const {data:{response}} = await axios.post(`/post/${id}`, id, config);
            dispatch({type: CLOSE_LOADER});
            dispatch({type: SET_POSTS, payLoad: response});
        } catch (error) {
            dispatch({type: CLOSE_LOADER});
        }

    };
};

export const editPost = (id) => {
    return async (dispatch, getState) => {

        const {AuthReducers: {token}} = getState();

        dispatch({type: SET_LOADER});

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }
            const {data:{post}} = await axios.post(`/edit-posts/${id}`, id, config);
            dispatch({type: CLOSE_LOADER});
            dispatch({type: SET_EDIT_POSTS, payLoad: post});
            dispatch({type: EDIT_POSTS_REQUEST});
        } catch (error) {
            dispatch({type: CLOSE_LOADER});
            console.log(error.msg);
        }

    };
};

export const updateAction = (editData) => {
    return async (dispatch, getState) => {

        const {AuthReducers: {token}} = getState();

        dispatch({type: SET_LOADER});

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }
            const {data} = await axios.post('/update-post', editData, config);
            dispatch({type: CLOSE_LOADER});
            queryClient.invalidateQueries('postList');
            queryClient.invalidateQueries('allPost');
            dispatch({type: RESET_UPDATE_ERRORS});
            dispatch({type: REDIRECT_TRUE});
            dispatch({type: SET_MESSAGE, payLoad: data.msg});
        } catch (error) {
            dispatch({type: CLOSE_LOADER});
            dispatch({type: SET_UPDATE_ERRORS, payLoad: error.response.data.errors});
            console.log(error.response);
        }

    };
};

export const postComments = (editData, id) => {
    return async (dispatch, getState) => {
        const {AuthReducers: {token}} = getState();

        dispatch({type: SET_LOADER});

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }
            const {data} = await axios.post(`/comment-post/${id}`, editData, config);
            dispatch({type: CLOSE_LOADER});
            console.log('drc',data.response.comments);
            dispatch({type: RESET_COMMENTS});
            dispatch({type: RESET_COMMENTS_ERRORS});
            dispatch({type: SET_COMMENTS, payLoad: data.response.comments});
        } catch (error) {
            dispatch({type: CLOSE_LOADER});
            dispatch({type: SET_COMMENTS_ERRORS, payLoad: error.response.data.error});
            console.log(error.response);
        }

    };
};