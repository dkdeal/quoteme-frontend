import React, {useState} from "react";

import { useHistory, Link } from "react-router-dom";

import { useAppContext } from "../libs/contextLib";

export default function LoginPage() {
    
    let history = useHistory();
    const { isAuthenticated, userHasAuthenticated } = useAppContext();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ cPassword, setCPassword ] = useState("");

    const handleSignup = async (e) =>{
        e.preventDefault();
        try{

            if(password != cPassword){
                alert("Passwords do not match");
                return;
            }

            console.log(email)
            let data = await fetch("http://localhost:3000/users/signup", {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })


            let user = await data.json();

            if(user.created){
                history.push('login');
            } else {
                alert("error");
            }
            
        } catch(err) {
            console.log(err)
        }
    }

  return (
      <>
    <div className="w-1/3 mx-auto mt-16 bg-white p-4 rounded">
        <h1 className="text-2xl font-bold">Signup</h1>
        <form onSubmit={handleSignup}>
            <div>
                <label className="block">Email</label>
                <input className="w-full rounded my-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900" type="text" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label className="block">Password</label>
                <input className="w-full rounded my-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900" type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <label className="block">Confirm Password</label>
                <input className="w-full rounded my-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900" type="password" onChange={(e) => setCPassword(e.target.value)} />
            </div>
            <div className="flex justify-end">
                <button className="bg-blue-600 hover:bg-blue-500 text-white py-1 px-3 rounded ">Signup</button>
            </div>
        </form>
    </div>
    <Link className="w-full block py-2 text-center" to="/login">Already A User?</Link>
    </>
  );
}