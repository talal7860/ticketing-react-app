import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AlertError from 'components/AlertError';
import Table from 'components/Table';
import { getRequest, deleteRequest } from 'utils/HttpUtil';
import Pagination from 'components/Pagination';
import { PER_PAGE  } from 'consts/AppConstant';

class Tickets extends Component {
	constructor(props) {
		super(props);
		this.state = { data: null, error: null, columns: null };
		this.fetch = this.fetch.bind(this);
		this.perPage = this.props.perPage;
		this.page = 1;
		this.onPageChange = this.onPageChange.bind(this);
		this.onShow = this.onShow.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.columns = {
			id: 1,
			title: 1,
			description: 1,
			owner: 'name',
			assigned_to: 'name',
			status: 1
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

	onShow(e, id) {
		e.preventDefault();
		const {
			props: { history }
		} = this;
		history.push(`/tickets/${id}`);
	}

  onDelete(e, id) {
    e.preventDefault();
    const {
      fetch
    } = this;
    const self = this;
    const result = window.confirm('Are you sure you want to delete this?');
    if (result) {
      deleteRequest(`/api/tickets/${id}`)
      .then(fetch)
      .catch((error) => {
        self.setState({ error });
      })
    }
  }


	fetch() {
		const {
			page,
			perPage,
			columns,
		} = this;
		const self = this;
		getRequest('/api/tickets/all', { page, perPage })
			.then(response => {
				self.setState({ data: response.data, columns, meta: response.meta });
			})
			.catch(error => {
				self.setState({ error });
			});
	}


	render() {
		const {
			state: {
				data,
				columns,
				error,
				meta,
			},
			props: {
				actions
			},
			onShow,
      onDelete,
			onPageChange,
		} = this;
		return (
			<div>
				<AlertError error={error} />
				<Table actions={actions} data={data} columns={columns} name="ticket" onShow={onShow} onDelete={onDelete} />
				<Pagination onPageChange={onPageChange} meta={meta} />
			</div>
		);
	}
}

Tickets.propTypes = {
	actions: PropTypes.shape({
		show: PropTypes.bool,
		delete: PropTypes.bool
	}),
	page: PropTypes.number,
	perPage: PropTypes.number,
  history: PropTypes.object.isRequired,
};

Tickets.defaultProps = {
	actions: {
		show: true,
		delete: false,
	},
	perPage: PER_PAGE
};

export default withRouter(Tickets);
