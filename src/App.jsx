import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./features/authentication/pages/LoginPage";
import { RegisterPage } from './features/authentication/pages/RegisterPage';
import AccountPage from './features/profile/pages/AccountPage';
import LandingPage from './pages/LandingPage';
import Project from './features/project/pages/project';
import Error404 from './pages/error404';
import Error500 from './pages/error500';
import Error401 from './pages/error401403';
import ViewProjectContext from './features/view-project/pages/view-project-with-context';
import AddFileWithContext from './features/view-project/pages/add-file-with-context';
import ViewerWithContext from './features/view-project/pages/viewer-with-context';
import ProtectedRoute from './components/ProtectedRoute';
import UnProtectedRoutes from './components/UnProtectedRoute';
import { useProtection } from './hooks/useProtection';
import AddForum from './features/forum/pages/add-forum';

function App() {

  const {authenticated}=useProtection();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UnProtectedRoutes authentication={authenticated}>
            <LandingPage />
          </UnProtectedRoutes>} />
          <Route path="/login" element={<UnProtectedRoutes  authentication={authenticated}>
            <LoginPage />
          </UnProtectedRoutes>} />
          <Route path="/register" element={<UnProtectedRoutes  authentication={authenticated}>
            <RegisterPage />
          </UnProtectedRoutes>} />
          <Route path="/account" element={<ProtectedRoute  authentication={authenticated}>
            <AccountPage />
          </ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute  authentication={authenticated}>
            <Project/>
          </ProtectedRoute>}/>
          <Route path="/view-project/:id" element={<ProtectedRoute  authentication={authenticated}>
            <ViewProjectContext/>
          </ProtectedRoute>}/>
          <Route path="/view-project/:id/add-file" element={<ProtectedRoute  authentication={authenticated}>
            <AddFileWithContext/>
          </ProtectedRoute>}/>
          <Route path="/view-project/:id/open-file/:type" element={<ProtectedRoute  authentication={authenticated}>
            <ViewerWithContext/>
          </ProtectedRoute>}/>  
          <Route path="/add-forum" element={<ProtectedRoute  authentication={authenticated}>
            <AddForum/>
          </ProtectedRoute>}/>
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
