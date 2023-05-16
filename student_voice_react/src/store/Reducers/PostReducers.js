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
         EDIT_POSTS_RESET,
         SET_UPDATE_ERRORS,
         RESET_UPDATE_ERRORS,
         SET_COMMENTS,
         SET_COMMENTS_ERRORS,
         RESET_COMMENTS_ERRORS,
         RESET_COMMENTS
        } from "../types/postTypes";

const initState = {
    loading: false,
    createErrors: [],
    redirect: false,
    message: '',
    posts: [],
    post: {},
    postStatus: false,
    updateErrors: [],
    postsComments: [],
    commentErrors: ''
};

export const PostReducers = (state = initState, action) =>{
    if (action.type === SET_LOADER) {
        return {...state, loading: true};
    }
    else if (action.type === CLOSE_LOADER) {
        return {...state, loading: false};
    }
    else if (action.type === CREATE_ERRORS) {
        return {...state, createErrors: action.payLoad};
    }
    else if (action.type === REMOVE_ERRORS) {
        return {...state, createErrors: []};
    }
    else if (action.type === REDIRECT_TRUE) {
        return {...state, redirect: true};
    }
    else if (action.type === REDIRECT_FALSE) {
        return {...state, redirect: false};
    }
    else if (action.type === SET_MESSAGE) {
        return {...state, message: action.payLoad};
    }
    else if (action.type === REMOVE_MESSAGE) {
        return {...state, message: ''};
    }
    else{
        return state;
    }
};

export const FetchPosts = (state = initState, action) =>{
    if (action.type === SET_POSTS) {
        return {...state, posts: action.payLoad};
    }else{
        return state;
    }
};

export const FetchEditPost = (state = initState, action) =>{
    if (action.type === SET_EDIT_POSTS) {
        return {...state, post: action.payLoad};
    }
    else if (action.type === EDIT_POSTS_REQUEST) {
        return {...state, postStatus: true};
    }
    else if (action.type === EDIT_POSTS_RESET) {
        return {...state, postStatus: false};
    }
    else{
        return state;
    }
};

export const UpdatePost = (state = initState, action) =>{
    if (action.type === SET_UPDATE_ERRORS) {
        return {...state, updateErrors: action.payLoad};
    }
    else if (action.type === RESET_UPDATE_ERRORS) {
        return {...state, updateErrors: []};
    }
    else{
        return state;
    }
}

export const PostComments = (state = initState, action) =>{
    if (action.type === SET_COMMENTS_ERRORS) {
        return {...state, commentErrors: action.payLoad};
    }
    else if (action.type === RESET_COMMENTS_ERRORS) {
        return {...state, commentErrors: ''};
    }
    else if (action.type === SET_COMMENTS) {
        return {...state, postsComments: action.payLoad};
    }
    else if (action.type === RESET_COMMENTS) {
        return {...state, postsComments: []};
    }
    else{
        return state;
    }
};
