// pages/[continent].tsx
import React from "react";
import { useRouter } from 'next/router';
import { data } from '@/db/data';
import CityMatcher from "@/components/cityMatcher";
import {Inter} from "next/font/google";
const inter = Inter({ subsets: ["latin"] })
interface Match {
    country: string;
    capital: string;
    continent: string;
}
const preMatchedData = data
const ContinentPage = () => {
    const router = useRouter();
    const { continent } = router.query;

    if (typeof continent !== 'string') {
        return <div>Loading...</div>;
    }

    // Filter countries by the selected continent
    const countriesByContinent = preMatchedData.filter((country: Match) => country.continent.toLowerCase() === continent.toLowerCase());

    return (
        <main
            className={`flex min-h-screen bg-gray-200 flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <CityMatcher countriesArr={countriesByContinent} continentName={continent.toLocaleUpperCase()}/>
        </main>
    );
};

export default ContinentPage;
