import React, {useState, useEffect} from "react";

import { useHistory, useParams } from "react-router-dom";

import { useAppContext } from "../libs/contextLib";

export default function QuoteFormPage() {
    
    let history = useHistory();
    const { setMessage} = useAppContext();
    const [ content, setContent ] = useState("");
    const [ quoted, setQuoted ] = useState("");

    const [ title, setTitle ] = useState("Add Quote");
    const [ btnTitle, setBTNTitle ] = useState("Add Quote");

    let { id } = useParams();

    useEffect(() => {

      if(id != null){
        setTitle("Edit Quote")
        setBTNTitle("Update Quote")
        getQuote();
      }

    },[]);

    const getQuote = async () => {
      let data = await fetch(`http://localhost:3000/quotes/${id}`, {credentials: 'include'});

      data = await data.json()

      console.log(data)
      setContent(data.quote.content);
      setQuoted(data.quote.quoted);
    }

    const handleDelete = async (e) =>{
      let url = `http://localhost:3000/quotes/${id}`;
      let data = await fetch(url, {
          method: "DELETE",
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({content, quoted})
      })

      data = await data.json();

      setMessage(data.message);
      if(data.message == "Quote has been deleted!"){
        history.push('/')
      }
    }


    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{

          let url = "http://localhost:3000/quotes/add";
          let verb = "POST";

          if(id != null){
            url = `http://localhost:3000/quotes/${id}`;
            verb = "PUT";
          }

            
            let data = await fetch(url, {
                method: verb,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({content, quoted})
            })


            data = await data.json();

            if(id){
              setMessage("Quote updated!");
            } else {
              setMessage("Quote added!");
            }
            history.push("/home")
           
        } catch(err) {
            console.log(err)
        }
    }

  return (
    <>
    <div className="w-1/3 mx-auto mt-16 rounded bg-white p-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label className="block">Quote</label>
                <input className="w-full rounded my-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900" type="text" value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div>
                <label className="block">Who said it?</label>
                <input className="w-full rounded my-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900" type="text" value={quoted} onChange={(e) => setQuoted(e.target.value)} />
            </div>
            <div className={id ? "flex justify-between" : "flex justify-end"}>
                {id ? <div onClick={handleDelete} className="bg-red-600 cursor-pointer hover:bg-red-500 text-white py-1 px-3 rounded ">Delete Quote</div> : null }
                <button className="bg-blue-600 hover:bg-blue-500 text-white py-1 px-3 rounded ">{btnTitle}</button>
            </div>
        </form>
    </div>
    </>
  );
}