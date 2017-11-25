import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getRequest, deleteRequest } from 'utils/HttpUtil';
import { PER_PAGE  } from 'consts/AppConstant';
import { Table, AlertError, Pagination } from 'components/Index';

class Customers extends Component {
	constructor(props) {
		super(props);
		this.state = { data: null, error: null, columns: null };
		this.fetch = this.fetch.bind(this);
		this.perPage = this.props.perPage;
		this.page = 1;
		this.onPageChange = this.onPageChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
		this.columns = {
			id: 1,
			name: 1,
      email: 1,
			created_at: 1,
		};
	}

  onDelete(e, id) {
    e.preventDefault();
    const {
      fetch
    } = this;
    const self = this;
    const result = window.confirm('Are you sure you want to delete this?');
    if (result) {
      deleteRequest(`/api/users/${id}`)
      .then(fetch)
      .catch((error) => {
        self.setState({ error });
      })
    }
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
		const {
			page,
			perPage,
			columns,
		} = this;
		const self = this;
		getRequest('/api/customers/all', { page, perPage })
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
			onPageChange,
      onDelete,
		} = this;
		return (
			<div>
				{error ?
					<AlertError error={error} /> :
					<div>
						<Table onDelete={onDelete} actions={actions} data={data} columns={columns} name="customer" />
						<Pagination onPageChange={onPageChange} meta={meta} />
					</div>
				}
			</div>
		);
	}
}

Customers.propTypes = {
	actions: PropTypes.shape({
		show: PropTypes.bool,
		delete: PropTypes.bool
	}),
	page: PropTypes.number,
	perPage: PropTypes.number,
};

Customers.defaultProps = {
	actions: {
		show: true,
		delete: false,
	},
	perPage: PER_PAGE
};

export default withRouter(Customers);
