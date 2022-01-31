import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'
import Survey from './pages/survey/Survey';
import Newsletter from './pages/newsletter/Newsletter';
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useAuthContext } from './hooks/useAuthContext';

//Styles
import './App.css'

function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && 
        <BrowserRouter>
        {user && <Sidebar />}
        <div className="container">
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/survey" element={user ? <Survey /> : <Navigate to="/login" />} />
            <Route path="/news" element={user ? <Newsletter /> : <Navigate to="/login" />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
        }
    </div>
  );
}

export default App
