import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import WatchList from './components/WatchList';
import MarketWatch from './components/MarketWatch';
import StocksList from './components/StocksList';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './components/AuthContextProvider';

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
    <AuthProvider>
      <Router>
        <Navbar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <UserDashboard/>
            </ProtectedRoute>
          } />
          <Route path="/watchlist" element={<WatchList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
