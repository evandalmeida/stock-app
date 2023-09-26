import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import Header from './components/Header';
import Signup from './components/SignUp';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import WatchList from './components/WatchList';
import MarketWatch from './components/MarketWatch';
import StocksList from './components/StocksList';

function Home() {
  return (
    <>
      <MarketWatch />
      <StocksList/>
    </>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/watchlist" element={<WatchList />} />
      </Routes>
    </Router>
  );
}

export default App;
