import React from 'react';
import { useNavigate } from 'react-router-dom/dist';

const Home = () => {
 const navigate = useNavigate();

 const username = localStorage.getItem('username');
 const token = localStorage.getItem('token');

 
 if (token === null) {
    navigate('/Login');
 }

 return (
    <div className='bg-slate-50'>
      <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-wrap justify-center max-sm:max-h-xs h-auto max-sm:max-w-xs w-FULL shadow-2xl p-8 rounded-xl bg-white'>
          <h2 className='text-6xl'>Welcome, {username}!</h2>
        </div>
      </div>
    </div>
 );
};

export default Home;