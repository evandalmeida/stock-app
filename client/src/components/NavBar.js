import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ currentUser, logout }) {
  return (
    <nav>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/stocks">Stocks</Link></li>
        <li><Link to="/market-watch">Market Watch</Link></li>
        {currentUser ? (
          <>
            <li><Link to="/dashboard">Welcome, {currentUser.username}</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
