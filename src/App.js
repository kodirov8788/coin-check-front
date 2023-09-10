import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Login from './pages/Login'
import Signup from './pages/Signup'
// import Navbar from './components/navbar/Navbar'
import Main from './pages/Main/Main'
import Singlepage from './pages/singlepage/Singlepage'
import Header from './components/header/Header'
import LoadingSpinner from './components/loaderSpinner/LoaderSpinner'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import Admin from './pages/admin/Admin'
import Singleuser from './pages/singleuser/Singleuser'
import Archives from './pages/archives/Archives'
import Teachers from './pages/teachers/Teachers'
import Teacherlist from './pages/teacherlist/Teacherlist'
import Addstudent from './pages/addStudent/Addstudent'
import Studentlist from './pages/studentList/Studentlist'
import Clientwatch from './pages/clientWatch/Clientwatch'
import Teacherupdate from './pages/teacherUpdate/Teacherupdate'
import Searchstudent from './pages/searchStudent/Searchstudent'
import Statistics from './pages/statistics/Statistics'
import { ToastContainer, toast } from 'react-toastify';
import PrivateRoute from './PrivateRoute'

function App() {
  const { user } = useAuthContext()
  const { isLoading } = useContext(AuthContext)
  console.log(user)
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <LoadingSpinner boolean={isLoading} />
        {user ? <Header /> : <></>}
        <div className="pages">
          <PrivateRoute path="/" element={<Main />} authenticated={user} />
          <PrivateRoute path="/admin" element={<Admin />} authenticated={user} />
          <PrivateRoute path="/archives" element={<Archives />} authenticated={user} />
          <PrivateRoute path="/teachers" element={<Teachers />} authenticated={user} />
          <PrivateRoute path="/teacherupdate/:id" element={<Teacherupdate />} authenticated={user} />
          <PrivateRoute path="/teachers/:id" element={<Teacherlist />} authenticated={user} />
          <PrivateRoute path="/signup" element={<Signup />} authenticated={user} />
          <PrivateRoute path="/debt/:id" element={<Singlepage />} authenticated={user} />
          <PrivateRoute path="/studentlist" element={<Studentlist />} authenticated={user} />
          <PrivateRoute path="/singleuser/:id" element={<Singleuser />} authenticated={user} />
          <PrivateRoute path="/addstudent" element={<Addstudent />} authenticated={user} />
          <PrivateRoute path="/searchstudent" element={<Searchstudent />} authenticated={user} />
          <PrivateRoute path="/statistics" element={<Statistics />} authenticated={user} />
          <Routes>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/client"
              element={<Clientwatch />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
