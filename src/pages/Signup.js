import React, { useState } from 'react';
import './Login.css';
import loginIcon from "../assest/signin.gif";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  // State to handle user input data
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  // State to handle profile picture and file
  const [profilePicture, setProfilePicture] = useState(loginIcon);
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file

  const navigate = useNavigate(); // For navigation

  // Handle input change for text fields
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle file change for profile picture
  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file)); // Display selected file as preview
      setSelectedFile(file); // Store the file in state
    }
  };

  // Form submission handler
  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (data.password !== data.confirmpassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Send data to the server
    await fetchingData();
  };

  // API call to register user with profile picture
  const fetchingData = async () => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);

    // Append the selected file if it exists
    if (selectedFile) {
      formData.append('profilePicture', selectedFile);
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        body: formData,
      });

      const datadb = await response.json();
      console.log("Response from server:", datadb);

      if (response.ok) {
        toast.success(datadb.message);
        navigate('/login');
      } else {
        toast.error(datadb.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during registration.");
    }
  };

  return (
    <section className='p-2 d-flex justify-content-center align-items-center'>
      <div className="login-container">
        {/* Profile Picture Section */}
        <div className='login-image-wrapper mt-2'>
          <div className='login-image'>
            <img className='image' src={profilePicture} alt='User avatar' />
            <form>
              <label htmlFor='profilePicture' className='signup-image-text'>
                Upload Photo
              </label>
              <input
                id='profilePicture'
                type='file'
                accept="image/*"
                style={{ display: 'none' }}
                onChange={fileChangeHandler}
              />
            </form>
          </div>
        </div>

        {/* Signup Form Section */}
        <div className='m-3 pt-2'>
          <form onSubmit={submitHandler}>
            <label htmlFor='name'>Name</label>
            <input
              id='name'
              className='form-control'
              type='text'
              name='name'
              onChange={changeHandler}
              value={data.name}
              required
            />

            <label htmlFor='email'>Email</label>
            <input
              id='email'
              className='form-control'
              type='email'
              name='email'
              onChange={changeHandler}
              value={data.email}
              required
            />

            <label htmlFor='password'>Password</label>
            <input
              id='password'
              className='form-control'
              type='password'
              name='password'
              onChange={changeHandler}
              value={data.password}
              required
            />

            <label htmlFor='confirmpassword'>Confirm Password</label>
            <input
              id='confirmpassword'
              className='form-control'
              type='password'
              name='confirmpassword'
              onChange={changeHandler}
              value={data.confirmpassword}
              required
            />

            <div className='text-center p-3'>
              <button type='submit' className='login-btn'>Sign Up</button>
            </div>
          </form>

          <p>Already have an account? <Link to='/login'>Log in</Link></p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
