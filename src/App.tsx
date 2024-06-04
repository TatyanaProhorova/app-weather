import {useState, useEffect } from 'react';
import {ThemeContext} from "./contexts/ThemeContext";

import './App.scss';
import HomePage from './pages/home/HomePage';
import {Route, Routes} from "react-router-dom";
// import LoginPage from "./pages/login/LoginPage";
import LoginPage from './pages/login/LoginPage';

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    }, [theme])

    return (
    <ThemeContext.Provider value={{ value: theme, changeValue: setTheme }}>
      <span>Я на всех страницах</span>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </ThemeContext.Provider>
  )
}

export default App
