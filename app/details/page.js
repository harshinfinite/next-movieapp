'use client'
import React from 'react'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import { useContext } from 'react'
import { DataContext } from '../../context/ApiContext'

const details = () => {
  const { selectedMovie } = useContext(DataContext);
  return (
    <div>
      <Navbar />

      <div className="" >
        <Image className="" src={selectedMovie?.Poster && selectedMovie?.Poster !== 'N/A' ? selectedMovie?.Poster : '/placeholder.jpg'} alt={selectedMovie?.Title} width={40} height={60}/>
        <div className="">
          <h2>{selectedMovie?.Title}</h2>
          <p>{selectedMovie?.Year}</p>
          <p>{selectedMovie?.imdbRating}</p>
          <p>{selectedMovie?.Genre}</p>
          <p>{selectedMovie?.Plot}</p>
        </div>
      </div>

    </div>
  )
}

export default details
