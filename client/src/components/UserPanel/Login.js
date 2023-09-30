import React, { useState } from 'react';

export default function Login({ attemptLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    attemptLogin({ username, password });
  }

  function toggleForm() {
    setShowForm((prevShowForm) => !prevShowForm);
  }

  return (
    <div className="signin-form" >
      {showForm ? (
        <form className="signin-form" onSubmit={handleSubmit}>
          <h2 className="box-title"> LOGIN </h2>

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

          <input type="submit" className="form-button" value="Click to Get Rich" />
        </form>
      ) : (
        <button onClick={toggleForm} className="form-button">SIGN IN</button>
      )}
    </div>
  );
}

