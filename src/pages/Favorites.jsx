import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {

  const [coins, setCoins] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {

    const fetchCoins = async () => {

      const response = await fetch(
        "https://rest.coincap.io/v3/assets",
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`
          }
        }
      );

      const data = await response.json();

      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

      const favoriteCoins = data.data.filter((coin) =>
        favorites.includes(coin.id)
      );

      setCoins(favoriteCoins);

    };

    fetchCoins();

  }, []);

  if (coins.length === 0) {
    return <p>No hay criptomonedas favoritas</p>;
  }

  return (
    <div>
      <h1>Favorites</h1>

      <ul>
        {coins.map((coin) => (
          <li key={coin.id}>
            <Link to={`/coin/${coin.id}`}>
              {coin.name} - {coin.symbol}
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Favorites;