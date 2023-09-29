import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ currentUser, logout }) {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/dashboard">Dashboard</Link></li>
        <li className="navbar-item"><Link to="/stocks">Stocks</Link></li>
        <li className="navbar-item"><Link to="/market-watch">Market Watch</Link></li>
        <li className="navbar-item"><Link to="/chat">Watch List and Chat</Link></li>
        {currentUser ? (
          <div className="user-section">
            <li className="navbar-item">Welcome, {currentUser.username}</li>
            <li className="navbar-item">
              <button className="logout-button" onClick={logout}>Logout</button>
            </li>
          </div>
        ) : (
          <div className="auth-section">
            <li className="navbar-item"><Link to="/signup">Signup</Link></li>
            <li className="navbar-item"><Link to="/login">Login</Link></li>
          </div>
        )}
      </ul>
    </nav>
  );
}
