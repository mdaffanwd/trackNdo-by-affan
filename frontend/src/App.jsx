import Sidebar from './components/layouts/Sidebar.jsx'
import Header from './components/layouts/Header.jsx'
import BoardsContainer from './components/layouts/BoardsContainer.jsx'
import AddTaskDialog from './components/dialogs/AddTaskDialog.jsx'
import useDarkMode from './hooks/useDarkMode.js'
import SignIn from './components/layouts/SignIn';
import MainLayout from './components/layouts/MainLayout.jsx'
import SignUp from './components/layouts/SignUp.jsx'

export default function App() {
  return (
    <>
      {/* <Header /> */}
      <main className='flex flex-row min-h-screen w-[100%] max-w-[1640px] m-auto'>
        <Sidebar />
        <MainLayout>
          {/* <SignIn /> */}
          {/* <SignUp /> */}
          <BoardsContainer />
        </MainLayout>
      </main>
    </>
  )
}
