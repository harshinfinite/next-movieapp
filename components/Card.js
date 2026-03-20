'use client'
import React from 'react'
import { useContext } from 'react'
import Image from 'next/image'
import { DataContext } from '@/context/ApiContext'
import { useRouter } from 'next/navigation'

const Card = () => {
  const { data, setFavourites, setWatchlist, favourites, watchlist, view, selectedMovie, setSelectedMovie, loading, error } = useContext(DataContext);

  const router = useRouter();

  const showDetails = (movie) => {
    // Implement logic to show movie details
    setSelectedMovie(movie) // Set the selected movie in context
    router.push('/details') // Navigate to the details page

  }

  const addFavourites = (movie) => {
    const isAlreadyFav = favourites.some((fav) => fav.imdbID === movie.imdbID);
    if (isAlreadyFav) {
      return;
    }
    setFavourites((prev) => [...prev, movie])
  }
  
 

  const addWatchlist = (movie) => {
    const isAlreadyWatched = watchlist.some((watched) => watched.imdbID === movie.imdbID);
    if (isAlreadyWatched) {
      return;
    }
    setWatchlist((prev) => [...prev, movie])
  }

  return (
    <>
      {loading ? <p className='bg-black/25 p-40 text-3xl font-bold'>Loading...</p> : error ? <p>Failed to load data. Please try again later.</p> :
        <div className="grid grid-cols-2 gap-4 p-4 m-5">

         { data.map((movie) => {
            return (
              <div  className="" key={movie.imdbID}>
                <Image onClick={() => showDetails(movie)}  className="cursor-pointer" src={movie.Poster} alt={movie.Title} width={40} height={60} />
                <div className="">
                  <h2>{movie.Title}</h2>
                  <p>{movie.Year}</p>
                  <button className='cursor-pointer' onClick={() => addWatchlist(movie)}>Add to Watchlist</button>
                  <button className='cursor-pointer' onClick={() => addFavourites(movie)}>Add to Favourites</button>
                  {/* <p>{movie.imdbRating}</p>
            <p>{movie.Genre}</p>
            <p>{movie.Plot}</p> */}
                </div>
              </div>
            )
          })}


        </div>
      }
    </>
  )
}

export default Card
