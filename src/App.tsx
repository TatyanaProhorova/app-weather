import {useState, useEffect } from 'react';
import {ThemeContext} from "./contexts/ThemeContext";

import './App.scss';

import * as ReactDOM from "react-dom/client";
import {Route, Routes} from "react-router-dom";
import {
  createBrowserRouter, RouterProvider,} from "react-router-dom";

import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';



function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    }, [theme])

//     return (
//     <ThemeContext.Provider value={{ value: theme, changeValue: setTheme }}>
//       <span>Я на всех страницах</span>
//       <Routes>
//         <Route index element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//       </Routes>
//     </ThemeContext.Provider>
//   )
// }

return (
<ThemeContext.Provider value={{ value: theme, changeValue: setTheme }}>
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]); 
</ThemeContext.Provider>
)}

export default App
