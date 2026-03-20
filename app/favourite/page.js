'use client'
import React from 'react'
import { useContext } from 'react'
import { DataContext } from '../../context/ApiContext'
import Image from 'next/image'
import Link from 'next/link'

const Favourite = () => {
    const { favourites, watchlist, setFavourites, setWatchlist,setSelectedMovie } = useContext(DataContext);


    const removeFavourites = (movie) => {
        setFavourites((prev) => prev.filter((fav) => fav.imdbID !== movie.imdbID))
    }

    const addWatchlist = (movie) => {
        const isAlreadyWatched = watchlist.some((watched) => watched.imdbID === movie.imdbID);
        if (isAlreadyWatched) {
            return;
        }
        setWatchlist((prev) => [...prev, movie])
    }

    const showDetails = (movie) => {
    // Implement logic to show movie details
    setSelectedMovie(movie) // Set the selected movie in context

  }
    return (
        <div>
            {favourites.length === 0 ? <p className='bg-black/25 p-40 text-3xl font-bold'>No favourites added yet.</p> :
                <div className="grid grid-cols-2 gap-4 p-4 m-5">
                    {favourites.map((movie) => {
                        return (
                            <div  className="" key={movie.imdbID}>
                                <Image className="cursor-pointer" onClick={() => showDetails(movie)} src={movie.Poster} alt={movie.Title} width={40} height={60} />
                                <div className="">
                                    <h2>{movie.Title}</h2>
                                    <p>{movie.Year}</p>
                                    <button onClick={() => removeFavourites(movie)}>Add to Favourites</button>
                                    <button onClick={() => addWatchlist(movie)}>Add to Watchlist</button>
                                    {/* <p>{movie.imdbRating}</p>
                            <p>{movie.Genre}</p>
                            <p>{movie.Plot}</p> */}
                                </div>
                                <p  className="cursor-pointer" onClick={() => showDetails(movie)}>
                                    <Link href='/details' className='bg-blue-500 text-white rounded-full px-4 py-2'>Show Details</Link>
                                </p>
                            </div>

                        )
                    })}
                </div>
                
                
            }
            <p>
                <Link href='/' className='bg-blue-500 text-white rounded-full px-4 py-2'>Go Back Home</Link>
            </p>
            
        </div>
    )
}

export default Favourite
