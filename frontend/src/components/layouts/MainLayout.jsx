import React from 'react'
import Header from './Header.jsx'

export default function MainLayout({ children }) {
  return (
    <div className='relative w-full min-h-screen bg-white dark:bg-gray-800 flex flex-col'>
      <Header />
      <div className="self-center h-full w-full">
        {children}
      </div>
    </div>
  )
}
