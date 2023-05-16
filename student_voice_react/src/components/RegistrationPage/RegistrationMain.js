import React from 'react';
import Registration from './Registration';
import { Helmet } from 'react-helmet';

function RegistrationMain() {
  return (
    <>
      <Helmet>
        <title>Registration - SV</title>
        <meta name='description' content='Register to Student Voice ' />
      </Helmet>
      <div className="">
        <Registration />
      </div>
    </>
  );
}

export default RegistrationMain;