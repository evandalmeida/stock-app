import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-container">
      <Link to="/dashboard" className="navbar-link nav-button">HOME</Link>
      <h2 className="about-title">About</h2>
      <p>
        Welcome to MarketWatch, your trusted platform for tracking stock market data and making informed investment decisions. Our app is designed to empower investors and traders with real-time information and powerful tools.
      </p>
      <h3>Our Story</h3>
      <p>
        MarketWatch was founded by a group of passionate investors who saw the need for a user-friendly and comprehensive tool for stock market analysis. We understand the challenges that investors face in navigating the financial markets, and we are dedicated to simplifying the process.
      </p>
      <h3>Our Vision</h3>
      <p>
        Our vision is to democratize finance by providing accessible and reliable financial data and insights to investors of all levels. We strive to be your go-to platform for market research, analysis, and portfolio management.
      </p>
      <h3>What We Offer</h3>
      <p>
        MarketWatch offers a range of features and services, including:
      </p>
      <ul>
        <li>Real-time stock market data and news updates.</li>
        <li>Customizable watchlists to track your favorite stocks.</li>
        <li>Detailed market analysis and charts for informed decision-making.</li>
        <li>Interactive chatrooms for connecting with fellow investors and experts.</li>
      </ul>
      <h3>Contact Us</h3>
      <p>
        If you have any questions, feedback, or suggestions, please feel free to contact us at support@marketwatchapp.com. We value your input and are here to assist you on your investment journey.
      </p>
    </div>
  );
}
