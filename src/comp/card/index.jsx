import { useContext } from "react";
import ContentLoader from "react-content-loader";
import styles from "./card.module.scss";
import AppContext from "../../context";
const Cards = ({ title, img, cost, id, onPlus, onFav, Loading = false }) => {
  const { AddedCards, AddedFavourites } = useContext(AppContext);
  const obj = { id, parenrId: id, title, img, cost };
  console.log(AddedFavourites(id))
  const handlePlusBtn = () => {
    onPlus(obj);
  };
  const handleLikeBtn = () => {
    onFav(obj);
  };
  return (
    <div className={styles.card}>
      {Loading ? (
        <ContentLoader
          speed={2}
          width={210}
          height={226}
          viewBox="3 -3 210 240"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="4" y="16" rx="10" ry="10" width="150" height="90" />
          <rect x="4" y="122" rx="5" ry="5" width="150" height="15" />
          <rect x="5" y="142" rx="4" ry="4" width="93" height="15" />
          <rect x="4" y="179" rx="8" ry="8" width="80" height="24" />
          <rect x="115" y="175" rx="8" ry="8" width="32" height="31" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.fav} onClick={handleLikeBtn}>
            <img
              src={
                AddedFavourites(id) ? "/image/Relike.svg" : "/image/GrLike.svg"
              }
              alt="heart"
            />
          </div>
          <img width={133} height={112} src={img} alt="chto-to" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена: </span>
              <b>{cost} $</b>
            </div>
            {onPlus && (
              <img
                className={styles.plusbtn}
                onClick={handlePlusBtn}
                src={AddedCards(id) ? "/image/pluspro.svg" : "/image/plus.svg"}
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cards;
