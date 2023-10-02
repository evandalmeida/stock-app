import React from 'react';
import { Link } from 'react-router-dom';

export default function Help() {
  return (
    <div className="help-container">
      <Link to="/dashboard" className="navbar-link nav-button">HOME</Link>
      <h2 className="help-title">Need Help?</h2>
      <p>
        We're here to assist you with any questions or issues you may encounter while using MarketWatch. Here are some ways we can help:
      </p>
      <h3>Contact Support</h3>
      <p>
        If you can't find the answers you're looking for, please don't hesitate to reach out to our support team at support@marketwatchapp.com. We aim to respond to your inquiries promptly.
      </p>
      <h3>Feedback and Suggestions</h3>
      <p>
        We value your feedback and suggestions. If you have ideas for improving our app or encounter any issues, please let us know. Your input helps us make MarketWatch better for all users.
      </p>
      <h3>Privacy and Security</h3>
      <p>
        Your privacy and security are important to us. To learn more about how we handle your data and ensure a secure experience, please review our <a href="/privacy">Privacy Policy</a> and <a href="/security">Security Measures</a>.
      </p>
    </div>
  );
}
