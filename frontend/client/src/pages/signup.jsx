import React,{useState} from 'react'
import { validateEmail } from '../utils/helper'
import Navbar from '../components/Navbar';
import PasswordInput from '../components/passwordInput';
import { Link } from 'react-router-dom';


const Signup = () => {
 const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")
 const [name,setName]=useState("")
 const [error,setError]=useState(null)

 const handleSignUp = async(e)=>{
  e.preventDefault();
  if(!name){
    setError("Please Enter Your Name");
    return;
  }

  if(!validateEmail(email)){
    setError("Please enter a valid email address");
    return;
  }

  if(!password){
    setError("Please Enter The Password!");
    return;
  }
  setError("")

  //signup api call
 }

  return <>
    <Navbar />
  <div className="flex items-center justify-center mt-28">

    <div className="w-96 border rounded bg-white px-7 py-18">

      <form onSubmit={handleSignUp}>

        <h4 className='text-2xl mb-7'>Sign Up</h4>

        <input 
        type="text" 
        placeholder='Name' 
        className='input-box ' 
        value={name}
        onChange={(e) => setName(e.target.value)}
        />

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
          Create Account
        </button>
        
        <p className="text-sm text-center mt-4">
          Already Have an Accont? {" "}
          <Link to="/login" className="font-medium underline text-[var(--color-primary)] hover:text-[var(--color-primary-light)] ">
           Login
          </Link>
        </p>
      </form>
    
    </div>
  
  </div>
  </>
}

export default Signup;