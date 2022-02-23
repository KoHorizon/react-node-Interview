import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { login } from './api/auth';
import { findAll } from './api/products';


function App() {


  const [title, setTitle] = useState('')


  const loginZ = async(password:string) => {
    
    const passObj = {
      password: password
    }
    try {
      const { data } = await login(passObj);
      console.log(data);
      
      localStorage.setItem('token' , data.access_token);
    } catch (err) {
      console.log(err,'etzerez');
      
    }
  }

  const tData = async () => {
    try {
      const { data } = await  findAll();
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="App">
      <input type="text" onChange={(event) => setTitle(event.target.value)}/>
      <button onClick={() => loginZ(title)}>send it</button>
      <button onClick={() => tData()}>take data's</button>
    </div>
  )
}

export default App
