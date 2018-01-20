import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, withHandlers, withProps } from 'recompose';
import { withSession } from 'enhancers';
import { Menu, Icon } from 'antd';
import styled from 'styled-components';

const { Item, ItemGroup, SubMenu } = Menu;

const enhance = compose(
  withRouter,
  withSession,
  withProps(props => {
    const { session, location } = props;
    const { pathname } = location;
    const adjPathname = pathname === '/signup' ? '/login' : pathname;

    return ({
      isTeacher: session.state.currentUser.roles.includes('teacher'),
      isAdmin: session.state.currentUser.roles.includes('admin'),
      selectedKeys: [adjPathname]
    });
  }),
  withHandlers({
    handleMenuClick: props => params => {
      props.history.push(params.key);
    },
    logout: props => async event => {
      event.preventDefault();
      await props.session.dispatch.logout();

      window.notification.success({
        message: 'Logout',
        description: 'successful'
      });

      props.history.push('/');
    }
  })
);

const DesktopNavRightOuter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// The reason that this component has ternary hell is due to ant design's Menu
// component forcing the children of Menu to be either a SubMenu component or
// a Menu Item component. It's not that bad. Really.
const DesktopNavRight = ({ handleMenuClick, logout, selectedKeys, session, isAdmin, isTeacher }) => (
  <DesktopNavRightOuter className="Nav--desktop__right">
    <Menu
      className="Nav--desktop__right__menu"
      selectedKeys={selectedKeys}
      mode="horizontal"
      onClick={handleMenuClick}
    >
      <SubMenu title="about">
        <ItemGroup>
          <Item key="/about/overview">
            <Icon type="info-circle-o" />
            <span>overview</span>
          </Item>
          <Item key="/about/roadmap">
            <Icon type="car" />
            <span>roadmap</span>
          </Item>
          <Item key="/about/contact">
            <Icon type="contacts" />
            <span>contact</span>
          </Item>
          <Item key="/about/social">
            <Icon type="usergroup-add" />
            <span>social</span>
          </Item>
        </ItemGroup>
      </SubMenu>
      <Item key="/library">
        <span>library</span>
      </Item>
      {
        session.state.isLoggedIn
          ? <SubMenu title="other">
              <ItemGroup title={`@${session.state.currentUser.username}`}>
                {
                  isAdmin || isTeacher
                    ? <Item key="/upload">
                        <Icon type="upload" />
                        <span>upload</span>
                      </Item>
                    : null
                }
                {
                  isAdmin
                    ? <Item key="/dashboard">
                        <Icon type="compass" />
                        <span>dashboard</span>
                      </Item>
                    : null
                }
                <Item>
                  <div onClick={logout}>
                    <Icon type="logout" />
                    <span>logout</span>
                  </div>
                </Item>
              </ItemGroup>
            </SubMenu>
          : <Item key="/login">
              <span>login</span>
            </Item>
      }
    </Menu>
  </DesktopNavRightOuter>
);

export default enhance(DesktopNavRight);
