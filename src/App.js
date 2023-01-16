import React, { useEffect, useState } from "react";
import Header from "./comp/header";
import Shapka from "./comp/drawer";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Favourite from "./pages/favourite";
import AppContext from "./context";
import User from "./pages/User";
function App() {
  useEffect(() => {
    try {
      async function ResponceOrder() {
        const [cartres, favres, itemsres] = await Promise.all([
          axios.get("https://63a9928e7d7edb3ae611545a.mockapi.io/cart"),
          axios.get("https://63a9928e7d7edb3ae611545a.mockapi.io/favourite"),
          axios.get("https://63a9928e7d7edb3ae611545a.mockapi.io/Items"),
        ]);
        setisloading(false);
        setcardInfo(itemsres.data);
        setcarditmes(cartres.data);
        setfavourites(favres.data);
      }
      ResponceOrder();
    } catch (error) {
      alert("Error");
    }
  }, []);
  const [cardInfo, setcardInfo] = useState([]);
  const [carditmes, setcarditmes] = useState([]);
  const [favourites, setfavourites] = useState([]);
  const [query, setquery] = useState("");
  const [orders, setorders] = useState([]);
  const [isloading, setisloading] = useState(true);
  const [openkorzina, setopenkorzina] = useState(false);

  const AddCard = async (obj) => {
    try {
      const findItems = carditmes.find((a) => Number(a.parenrId) === Number(obj.id));
      if (findItems) {
        setcarditmes(
          [...carditmes].filter((a) => Number(a.parenrId) !== Number(obj.id))
        );
        await axios.delete(
          `https://63a9928e7d7edb3ae611545a.mockapi.io/cart/${findItems.id}`
        );
      } else {
        setcarditmes([...carditmes, obj]);
        const { data } = await axios.post(
          "https://63a9928e7d7edb3ae611545a.mockapi.io/cart",
          obj
        );
        setcarditmes(prev => prev.map(a => {
          if (a.parenrId === data.parenrId){
            return {
              ...a, 
              id: data.id
            };
          }
           return a;

        }));
      }
    } catch (error) {
      alert("Error");
    }
  };
  const RemoveCard = (obj) => {
    axios.delete(`https://63a9928e7d7edb3ae611545a.mockapi.io/cart/${obj}`);
    setcarditmes([...carditmes].filter((a) => Number(a.id) !== Number(obj)));
  };

  const AddFav = async (obj) => {
    try {
      const findItems = favourites.find((a) => Number(a.parenrId) === Number(obj.id));
      if (findItems) {
        setfavourites(
          [...favourites].filter((a) => Number(a.parenrId) !== Number(obj.id))
        );
       await axios.delete(
          `https://63a9928e7d7edb3ae611545a.mockapi.io/favourite/${findItems.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://63a9928e7d7edb3ae611545a.mockapi.io/favourite",
          obj
        );
        setfavourites([...favourites, data]);
      }
    } catch (error) {
      alert("Not succes");
    }
  };
  const AddedCards = (id) => {
    return carditmes.some((b) => Number(b.parenrId) === Number(id));
  };
  const AddedFavourites = (id) => {
    return favourites.some((b) => Number(b.parenrId) === Number(id));
  };
  return (
    <AppContext.Provider
      value={{
        cardInfo,
        carditmes,
        favourites,
        AddedCards,
        AddedFavourites,
        setopenkorzina,
        setcarditmes,
        carditmes,
        setorders,
        orders,
      }}
    >
      <div className="wrapper clear">
        <Shapka
          remove={RemoveCard}
          Items={carditmes}
          CloseKorzina={() => setopenkorzina(false)}
          opened={openkorzina}
        />
        <Header onClickOpenKorzina={() => setopenkorzina(true)} />
        <Routes>
          <Route path="/favourites" element={<Favourite AddFav={AddFav} />} />
          <Route path="/user" element={<User />} />
          <Route
            path="/"
            element={
              <Home
                favourites={favourites}
                carditmes={carditmes}
                cardInfo={cardInfo}
                query={query}
                setquery={setquery}
                AddCard={AddCard}
                AddFav={AddFav}
                isloading={isloading}
              />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
