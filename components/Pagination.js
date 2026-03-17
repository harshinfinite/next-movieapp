'use client'
import React from 'react'
import { useContext } from 'react'
import { DataContext } from '../context/ApiContext'

const Pagination = () => {
  const { setPage, page, totalResults } = useContext(DataContext)

  const totalPages = Math.ceil(totalResults / 10)
  return (
    <div className='flex justify-center items-center gap-20 my-10'>
      <button className={`${page === 1 ? 'bg-gray-500' : 'bg-blue-500'} text-white rounded-full px-4 py-2 `} onClick={() => setPage(page - 1)} disabled={page === 1}>
        prev
      </button>
      <span className='flex gap-5 text-lg'>
        <span>
          {page}
        </span>
        <span>
          of
        </span>
        <span>
          {totalPages}
        </span>
      </span>
      <button className={`${page === totalPages ? 'bg-gray-500' : 'bg-blue-500'} text-white rounded-full px-4 py-2 `} onClick={() => setPage(page + 1)} disabled={page === totalPages}>
        next
      </button>
    </div>
  )
}

export default Pagination
