import HomePage from './pages/HomePage.jsx'
import ProvidersWrapper from './context/ProvidersWrapper.jsx'
import Toast from './components/ui/Toast.jsx'
import AuthPage from './pages/AuthPage';
import LandingPage from './pages/LandingPage.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import NotFoundPage from './pages/NotFoundPage.jsx'
import ProtectedRoute from './components/ui/ProtectedRoute.jsx';

export default function App() {

  return (
    <BrowserRouter>
      <ProvidersWrapper>
        <Toast />
        <Routes >
          <Route path='/' element={<LandingPage />} />
          <Route path='/sign-in' element={<AuthPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/home' element={<HomePage />} />
            {/* <Route path='/boards' element={<HomePage />} /> */}
          </Route>



          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ProvidersWrapper>
    </BrowserRouter>
  )
}
