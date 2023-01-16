import React, { useContext, useEffect, useState } from 'react'
import Cards from '../comp/card';
import AppContext from '../context';
import axios from 'axios';
import { Link } from 'react-router-dom';
export const User = () => {
    const {orders, setorders} = useContext(AppContext);
    const [isloading, setisloading] = useState(true)
    useEffect(() => {
     (async ()=> {
      const {data} = await axios.get("https://63a9928e7d7edb3ae611545a.mockapi.io/orders");
      setorders(data.map(a => a.items).flat());
      setisloading(false);
     })();
    }, [])
  return (
    <div className="content">
      <div className="d-flex align-center justify-between mb-40">
        <div className='d-flex align-center'> 
        <Link to ='/' exact> <img className='cu-p' src='/image/leftarrow.svg' alt='arrow' /></Link>
        <h1 className='ml-20'>My orders</h1>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {(isloading? [...Array(8)] : orders).map((obj, index) => (
          <Cards key={index + 1} 
          Loading={isloading}
          {...obj} />
        ))}
      </div>
    </div>
  )
}
export default User;