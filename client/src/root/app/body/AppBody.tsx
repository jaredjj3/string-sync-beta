import React from 'react';
import Content from './content';
import Footer from './footer';
import Header from './header';
import { Layout } from 'antd';
import { Mobile, Gradient } from 'components';

const { MobileNav } = Mobile;

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
