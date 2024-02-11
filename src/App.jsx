import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";


//components import
import LoginPage from "./pages/LoginPage";
import { RegisterPage } from './pages/RegisterPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
