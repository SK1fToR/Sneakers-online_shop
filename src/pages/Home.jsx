import Cards from "../comp/card";
const Home = ({
  query,
  setquery,
  cardInfo,
  AddCard,
  AddFav,
  favourites,
  isloading,
}) => {
  const renderItems = () => {
    const searched = cardInfo.filter((a) =>a.title.toLowerCase().includes(query.toLowerCase()));
    return (isloading ? [...Array(8)] : searched).map((obj, index) => (
      <Cards
        key={index}
        onPlus={(b) => AddCard(b)}
        onFav={(a) => AddFav(a)}
        Loading={isloading}
        {...obj}
      />
    ))
  }
  return (
    <div className="content">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{query ? "Searching..." : "Choose your sneakers"}</h1>
        <div className="searcher d-flex align-center">
          <img src="/image/search.svg" alt="search icon" />
          <input
            placeholder="Search..."
            value={query}
            onChange={(e) => setquery(e.target.value)}
          />
          {query && (
            <img
              onClick={() => setquery("")}
              className="inprembtn"
              src="/image/krestikdo.svg"
              alt = 'krestik'
            />
          )}
        </div>
      </div>
      <div className="d-flex Da">
        {renderItems()}
        
      </div>
    </div>
  );
};

export default Home;
