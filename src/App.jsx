import { useContext } from 'react';
import './App.scss'
import Leftbar from './components/leftbar/leftbar';
import Navbar from './components/navbar/navbar';
import Rightbar from './components/rightbar/rightbar';
import Chat from './components/chat/chat';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Profile from './pages/profile/profile';
import Register from './pages/register/register';
import Story from './pages/story/story';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { DarkModeContext } from './context/darkmodeContext';
import { AuthContext } from './context/authContext';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {

  const { darkMode } = useContext(DarkModeContext);
  const { userToken } = useContext(AuthContext);

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
          <Navbar />
          <div style={{ display: "flex" }}>
            <Leftbar />
            <div style={{ flex: '6' }}>
              <Outlet />
            </div>
            <Rightbar />
          </div>
        </div>
      </QueryClientProvider >
    );
  }

  const ProtectedRoute = ({ children }) => {
    if (!userToken) {
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
    {
      path: "/story/:id",
      element: <Story />
    }
  ]);

  return (
    <>
      <RouterProvider router={router} className="main" />
      <Toaster />
    </>
  )
}

export default App;
