import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - SV</title>
        <meta name='description' content='Page not Found ' />
      </Helmet>
        <div className="not-found">
            <h1 className='error'>404</h1>
            <h2 className='error_msg'>Oops! Page Not Found</h2>
            <p className='error_detail'>The page you requested could not be found.</p>
            <Link to="/" className='home-link'>Go back to the homepage</Link>
        </div>
    </>
  );
};

export default NotFound;
