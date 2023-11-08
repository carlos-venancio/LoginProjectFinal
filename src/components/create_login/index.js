import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from '../login/Toastify';

const DadosLogin = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsNotification, setShowTermsNotification] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Novo estado para controlar visibilidade da senha
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!isEmailValid) {
      console.log(username);
      console.log('Email is not valid.');
      return;
    }

    if (!termsAccepted) {
      toast.info("You must accept the terms and conditions before continuing.")
      return;
    }

    // Validate password
    if (!validatePassword()) {
      console.log('Senha inválida.');
      return;
    }

    try {
      const data = {
        username: name,
        email: username,
        password: password,
      };
    
      const response = await Api.post('https://api-login-mn7h.onrender.com/', data);
    
      if (response.status === 201) {
        toast.success('Registration completed successfully!', { autoClose: 5000 });
    
        const token = response.data.token;
        localStorage.setItem("token", token);
    
        setTimeout(() => {
          navigate('/Login');
        }, 4000);
      }
    } catch (error) {
      console.error('Error:', error.response.data.message);
      toast.error(error.response.data.error);
    }
    
  };

  const validateEmail = () => {
    setIsEmailValid(username.trim() !== '');
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password requirements: A-a | 0-9 | @_>- ');
      setShowPasswordError(true);
      return false;
    } else {
      setPasswordError('');
      setShowPasswordError(false);
      return true;
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const passwordInputClass = showPasswordError
  ? "shadow-inner border border-solid border border-slate-400  focus:border-red-500 focus:border-2 rounded-md  text-xs p-1.5 w-60 outline-none"
  : "shadow-inner border border-solid border border-slate-400  focus:border-blue-500 focus:border-2 rounded-md  text-xs p-1.5 w-60 outline-none";


  return (
    <div className="bg-image h-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-wrap justify-center max-sm:max-h-xs h-auto max-sm:max-w-xs w-80 shadow-2xl p-8 rounded-xl bg-white ">
          <div className="text-3xl ">
            <h1>Get Started Now</h1>
          </div>

          <div>
            <div className="mt-3 ">
              <p className="text-sm" htmlFor="name">
                Name
              </p>
              <input
                className="shadow-inner border border-solid border border-slate-400 focus:border-blue-500 focus:border-2 rounded-md text-xs p-1.5 w-60 outline-none"
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value.replace(/\s/g, ''))}
                maxLength={50}
              />
            </div>
          </div>

          <div>
            <div className="mt-3 ">
              <p className="text-sm" htmlFor="username">
                E-Mail Address
              </p>
              <input
                className="shadow-inner border border-solid border border-slate-400 focus:border-blue-500 focus:border-2 rounded-md text-xs p-1.5 w-60 outline-none"
                type="text"
                id="username"
                placeholder="Enter your email"
                value={username}
                maxLength={40}
                onChange={(e) => {
                  const cleanedValue = e.target.value.replace(/\s/g, '');
                  setUsername(cleanedValue);
                  validateEmail();
                }}
              />
              {!isEmailValid && <p className="text-red-500 text-xs">Enter a valid email address.</p>}
            </div>
          </div>




          <div className="mt-3 ">
            <p className="text-sm" htmlFor="password">
              Password
            </p>
            <input
              className={passwordInputClass}
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                const cleanedValue = e.target.value.replace(/\s/g, '');
                setPassword(cleanedValue);
                validatePassword();
              }}
              maxLength={50}

              
            />
           
          </div>



          <div className="mt-1 mr-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="form-checkbox h-3 w-3 text-blue-600 mr-1 "
              />
              <p className="text-xs">
                I accept the <a className="text-cyan-400">terms and conditions</a>
              </p>
            </label>
          </div> 

          <button
            type="button"
            onClick={handleLogin}
            disabled={!termsAccepted}
            className="mt-3 bg-gray-900 hover:bg-gray-900 active:bg-blue-950 text-white text-sm max-sm:max-w-xs w-60 h-8 rounded-lg hover:scale-105 transition delay-75 duration-300 ease-in-out"
          >
            Sign up
          </button>
          {!termsAccepted && showTermsNotification && (
            <p className="text-red-500 text-xs">You must accept the terms.</p>
          )}

          <div id="buttonDiv"></div>

          <div className="text-xs p-0 mt-5">
            <p>
              Have an account? <Link to={`/login`} className="text-cyan-400">
                Sign In
              </Link>
            </p>
          </div>

       
          <Toastify></Toastify>
        </div>
      </div>
    </div>
  );
};

export default DadosLogin;