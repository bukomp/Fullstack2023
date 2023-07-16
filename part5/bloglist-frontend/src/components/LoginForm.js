import React, { useState } from 'react';
import Notification from './Notification';

const LoginForm = ({ handleLogin, notification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div>
      <h2>Log in to application</h2>

      <Notification notification={notification}></Notification>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            id="usernameInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            id="passwordInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
