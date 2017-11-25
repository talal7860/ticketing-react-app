import React, { Component } from 'react';
import localforage from 'localforage';
import { Header, FormInput, Form } from 'components/Index'
import { ACCESS_TOKEN_KEY, USER_INFO_KEY } from 'consts/AppConstant';
import { postRequest } from 'utils/HttpUtil';
import PropTypes from 'prop-types';

class Invite extends Component {

	constructor(props) {
		super(props);
		this.state = {
      params: {
        error: '',
        password: '',
        password_confirmation: '',
      }
    };
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		const {
			props: {
				match: { params: { invitationToken } },
        history,
      },
			state: {
				params: {
          password,
          password_confirmation,
        }
			},
		} = this;
		const self = this;
    const url = `/api/support_representatives/invitation/accept/${invitationToken}`;
		postRequest(url, { password, password_confirmation })
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
        params: {
          password,
          password_confirmation,
        },
        error,
      }
		} = this;
		return (
        <div>
          <Header />
          <Form error={error} onSubmit={this.onSubmit} title="Accept Invitation" subtitle="Enter the following to accept the invitation">
            <FormInput onChange={this.onChange} value={password} type="password" name="password" id="password" placeholder="Password" label="Password" />
            <FormInput onChange={this.onChange} value={password_confirmation} type="password" name="password_confirmation" id="password_confirmation" placeholder="Password Confirmation" label="Password Confirmation" />
          </Form>
      </div>
		);
	}
}
Invite.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default Invite;


