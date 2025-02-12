import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import isologoA from './assets/isologoA.svg'
import isologoB from './assets/isologoB.svg'
import isologoN from './assets/isologoN.svg'

// Define una variable global para el modo oscuro
declare global {
  interface Window {
    isDarkMode: boolean
    }
}

document.addEventListener('DOMContentLoaded', () => {
  const favicon = document.getElementById('favicon') as HTMLLinkElement;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) { 
        favicon.href = isologoB;
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        favicon.href = isologoN;
    }
    else {
      favicon.href = isologoA;
    }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
