import React from 'react';
import Content from './content';
import Footer from './footer';
import Gradient from 'comp/gradient';
import Header from './header';
import MobileNav from 'comp/mobile/nav';
import { Layout } from 'antd';

const AppBody = () => (
  <Layout>
    <Gradient />
    <Header />
    <Content />
    <Footer />
    <MobileNav />
  </Layout>
);

export default AppBody;
