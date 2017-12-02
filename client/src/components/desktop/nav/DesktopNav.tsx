import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withSession } from 'enhancers';
import { Logo } from 'components';
import { Col, Icon, Menu, Row } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { Location } from 'types/location';

const { Item } = Menu;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { LogoText, LogoImage } = Logo;

interface DesktopNavProps {
  location: Location;
  isLoggedIn: boolean;
  isTeacher: boolean;
  isAdmin: boolean;
  history: any;
  logout(): void;
}

interface DesktopNavState {

}

class DesktopNav extends React.Component<DesktopNavProps, DesktopNavState> {
  goTo = (params: ClickParam): void => {
    this.props.history.push(params.key);
  }

  logout = (e: React.SyntheticEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    this.props.logout();
    this.props.history.push('/library');
  }

  render(): JSX.Element {
    const { isLoggedIn, isTeacher, isAdmin, location } = this.props;

    return (
      <nav className="Nav--desktop">
        <Row type="flex" justify="space-between" align="middle">
          <Col xs={0} sm={0} md={12} lg={12}>
            <Link to="/" style={{ color: 'black' }} >
              <span className="Nav--desktop__logoLink">
                <LogoImage style={{ width: '24px' }} />
                <LogoText style={{ fontSize: '24px' }} />
              </span>
            </Link>
          </Col>
          <Col xs={0} sm={0} md={12} lg={12}>
            <div className="Nav--desktop__right">
              <Menu
                selectedKeys={[location.pathname]}
                mode="horizontal"
                style={{ fontSize: '14px', borderBottom: '0', background: 'none' }}
                onClick={this.goTo}
              >
                <Item key="/about" className="Nav--desktop__menuItem">
                  about
                </Item>
                <Item key="/search" className="Nav--desktop__menuItem">
                  search
                </Item>
                <Item key="/library" className="Nav--desktop__menuItem">
                  library
                </Item>
                {
                  isLoggedIn ?
                  <SubMenu title="settings" className="Nav--desktop__menuItem">
                    {
                      isTeacher || isAdmin ?
                        <Item key="/upload">
                          <Icon type="upload" />
                          <span>upload</span>
                        </Item> : null
                    }
                    {
                      isAdmin ?
                        <Item key="/dashboard">
                          <Icon type="compass" />
                          <span>dashboard</span>
                        </Item> : null
                    }
                    <Item>
                      <div onClick={this.logout}>
                        <Icon type="logout" />
                        <span>logout</span>
                      </div>
                    </Item>
                  </SubMenu> :
                  <Item key="/login" className="Nav--desktop__menuItem">
                    login
                  </Item>
                }
              </Menu>
            </div>
          </Col>
        </Row>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: Boolean(state.session.currentUser.id),
  isTeacher: state.session.currentUser.roles.includes('teacher'),
  isAdmin: state.session.currentUser.roles.includes('admin')
});

export default compose(
  withRouter,
  withSession,
  connect(mapStateToProps, null),
)(DesktopNav);
