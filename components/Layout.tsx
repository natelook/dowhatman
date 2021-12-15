import { ethers } from 'ethers';
import React, { FC, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import Footer from './Footer';
import Meta from './Meta';
import Nav from './Nav';
import { walletState } from './state';

const Layout: FC = ({ children }) => {
  const setWallet = useSetRecoilState(walletState);
  useEffect(() => {
    console.log('Provider: ', ethers.getDefaultProvider(), window.ethereum);
    if (typeof window.ethereum === undefined) return;

    window?.ethereum?.selectedAddress &&
      setWallet(window.ethereum.selectedAddress);
  }, [setWallet]);
  return (
    <React.Fragment>
      <Meta />
      <Nav />
      {children}
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
