import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../globspin.gif'; 

export default function NavBar({ currentUser, logout }) {
  return (
    <div className="bar">
      <div><img src={logoImage} alt="Logo" className="mainframe" /></div>
      <div className="user-section">
        <p className="dashheading">Welcome, {currentUser.username.toUpperCase()}</p>
        {currentUser ? (<button className="logout-button" onClick={logout}>Logout</button>) : (<p><Link to="/">Home</Link></p>)}
      </div>
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/dashboard" className="navbar-link nav-button">Dashboard</Link>
          </li>
          <li className="navbar-item">
            <Link to="/stocks" className="navbar-link nav-button">Search</Link>
          </li>
          <li className="navbar-item">
            <Link to="/market-watch" className="navbar-link nav-button">Market Watch</Link>
          </li>
          <li className="navbar-item">
            <Link to="/watchlists" className="navbar-link nav-button">Watch List</Link>
          </li>
          <li className="navbar-item">
            <Link to="/chat" className="navbar-link nav-button">Chat</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
