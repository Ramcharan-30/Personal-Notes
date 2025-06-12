import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import PasswordInput from '../components/passwordInput';
import { validateEmail } from '../utils/helper';

const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState(null)

  const handleLogin = async(e) =>{

    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please Enter Valid Email Address");
      return;
    }

    if(!password){
      setError("Please Enter The Password.")
      return;
    }

    setError("")

    //login Api call
  }

  return <>
  <Navbar />
  <div className="flex items-center justify-center mt-28">

    <div className="w-96 border rounded bg-white px-7 py-18">

      <form onSubmit={handleLogin}>

        <h4 className='text-2xl mb-7'>Login</h4>

        <input 
        type="text" 
        placeholder='Email' 
        className='input-box ' 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput 
         value={password}
         onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

        <button type="submit" className="btn-primary outine-black">
          Login
        </button>
        
        <p className="text-sm text-center mt-4">
          Not Registered Yet? {" "}
          <Link to="/signup" className="font-medium underline text-[var(--color-primary)] hover:text-[var(--color-primary-light)] ">
           Create an account
          </Link>
        </p>
      </form>
    </div>
  </div>
  </> 
}

export default Login;