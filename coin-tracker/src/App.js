import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [loding, setLoading] = useState(true);
  const [conis, setCoins] = useState([]);
  const [amount, setAmount] = useState(0);
  const [coinPrice, setCoinPrice] = useState(0);
  const [coinSymbol, setCoinSymbol] = useState("");
  const [amountYouCanBuy, setAmountYouCanBuy] = useState(0);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setAmountYouCanBuy(amount / coinPrice);
  }, [amount, coinPrice]);

  return (
    <div className="App">
      <h1>The Coins! ({conis.length})</h1>
      {loding ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <h3>Choose the coin you want to purchase.</h3>
          <select
            onChange={(e) => {
              const price = Number(e.target.value);
              setCoinPrice(price);
              setCoinSymbol(e.target[e.target.selectedIndex].id);
              console.dir(e.target[e.target.selectedIndex]);
            }}
          >
            <option key="header" value="###">
              Choose the coin
            </option>
            {conis.map((coin) => (
              <option
                id={coin.symbol}
                key={coin.id}
                value={coin.quotes.USD.price}
              >
                {coin.name}({coin.symbol} :{" "}
                {Number(coin.quotes.USD.price).toFixed(6)} USD)
              </option>
            ))}
          </select>
          <h3>How much do you have?</h3>
          <input
            type="number"
            placeholder="USD"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />

          <h4>
            You can buy {amountYouCanBuy} {coinSymbol}
          </h4>
        </div>
      )}
    </div>
  );
}

export default App;
