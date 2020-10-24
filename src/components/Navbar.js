import React from 'react';
import {
  Link
} from "react-router-dom";

import { useAppContext } from "../libs/contextLib";

const Navbar = () => {

  const { userHasAuthenticated } = useAppContext();

  const logout =  (e) =>{

    e.preventDefault();
    let data =  fetch("http://localhost:3000/users/logout", {
      method: "POST",
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json'
      }
    })
    userHasAuthenticated(false)
  }

  return ( 
    <>
      <nav className="w-2/3 mx-auto flex justify-end py-2">
        <ul className="flex flex-row">
          <li className="p-2 hover:text-blue-500"><Link to="/">Home</Link></li>
          <li className="p-2 hover:text-blue-500"><Link to="/add">Add Quote</Link></li>
          <li className="p-2 hover:text-blue-500"><div className="cursor-pointer" onClick={logout}>Logout</div></li>
        </ul>
      </nav> 
    </>
  );

}

export default Navbar;