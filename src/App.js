import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { includes } from 'lodash/fp';
import { isLoggedIn } from 'utils/UserUtil';
import Routes from './Routes';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    const {
      props: { history, location: { pathname } }
    } = this;
    if (!includes(pathname, ['/login', '/signup']) && !pathname.match(/\/invitation\/accept/)) {
        isLoggedIn()
          .then(() => {
            this.setState({ loading: false  })
          })
          .catch(() => {
            history.push('/login');
          });
    } else {
      this.setState({ loading: false })
    }
  }

	render() {
    const {
      state: { loading }
    } = this;
		return (
			<div>
				<Container>
					<Row>
						<Col md="12">
              {loading ? <Alert color="info">Loading App..</Alert> : <Routes /> }
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

App.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(App);
