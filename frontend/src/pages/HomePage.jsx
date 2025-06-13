import React from 'react'
import MainLayout from '../components/layouts/MainLayout.jsx'
import BoardsContainer from '../components/layouts/BoardsContainer.jsx'
import Sidebar from '../components/layouts/Sidebar.jsx'
import { useSidebar } from '../context/SidebarContext.jsx'

function HomePage() {
    const { isMobileSidebarOpen } = useSidebar()
    return (
        <main className='relative flex flex-row min-h-screen w-[100%] max-w-[1640px] m-auto'>
            <div className={` ${isMobileSidebarOpen ? "z-50 absolute bg-white translate-x-0" : "-translate-x-full"} `}>
                <Sidebar />
            </div>
            <MainLayout >
                <BoardsContainer />
            </MainLayout>
        </main>
    )
}

export default HomePage
