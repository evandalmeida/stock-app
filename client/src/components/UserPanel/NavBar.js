import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ currentUser, logout }) {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        </li>
        <li className="navbar-item">
          <Link to="/stocks" className="navbar-link">Stocks</Link>
        </li>
        <li className="navbar-item">
          <Link to="/market-watch" className="navbar-link">Market Watch</Link>
        </li>
        <li className="navbar-item">
          <Link to="/chat" className="navbar-link">Watch List and Chat</Link>
        </li>
        {currentUser ? (
          <div className="user-section">
            <li className="navbar-item">Welcome, {currentUser.username}</li>
            <li className="navbar-item">
              <button className="logout-button" onClick={logout}>Logout</button>
            </li>
          </div>
        ) : (
          <div className="auth-section">
            <li className="navbar-item">
              <Link to="/signup" className="navbar-link">Signup</Link>
            </li>
            <li className="navbar-item">
              <Link to="/login" className="navbar-link">Login</Link>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
}
