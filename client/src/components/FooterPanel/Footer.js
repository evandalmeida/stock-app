import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="footer">
      <ul className="footer-list">
        <li className="footer-list-item">
          <Link to="/about" className="footer-items">
            About
          </Link>
        </li>
        <li className="footer-list-item">
          <Link to="/mission" className="footer-items">
            Mission
          </Link>
        </li>
        <li className="footer-list-item">
          <Link to="/help" className="footer-items">
            Help
          </Link>
        </li>
      </ul>
    </div>
  );
}
