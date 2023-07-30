import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch, Provider } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
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
import TestPage from './pages/test';
import EditNft from './pages/nft/EditNFT';
import EditCollection from './pages/collection/EditCollection';
import MyCollections from './pages/myCollections';
import CreateCollection from './pages/collection/CreateCollection';
import detectEthereumProvider from '@metamask/detect-provider';
import ActivityStats from './pages/StatsActivity';
import { LinearProgress, Popper } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import Notifications from './pages/Notifications';
import { Box } from '@mui/system';
import { NFTMarketplaceProvider } from './NFTMarketplaceContext';
import DropsTest from './pages/dropsTest';
import GenerativeCol from './pages/generativeCol';
import Footer from './components/Footer';
import Transfer from './pages/transfer';

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


  const uuid = localStorage.getItem('device-id')
  if (uuid) {
    console.log('device id found !')
  } else {
    localStorage.setItem('device-id', uuidv4())
  }



  return (
    <Provider store={store}>
      <PersistGate
        loading={<LinearProgress color="secondary" sx={{ my: 55, mx: 5 }} />}
        persistor={persistor}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <MetamaskProvider>
            <NFTMarketplaceProvider>
              <BrowserRouter>
                <ScrollToTop>
                  <ThemeProvider theme={themeMode}>
                    <>
                      <GlobalStyles />
                      {/* <Navbar theme={theme} themeToggler={themeToggler} /> */}
                      <Routes>
                        <Route exact path="/" element={<Home theme={theme} themeToggler={themeToggler} />} />
                        <Route exact path="info/:id" element={<Information theme={theme} themeToggler={themeToggler} />} />
                        <Route exact path="/account/setting" element={<Account theme={theme} themeToggler={themeToggler} />} />
                        <Route exact path="/collection/:name/:id" element={<CollectionSingle theme={theme} themeToggler={themeToggler} />} />
                        <Route exact path="/assets/:chain/:walletAddress/:id" element={<NFTSingle theme={theme} themeToggler={themeToggler} />} />
                        <Route exact path="/asset/create" element={<CreateNFT theme={theme} themeToggler={themeToggler} />} />
                        <Route exact path="/collection/create" element={<CreateCollection theme={theme} themeToggler={themeToggler} />} />
                        <Route exact path="/collection/edit/:id" element={<EditCollection theme={theme} themeToggler={themeToggler} />} />
                        <Route exact path="/asset/edit/:id" element={<EditNft theme={theme} themeToggler={themeToggler} />} />
                        <Route exact path="/profile/:username" element={<ProfilePage theme={theme} themeToggler={themeToggler} />} />
                        <Route exact path="/explore" element={<Explore theme={theme} themeToggler={themeToggler} />} />
                        <Route exact path="/stats" element={<Stats theme={theme} themeToggler={themeToggler} />} />
                        <Route exact path="/stats/activity" element={<ActivityStats theme={theme} themeToggler={themeToggler} />} />
                        <Route exact path="/my-collections" element={<MyCollections theme={theme} themeToggler={themeToggler} />} />
                        <Route exact path="/drops" element={<Drops theme={theme} themeToggler={themeToggler} />} />
                        <Route exact path="/drops/:id/:status" element={<GenerativeCol theme={theme} themeToggler={themeToggler} />} />
                        <Route exact path="/dropsTest" element={<DropsTest theme={theme} themeToggler={themeToggler} />} />
                        <Route exact path="/notifications" element={<Notifications theme={theme} themeToggler={themeToggler} />} />




                        <Route exact path="/test" element={<TestPage theme={theme} themeToggler={themeToggler} />} />
                        <Route exact path="/transfer" element={<Transfer theme={theme} themeToggler={themeToggler} />} />



                        <Route path='*' element={<NotFound theme={theme} themeToggler={themeToggler} />} />



                      </Routes>
                      <Footer />
                    </>
                  </ThemeProvider>
                </ScrollToTop>
              </BrowserRouter>
            </NFTMarketplaceProvider>
          </MetamaskProvider>
        </Web3ReactProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;


const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])
  return children || null;
}