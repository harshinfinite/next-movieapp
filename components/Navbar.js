"use client"
import React, { use } from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { useContext } from 'react'
import { DataContext } from '../context/ApiContext'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const {setQuery,setPage,favourites,watchlist,setView,view} = useContext(DataContext)

  const router = useRouter();

  const showFav = () => {
      router.push('/favourite')
  }
 
  const showWatchlist = () => {
    
      router.push('/watchlist')
     
  }

  
  const [value, setValue] = useState('')
  return (
    <div className='flex justify-around items-center bg-gray-800 text-white p-4'>
      <div className="logo">
        <Image src='/wall.png' alt='icon' width={60} height={60}/>
      </div>
      <div className={`cursor-pointer ${view === 'favourites' && 'bg-blue-500 text-white'}`} onClick={showFav}>
        Favourites {favourites.length > 0 && <span className='bg-red-500 text-white rounded-full px-2'>{favourites.length}</span>}
      </div>
      <div className={`cursor-pointer ${view === 'watchlist' && 'bg-blue-500 text-white'}`} onClick={showWatchlist}>
        WatchList {watchlist.length > 0 && <span className='bg-red-500 text-white rounded-full px-2'>{watchlist.length}</span>}
      </div>
      <form action="" onSubmit={(e) => {
        e.preventDefault()
        if(value.trim() === '') return ;
        setPage(1)
        setQuery(value)
      }}>
        <div className="search">
          <input className='border border-white/5 rounded-full p-2' type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
          <button className='bg-blue-500 text-white rounded-full px-4 py-2 ml-2' type="submit">Search</button>
        </div>
      </form>

    </div>
  )
}

export default Navbar
