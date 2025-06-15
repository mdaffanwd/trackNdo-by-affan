import { createContext, useContext, useEffect } from "react";
import { getCurrentGoogleAuthLoggedInUserApi, googleAuthLoginApi, logoutGoogleAuthUserApi } from "../services/googleAuthService.js";

const GoogleAuthContext = createContext({
    user: null,
    isAuthenticated: false,
    error: null,
    googleAuthLogin: async (idToken) => { },
    googleAuthLogout: async () => { },
});

export function GoogleAuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);


    async function googleAuthLogin(idToken) {
        setError(null)
        try {
            await googleAuthLoginApi(idToken)
            // Re‑fetch user from server
            const { user: fetchedUser } = await getCurrentGoogleAuthLoggedInUserApi();
            setUser(fetchedUser)
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
            isAuthenticated,
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