import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Drawer from "./Components/Drawer";
import Header from "./Components/Header";
import AppContext from "./context";

import Home from "./Pages/Home";
import Favorites from "./Pages/Favorites";
import Orders from "./Pages/Orders";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get(
        "https://63adb1e3ceaabafcf169bbd4.mockapi.io/cart"
      );
        // const favoritesResponse = await axios.get(
        //   "https://63adb1e3ceaabafcf169bbd4.mockapi.io/favorites"
        // );
      const itemsResponse = await axios.get(
        "https://63adb1e3ceaabafcf169bbd4.mockapi.io/items"
      );
      setIsLoading(false);
      setCartItems(cartResponse.data);
      //   setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(
        `https://63adb1e3ceaabafcf169bbd4.mockapi.io/cart ${obj.id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      axios.post("https://63adb1e3ceaabafcf169bbd4.mockapi.io/cart", obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://63adb1e3ceaabafcf169bbd4.mockapi.io/cart ${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://63adb1e3ceaabafcf169bbd4.mockapi.io/favorites ${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          "https://63adb1e3ceaabafcf169bbd4.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не вийшло добавити до вибраних");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        setCartOpened,
        setCartItems,
        onAddToFavorite,
        onAddToCart,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
            }
          />
          <Route
            path="/orders"
            element={
              <Orders items={favorites} onAddToFavorite={onAddToFavorite} />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
