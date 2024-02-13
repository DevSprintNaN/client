import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
//components import
import LoginPage from "./pages/LoginPage";
import { RegisterPage } from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import LandingPage from './pages/LandingPage';
import Project from './features/project/pages/project';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/projects" element={<Project/>}/>
          <Route path="/health" element={<div>
            <h1>Health</h1>
            <p>Server: {import.meta.env.VITE_BASE_URL}</p>
          </div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
