import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
//components import
import LoginPage from "./features/login/pages/LoginPage";
import { RegisterPage } from './features/register/pages/RegisterPage';
import AccountPage from './features/profile/pages/AccountPage';
import LandingPage from './features/public-page/pages/LandingPage';
import Project from './features/project/pages/project';
import ViewProject from './features/view-project/pages/view-project';
import Error404 from './pages/error404';
import Error500 from './pages/error500';
import Error401 from './pages/error401403';
import AddFilePage from './features/view-project/pages/add-file';

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
          <Route path="/view-project/:id" element={<ViewProject/>}/>
          <Route path="/view-project/:id/add-file" element={<AddFilePage/>}/>
          <Route path="/health" element={<div>
            <h1>Health</h1>
            <p>Server: {import.meta.env.VITE_BASE_URL}</p>
          </div>} />
          <Route path="/error500" element={<Error500/>}/>
          <Route path="/error401" element={<Error401/>}/>
          <Route path="*" element={<Error404/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
