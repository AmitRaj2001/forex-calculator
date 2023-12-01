import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('INR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    axios.get('https://open.er-api.com/v6/latest')
      .then(response => {
        const selectedCurrencies = [
          'INR','USD', 'AED', 'GBP', 'CAD', 'SGD', 'EUR', 'JPY', 'PKR', 'ZAR', 'ALL'
        ];
  
        const filteredCurrencies = selectedCurrencies.filter(currency => response.data.rates.hasOwnProperty(currency));
  
        setCurrencies(filteredCurrencies);
      })
      .catch(error => console.error('Error fetching currencies:', error));
  }, []);

  useEffect(() => {
    axios.get(`https://open.er-api.com/v6/latest/${fromCurrency}`)
      .then(response => {
        const rate = response.data.rates[toCurrency];
        const converted = (amount * rate).toFixed(4);
        setConvertedAmount(converted);
      })
      .catch(error => console.error('Error converting currency:', error));
  }, [amount, fromCurrency, toCurrency]);
  
  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label>From Currency:</label>
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div>
        <label>To Currency:</label>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div>
        <h2>Converted Amount: {convertedAmount}</h2>
      </div>
    </div>
  );
}


export default CurrencyConverter;
