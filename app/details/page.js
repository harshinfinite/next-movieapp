'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useState, useEffect } from 'react'
import { DataContext } from '../../context/ApiContext'

const details = () => {
  const { selectedMovie } = useContext(DataContext);
  const [movieId, setMovieId] = useState(selectedMovie?.imdbID || null)
  const [movieDetails, setMovieDetails] = useState(null);

  const apiurl = 'https://www.omdbapi.com/';
  const apikey = '70516783';
  const apiurlById = `${apiurl}?i=${movieId}&apikey=${apikey}`;



  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movieId) return;
      try {
        const response = await fetch(apiurlById);
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    }
    fetchMovieDetails();
  }, [])



  return (
    <section className='bg-black flex justify-center items-center p-10'>

      <div className="bg-black/50 flex justify-center items-center flex-col border rounded-3xl border-white/20 w-[80vw] p-7" >
        <Image className="" src={movieDetails?.Poster && movieDetails?.Poster !== 'N/A' ? movieDetails?.Poster : '/wall.png'} alt={movieDetails?.Title || 'movie'} width={40} height={60} />
        <div className="">
          <h2 className=''>{movieDetails?.Title}</h2>
          <p className=''>{movieDetails?.Year}</p>
          <p className=''>{movieDetails?.imdbRating}</p>
          <p className=''>{movieDetails?.Genre}</p>
          <p className=''>{movieDetails?.Plot}</p>
        </div>
      </div>
      <p>
        <Link href='/' className='bg-blue-500 text-white rounded-full px-4 py-2'>Go Back Home</Link>
      </p>

    </section>

  )
}

export default details
