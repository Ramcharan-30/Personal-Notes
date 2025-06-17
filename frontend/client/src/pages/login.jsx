import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../components/passwordInput';
import { validateEmail } from '../utils/helper';
import axiosInstance from '../utils/axiosInstance';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Please enter the password.');
      return;
    }

    setError('');

    try {
      const response = await axiosInstance.post('/login', { email, password });

      if (response.data?.error) {
        setError(response.data.message);
        return;
      }

      if (response.data?.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-[400px] bg-white px-10 py-12 border border-gray-200 rounded-2xl shadow-lg">
          <form onSubmit={handleLogin}>
            <h4 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome Back 👋</h4>

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-sm text-center mt-4 text-gray-500">
              Not registered yet?{' '}
              <Link
                to="/signup"
                className="font-medium underline text-[var(--color-primary)] hover:text-[var(--color-primary-light)]"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
