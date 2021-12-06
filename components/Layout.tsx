import React, { FC } from 'react';
import Footer from './Footer';
import Meta from './Meta';
import Nav from './Nav';

const Layout: FC = ({ children }) => {
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
