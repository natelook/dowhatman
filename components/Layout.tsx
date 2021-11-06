import React from 'react';
import Footer from './Footer';
import Meta from './Meta';
import Nav from './Nav';

interface LayoutProps {
  children: React.ReactChild;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <React.Fragment>
      <Meta />
      <Nav />
      {children}
      <Footer />
    </React.Fragment>
  );
}
