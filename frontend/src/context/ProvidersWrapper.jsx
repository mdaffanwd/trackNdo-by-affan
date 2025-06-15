import React from 'react'
import { SidebarContextProvider } from './SidebarContext.jsx'
import { GoogleAuthContextProvider } from './GoogleAuthContext.jsx'

export default function ProvidersWrapper({ children }) {
  return (
    <GoogleAuthContextProvider>
      <SidebarContextProvider>
        {children}
      </SidebarContextProvider>
    </GoogleAuthContextProvider>
  )
}
