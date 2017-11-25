import React, { Component } from 'react';
import { Button, Form } from 'reactstrap';
import FormInput from 'components/FormInput';
import { postRequest } from 'utils/HttpUtil';
import AlertError from 'components/AlertError';
import PropTypes from 'prop-types';

class NewMessage extends Component {

	constructor(props) {
		super(props);
		this.state = { params: { title: '', description: '', error: '' } };
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onSuccess = this.onSuccess.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		const {
			state: {
				params: {
					content
				}
			},
			props: {
				ticketId,
			},
			onSuccess
		} = this;
		const self = this;
		postRequest(`/api/tickets/${ticketId}/messages`, { content })
			.then(onSuccess)
			.catch((error) => {
				self.setState({ error });
			});
	}

	onSuccess() {
		this.setState({ params: { content: '' } });
		this.props.onSuccess();
	}

	onChange(e) {
		let params = this.state.params;
		params[e.target.name] = e.target.value;
		this.setState({ params, error: '' });
	}

	render() {
		const {
			state: { error, params: { content } }
		} = this;
		return (
			<Form onSubmit={this.onSubmit}>
				<AlertError error={error} />
				<FormInput onChange={this.onChange} type="textarea" name="content" value={ content } id="content" placeholder="Message" label="Message" />
				<Button color="primary">Post</Button>
			</Form>
		);
	}
}
NewMessage.propTypes = {
  ticketId: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
export default NewMessage;
