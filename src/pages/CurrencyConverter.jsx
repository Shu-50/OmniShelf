
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { ArrowLeftRight } from "lucide-react"; // Import swap icon

// const CurrencyConverter = () => {
//   const [currencies, setCurrencies] = useState([]);
//   const [amount, setAmount] = useState(1);
//   const [fromCurrency, setFromCurrency] = useState("");
//   const [toCurrency, setToCurrency] = useState("");
//   const [convertedAmount, setConvertedAmount] = useState(null);

//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       try {
//         const response = await axios.get("https://restcountries.com/v3.1/all");
//         let currencyList = [];

//         response.data.forEach((country) => {
//           if (country.currencies) {
//             Object.keys(country.currencies).forEach((code) => {
//               const name = `${code} - ${country.currencies[code].name} (${country.name.common})`;
//               if (!currencyList.some((c) => c.code === code)) {
//                 currencyList.push({ code, name });
//               }
//             });
//           }
//         });

//         currencyList.sort((a, b) => a.name.localeCompare(b.name));
//         setCurrencies(currencyList);
//         setFromCurrency(currencyList[0]?.code);
//         setToCurrency(currencyList[1]?.code);
//       } catch (error) {
//         console.error("Error fetching currencies:", error);
//       }
//     };

//     fetchCurrencies();
//   }, []);

//   const convertCurrency = async () => {
//     if (!fromCurrency || !toCurrency || amount <= 0) return;
//     try {
//       const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
//       const rate = response.data.rates[toCurrency];
//       setConvertedAmount((amount * rate).toFixed(2));
//     } catch (error) {
//       console.error("Error fetching exchange rates:", error);
//     }
//   };

//   const swapCurrencies = () => {
//     setFromCurrency(toCurrency);
//     setToCurrency(fromCurrency);
//     convertCurrency(); // Auto-convert after swap
//   };

//   return (
//     <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white px-6">
//       <div className="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-lg w-full text-center">
//         <h1 className="text-3xl font-semibold mb-6 text-blue-400">Currency Converter</h1>

//         {/* Amount Input */}
//         <div className="flex flex-col items-center space-y-4">
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="w-full p-3 text-lg rounded-lg text-black focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter amount"
//           />

//           {/* Currency Selection */}
//           <div className="grid grid-cols-2 gap-4">
//             <select
//               value={fromCurrency}
//               onChange={(e) => setFromCurrency(e.target.value)}
//               className="p-3 w-full text-black rounded-lg text-lg focus:ring-2 focus:ring-blue-500"
//             >
//               {currencies.map((currency) => (
//                 <option key={currency.code} value={currency.code}>
//                   {currency.name}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={toCurrency}
//               onChange={(e) => setToCurrency(e.target.value)}
//               className="p-3 w-full text-black rounded-lg text-lg focus:ring-2 focus:ring-blue-500"
//             >
//               {currencies.map((currency) => (
//                 <option key={currency.code} value={currency.code}>
//                   {currency.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Swap Button */}
//           <button
//             onClick={swapCurrencies}
//             className="bg-blue-500 text-white px-5 py-2 mb-4 rounded-lg font-bold flex items-center justify-center hover:bg-blue-600 transition"
//           >
//             <ArrowLeftRight className="w-5 h-5 mr-2" /> Swap
//           </button>

//           {/* Convert Button */}
//           <button
//             onClick={convertCurrency}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition duration-200"
//           >
//             Convert
//           </button>

//           {/* Converted Amount */}
//           {convertedAmount !== null && (
//             <p className="mt-4 text-2xl font-semibold text-green-400">
//               {amount} {fromCurrency} = {convertedAmount} {toCurrency}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CurrencyConverter;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeftRight } from "lucide-react";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);

  // Fetch currency codes
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get("https://api.frankfurter.app/currencies");
        const currencyList = Object.entries(response.data).map(([code, name]) => ({
          code,
          name: `${code} - ${name}`
        }));
        setCurrencies(currencyList);
        setFromCurrency("USD");
        setToCurrency("INR");
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

  // Convert currency
  const convertCurrency = async () => {
    if (!fromCurrency || !toCurrency || amount <= 0) return;
    try {
      const response = await axios.get(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const result = response.data.rates[toCurrency];
      setConvertedAmount(result.toFixed(2));
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };

  // Swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(null); // Reset
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white px-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-lg w-full text-center">
        <h1 className="text-3xl font-semibold mb-6 text-blue-400">Currency Converter</h1>

        {/* Amount Input */}
        <div className="flex flex-col items-center space-y-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 text-lg rounded-lg text-black focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />

          {/* Currency Selectors */}
          <div className="grid grid-cols-2 gap-4">
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="p-3 w-full text-black rounded-lg text-lg focus:ring-2 focus:ring-blue-500"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.name}
                </option>
              ))}
            </select>

            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="p-3 w-full text-black rounded-lg text-lg focus:ring-2 focus:ring-blue-500"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.name}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <button
            onClick={swapCurrencies}
            className="bg-blue-500 text-white px-5 py-2 mb-4 rounded-lg font-bold flex items-center justify-center hover:bg-blue-600 transition"
          >
            <ArrowLeftRight className="w-5 h-5 mr-2" /> Swap
          </button>

          {/* Convert Button */}
          <button
            onClick={convertCurrency}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition duration-200"
          >
            Convert
          </button>

          {/* Result */}
          {convertedAmount !== null && (
            <p className="mt-4 text-2xl font-semibold text-green-400">
              {amount} {fromCurrency} = {convertedAmount} {toCurrency}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;

