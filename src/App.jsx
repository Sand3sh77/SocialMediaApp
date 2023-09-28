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
import { AlertContext } from './context/alertContext';
import Alert from './components/alert/alert';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {

  const { alert } = useContext(AlertContext);
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
        <Navbar />
        {/* {alert && <Alert />} */}
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
    <>
      <RouterProvider router={router} className="main" />
      <Toaster />
    </>
  )
}

export default App;
