import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Alert } from 'reactstrap';
import CustomerHome from 'containers/CustomerHome';
import SupportRepresentativeHome from 'containers/home/SupportRepresentative';
import AdminHome from 'containers/home/Admin';
import { isLoggedIn, getUserInfo } from 'utils/UserUtil';
import Header from 'components/Header';
import Navbar from 'components/Navbar';
import PropTypes from 'prop-types';
import {
	USER_TYPE_CUSTOMER,
	USER_TYPE_ADMIN,
	USER_TYPE_SUPPORT_REPRESENTATIVE
} from 'consts/AppConstant';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = { error: null, userType: null };
		this.ticketColumns = {
			id: 1,
			title: 1,
			description: 1,
			owner: 'name',
			assigned_to: 'name',
			status: 1
		};
		this.loadUserBasedHome = this.loadUserBasedHome.bind(this);
	}

	componentDidMount() {
		const { props: { history }, loadUserBasedHome } = this;
		isLoggedIn()
			.then(loadUserBasedHome)
			.catch(() => {
				history.push('/login');
			});
	}

	loadUserBasedHome() {
		const self = this;
		getUserInfo()
			.then(userInfo => {
				self.setState({ userType: userInfo.type  });
			})
			.catch(err => {
        alert(err);
			});
	}

	render() {
		const {
			state: { userType  }
		} = this;
		let home = null;
		switch(userType) {
		case USER_TYPE_CUSTOMER:
			home = <CustomerHome />;
			break;
		case USER_TYPE_ADMIN:
			home = <AdminHome />;
			break;
		case USER_TYPE_SUPPORT_REPRESENTATIVE:
			home = <SupportRepresentativeHome />;
			break;
		default:
			home = null;
			break;
		}

		return (
			<div className='blan'>
        <Navbar />
        <Header />
				{home ? home : (<Alert color="info">Loading...</Alert>)}
			</div>
		);
	}
}

Home.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Home);
