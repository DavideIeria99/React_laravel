import { RouterProvider } from 'react-router-dom';
import { router } from '../router';
import './App.css';
import { HelmetProvider } from 'react-helmet-async';




export default function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>

  )
}
