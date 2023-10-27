import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { DarkModeContextProvider } from './context/darkmodeContext.jsx'
import { AuthContextProvider } from './context/authContext.jsx'
import { AlertContextProvider } from './context/alertContext.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ChatContextProvider } from './context/chatContext.jsx'
const Secret = "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";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>

  <GoogleOAuthProvider clientId='679091620787-lhnoo22beg9a3it84q1hnbqu1md2lo2c.apps.googleusercontent.com'>
    <ChatContextProvider>
      <DarkModeContextProvider>
        <AuthContextProvider>
          <AlertContextProvider>
            <App />
          </AlertContextProvider>
        </AuthContextProvider>
      </DarkModeContextProvider>
    </ChatContextProvider>
  </GoogleOAuthProvider>

  // </React.StrictMode>,
)
