import React, { Component } from 'react';
import localforage from 'localforage';
import { ACCESS_TOKEN_KEY, USER_INFO_KEY } from 'consts/AppConstant';
import { postRequest } from 'utils/HttpUtil';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Header, FormInput, Form } from 'components/Index'

class Signup extends Component {

	constructor(props) {
		super(props);
		this.state = {
      params: {
        email: '',
        password: '',
        error: '',
        first_name: '',
        last_name: '',
      }
    };
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
          password_confirmation,
          first_name,
          last_name
        }
			},
			props: {
				history
			}
		} = this;
		const self = this;
		postRequest('/api/customers', { email, password, password_confirmation, first_name, last_name })
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
        params: {
          email,
          password,
          password_confirmation,
          first_name,
          last_name
        }
      }
		} = this;
		return (
      <div>
        <Header />
        <Form onSubmit={this.onSubmit} error={error} title="Signup" subtitle="Signup as a customer">
          <FormInput onChange={this.onChange} value={email} type="email" name="email" id="email" placeholder="Email" label="Email" />
          <FormInput onChange={this.onChange} value={first_name} type="text" name="first_name" id="first_name" placeholder="First Name" label="First Name" />
          <FormInput onChange={this.onChange} value={last_name} type="text" name="last_name" id="last_name" placeholder="Last Name" label="Last Name" />
          <FormInput onChange={this.onChange} value={password} type="password" name="password" id="password" placeholder="Password" label="Password" />
          <FormInput onChange={this.onChange} value={password_confirmation} type="password" name="password_confirmation" id="password_confirmation" placeholder="Password Confirmation" label="Password Confirmation" />
        </Form>
        <Link to={'/login'}>Login</Link>
      </div>
		);
	}
}
Signup.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Signup;
