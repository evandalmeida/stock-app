import React from 'react';
import Signup from './UserPanel/Signup';
import Login from './UserPanel/Login';

function Home({ attemptLogin, attemptSignup }) {
  return (
    <div className="flex-row">
      <Signup attemptSignup={attemptSignup} />
      <Login attemptLogin={attemptLogin} />
    </div>
  );
}

export default Home;
