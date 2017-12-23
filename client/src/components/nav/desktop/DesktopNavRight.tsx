import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, withHandlers, withProps } from 'recompose';
import { withSession } from 'enhancers';
import { Menu, Icon } from 'antd';

const { Item, SubMenu } = Menu;

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
    logout: props => event => {
      event.preventDefault();
      event.stopPropagation();
      props.session.dispatch.logout();
      props.history.push('/');
    }
  })
);

// The reason that this component has ternary hell is due to ant design's Menu
// component forcing the children of Menu to be either a SubMenu component or
// a Menu Item component. It's not that bad. Really.
const DesktopNavRight = ({ handleMenuClick, logout, selectedKeys, session, isAdmin, isTeacher }) => (
  <div className="Nav--desktop__right">
    <Menu
      className="Nav--desktop__right__menu"
      selectedKeys={selectedKeys}
      mode="horizontal"
      onClick={handleMenuClick}
    >
      <SubMenu title="about">
        <Item key="/about/overview">
          <Icon type="info-circle-o" />
          overview
        </Item>
        <Item key="/about/roadmap">
          <Icon type="car" />
          roadmap
        </Item>
        <Item key="/about/contact">
          <Icon type="contacts" />
          contact
        </Item>
        <Item key="/about/social">
          <Icon type="usergroup-add" />
          social
        </Item>
      </SubMenu>
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

export default enhance(DesktopNavRight);
