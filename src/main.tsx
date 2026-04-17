import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App'
import { ColorModeProvider } from './color-mode'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorModeProvider>
      <App />
    </ColorModeProvider>
  </React.StrictMode>,
)
