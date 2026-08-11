import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import { RoleProvider } from './context/RoleContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <RoleProvider>
          <App />
        </RoleProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)