import React, { useState, useEffect } from 'react';
import UserPanel from './components/UserPanel/user_index';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserDashboard from './components/UserPanel/UserDashboard';
import UDashStocksGraphs from './components/UserPanel/UDashStocksGraphs';
import UDashMarketWatch from './components/UserPanel/UDashMarketWatch';
import UDashWatchListandCaht from './components/UserPanel/UDashWatchListandChat';
import Home from './components/Home';
import Login from './components/UserPanel/Login'; // Import the Login component


const POST_HEADERS = {
  'Content-Type': 'application/json',
  'Accepts': 'application/json'
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function checkSession() {
      const response = await fetch('/check_session');

      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data);
      }
    }
    checkSession();
  }, []);

  async function attemptSignup(userInfo) {
    const res = await fetch('/users', {
      method: 'POST',
      headers: POST_HEADERS,
      body: JSON.stringify(userInfo)
    });
    if (res.ok) {
      const data = await res.json();
      setCurrentUser(data);
    } else {
      const errorData = await res.json();
      alert(errorData.error || 'Invalid sign up');
    }
  }

  async function attemptLogin(userInfo) {
    const res = await fetch('login', {
      method: 'POST',
      headers: POST_HEADERS,
      body: JSON.stringify(userInfo)
    });
    if (res.ok) {
      const data = await res.json();
      setCurrentUser(data);
      return true; // Return true for successful login
    } else {
      alert('Invalid login');
      return false; // Return false for unsuccessful login
    }
  }

  function logout() {
    setCurrentUser(null);
    fetch('/logout', {
      method: 'DELETE'
    });
  }

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={currentUser ? <UserDashboard currentUser={currentUser} logout={logout} /> : <Navigate to="/" />} />
        <Route path="/stocks" element={<UDashStocksGraphs currentUser={currentUser} logout={logout} />} />
        <Route path="/market-watch" element={<UDashMarketWatch currentUser={currentUser} logout={logout} />} />
        <Route path="/chat" element={<UDashWatchListandCaht currentUser={currentUser} logout={logout} />} />
        <Route path="/signup" element={<UserPanel currentUser={currentUser} attemptLogin={attemptLogin} attemptSignup={attemptSignup} logout={logout} />} />
        <Route path="/login" element={currentUser ? <Navigate to="/dashboard" /> : <Login attemptLogin={attemptLogin} />} />
        <Route
          path="/"
          element={currentUser ? <Navigate to="/dashboard" /> : <Home attemptLogin={attemptLogin} attemptSignup={attemptSignup} />}
        />
      </Routes>
    </Router>
  );
}