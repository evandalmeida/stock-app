import React, { useState } from 'react';

export default function Signup({ attemptSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    attemptSignup({ username, password });
  }

  function toggleForm() {
    setShowForm((prevShowForm) => !prevShowForm);
  }

  return (
    <div className="register-form"> {/* Corrected class name */}
      {showForm ? (
        <form className="register-form" onSubmit={handleSubmit}> {/* Corrected class name */}
          <h2 className="box-title"> REGISTER </h2>

          <input
            type="text"
            onChange={handleChangeUsername}
            value={username}
            placeholder="username"
          />

          <input
            type="password"
            onChange={handleChangePassword}
            value={password}
            placeholder="password"
          />

          <input type="submit" className="form-button" value="Register Account" />
        </form>
      ) : (
        <button onClick={toggleForm} className="form-button">REGISTER</button>
      )}
    </div>

  );
}
