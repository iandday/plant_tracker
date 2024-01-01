import React, { useState } from 'react';
import { UserApi } from '../services/index';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const api = new UserApi();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.loginUserLoginPost(credentials.email, credentials.password);
      const { access_token, refresh_token } = response.data;

      // Store the tokens in localStorage or secure cookie for later use
      localStorage.setItem('token', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      navigate(`/`);
    } catch (error) {
      // Handle login error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" value={credentials.email} onChange={handleChange} />
      <input type="password" name="password" value={credentials.password} onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
