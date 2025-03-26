import React from 'react'
import './App.css';
import AuthUser from './components/Authentication/AuthUser';
import GuestNav from './components/Navbar/guest';
import Navigation from './components/Navbar/navigation';

function App() 
{
  const { getToken } = AuthUser();
  if (!getToken()) {
    return <GuestNav/>
  }
  else{
    return <Navigation/>
  }
}

export default App;
