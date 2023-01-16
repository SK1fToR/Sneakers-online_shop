import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Cards from "../comp/card";
import AppContext from "../context";
const Favourite = ({ AddFav }) => {
  const {favourites} = useContext(AppContext);
  
  return (
    <div className="content">
      <div className="d-flex align-center justify-between mb-40">
      <div className='d-flex align-center'>
      <Link to ='/' exact> <img className='cu-p' src='/image/leftarrow.svg' alt='arrow' /></Link>
        <h1 className="ml-20">My bookmarks</h1>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {favourites.map((obj, index) => (
          <Cards key={index} onFav={AddFav}  {...obj} />
        ))}
      </div>
    </div>
  );
};

export default Favourite;
