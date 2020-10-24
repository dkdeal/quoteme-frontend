import React, {useState, useEffect} from "react";

import { useHistory, Link } from "react-router-dom";

import { useAppContext } from "../libs/contextLib";

export default function MyQuotesPage() {
    
    let history = useHistory();
    
    const [ quotes, setQuotes ] = useState([]);

    useEffect(() => {
        const getQuotes = async (e) =>{ 
            try{
                let data = await fetch("http://localhost:3000/quotes", { credentials: 'include' })
                let quotesData = await data.json();
    
                console.log(quotesData)
    
                setQuotes(quotesData.quotes)
            } catch(err) {
                console.log(err)
            }
        }

        getQuotes()
    },[])

    

  if(quotes.length == 0){
      return <h2>Loading</h2>
  }

  return (
    <>
    <div className="w-2/3 mx-auto">
        <h1 className="text-2xl font-bold mx-2">My Quotes</h1>

        <div className=" ">
            <div className="flex flex-wrap w-full">
                {quotes.map((quote, idx) =>{
                    return (
                        <div className="w-1/3" key={idx}>
                            <Link to={`/edit/${quote.id}`} className="block p-2 m-2 rounded bg-white">
                                <div className="text-xl">{quote.content}</div>
                                <div className="text-xs">{quote.quoted}</div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
    </>
  );
}