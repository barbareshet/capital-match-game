import Image from "next/image";
import { Inter } from "next/font/google";
import CityMatcher from "@/components/cityMatcher";
import {data} from "@/db/data";

const inter = Inter({ subsets: ["latin"] });

const preMatchedData = data
export default function Home() {
  return (
    <main
      className={`flex min-h-screen bg-gray-200 flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <CityMatcher countriesArr={preMatchedData} continentName="Global"/>
    </main>
  );
}
