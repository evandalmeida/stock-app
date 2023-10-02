import React from 'react';
import Signup from './UserPanel/Signup';
import Login from './UserPanel/Login';
import Footer from './FooterPanel/Footer'


import logoImage from '../globspin.gif'; 

export default function Home({ attemptLogin, attemptSignup }) {
  return (
    <>
    <div className="custom-home">
      <img src={logoImage} alt="Logo" className="mainframe" />
      <Signup attemptSignup={attemptSignup} />
      <Login attemptLogin={attemptLogin} />
    </div>
    <footer>
      <Footer/>
    </footer>
    </>
  );
}
