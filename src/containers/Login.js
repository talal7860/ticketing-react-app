import React, { Component } from 'react';
import localforage from 'localforage';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN_KEY, USER_INFO_KEY } from 'consts/AppConstant';
import { postRequest } from 'utils/HttpUtil';
import { Header, FormInput, Form } from 'components/Index'
import PropTypes from 'prop-types';

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = { params: { email: '', password: '', error: '' } };
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		const {
			state: {
				params: {
          email,
          password,
        }
			},
			props: {
				history
			}
		} = this;
		const self = this;
		postRequest('/api/sessions', { email, password })
			.then((response) => {
				localforage.setItem(ACCESS_TOKEN_KEY, response.data.token);
				return response;
			})
			.then((response) =>
				localforage.setItem(USER_INFO_KEY, response.data)
			)
			.then(() => {
				history.push('/');
			})
			.catch(error => {
				self.setState({ error });
			});
	}

	onChange(e) {
		let params = this.state.params;
		params[e.target.name] = e.target.value;
		this.setState({ params, error: '' });
	}

	render() {
		const {
			state: {
        error,
        params: { email, password  }
      }
		} = this;
		return (
      <div>
        <Header />
        <Form title="Login" subtitle="Login" error={error} onSubmit={this.onSubmit}>
          <FormInput onChange={this.onChange} value={email} type="email" name="email" id="email" placeholder="Email" label="Email" />
          <FormInput onChange={this.onChange} value={password} type="password" name="password" id="password" placeholder="Password" label="Password" />
        </Form>
        <Link to={'/signup'}>Signup</Link>
      </div>
		);
	}
}
Login.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Login;
