import React from "react";
import Card from "../Components/Card";
import AppContext from "../context";

function Favorites({ items, onAddToFavorite }) {
const {favorites} = React.useContext(AppContext)

  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>My zakladki</h1>
      </div>
      <div className="d-flex flex-wrap">
        {favorites.map((item, index) => (
          <Card
            key={index}
            favorited={true}
            onFavorite={onAddToFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}
export default Favorites;
