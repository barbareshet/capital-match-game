"use client";
import React, {useEffect, useState} from 'react';
import {data} from "@/db/data";
import commander from "commander";
import Link from "next/link";
interface Match {
    country: string,
    capital: string,
    continent: string
}



const shuffleArray = (matchingData: Match[]) => {
    return matchingData.slice().sort(() => Math.random() - 0.5);
    // return shuffledData.slice(0, length);
};



function CityMatcher(props) {
    const {countriesArr, continentName} = props
    const [shuffledData, setShuffledData] = useState<Match[]>(countriesArr);
    const [countriesData, setCountriesData] = useState<Match[]>(countriesArr);
    const [pairedData, setPairedData] = useState<Match[]>([]);
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
    const [filter, setFilter] = useState('');
    const [length, setLength] = useState<Match[]>(10)

    useEffect(() => {
        setShuffledData(shuffleArray(countriesArr));
        // setCountriesData(countriesArr.slice(0,length))
    }, [length]);

    const handleCapitalClick = (match: Match) => {
        if (match === selectedMatch){
            const newPairedMatch = [...pairedData, match]
            setPairedData(newPairedMatch);
        }
        console.log(pairedData);
        setSelectedMatch(null)
    }
    // Use reduce to collect unique continents into an array
    const uniqueContinents = countriesArr.reduce((acc, country) => {
        // Add the continent to the accumulator array if it doesn't exist
        if (!acc.includes(country.continent)) {
            acc.push(country.continent);
        }
        return acc;
    }, []);
    //reset game
    const handleResetClick = () => {
        setPairedData([]);
    }
    const handleGameLength = (e) => {
        const gameLength = parseInt(e.target.value);
        setLength(gameLength);
    };
    console.log(props)
    // setting WIN status, when completing all matches
    const win = pairedData.length === countriesArr.length;
    //setting correct match for buttons
    const isMatch = (match: Match) => pairedData.some((pairedMatch) => pairedMatch === match)
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
                <Link href="/"
                      className="bg-indigo-300 rounded px-4 py-2 hover:bg-indigo-700
                            hover:text-white transition ease-in duration-150"
                >
                    All
                </Link>
                {
                    uniqueContinents.map( (continent, index) => (
                        <Link href={`continent/${continent.toLowerCase()}`}
                            key={index}
                            className="bg-indigo-300 rounded px-4 py-2 hover:bg-indigo-700
                            hover:text-white transition ease-in duration-150"
                        >{continent}
                        </Link>
                    ))
                }

            </div>
            {/*<div className="flex gap-2 justify-center my-4">*/}
            {/*    <span>How many countries?</span>*/}
            {/*    <button*/}
            {/*        className="bg-indigo-300 rounded px-4 py-2 hover:bg-indigo-700*/}
            {/*                hover:text-white transition ease-in duration-150"*/}
            {/*        value="5"*/}
            {/*        onClick={(e) => handleGameLength(e)}*/}
            {/*    >5</button>*/}
            {/*    <button*/}
            {/*        className="bg-indigo-300 rounded px-4 py-2 hover:bg-indigo-700*/}
            {/*                hover:text-white transition ease-in duration-150"*/}
            {/*        value="10"*/}
            {/*        onClick={(e) => handleGameLength(e)}*/}
            {/*    >10</button>*/}
            {/*    <button*/}
            {/*        className="bg-indigo-300 rounded px-4 py-2 hover:bg-indigo-700*/}
            {/*                hover:text-white transition ease-in duration-150"*/}
            {/*        value="15"*/}
            {/*        onClick={(e) => handleGameLength(e)}*/}
            {/*    >15</button>*/}
            {/*</div>*/}
            <div className="flex gap-5 justify-center">
                <div className="flex flex-col gap-2">
                    {
                        countriesData.map( (match, index) => (
                            <button key={index}
                                    className={`rounded px-4 py-2 text-white font-bold
                                    hover:bg-gray-700 hover:scale-105 transition ease-in duration-300
                                    ${isMatch(match) ? "bg-green-700": "bg-gray-500"}
                                    ${selectedMatch === match && "bg-gray-900"}
                                    `}
                                    onClick={ () => setSelectedMatch(match) }
                            >
                                {match.country}
                            </button>
                        ) )
                    }
                </div>
                <div className="flex flex-col gap-2">
                    {
                        shuffledData.map( (match, index) => (
                            <button key={index}
                                    className={`rounded px-4 py-2 text-white font-bold
                                    ${selectedMatch !== null ? "hover:bg-gray-700 hover:scale-105 transition ease-in duration-300" : "cursor-not-allowed"}"
                                    ${isMatch(match) ? "bg-green-700": "bg-gray-500"}`}
                                    onClick={ () => handleCapitalClick(match) }
                                    disabled={selectedMatch === null}
                            >
                                {match.city}
                            </button>
                        ) )
                    }
                </div>
            </div>
            <div className="flex justify-center my-4">
                <button
                    className="bg-blue-300 rounded px-4 py-2"
                    onClick={handleResetClick}
                >
                    Restart
                </button>
            </div>
        </div>
    );
}

export default CityMatcher;
