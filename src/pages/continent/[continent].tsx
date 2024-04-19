import React from "react";
import { useRouter } from 'next/router';
import { data } from '@/db/data';
import CityMatcher from "@/components/cityMatcher";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface Match {
    country: string;
    city: string;
    continent: string;
}

const preMatchedData = data;

const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const ContinentPage = () => {
    const router = useRouter();
    const { continent } = router.query;

    if (typeof continent !== 'string') {
        return <div>Loading...</div>;
    }

    // Convert continent name in URL to lowercase and remove spaces
    const normalizedContinentName = continent.toLowerCase().replace(/\s/g, '-');

    // Find continent data by matching the normalized name
    const continentData = preMatchedData.find((item: Match) =>
        item.continent.toLowerCase().replace(/\s/g, '-') === normalizedContinentName
    );

    if (!continentData) {
        return <div>Continent not found</div>;
    }

    // Capitalize and add spaces to the continent name for display
    const continentName = continentData.continent
        .split(' ')
        .map(word => capitalizeFirstLetter(word))
        .join(' ');

    // Filter countries by the selected continent
    const countriesByContinent = preMatchedData.filter((country: Match) =>
        country.continent.toLowerCase().replace(/\s/g, '-') === normalizedContinentName
    );

    return (
        <main className={`flex min-h-screen bg-gray-200 flex-col items-center justify-between p-24 ${inter.className}`}>
            <CityMatcher countriesArr={countriesByContinent} continentName={continentName}/>
        </main>
    );
};

export default ContinentPage;
