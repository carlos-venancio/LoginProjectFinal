import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../../api';
import { toast } from 'react-toastify';
import Toastify from './Toastify';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const navigate = useNavigate();

  /* permite o acesso aos dados do cliente logado pelo google */
  const google = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            'Authorization': `Bearer ${codeResponse.access_token}`
          }
        })
        handleGoogle(res.data)
      }
      catch(e) {
        console.log(e);
      }
    },
    onError: e => console.log(e)
  });


  /* faz a requiisção para a rota que gerencia os logins por midia social */
  async function handleGoogle(credential)  {

    try {
        const response = await Api.post(`/login/social`, credential);
        treatResponse(response);
    }

    catch(e) {
      console.error("Erro:",e)
      toast.error(e.message,{ autoClose: 5000 })
    }
        
  }

  /* faz o acesso de um usuario comum */
  const handleLogin = async () => {

    if (!isEmailValid || !password) { 
      toast.error("Invalid email or password");
      return;
    }

    try {
      const response = await Api.post(`/login`, {
        email: username,
        password: password
      });
      console.log(response)
      treatResponse(response);
    
    } catch (error) {
      console.error('Erro inesperado:', error.message);
      toast.error('Email ou senha inválidos', { autoClose: 5000 });
    }
  }

  /* verifica a resposta e redireciona o usuario */ 
  async function treatResponse(response){
    
    if (response.status === 200 || response.status === 201) {
      const token = response.data.token;
      const name = response.data.username;
  
      localStorage.setItem('token', token);
      localStorage.setItem("username", name);
  
      setIsLoggedIn(true);
      navigate('/Home');
      
    } else if (response.status === 401) {
      toast.error('Não autorizado', { autoClose: 5000 });
  
    } else {
  
      console.error('Erro:', response.status, response.data.message);
      toast.error('Erro', { autoClose: 5000 });
    }

  }

  const validateEmail = () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(re.test(username));
  };

  const emailInputClass = isEmailValid
  ? "shadow-inner border border-solid border border-slate-400 focus:border-blue-500 focus:border-2 rounded-md text-xs p-1.5 w-60 outline-none"
  : "shadow-inner border border-solid border border-slate-400 focus:border-red-500 focus:border-2 rounded-md text-xs p-1.5 w-60 outline-none";
  
 
  return (
      <div className='bg-image h-screen'>
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-wrap justify-center max-sm:max-h-xs h-auto max-sm:max-w-xs w-80 shadow-2xl p-8 rounded-xl bg-white ">
            <div className='text-3xl  mb-4' >
              <h1 >Welcome Back </h1>
              <p className='text-xs mt-2'>Enter your Credentials to access your account</p>
            </div>
            <div>
              <div className="mt-2 ">
                <p className=' text-sm' htmlFor="username">E-Mail</p>
                  <input
                    className={emailInputClass}
                    type="text"
                    id="username"
                    placeholder='Enter your email'
                    value={username}
                    maxLength={40}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      validateEmail(e.target.value);
                    }}
                  />
                {!isEmailValid && <p className="text-red-800 text-xs">Enter a valid email address.</p>}
            </div>

            </div>
            <div>
              <div className="mt-2 ">
                <p className=' text-sm' htmlFor="password">Password</p>
                <input
                  className={emailInputClass}
                  type="password"
                  id="password"
                  placeholder='Enter your password'
                  value={password}
                  maxLength={12}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className='bottom'>
              <button className="mt-7 bg-gray-800 hover:bg-gray-900 active:bg-blue-950 text-white text-sm max-sm:max-w-xs w-60 h-8 rounded-lg hover:scale-105 transition delay-75 duration-300 ease-in-out" 
                      onClick={handleLogin}>
                Login
              </button>

              
              <button className="p-5 items-center flex mt-7 justify-center bg-white-800  text-black  max-sm:max-w-xs w-60 h-8 rounded-lg hover:scale-105 border border-gray-300" onClick={google}>
                <img src="/logoGoogle.png" alt="Logo do google" className="h-7 mr-4"/>
                  Sign in with Google 
              </button>

            </div>
            <div className='text-xs p-0 mt-10'>
              <p className='account' >Don’t have an account?  <Link to="/Index" className='text-cyan-400'>  Sign Up </Link> </p>
            </div>

            <Toastify />
          </div>
        </div>
      </div>

  );
};

export default Login;