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

function App() {
  const { user } = useAuthContext()
  const { isLoading } = useContext(AuthContext)

  return (
    <div className="App">
      <BrowserRouter>
        <LoadingSpinner boolean={isLoading} />
        {user ? <Header /> : <></>}
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Main /> : <Navigate to="/login" />}
            />

            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/admin"
              element={user ? <Admin /> : <Navigate to="/login" />}
            />
            <Route
              path="/archives"
              element={user ? <Archives /> : <Navigate to="/login" />}
            />
            <Route
              path="/teachers"
              element={user ? <Teachers /> : <Navigate to="/login" />}
            />
            <Route
              path="/teachers/:id"
              element={user ? <Teacherlist /> : <Navigate to="/login" />}
            />
            <Route
              path="/signup"
              element={user ? <Signup /> : <Navigate to="/login" />}
            />
            <Route
              path="/debt/:id"
              element={user ? <Singlepage /> : <Navigate to="/login" />}
            />
            <Route
              path="/studentlist"
              element={user ? <Studentlist /> : <Navigate to="/login" />}
            />
            <Route
              path="/singleuser/:id"
              element={user ? <Singleuser /> : <Navigate to="/login" />}
            />
            <Route
              path="/addstudent"
              element={user ? <Addstudent /> : <Navigate to="/login" />}
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
