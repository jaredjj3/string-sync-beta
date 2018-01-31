import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const OverviewOuter = styled.div`
`;
const OverviewInner = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;
const OverviewHeader = styled.h1`
  text-align: center;
  font-weight: 100;
  letter-spacing: 3px;
`;
const Articles = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Article = styled.article`
  width: 100%;
`;
const Header = styled.h2`
  margin-top: 10px;
`;
const Paragraph = styled.p`
`;

const Overview = () => (
  <OverviewOuter className="Overview">
    <OverviewHeader>OVERVIEW</OverviewHeader>
    <OverviewInner>
      <Articles>
        <Article>
          <Header>YOU FIRST</Header>
          <Paragraph>
            We genuinely want to help you. If you're a student, we will <em>always</em> ensure there will be
            new free content regularly. If you're a teacher, we will <em>always</em> provide you the support
            you need for you and your students to thrive. If we're not meeting your needs, 
            <Link to="/about/contact"> please reach out to us</Link>.
          </Paragraph>
        </Article>
        <Article>
          <Header>WHO "WE" ARE</Header>
          <Paragraph>
            It's just me, <a href="http://instagram.com/jaredplaysguitar">@jaredplaysguitar</a>. I'm a guitarist
            like you. I've been playing for 10 years and haven't found a guitar app that met all of my needs. I decided to make one.
          </Paragraph>
        </Article>
        <Article>
          <Header>HEAR, SEE, AND PLAY</Header>
          <Paragraph>
            Think about it. Traditional guitar teaching methods are a bit inefficient. The goal of
            this app is to help you hear something and play it. That's it.
          </Paragraph>
        </Article>
      </Articles>
    </OverviewInner>
  </OverviewOuter>
);

export default Overview;
