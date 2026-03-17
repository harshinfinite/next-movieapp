'use client'
import React from 'react'
import { createContext } from 'react'
import { useEffect,useState } from 'react'

const DataContext = createContext(null)

const apiurl = 'https://www.omdbapi.com/';
const apikey = '70516783';

const ApiProvider = ({children}) => {
  const [favourites, setFavourites] = useState([])
  const [watchlist, setWatchlist] = useState([])
    const [data, setData] = useState([])
    const [query, setQuery] = useState('avengers')
    const [page, setPage] = useState(1) 
    const [totalResults, setTotalResults] = useState(0)
    const [view, setView] = useState('home')
    const [selectedMovie, setSelectedMovie] = useState(null)
    

      useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiurl}?s=${query}&apikey=${apikey}&page=${page}`)
        const result = await response.json()
        setData(result.Search ?? [])
        setTotalResults((result.totalResults) || 0)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }
    fetchData()
  }, [query,page])

  return (
    <DataContext.Provider value={{data, query, setQuery, page, setPage, totalResults, favourites, setFavourites, watchlist, setWatchlist, view, setView, selectedMovie, setSelectedMovie}}>
        {children}
    </DataContext.Provider>
  )
}

export default ApiProvider
export {DataContext}
