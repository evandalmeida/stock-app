import React from 'react';
import { Link } from 'react-router-dom';

export default function Mission() {
  return (
    <div className="mission-container">
      <Link to="/dashboard" className="navbar-link nav-button">HOME</Link>
      <h2 className="mission-title">Our Mission</h2>
      <p>
        At MarketWatch, our mission is to empower individuals with the knowledge and tools they need to make informed financial decisions. We are committed to:
      </p>
      <ul>
        <li>Providing accurate and real-time financial data to help you stay updated.</li>
        <li>Offering comprehensive market analysis and insights to guide your investment strategies.</li>
        <li>Fostering a supportive community of investors and experts to share knowledge and ideas.</li>
        <li>Helping you achieve your financial goals through education and resources.</li>
      </ul>
      <p>
        We believe that financial literacy is the key to financial success, and we are dedicated to supporting you on your journey toward financial independence.
      </p>
    </div>
  );
}
