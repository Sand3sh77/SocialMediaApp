import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { DarkModeContextProvider } from './context/darkmodeContext.jsx'
import { AuthContextProvider } from './context/authContext.jsx'
import { AlertContextProvider } from './context/alertContext.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>


    <DarkModeContextProvider>
      <AuthContextProvider>
        <AlertContextProvider>
          <App />
        </AlertContextProvider>
      </AuthContextProvider>
    </DarkModeContextProvider>

  // </React.StrictMode>,
)
