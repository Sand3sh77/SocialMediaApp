import { useContext } from 'react';
import './App.scss'
import Leftbar from './components/leftbar/leftbar';
import Navbar from './components/navbar/navbar';
import Rightbar from './components/rightbar/rightbar';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Profile from './pages/profile/profile';
import Register from './pages/register/register';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { DarkModeContext } from './context/darkmodeContext';
import { AuthContext } from './context/authContext';

function App() {

  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Leftbar />
          <div style={{ flex: '6'}}>
            <Outlet />
          </div>
          <Rightbar />
        </div>
      </div>
    );
  }

  const ProtectedRoute = ({ children }) => {
    if (!currentUser.loginStatus) {
      return <Navigate to="/login" />;
    }
    return children;
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/profile/:id',
          element: <Profile />
        },
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <RouterProvider router={router} className="main" />
  )
}

export default App;
