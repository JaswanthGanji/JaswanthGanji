import React, { useState } from 'react';
import './Login.css';
import loginIcon from "../assest/signin.gif";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", data);

    if (!data.email || !data.password) {
      toast.error("Email and password are required");
      return;
    }

    await loginUser(data);
  };

  // API call to handle login
  const loginUser = async (loginData) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      console.log("Server Response Status:", response.status);

      const result = await response.json();
      console.log("Login Response:", result);

      if (response.ok) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        toast.success("Login successful!");
        navigate('/');
      } else {
        toast.error(result.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      toast.error("An error occurred during login.");
    }
  };

  return (
    <section className='p-2'>
      <div className="container d-flex flex-row justify-content-center">
        <div className="login-container">
          <div className='login-image'>
            <img src={loginIcon} alt='Login Avatar' />
          </div>
          <div className='m-3 pt-2'>
            <form onSubmit={submitHandler}>
              <label htmlFor='email'>Email</label>
              <input
                className='form-control'
                type='email'
                name='email'
                onChange={changeHandler}
                value={data.email}
                required
              />

              <label htmlFor='password'>Password</label>
              <input
                className='form-control'
                type='password'
                name='password'
                onChange={changeHandler}
                value={data.password}
                required
              />

              <div className='text-end'>
                <Link to="/forgot" className='login-forgot'>Forgot Password?</Link>
              </div>

              <div className='text-center p-3'>
                <button className="login-btn" type="submit">Login</button>
              </div>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
