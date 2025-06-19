import React, { useState } from 'react';
import { validateEmail } from '../utils/helper';
import Navbar from '../components/Navbar';
import PasswordInput from '../components/passwordInput';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) return setError('Please enter your name');
    if (!validateEmail(email)) return setError('Please enter a valid email address');
    if (!password) return setError('Please enter a password');

    setError('');

    try {
      const response = await axiosInstance.post('/create-account', {
        fullName: name,
        email,
        password,
      });

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
          <form onSubmit={handleSignUp}>
            <h4 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Account 🎉</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <button type="submit" className="btn-primary">
              Create Account
            </button>

            <p className="text-sm text-center mt-4 text-gray-500">
              Already have an account?{' '}
              <Link
                to="/"
                className="font-medium underline text-[var(--color-primary)] hover:text-[var(--color-primary-light)]"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
