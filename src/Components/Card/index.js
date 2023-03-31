import cardStyles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";
import React from "react";

function Card({
  id,
  onFavorite,
  title,
  imageUrl,
  price,
  onPlus,
  favorited = false,
  added = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({ id, title, imageUrl, price });
  };

  const onClickFavorite = () => {
    onFavorite({ id, title, imageUrl, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <div className={cardStyles.card}>
        {loading ? (
          <ContentLoader
            speed={2}
            width={155}
            height={265}
            viewBox="0 0 155 265"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
            <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
            <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
            <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
            <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
          </ContentLoader>
        ) : (
          <>
            {onFavorite && (
              <div className="favorite" onClick={onClickFavorite}>
                <img
                  src={
                    isFavorite ? "/img/heart-like.svg" : "/img/heart-unlike.svg"
                  }
                  alt="Heart"
                />
              </div>
            )}
            <img width={"100%"} height={135} src={imageUrl} alt="Sneackers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column ">
                <span>Ціна:</span>
                <b> {price}грн</b>
              </div>
              {onPlus && (
                <img
                  className={cardStyles.plus}
                  onClick={onClickPlus}
                  src={
                    isItemAdded(id)
                      ? "/img/btn-checked.svg"
                      : "/img/btn-plus.svg"
                  }
                  alt="Plus"
                ></img>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default Card;
