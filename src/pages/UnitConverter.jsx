// import React, { useState } from "react";

// const unitConversions = {
//     length: {
//         Meters: 1,
//         Kilometers: 0.001,
//         Miles: 0.000621371,
//         Feet: 3.28084,
//         Inches: 39.3701,
//         Centimeters: 100,
//         Millimeters: 1000,
//         Yards: 1.09361,
//     },
//     weight: {
//         Grams: 1,
//         Kilograms: 0.001,
//         Pounds: 0.00220462,
//         Ounces: 0.035274,
//         Stones: 0.000157473,
//     },
//     temperature: (value, from, to) => {
//         if (from === "Celsius" && to === "Fahrenheit") return (value * 9) / 5 + 32;
//         if (from === "Fahrenheit" && to === "Celsius") return ((value - 32) * 5) / 9;
//         if (from === "Celsius" && to === "Kelvin") return value + 273.15;
//         if (from === "Kelvin" && to === "Celsius") return value - 273.15;
//         return value; // same unit
//     },
//     time: {
//         Seconds: 1,
//         Minutes: 1 / 60,
//         Hours: 1 / 3600,
//         Days: 1 / 86400,
//     },
//     area: {
//         SquareMeters: 1,
//         SquareKilometers: 0.000001,
//         SquareFeet: 10.7639,
//         SquareYards: 1.19599,
//         Acres: 0.000247105,
//     },
//     volume: {
//         Liters: 1,
//         Milliliters: 1000,
//         CubicMeters: 0.001,
//         Gallons: 0.264172,
//     },
//     speed: {
//         "Meters per second": 1,
//         "Kilometers per hour": 3.6,
//         "Miles per hour": 2.23694,
//     },
// };

// const UnitConverter = () => {
//     const [unitType, setUnitType] = useState("length");
//     const [fromUnit, setFromUnit] = useState("Meters");
//     const [toUnit, setToUnit] = useState("Kilometers");
//     const [inputValue, setInputValue] = useState(1);
//     const [convertedValue, setConvertedValue] = useState(null);

//     const handleConvert = () => {
//         if (unitType === "temperature") {
//             setConvertedValue(unitConversions.temperature(inputValue, fromUnit, toUnit).toFixed(2));
//         } else {
//             setConvertedValue(
//                 ((inputValue * unitConversions[unitType][toUnit]) / unitConversions[unitType][fromUnit]).toFixed(2)
//             );
//         }
//     };

//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white px-6">
//             <div className="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-lg w-full text-center">
//                 <h1 className="text-3xl font-semibold mb-6 text-yellow-400">Unit Converter</h1>

//                 {/* Unit Type Selection */}
//                 <select
//                     value={unitType}
//                     onChange={(e) => {
//                         setUnitType(e.target.value);
//                         setFromUnit(Object.keys(unitConversions[e.target.value])[0]);
//                         setToUnit(Object.keys(unitConversions[e.target.value])[1]);
//                     }}
//                     className="w-full p-3 text-lg text-black rounded-lg mb-4 focus:ring-2 focus:ring-yellow-500"
//                 >
//                     {Object.keys(unitConversions).map((type) => (
//                         <option key={type} value={type}>
//                             {type.charAt(0).toUpperCase() + type.slice(1)}
//                         </option>
//                     ))}
//                 </select>

//                 {/* Input Field */}
//                 <div className="flex gap-4 mb-4">
//                     <input
//                         type="number"
//                         value={inputValue}
//                         onChange={(e) => setInputValue(e.target.value)}
//                         className="w-1/2 p-3 text-lg text-black rounded-lg focus:ring-2 focus:ring-yellow-500"
//                         placeholder="Enter value"
//                     />

//                     {/* From Unit Selection */}
//                     <select
//                         value={fromUnit}
//                         onChange={(e) => setFromUnit(e.target.value)}
//                         className="w-1/2 p-3 text-lg text-black rounded-lg focus:ring-2 focus:ring-yellow-500"
//                     >
//                         {Object.keys(unitConversions[unitType]).map((unit) => (
//                             <option key={unit} value={unit}>
//                                 {unit}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* To Unit Selection */}
//                 <div className="mb-4">
//                     <select
//                         value={toUnit}
//                         onChange={(e) => setToUnit(e.target.value)}
//                         className="w-full p-3 text-lg text-black rounded-lg focus:ring-2 focus:ring-yellow-500"
//                     >
//                         {Object.keys(unitConversions[unitType]).map((unit) => (
//                             <option key={unit} value={unit}>
//                                 {unit}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Convert Button */}
//                 <button
//                     onClick={handleConvert}
//                     className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-lg font-bold transition duration-200"
//                 >
//                     Convert
//                 </button>

//                 {/* Converted Value Display */}
//                 {convertedValue !== null && (
//                     <p className="mt-4 text-2xl font-semibold text-green-400">
//                         {inputValue} {fromUnit} = {convertedValue} {toUnit}
//                     </p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UnitConverter;

import { useState } from "react";
import { ArrowLeftRight } from "lucide-react"; // Icon for swap button

const unitConversions = {
    length: {
        Meters: 1,
        Kilometers: 0.001,
        Miles: 0.000621371,
        Feet: 3.28084,
        Inches: 39.3701,
        Centimeters: 100,
        Millimeters: 1000,
        Yards: 1.09361,
    },
    weight: {
        Grams: 1,
        Kilograms: 0.001,
        Pounds: 0.00220462,
        Ounces: 0.035274,
        Stones: 0.000157473,
    },
    temperature: {
        Celsius: "Celsius",
        Fahrenheit: "Fahrenheit",
        Kelvin: "Kelvin",
    },
    time: {
        Seconds: 1,
        Minutes: 1 / 60,
        Hours: 1 / 3600,
        Days: 1 / 86400,
    },
    area: {
        SquareMeters: 1,
        SquareKilometers: 0.000001,
        SquareFeet: 10.7639,
        SquareYards: 1.19599,
        Acres: 0.000247105,
    },
    volume: {
        Liters: 1,
        Milliliters: 1000,
        CubicMeters: 0.001,
        Gallons: 0.264172,
    },
    speed: {
        "Meters per second": 1,
        "Kilometers per hour": 3.6,
        "Miles per hour": 2.23694,
    },
};

const convertTemperature = (value, from, to) => {
    if (from === "Celsius" && to === "Fahrenheit") return (value * 9) / 5 + 32;
    if (from === "Fahrenheit" && to === "Celsius") return ((value - 32) * 5) / 9;
    if (from === "Celsius" && to === "Kelvin") return value + 273.15;
    if (from === "Kelvin" && to === "Celsius") return value - 273.15;
    if (from === "Fahrenheit" && to === "Kelvin") return ((value - 32) * 5) / 9 + 273.15;
    if (from === "Kelvin" && to === "Fahrenheit") return ((value - 273.15) * 9) / 5 + 32;
    return value;
};

const UnitConverter = () => {
    const [unitType, setUnitType] = useState("length");
    const [fromUnit, setFromUnit] = useState("Meters");
    const [toUnit, setToUnit] = useState("Kilometers");
    const [inputValue, setInputValue] = useState(1);
    const [convertedValue, setConvertedValue] = useState(null);

    const handleConvert = () => {
        if (unitType === "temperature") {
            setConvertedValue(convertTemperature(inputValue, fromUnit, toUnit).toFixed(2));
        } else {
            setConvertedValue(
                ((inputValue * unitConversions[unitType][toUnit]) / unitConversions[unitType][fromUnit]).toFixed(2)
            );
        }
    };

    const swapValues = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
        handleConvert();
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white px-6">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-lg w-full text-center">
                <h1 className="text-3xl font-semibold mb-6 text-yellow-400">Unit Converter</h1>

                {/* Unit Type Selection */}
                <select
                    value={unitType}
                    onChange={(e) => {
                        setUnitType(e.target.value);
                        const units = Object.keys(unitConversions[e.target.value]);
                        setFromUnit(units[0]);
                        setToUnit(units[1] || units[0]); // If only one unit available, set both to same
                    }}
                    className="w-full p-3 text-lg text-black rounded-lg mb-4 focus:ring-2 focus:ring-yellow-500"
                >
                    {Object.keys(unitConversions).map((type) => (
                        <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                    ))}
                </select>

                {/* Input Field & From Unit Selection */}
                <div className="flex gap-4 mb-4 items-center">
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-1/2 p-3 text-lg text-black rounded-lg focus:ring-2 focus:ring-yellow-500"
                        placeholder="Enter value"
                    />

                    <select
                        value={fromUnit}
                        onChange={(e) => setFromUnit(e.target.value)}
                        className="w-1/2 p-3 text-lg text-black rounded-lg focus:ring-2 focus:ring-yellow-500"
                    >
                        {Object.keys(unitConversions[unitType]).map((unit) => (
                            <option key={unit} value={unit}>
                                {unit}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Swap Button */}
                <button
                    onClick={swapValues}
                    className="bg-yellow-500 text-black px-5 py-2 mb-4 rounded-lg font-bold flex items-center justify-center mx-auto hover:bg-yellow-600 transition"
                >
                    <ArrowLeftRight className="w-5 h-5 mr-2" /> Swap
                </button>

                {/* To Unit Selection */}
                <div className="mb-4">
                    <select
                        value={toUnit}
                        onChange={(e) => setToUnit(e.target.value)}
                        className="w-full p-3 text-lg text-black rounded-lg focus:ring-2 focus:ring-yellow-500"
                    >
                        {Object.keys(unitConversions[unitType]).map((unit) => (
                            <option key={unit} value={unit}>
                                {unit}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Convert Button */}
                <button
                    onClick={handleConvert}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-lg font-bold transition duration-200"
                >
                    Convert
                </button>

                {/* Converted Value Display */}
                {convertedValue !== null && (
                    <p className="mt-4 text-2xl font-semibold text-green-400">
                        {inputValue} {fromUnit} = {convertedValue} {toUnit}
                    </p>
                )}
            </div>
        </div>
    );
};

export default UnitConverter;
