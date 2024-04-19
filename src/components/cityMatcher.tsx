import React, { useEffect, useState } from 'react';
import Link from "next/link";

interface Match {
    country: string;
    city: string;
    continent: string;
}

interface Props {
    countriesArr: Match[];
    continentName: string;
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
    const [countriesCount, setCountriesCount] = useState<number>(10);
    const randomizedArr = shuffleArray(countriesData);
    // console.log(randomizedArr.slice(0, countriesCount));
    useEffect(() => {
        if (continentName === 'Global') {
            // If continentName is 'All', display all countries
            setCountriesData(randomizedArr);
            setShuffledData(shuffleArray(randomizedArr));
        } else {
            // Otherwise, filter countries by the selected continent
            const countriesByContinent = props.countriesArr.filter((country: Match) => country.continent.toLowerCase() === continentName.toLowerCase());
            setCountriesData(countriesByContinent);
            setShuffledData(shuffleArray(countriesByContinent));
        }
    }, [continentName, countriesCount, props.countriesArr]);


    useEffect(() => {
        const limitedCountriesData = props.countriesArr.slice(0, countriesCount);
        setCountriesData((prevCountriesData) => {
            // Ensure that the previous state is used to avoid an infinite loop
            if (prevCountriesData.length !== limitedCountriesData.length) {
                return limitedCountriesData;
            }
            return prevCountriesData;
        });
        setShuffledData(shuffleArray(limitedCountriesData));
    }, [countriesCount, props.countriesArr]);


    const handleAllButtonClick = () => {
        // Set continentName to 'All' to display all countries
        setCountriesCount(-1);

    };

    const handleCapitalClick = (match: Match) => {
        if (match === selectedMatch) {
            const newPairedMatch = [...pairedData, match];
            setPairedData(newPairedMatch);
        }
        setSelectedMatch(null);
    };

    const handleResetClick = () => {
        setPairedData([]);
    };

    const isMatch = (match: Match) => pairedData.some((pairedMatch) => pairedMatch === match);

    // Extract unique continents from countriesData
    const uniqueContinents = countriesData.reduce((acc: string[], country) => {
        if (!acc.includes(country.continent)) {
            acc.push(country.continent);
        }
        return acc;
    }, []);

    // setting WIN status, when completing all matches
    const win = pairedData.length === countriesData.length;

    return (
        <div>
            <h1 className="text-center text-2xl my-3 font-black">Capital Match Game in - {continentName}</h1>
            {
                win && (
                    <div className="bg-green-300 text-green-950 font-bold text-center py-2 px-4 rounded transition duration-300">
                        You Win!!!
                    </div>
                )
            }
            <div className="flex gap-2 justify-center my-4">
                <Link href="/" className="bg-indigo-300 rounded px-4 py-2 hover:bg-indigo-700 hover:text-white transition ease-in duration-150">All</Link>
                {uniqueContinents.map((continent, index) => (
                    <Link href={`continent/${continent.toLowerCase()}`} key={index} className="bg-indigo-300 rounded px-4 py-2 hover:bg-indigo-700 hover:text-white transition ease-in duration-150">{continent}</Link>
                ))}
            </div>
            <div className="flex gap-2 justify-center my-4">
                <div>Select How many countries to see:</div>
                <button value="*" onClick={handleAllButtonClick}>All</button>
                <button value={5} onClick={() => setCountriesCount(5)}>5</button>
                <button value={10} onClick={() => setCountriesCount(10)}>10</button>
                <button value={15} onClick={() => setCountriesCount(15)}>15</button>
                <button value={20} onClick={() => setCountriesCount(20)}>20</button>
            </div>
            <div className="flex gap-5 justify-center">
                <div className="flex flex-col gap-2">
                    {countriesData.map((match, index) => (
                        <button
                            key={index}
                            className={`rounded px-4 py-2 text-white font-bold
                                hover:bg-gray-700 hover:scale-105 transition ease-in duration-300
                                ${isMatch(match) ? "bg-green-700" : "bg-indigo-300"}
                                ${selectedMatch === match && "bg-gray-900"}`}
                            onClick={() => setSelectedMatch(match)}
                        >
                            {match.country}
                        </button>
                    ))}
                </div>
                <div className="flex flex-col gap-2">
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
                <button className="bg-blue-300 rounded px-4 py-2" onClick={handleResetClick}>Restart</button>
            </div>
        </div>
    );
}

export default CityMatcher;
