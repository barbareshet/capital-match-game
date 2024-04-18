"use client";
import React from 'react';
import {data} from "@/db/data";

interface Match {
    country: string,
    capital: string
}

const preMatchedData = data
function CityMatcher() {

    return (
        <div>
            <h1 className="text-center text-2xl my-3 font-black">Capital Match Game</h1>
            <div className="flex gap-5">
                <div className="flex flex-col gap-2">
                    {
                        preMatchedData.map( (match, index) => (
                            <button key={index}
                                    className="bg-gray-500 rounded px-4 py-2 text-white font-bold
                                    hover:bg-gray-700 hover:scale-105 transition ease-in"
                            >
                                {match.country}
                            </button>
                        ) )
                    }
                </div>
                <div className="flex flex-col gap-2">
                    {
                        preMatchedData.map( (match, index) => (
                            <button key={index}
                                    className="bg-gray-500 rounded px-4 py-2 text-white font-bold
                                    hover:bg-gray-700 hover:scale-105 transition ease-in"
                            >
                                {match.city}
                            </button>
                        ) )
                    }
                </div>
            </div>
        </div>
    );
}

export default CityMatcher;
