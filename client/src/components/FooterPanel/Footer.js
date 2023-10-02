import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="footer">
          <Link to="/about" className="footer-items">About</Link>
          <Link to="/mission" className="footer-items">Mission</Link>
          <Link to="/help" className="footer-items">Help</Link>
    </div>
  );
}