import React, { useEffect, useState } from 'react';

import Link from "next/link";

interface Match {
    country: string;
    city: string; // Add the city property here
    continent: string;
}

interface Props {
    countriesArr: Match[]; // Adjust the type according to your data structure
    continentName: string; // Assuming continentName is a string
}



const shuffleArray = (matchingData: Match[]) => {
    return matchingData.slice().sort(() => Math.random() - 0.5);
};

function CityMatcher(props: Props) {
    const { countriesArr, continentName } = props;
    const [shuffledData, setShuffledData] = useState<Match[]>(countriesArr);
    const [countriesData, setCountriesData] = useState<Match[]>(countriesArr);
    const [pairedData, setPairedData] = useState<Match[]>([]);
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
    const [length, setLength] = useState<number>(10); // Adjusted initial state type


    useEffect(() => {
        setShuffledData(shuffleArray(countriesArr));
        // Filter countries by the selected continent
        const countriesByContinent = countriesArr.filter((country: Match) => country.continent.toLowerCase() === continentName.toLowerCase());
        setCountriesData(countriesByContinent);
    }, [continentName, countriesArr]); // Add continentName and countriesArr to the dependency array


    const handleCapitalClick = (match: Match) => {
        if (match === selectedMatch) {
            const newPairedMatch = [...pairedData, match];
            setPairedData(newPairedMatch);
        }
        setSelectedMatch(null);
    };


    const uniqueContinents = countriesArr.reduce((acc: string[], country) => {
        if (!acc.includes(country.continent)) {
            acc.push(country.continent);
        }
        return acc;
    }, []);



    const handleResetClick = () => {
        setPairedData([]);
    };

    const isMatch = (match: Match) => pairedData.some((pairedMatch) => pairedMatch === match);

    return (
        <div>
            <h1 className="text-center text-2xl my-3 font-black">Capital Match Game in - {continentName}</h1>
            <div className="flex gap-2 justify-center my-4">
                <Link href="/"
                      className="bg-indigo-300 rounded px-4 py-2 hover:bg-indigo-700 hover:text-white transition ease-in duration-150">
                    All
                </Link>
                {uniqueContinents.map((continent, index) => (
                    <Link href={`continent/${continent.toLowerCase()}`} key={index}
                          className="bg-indigo-300 rounded px-4 py-2 hover:bg-indigo-700 hover:text-white transition ease-in duration-150">
                        {continent}
                    </Link>
                ))}
            </div>
            <div className="flex gap-5 justify-center">
                <div className="flex flex-row flex-wrap justify-between gap-2">
                    {countriesData.map((match, index) => (
                        <button key={index}
                                className={`rounded px-4 py-2 text-white font-bold
                            hover:bg-gray-700 hover:scale-105 transition ease-in duration-300
                            ${isMatch(match) ? "bg-green-700" : "bg-indigo-300"}
                            ${selectedMatch === match && "bg-gray-900"}`}
                                onClick={() => setSelectedMatch(match)}>
                            {match.country}
                        </button>
                    ))}
                </div>
                <div className="flex flex-row flex-wrap justify-between gap-2">
                    {shuffledData.map((match, index) => (
                        <button
                            key={index}
                            className={`rounded px-4 py-2 text-white font-bold
                            ${selectedMatch !== null ? "hover:bg-gray-700 hover:scale-105 transition ease-in duration-300" : "cursor-not-allowed"}
                            ${isMatch(match) ? "bg-green-700" : "bg-blue-300"}`}
                            onClick={() => handleCapitalClick(match)}
                            disabled={selectedMatch === null}
                        >
                            {match.city}
                        </button>

                    ))}
                </div>
            </div>
            <div className="flex justify-center my-4">
                <button className="bg-blue-300 rounded px-4 py-2" onClick={handleResetClick}>
                    Restart
                </button>
            </div>
        </div>
    );
}

export default CityMatcher;
