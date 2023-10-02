import React, { useState, useEffect } from 'react';
import UserPanel from './components/UserPanel/user_index';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserDashboard from './components/UserPanel/UserDashboard';
import UDashSearch from './components/UserPanel/UDashSearch';
import UDashMarketWatch from './components/UserPanel/UDashMarketWatch';
import UDashWatchList from './components/UserPanel/UDashWatchList';
import UDashChat from './components/UserPanel/UDashChat';
import Home from './components/Home';
import Login from './components/UserPanel/Login';
import About from './components/FooterPanel/About';
import Help from './components/FooterPanel/Help';
import Mission from './components/FooterPanel/Mission';

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
      return true;
    } else {
      alert('Invalid login');
      return false;
    }
  }

  function logout() {
    setCurrentUser(null);
    fetch('/', {
      method: 'DELETE'
    });
  }

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={currentUser ? <UserDashboard currentUser={currentUser} logout={logout} /> : <Navigate to="/" />} />
        <Route path="/stocks" element={<UDashSearch currentUser={currentUser} logout={logout} />} />
        <Route path="/market-watch" element={<UDashMarketWatch currentUser={currentUser} logout={logout} />} />
        <Route path="/watchlists" element={<UDashWatchList currentUser={currentUser} logout={logout} />} />
        <Route path="/chat" element={<UDashChat currentUser={currentUser} logout={logout} />} />
        <Route path="/signup" element={<UserPanel currentUser={currentUser} attemptLogin={attemptLogin} attemptSignup={attemptSignup} logout={logout} />} />
        <Route path="/login" element={currentUser ? <Navigate to="/dashboard" /> : <Login attemptLogin={attemptLogin} />} />
        <Route
          path="/"
          element={currentUser ? <Navigate to="/dashboard" /> : <Home attemptLogin={attemptLogin} attemptSignup={attemptSignup} />}
        />
        <Route path="/about" element={<About/>}/>
        <Route path="/mission" element={<Mission/>}/>
        <Route path="/help" element={<Help/>}/>
      </Routes>
    </Router>
  );
}