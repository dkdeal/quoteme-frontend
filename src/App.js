import React, { useState, useEffect} from 'react';
import './App.css';

import { AppContext } from "./libs/contextLib";

import Routes from './Routes';

function App() {

  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [message, setMessage] = useState("")

  useEffect(() =>{
    isLoggedIn()
  },[]);

  /*
    Is logged in generates a token for a logged in user then sets the to our context
  */
  const isLoggedIn = async () => {
    let data = await fetch("http://localhost:3000/users/token", {
      method: "POST",
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json'
      }
    })

    let user = await data.json();

    if(user.token){
      userHasAuthenticated(user.token)
    }
  }


  return (
    <>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, message, setMessage }}>
        <Routes />
      </AppContext.Provider>
    </>
  );
}

export default App;
