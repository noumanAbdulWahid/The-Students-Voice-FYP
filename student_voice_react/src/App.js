import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Provider } from "react-redux";
import './style.scss';
import HomeMain from './components/HomePage/HomeMain';
import LoginMain from './components/LoginPage/LoginMain';
import Navbar from './components/OtherComponent/Navbar';
import NewsEventsMain from "./components/NewsEvents/NewsEvents";
import NotificationMain from "./components/Notification/NotificationMain";
import Store from "./store";
import RegistrationMain from "./components/RegistrationPage/RegistrationMain";
import PrivateRoutes from "./private/privateRoute";
import ProfileMain from "./components/ProfilePage/ProfileMain";
import RouteLinks from "./private/RouteLinks";
import NotFound from "./components/OtherComponent/NotFound";
import ForgotPassword from "./components/LoginPage/ForgotPassword";
import ResetPassword from "./components/LoginPage/ResetPassword";
import CreatePost from "./components/Post/CreatePost";
import EditPost from "./components/Post/EditPost";
import ChangePassword from "./components/LoginPage/changePassword";
import SearchUserProfileMain from "./components/ProfilePage/SearchUserProfileMain";

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={HomeMain}/>
          <RouteLinks path='/login' exact component={LoginMain}/>
          <RouteLinks path={'/registration'} exact component={RegistrationMain}/>
          <PrivateRoutes path='/notifications' exact component={NotificationMain}/>
          <Route path='/newsEvents' exact component={NewsEventsMain}/>
          <PrivateRoutes path='/profile' exact component={ProfileMain}/>
          <Route path='/profile/:id' exact component={SearchUserProfileMain}/>
          <Route path={'/forgot-password'} exact component={ForgotPassword} />
          <Route path={'/reset-password/:email'} exact component={ResetPassword}/>
          <PrivateRoutes path={'/create-post'} exact component={CreatePost} />
          <PrivateRoutes path= {'/edit-post/:postId'} exact component={EditPost} />
          <PrivateRoutes path={'/change-password/:email'} exact component={ChangePassword}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
