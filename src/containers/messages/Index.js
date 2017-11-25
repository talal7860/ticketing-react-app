import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import Table from 'components/Table';
import { getRequest } from 'utils/HttpUtil';
import NewMessage from 'containers/messages/New';
import Pagination from 'components/Pagination';
import { PER_PAGE  } from 'consts/AppConstant';

class Messages extends Component {
	constructor(props) {
		super(props);
		this.page = 1;
		this.perPage = this.props.perPage || PER_PAGE;
		this.state = {
			data: null,
			error: null,
			columns: null,
		};
		this.fetch = this.fetch.bind(this);
		this.onPageChange = this.onPageChange.bind(this);
		this.columns = {
			id: 1,
			content: 1,
			sender: 'name'
		};
	}

	componentDidMount() {
		this.fetch();
	}

	onPageChange(e, page) {
		e.preventDefault();
		this.page = page;
		this.fetch();
	}

	fetch() {
		const self = this;
		const {
			props: {
				ticketId,
			},
			page,
			perPage,
		} = this;
		getRequest(`/api/tickets/${ticketId}/messages/all`, { page, perPage  })
			.then(response => {
				self.setState({
					data: response.data,
					columns: self.columns,
					meta: response.meta
				});
			})
			.catch(error => {
				self.setState({ error });
			});
	}


	render() {
		const {
			onPageChange,
			state: {
				data,
				columns,
				error,
				meta,
			},
			props: {
				ticketId,
				actions,
			}
		} = this;
		return (
			<div>
				{error ? (
					<Alert color="danger">{error}</Alert>
				) :
					<div>
						<Table data={data} actions={actions} columns={columns} name="message" />
						<Pagination onPageChange={onPageChange} meta={meta} />
						<NewMessage ticketId={ticketId} onSuccess={this.fetch}  />
					</div>
				}
			</div>
		);
	}
}
Messages.propTypes = {
	actions: PropTypes.shape({
		show: PropTypes.bool,
		delete: PropTypes.bool
	}),
	page: PropTypes.number,
	perPage: PropTypes.number,
  ticketId: PropTypes.string.isRequired,
};

Messages.defaultProps = {
	actions: {
		show: false,
		delete: false,
	},
	perPage: PER_PAGE
};

export default withRouter(Messages);
