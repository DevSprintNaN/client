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
import Insights from './features/insights/pages/insights';
import ViewForums from './features/forum/pages/view-forums';
import ViewSingleForum from './features/forum/pages/view-single-forum';

function App() {
  useProtection();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UnProtectedRoutes>
            <LandingPage />
          </UnProtectedRoutes>} />
          <Route path="/login" element={<UnProtectedRoutes >
            <LoginPage />
          </UnProtectedRoutes>} />
          <Route path="/register" element={<UnProtectedRoutes >
            <RegisterPage />
          </UnProtectedRoutes>} />
          <Route path="/account" element={<ProtectedRoute >
            <AccountPage />
          </ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute >
            <Project/>
          </ProtectedRoute>}/>
          <Route path="/view-project/:id" element={<ProtectedRoute >
            <ViewProjectContext/>
          </ProtectedRoute>}/>
          <Route path="/view-project/:id/add-file" element={<ProtectedRoute >
            <AddFileWithContext/>
          </ProtectedRoute>}/>
          <Route path="/view-project/:id/open-file/:type" element={<ProtectedRoute >
            <ViewerWithContext/>
          </ProtectedRoute>}/>  
          <Route path="/add-forum" element={<ProtectedRoute >
            <AddForum/>
          </ProtectedRoute>}/>
          <Route path="/view-forums" element={<ProtectedRoute >
            <ViewForums/>
          </ProtectedRoute>}/>
          <Route path="/view-forum/:id" element={<ProtectedRoute >
            <ViewSingleForum/>
          </ProtectedRoute>}/>
          <Route path="/insights" element={<ProtectedRoute >
            <Insights/>
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
