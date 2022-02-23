import './App.css';
import React, { useEffect, useState } from 'react';
import Login  from './components/login';
import ProductListing from './components/productListing';
function App() {

  const checkIfAuth = () => {
    if (localStorage.getItem('token')) setAuth(true) 
  };

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    checkIfAuth();
  },[])



  return (
    <>
    { !auth ? <Login setAuth={setAuth} /> : <ProductListing/> }
      

    </>
  )
}

export default App
