import React, { useState } from 'react';
import './App.css';
import AppRoutes from './routes';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">

      <AppRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
   
    </div>
  );
}

export default App;
