import * as React from 'react';
import { Gradient, Nav, Footer, LogoImage, LogoText } from 'components';
import styled from 'styled-components';

const RoadmapOuter = styled.div`
`;
const RoadmapHeader = styled.h1`
  text-align: center;
`;
const Lists = styled.div`
  margin: 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const Header = styled.h2`
`;
const ListOuter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const List = styled.ul`
  padding-left: 0;
`;
const ListItem = styled.li`
`;

const Roadmap = () => (
  <RoadmapOuter>
    <RoadmapHeader>ROADMAP</RoadmapHeader>
    <Lists>
      <ListOuter>
      <Header>TO DO</Header>
        <List>
          <ListItem>refactor notation menu code</ListItem>
          <ListItem>instagram exporter</ListItem>
          <ListItem>cleanup highlighted note rendering</ListItem>
          <ListItem>enhance scale awareness</ListItem>
          <ListItem>scale suggestions</ListItem>
          <ListItem>ear training</ListItem>
          <ListItem>music visualizer</ListItem>
        </List>
      </ListOuter>
      <ListOuter>
        <Header>DOING</Header>
        <List>
          <ListItem>add more content</ListItem>
          <ListItem>enhance note data binding</ListItem>
          <ListItem>grace notes</ListItem>
        </List>
      </ListOuter>
      <ListOuter>
        <Header>DONE</Header>
        <List>
          <ListItem>restyle the notation player</ListItem>
        </List>
      </ListOuter>
    </Lists>
  </RoadmapOuter>
);

export default Roadmap;
