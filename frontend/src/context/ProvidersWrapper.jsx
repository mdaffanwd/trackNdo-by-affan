import { GoogleOAuthProvider } from '@react-oauth/google';

import { SidebarContextProvider } from './SidebarContext.jsx'
import { GoogleAuthContextProvider } from './GoogleAuthContext.jsx'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function ProvidersWrapper({ children }) {

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleAuthContextProvider>
        <SidebarContextProvider>
          {children}
        </SidebarContextProvider>
      </GoogleAuthContextProvider>
    </GoogleOAuthProvider>
  )
}
