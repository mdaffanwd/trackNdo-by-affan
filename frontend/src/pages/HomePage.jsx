import React from 'react';
import MainLayout from '../components/layouts/MainLayout.jsx';
import BoardsContainer from '../components/layouts/BoardsContainer.jsx';
import Sidebar from '../components/layouts/Sidebar.jsx';
import { useSidebar } from '../context/SidebarContext.jsx';

export default function HomePage() {
    const { isMobileSidebarOpen } = useSidebar();

    return (
        <main className="flex relative min-h-screen w-full max-w-[1640px] mx-auto">
            {/* Sidebar wrapper: slides on mobile, static on desktop */}
            <div
                className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 
                    ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:relative sm:translate-x-0 sm:z-auto`}
            >
                <Sidebar />
            </div>

            {/* Main content */}
            <MainLayout>
                <BoardsContainer />
            </MainLayout>
        </main>
    );
}
