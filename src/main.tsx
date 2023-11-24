import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import HuntedProvider from './Context/Provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HuntedProvider>
      <App />
    </HuntedProvider>
  </React.StrictMode>,
)
