import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LogoImage, Gradient, Nav, Footer } from 'components';
import { Overview, Contact, Roadmap, Social } from './';
import styled from 'styled-components';

const AboutOuter = styled.div`
`;
const LogoOuter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 10px;
`;
const AboutInner = styled.div`
  margin: 0 auto;
  margin-top: 50px;
  max-width: 980px;
  min-height: 60vh;
`;

const About = ({ match }) => (
  <AboutOuter className="About">
    <Gradient />
    <Nav />
    <AboutInner>
      <LogoOuter>
        <LogoImage style={{ width: '200px' }} />
        <p>We like to be transparent.</p>
      </LogoOuter>
      <Switch>
        <Route path={`${match.url}/overview`} component={Overview} />
        <Route path={`${match.url}/contact`} component={Contact} />
        <Route path={`${match.url}/social`} component={Social} />
        <Route path={`${match.url}/Roadmap`} component={Roadmap} />
      </Switch>
    </AboutInner>
    <Footer />
  </AboutOuter>
);

export default About;
