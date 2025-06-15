import Sidebar from './components/layouts/Sidebar.jsx'
import Header from './components/layouts/Header.jsx'
import BoardsContainer from './components/layouts/BoardsContainer.jsx'
import AddTaskDialog from './components/dialogs/AddTaskDialog.jsx'
import useDarkMode from './hooks/useDarkMode.js'
import SignIn from './components/layouts/SignIn';
import MainLayout from './components/layouts/MainLayout.jsx'
import SignUp from './components/layouts/SignUp.jsx'
import HomePage from './pages/HomePage.jsx'
import ProvidersWrapper from './context/ProvidersWrapper.jsx'
import Toast from './components/ui/Toast.jsx'
import AuthPage from './pages/AuthPage';

export default function App() {
  return (
    <ProvidersWrapper>
      <Toast />
      <HomePage />
      {/* <Header /> */}
      {/* <AuthPage /> */}
      {/* <main className='flex flex-row min-h-screen w-[100%] max-w-[1640px] m-auto'>
        <Sidebar />
        <MainLayout>
          <BoardsContainer />
        </MainLayout>
      </main> */}
    </ProvidersWrapper>
  )
}
