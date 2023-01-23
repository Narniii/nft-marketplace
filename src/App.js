import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from './components/design/GlobalStyles';
import { lightTheme, darkTheme } from "./components/design/Themes"
import { useDarkMode } from "./components/design/useDarkMode"
import Navbar from './components/Navbar/Navbar';
import NotFound from './pages/404';
import Information from './pages/Information';
import CollectionSingle from './pages/CollectionSingle';
import Account from './pages/Profile';

function App() {

  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if (!mountedComponent) return <div />

  return (
    <BrowserRouter>
      <ThemeProvider theme={themeMode}>
        <>
          <GlobalStyles />
          {/* <Navbar theme={theme} themeToggler={themeToggler} /> */}
          <Routes>
            <Route exact path="/" element={<Home theme={theme} themeToggler={themeToggler} />} />
            <Route exact path="info/:id" element={<Information theme={theme} themeToggler={themeToggler} />} />
            <Route exact path="/account/:username" element={<Account theme={theme} themeToggler={themeToggler} />} />
            <Route exact path="/collection/:name" element={<CollectionSingle theme={theme} themeToggler={themeToggler} />} />



            <Route path='/404' element={<NotFound theme={theme} themeToggler={themeToggler} />} />
          </Routes>
        </>
      </ThemeProvider>
    </BrowserRouter>

  );
}

export default App;
