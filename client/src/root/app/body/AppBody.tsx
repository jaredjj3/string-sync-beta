import React from 'react';
import Content from './content';
import Footer from './footer';
import Header from './header';
import { Layout } from 'antd';
import { MobileNav, Gradient } from 'components';

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
