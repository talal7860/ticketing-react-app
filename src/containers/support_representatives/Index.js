import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getRequest, deleteRequest } from 'utils/HttpUtil';
import { AlertError, Table, Pagination } from 'components/Index';
import { PER_PAGE  } from 'consts/AppConstant';

class SupportRepresentatives extends Component {
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
      ticket_count: 1,
			created_at: 1,
		};
	}

	componentDidMount() {
		this.fetch();
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
		getRequest('/api/support_representatives/all', { page, perPage })
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
						<Table onDelete={onDelete} actions={actions} data={data} columns={columns} name="support_representative" />
						<Pagination onPageChange={onPageChange} meta={meta} />
					</div>
				}
			</div>
		);
	}
}

SupportRepresentatives.propTypes = {
	actions: PropTypes.shape({
		show: PropTypes.bool,
		delete: PropTypes.bool
	}),
	page: PropTypes.number,
	perPage: PropTypes.number,
};

SupportRepresentatives.defaultProps = {
	actions: {
		show: true,
		delete: false,
	},
	perPage: PER_PAGE
};

export default withRouter(SupportRepresentatives);

