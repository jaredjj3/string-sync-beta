import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, withHandlers, withProps } from 'recompose';
import { withSession } from 'enhancers';
import { Menu, Icon } from 'antd';

const { Item, SubMenu } = Menu;

// FIXME: There's a wonky issue where the SubMenu and Items can't be
// rendered outside of the <Menu/> tag. This issue sources from antd's
// library. Can't use recompose's branch for now.
const DesktopNavRight = ({ handleMenuClick, logout, location, session, isAdmin, isTeacher }) => (
  <div className="Nav--desktop__right">
    <Menu
      className="Nav--desktop__right__menu"
      selectedKeys={[location.pathname]}
      mode="horizontal"
      onClick={handleMenuClick}
    >
      <SubMenu title="about">
        <Item key="/about">
          <Icon type="info-circle-o" />
          overview
        </Item>
        <Item key="/roadmap">
          <Icon type="car" />
          roadmap
        </Item>
        <Item key="/contact">
          <Icon type="contacts" />
          contact
        </Item>
        <Item key="/social">
          <Icon type="usergroup-add" />
          social
        </Item>
      </SubMenu>
      <Item key="/search">
        search
      </Item>
      <Item key="/library">
        library
      </Item>
      {
        session.state.isLoggedIn
          ? <SubMenu title="other">
              {
                isAdmin || isTeacher
                  ? <Item key="/upload">
                      <Icon type="upload" />
                      upload
                    </Item>
                  : null
              }
              {
                isAdmin
                  ? <Item key="/dashboard">
                      <Icon type="compass" />
                      dashboard
                    </Item>
                  : null
              }
              <Item>
                <div onClick={logout}>
                  <Icon type="logout" />
                  logout
                </div>
              </Item>
            </SubMenu>
          : <Item key="/login">
              login
            </Item>
      }
    </Menu>
  </div>
);

const enhance = compose(
  withRouter,
  withSession,
  withProps(({ session }) => ({
    isTeacher: session.state.currentUser.roles.includes('teacher'),
    isAdmin: session.state.currentUser.roles.includes('admin')
  })),
  withHandlers({
    handleMenuClick: props => params => {
      props.history.push(params.key);
    },
    logout: props => event => {
      event.preventDefault();
      event.stopPropagation();
      props.session.dispatch.logout();
      props.history.push('/');
    }
  })
);

export default enhance(DesktopNavRight);
