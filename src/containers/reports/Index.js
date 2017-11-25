import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AlertError, Table, Pagination, Header, Navbar } from 'components/Index';
import { getRequest } from 'utils/HttpUtil';
import { getUserInfo } from 'utils/UserUtil';
import { Button } from 'reactstrap';
import { PER_PAGE, USER_TYPE_SUPPORT_REPRESENTATIVE } from 'consts/AppConstant';

class Reports extends Component {
	constructor(props) {
		super(props);
		this.state = { data: null, error: null, columns: null, meta: null };
		this.fetch = this.fetch.bind(this);
		this.onDownload = this.onDownload.bind(this);
		this.perPage = PER_PAGE;
		this.page = 1;
		this.onPageChange = this.onPageChange.bind(this);
		this.columns = {
			id: 1,
			title: 1,
			description: 1,
			owner: 'name',
			assigned_to: 'name',
      created_at: 1,
      closed_at: 1,
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
		const {
			page,
			perPage,
			columns,
		} = this;
		const self = this;
		getRequest('/api/reports/all', { page, perPage })
			.then(response => {
        getUserInfo()
        .then((user) => {
          if (user.type === USER_TYPE_SUPPORT_REPRESENTATIVE) {
            delete columns.assigned_to
          }
          self.setState({ data: response.data, columns, meta: response.meta });
        })
			})
			.catch(error => {
				self.setState({ error });
			});
	}

  onDownload() {
    const {
      state: { meta: { download_link } }
    } = this;
    window.open(download_link);
  }

	render() {
		const {
			state: {
				data,
				columns,
				error,
				meta,
			},
			onPageChange,
      onDownload,
		} = this;
		return (
			<div>
        <Navbar />
        <Header />
				<AlertError error={error} />
        <Button color='success' className='float-right' onClick={onDownload}>Download PDF</Button>
				<Table actions={{show: false, delete: false}} data={data} columns={columns} name="report" />
				<Pagination onPageChange={onPageChange} meta={meta} />
			</div>
		);
	}
}

Reports.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Reports);

