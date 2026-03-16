import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Coin = () => {
    const { id } = useParams ();

    const [coin, setCoin] = useState(null);

    const API_KEY = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        const fetchCoin = async () => {
            const response = await fetch(
                `https://rest.coincap.io/v3/assets/${id}`,
                {
                  headers: {
                    Authorization: `Bearer ${API_KEY}`
                  }
                }
            );

            const data = await response.json();

            setCoin(data.data);
        };

        fetchCoin();

    }, [id]);

    if(!coin) {
        return <p>Cargando...</p>;
    }

    return(
        <div>
            <h1>{coin.name}</h1>
            <p>Symbol: {coin.symbol}</p>
            <p>Rank: {coin.rank}</p>
            <p>Price USD: {coin.priceUsd}</p>
            <p>Market Cap: {coin.marketCapUsd}</p>
        </div>
    );
};

export default Coin;