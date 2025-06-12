import React from 'react'
import Header from './Header.jsx'

export default function MainLayout({ children }) {
  return (
    <div className='w-full min-h-screen bg-white dark:bg-gray-800 flex flex-col'>
      <div className="z-50 self-start w-full sticky top-0">
        <Header />
      </div>
      <div className="self-center h-full w-full">
        {children}
      </div>
    </div>
  )
}
