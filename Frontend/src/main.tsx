import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// In index.tsx
import { store } from './redux/store.ts';
import { AuthState } from './redux/authSlice.tsx';

const token = localStorage.getItem('token');
const role = localStorage.getItem('role') as AuthState['role'];

if (token && role) {
  store.dispatch({
    type: 'auth/login/fulfilled',
    payload: { token, role },
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
