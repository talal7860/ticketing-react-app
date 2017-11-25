import React, { Component } from 'react';
import { postRequest } from 'utils/HttpUtil';
import { Header, FormInput, Form, Navbar } from 'components/Index'
import PropTypes from 'prop-types';

class NewTicket extends Component {

	constructor(props) {
		super(props);
		this.state = { params: { title: '', description: '', error: '' } };
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		const {
			state: {
				params: {
					title,
					description
				}
			},
			props: { history }
		} = this;
		const self = this;
		postRequest('/api/tickets', { title, description })
			.then(() => {
				history.push('/');
			})
			.catch((error) => {
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
          title,
          description,
        }
      },
      onChange,
		} = this;
		return (
      <div>
        <Navbar />
        <Header />
        <Form onSubmit={this.onSubmit} error={error} title="New Ticket" subtitle="Create new ticket">
          <FormInput onChange={onChange} value={title} type="text" name="title" id="title" placeholder="Title" label="Title" />
          <FormInput onChange={onChange} value={description} type="textarea" name="description" id="description" placeholder="Description" label="Description" />
        </Form>
      </div>
		);
	}
}

NewTicket.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewTicket;
