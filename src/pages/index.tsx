import Image from "next/image";
import { Inter } from "next/font/google";
import CityMatcher from "@/components/cityMatcher";
import {data} from "@/db/shortData";

import { useRouter } from 'next/router';


const inter = Inter({ subsets: ["latin"] });

const preMatchedData = data
export default function Home() {
  const router = useRouter();
  const handleAllButtonClick = () => {
    // Set continentName to 'All' to display all countries
    router.push('/');
  };
  return (
    <main
      className={`flex min-h-screen bg-gray-200 flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <CityMatcher countriesArr={preMatchedData} continentName="Global"/>
    </main>
  );
}
