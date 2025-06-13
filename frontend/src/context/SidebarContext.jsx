import { createContext, useContext, useState } from "react";

const SidebarContext = createContext(true)

export function SidebarContextProvider({ children }) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const [fullSidebar, setFullSidebar] = useState(true)

    const toggleMobileSidebar = () => setIsMobileSidebarOpen(prev => !prev)
    const toggleFullSidebar = () => {
        if (isMobileSidebarOpen === true) return
        setFullSidebar(prev => !prev)
    }

    return (
        <SidebarContext.Provider
            value={{ isMobileSidebarOpen, toggleMobileSidebar, fullSidebar, setFullSidebar, toggleFullSidebar }}
        >
            {children}
        </SidebarContext.Provider >
    )
}

export function useSidebar() {
    const context = useContext(SidebarContext)
    if (!context) throw new Error('useSidebar must be used inside SidebarProvider');
    return context;
}