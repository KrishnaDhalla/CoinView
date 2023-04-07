import axios from 'axios'
import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from './firebase'
import { doc, onSnapshot } from 'firebase/firestore'
const Crypto=createContext()
const Cryptocontext = ({children}) => {
    const[currency,setCurrency]=useState("INR")
    const [symbol,setSymbol]=useState("₹")
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user,setUser]=useState(null)
    const [watchlist,setWatchlist]=useState([])
    const [alert,setAlert]=useState({
      open:false,
      message:"",
      type:"success",
    })
    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
        if(user) setUser(user)
        else setUser(null)
      })
    },[])
  const fetchCoins = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );
      setCoins(data);
      setLoading(false);
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
   
  };
  console.log(user)

    useEffect(()=>{
        if(currency==="INR") setSymbol("₹")
        else if(currency==="USD") setSymbol("$")
    },[currency])
    useEffect(() => {
      if (user) {
        const coinRef = doc(db, "watchlist", user?.uid);
        var unsubscribe = onSnapshot(coinRef, (coin) => {
          if (coin.exists()) {
            console.log(coin.data().coins);
            setWatchlist(coin.data().coins);
          } else {
            console.log("No Items in Watchlist");
          }
        });
  
        return () => {
          unsubscribe();
        };
      }
    }, [user]);
  
  return (
   <Crypto.Provider value={{currency,setCurrency,symbol,coins,loading,fetchCoins,alert,setAlert,user,watchlist}}>
    {children}
   </Crypto.Provider>
  )
}

export default Cryptocontext
export const CryptoState = ()=>{
    return useContext(Crypto)
}