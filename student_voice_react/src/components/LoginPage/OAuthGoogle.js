import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { postGoogle } from "../../store/AsyncMethod/AuthMethod";
import {GoogleLogin} from 'react-google-login';
import {gapi} from 'gapi-script';

const OAuthGoogle = () => {
    const dispatch = useDispatch();

      const onFailure = (res) => {
        console.log("Unsuccessfully Login res: ", res);
      };

      const onSuccess = (res) => {
        dispatch(postGoogle(res.profileObj));        
      };
      useEffect(()=>{
        function start(){
          gapi.client.init({
            clientId: "6310417042-4593p3kiec47en7houkfcpsu0e5np0cu.apps.googleusercontent.com",
            scope: ''
          })
        }
        gapi.load('client:auth2', start);
      });

      return (
        <div className="g-btn">
        <GoogleLogin
            className="google-btn flex flex-wrap justify-content-center border-noround p-0 h-3rem w-12"
            clientId="6310417042-4593p3kiec47en7houkfcpsu0e5np0cu.apps.googleusercontent.com"
            onSuccess={onSuccess}
            onFailure={onFailure}
            tag = "div"
            type="submit"
            icon= {false}
        >
            <span className="google-login-text">   Login with Google</span>
        </GoogleLogin>
        </div>
      );
};

export default OAuthGoogle;