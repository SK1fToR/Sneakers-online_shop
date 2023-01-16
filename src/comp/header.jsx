import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    HashRouter,
    Link,
    Route,
  } from "react-router-dom";
import AppContext from '../context';
const Header = ({onClickOpenKorzina}) => {
const {carditmes} = useContext(AppContext);
const totalprice = carditmes.reduce((sum, obj)=> obj.cost + sum, 0);
    return ( 
        <header className="d-flex justify-between align-center">
          <Link to = '/' exact>
          <div className="d-flex align-center">
            <img width={40} height={40} src="/image/logo.png" />
            <div>
              <h3>REACT SNEAKERS</h3>
              <p>Магазин лучших кроссовок</p>
            </div>
          </div>
          </Link>
          <ul className="d-flex">
            <li className="mr-30 cu-p" onClick={onClickOpenKorzina}>
            <img width={18} height={17} src="/image/Korzina.svg" />
              <span>{totalprice} $</span>
            </li>
            <li className='cu-p'>
            <Link to='/favourites' exact><img width={20} height={20} src="/image/fav.svg" alt='Favourites' /></Link> 
            </li>
            <li>
             <Link to ='user' exact><img width={20} height={20} src="/image/user.svg" /></Link> 
            </li>
          </ul>
        </header>
     );
}
 
export default Header;