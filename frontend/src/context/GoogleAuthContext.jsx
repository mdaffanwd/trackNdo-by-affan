import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentGoogleAuthLoggedInUserApi, googleAuthSigninApi, logoutGoogleAuthUserApi } from "../services/googleAuthService.js";
import { useNavigate } from "react-router";

const GoogleAuthContext = createContext({
    user: null,
    isAuthenticated: false,
    error: null,
    googleAuthLogin: async (idToken) => { },
    googleAuthLogout: async () => { },
});

export function GoogleAuthContextProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);


    async function googleAuthLogin(idToken) {
        setError(null)
        try {
            const { user: loggedInUser } = await googleAuthSigninApi(idToken);
            setUser(loggedInUser);

            navigate('/home', { replace: true });
        } catch (error) {
            console.error('Google login failed', error);
            setError(error);
            setUser(null);
        }
    }

    async function googleAuthLogout() {
        setError(null);
        try {
            await logoutGoogleAuthUserApi();
            setUser(null);
        } catch (err) {
            console.error('Logout failed', err);
            setError(err);
        }
    }

    // On mount, check for existing session (HTTP‑only cookie)
    useEffect(() => {
        (async function fetchCurrentUser() {
            setError(null);
            try {
                const { user: fetchedCurrentUser } = await getCurrentGoogleAuthLoggedInUserApi()
                setUser(fetchedCurrentUser)
            } catch (error) {
                setError(error)
                setUser(null);
            }
        })()
    }, [])

    return (
        <GoogleAuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            error,
            googleAuthLogin,
            googleAuthLogout
        }} >
            {children}
        </GoogleAuthContext.Provider>
    )
}

export function useGoogleAuth() {
    return useContext(GoogleAuthContext)
}