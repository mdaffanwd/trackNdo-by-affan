import React from 'react'
import { SidebarContextProvider } from './SidebarContext.jsx'

export default function ProvidersWrapper({children}) {
  return (
    <SidebarContextProvider>
        {children}
    </SidebarContextProvider>
  )
}
