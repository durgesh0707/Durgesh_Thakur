import React, { useContext, useState } from 'react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { authDataContext } from '../Context/AuthContext';
import { userDataContext } from '../Context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {
  const [show, setShow] = useState(false);
  const { serverUrl, loading, setLoading } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Step 1: Send login request
      await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      // ✅ Step 2: Get full user data
      const currentUser = await getCurrentUser();

     if (!currentUser) {
     toast.error("Could not fetch user info");
     return;
}


      toast.success("Login Successfully");

      // ✅ Step 3: Redirect based on role
      if (currentUser.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center relative'>
      <div
        className='w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[20px] rounded-full flex items-center justify-center'
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong className='w-[25px] h-[25px] text-white' />
      </div>

      <form
        className='max-w-[900px] w-[90%] h-[600px] flex items-center justify-center flex-col md:items-start gap-[10px]'
        onSubmit={handleLogin}
      >
        <h1 className='text-[30px] text-black'>Welcome to Airbnb</h1>

        <div className='w-[90%] flex flex-col gap-[10px]'>
          <label htmlFor="email" className='text-[20px]'>Email</label>
          <input
            type="text"
            id='email'
            className='w-[90%] h-[40px] border-2 border-gray-600 rounded-lg text-[18px] px-[20px]'
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className='w-[90%] flex flex-col gap-[10px] relative'>
          <label htmlFor="password" className='text-[20px]'>Password</label>
          <input
            type={show ? "text" : "password"}
            id='password'
            className='w-[90%] h-[40px] border-2 border-gray-600 rounded-lg text-[18px] px-[20px]'
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {show ? (
            <IoMdEyeOff
              className='w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer'
              onClick={() => setShow(false)}
            />
          ) : (
            <IoMdEye
              className='w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer'
              onClick={() => setShow(true)}
            />
          )}
        </div>

        <button
          type="submit"
          className='px-[50px] py-[10px] bg-red-600 text-white text-[18px] md:px-[100px] rounded-lg mt-[20px]'
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <p className='text-[18px] mt-[10px]'>
          Create new account{' '}
          <span
            className='text-[19px] text-red-600 cursor-pointer'
            onClick={() => navigate("/SignUP")}
          >
            SignUp
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
