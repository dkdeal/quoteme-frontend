import React, {useState, useEffect} from "react";

export default function HomePage() {

    
    const [ quotes, setQuotes ] = useState([]);

    useEffect(() => {
        const getQuotes = async (e) =>{ 
            try{
                let data = await fetch("http://localhost:3000/quotes/home")
                let quotesData = await data.json();
    
                console.log(quotesData)
    
                setQuotes(quotesData.quotes)
            } catch(err) {
                console.log(err)
            }
        }

        getQuotes()
    },[])

    
  /*if(quotes.hasOwnProperty("length")){
    if(quotes.length == 0){
        return <h2>Loading</h2>
    }
  }*/

  return (
    <>
    <div className="w-2/3 mx-auto">
        <h1 className="text-2xl font-bold mx-2">Quotes</h1>

        <div className=" ">
            <div className="flex flex-wrap w-full">
                {quotes.map((quote, idx) =>{
                    return (
                        <div className="w-1/3" key={idx}>
                           <div className="block p-2 m-2 rounded bg-white">
                                <div className="text-xl">{quote.content}</div>
                                <div className="text-xs">{quote.quoted}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
    </>
  );
}