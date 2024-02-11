import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";


//components import
import LoginPage from "./pages/LoginPage";
import { RegisterPage } from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import LandingPage from './pages/LandingPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
