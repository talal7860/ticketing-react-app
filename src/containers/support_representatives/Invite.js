import React, { Component } from 'react';
import { Header, FormInput, Form, Navbar } from 'components/Index'
import { postRequest } from 'utils/HttpUtil';
import { Alert } from 'reactstrap';

class Invite extends Component {

	constructor(props) {
		super(props);
		this.state = {
      params: {
        email: '',
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
          first_name,
          last_name
        }
			},
		} = this;
		const self = this;
		postRequest('/api/support_representatives/invite', { email, first_name, last_name })
			.then(() => {
        self.setState({ params: {}, success: true, error: '' });
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
          first_name,
          last_name
        },
        success
      }
		} = this;
		return (
      <div>
        <Navbar />
        <Header />
        <Form error={error} onSubmit={this.onSubmit} title="Send Invitation" subtitle="Send Invitation to Support Representative">
          {success ? <Alert color='success'>Your Inviation has been sent successfully!</Alert>: ""}
          <FormInput onChange={this.onChange} value={email} type="email" name="email" id="email" placeholder="Email" label="Email" />
          <FormInput onChange={this.onChange} value={first_name} type="text" name="first_name" id="first_name" placeholder="First Name" label="First Name" />
          <FormInput onChange={this.onChange} value={last_name} type="text" name="last_name" id="last_name" placeholder="Last Name" label="Last Name" />
        </Form>
      </div>
		);
	}
}

export default Invite;

