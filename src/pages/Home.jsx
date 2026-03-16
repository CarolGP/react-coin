import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    
    const [ coins, setCoins] = useState ([]);

    const API_KEY = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        const fetchCoins = async () => {

            const response = await fetch (
                "https://rest.coincap.io/v3/assets",
              {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                }
              }
            );

            const data = await response.json();

            setCoins(data.data);
        };

        fetchCoins();
    }, []);

      return(
        <div>
            <h1>Cryptomonedas</h1>

            <ul>
                { coins.map((coin) =>(
                    <li key={coin.id}>
                        <Link to ={`/coin/${coin.id}`}>
                          {coin.name} - {coin.symbol}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
      );
    };
    
export default Home;