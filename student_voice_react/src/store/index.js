import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import AuthReducers from './Reducers/AuthReducers';
import { PostReducers, FetchPosts, FetchEditPost, UpdatePost, PostComments} from './Reducers/PostReducers';

const rootReducers = combineReducers({
    AuthReducers,
    PostReducers,
    FetchPosts,
    FetchEditPost,
    UpdatePost,
    PostComments
});

const middlewares = [thunkMiddleware];

const Store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middlewares)));
export default Store;