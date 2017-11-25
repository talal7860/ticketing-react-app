import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Collapse, Navbar as BootstrapNavbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import { logout as userLogout, getUserInfo } from 'utils/UserUtil';
import { USER_TYPE_SUPPORT_REPRESENTATIVE, USER_TYPE_ADMIN } from 'consts/AppConstant';
import { includes } from 'lodash/fp';
import PropTypes from 'prop-types';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.logout = this.logout.bind(this);
    this.getLoggedInNavItems = this.getLoggedInNavItems.bind(this);
		this.state = {
			isOpen: false,
      user: null
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

  componentDidMount() {
    const self = this;
    getUserInfo()
      .then((user) => {
        self.setState({ user });
      })
  }

	logout(e) {
		e.preventDefault();
		const {
			props: { history }
		} = this;
		userLogout()
			.then(() => {
				history.push('/login');
			})
			.catch((err) => {
        alert(err);
			});
	}

  getLoggedInNavItems() {
		const { logout, state: { user } } = this;
    let reportsNav = null;
    let logoutNav = null;
    if (user) {
      if (includes(user.type, [USER_TYPE_SUPPORT_REPRESENTATIVE, USER_TYPE_ADMIN])) {
        reportsNav = (
          <NavItem>
            <Link className='navbar-brand' to={'/reports'}>
              Reports
            </Link>
          </NavItem>
        );
      }
      logoutNav = (
        <NavItem>
          <NavLink href="#" onClick={logout}>
            Logout
          </NavLink>
        </NavItem>
      );
    }
    return (
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {reportsNav}
          {logoutNav}
        </Nav>
      </Collapse>
    );
  }


	render() {
		const { getLoggedInNavItems } = this;
		return (
			<BootstrapNavbar color="faded" light expand="md">
				<Link className='navbar-brand' to={'/'}>
          Customer Support
				</Link>
				<NavbarToggler onClick={this.toggle} />
        {getLoggedInNavItems()}
			</BootstrapNavbar>
		);
	}
}

Navbar.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Navbar);
