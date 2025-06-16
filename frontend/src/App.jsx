import HomePage from './pages/HomePage.jsx'
import ProvidersWrapper from './context/ProvidersWrapper.jsx'
import Toast from './components/ui/Toast.jsx'
import AuthPage from './pages/AuthPage';
import LandingPage from './pages/LandingPage.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {

  return (
    <BrowserRouter>
      <ProvidersWrapper>
        <Toast />
        <Routes >
          <Route path='/' element={<LandingPage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/home' element={<HomePage />} />



          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ProvidersWrapper>
    </BrowserRouter>
  )
}
