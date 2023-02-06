import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch, Provider } from 'react-redux';
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
import CollectionSingle from './pages/collection/CollectionSingle';
import Account from './pages/Account';
import NFTSingle from './pages/nft/NFTSingle';
import CreateNFT from './pages/nft/CreateNFT';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import MetamaskProvider from './components/wallet/MetaMaskProvider';
import { getuser } from './redux/actions';
import { store, persistor } from './redux/store';
import ProfilePage from './pages/ProfilePage';
import { PersistGate } from 'redux-persist/integration/react';
import Explore from './pages/Explore';
import Stats from './pages/Stats';
import Drops from './pages/drops';

function getLibrary(provider) {
  return new Web3(provider)
}

function App() {

  // const dispatch = useDispatch();
  // const fetchUser = () => dispatch(getuser('walletaddress'));
  // useEffect(() => {
  //   fetchUser();
  // }, []);
  // const { globalUser } = useSelector(state => state.userReducer);
  // console.log(globalUser)
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if (!mountedComponent) return <div />

  return (
    <Provider store={store}>
      <PersistGate
        loading={<span>...</span>}
        persistor={persistor}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <MetamaskProvider>
            <BrowserRouter>
              <ThemeProvider theme={themeMode}>
                <>
                  <GlobalStyles />
                  {/* <Navbar theme={theme} themeToggler={themeToggler} /> */}
                  <Routes>
                    <Route exact path="/" element={<Home theme={theme} themeToggler={themeToggler} />} />
                    <Route exact path="info/:id" element={<Information theme={theme} themeToggler={themeToggler} />} />
                    <Route exact path="/account/setting" element={<Account theme={theme} themeToggler={themeToggler} />} />
                    <Route exact path="/collection/:name" element={<CollectionSingle theme={theme} themeToggler={themeToggler} />} />
                    <Route exact path="/assets/:chain/:collectionId/:id" element={<NFTSingle theme={theme} themeToggler={themeToggler} />} />
                    <Route exact path="/asset/create" element={<CreateNFT theme={theme} themeToggler={themeToggler} />} />
                    <Route exact path="/:username" element={<ProfilePage theme={theme} themeToggler={themeToggler} />} />
                    <Route exact path="/explore" element={<Explore theme={theme} themeToggler={themeToggler} />} />
                    <Route exact path="/stats" element={<Stats theme={theme} themeToggler={themeToggler} />} />
                    <Route exact path="/drops" element={<Drops theme={theme} themeToggler={themeToggler} />} />



                    <Route path='*' element={<NotFound theme={theme} themeToggler={themeToggler} />} />
                  </Routes>
                </>
              </ThemeProvider>
            </BrowserRouter>
          </MetamaskProvider>
        </Web3ReactProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
