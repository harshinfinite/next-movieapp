
import Image from "next/image";
import Card from "@/components/Card";
import Slider from "@/components/Slider";
import Pagination from "@/components/Pagination";

export default function Home() {



  return (
    <div className='bg-gray-900 text-white min-h-screen'>
      <Slider images={['first.jpg',
        'godfather.jpg',
        'horror.jpg',
        'kahani.jpg',
        'psd.jpg']} />
      <Card />
      <Pagination />


    </div>
  );
}
