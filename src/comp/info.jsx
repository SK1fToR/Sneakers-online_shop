import React, { useContext } from 'react'
import AppContext from '../context';

const Info = ({title, img,  description}) => {
    const {setopenkorzina} = useContext(AppContext);
  return (
    <div className="cartEmpty">
            <img className="mb-20" width={120} src={img} alt="box" />
            <h2>{title}</h2>
            <p className="opacity-6">
             {description}
            </p>
            <button onClick={() => setopenkorzina(false)} className="btngreen">
              <img src="/image/Strelkaleft.svg" />
              Вернуться назад
            </button>
          </div>
  )
}
export default Info;

