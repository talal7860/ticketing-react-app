import React, { Component } from 'react';
import { Table as BootstrapTable, Alert, Button } from 'reactstrap';
import { isEmpty, isNull, isString } from 'lodash/fp';
import PropTypes from 'prop-types';

class Table extends Component {

	constructor(props) {
		super(props);
		this.getMappedData = this.getMappedData.bind(this);
	}

	getMappedData() {
		const {
			props: {
				columns,
				data,
				name,
				actions,
				onShow,
				onDelete,
			}
		} = this;
		if (actions.show || actions.delete) {
			columns['Actions'] = 1;
		}
		const tableData = { data: [], columns: [] };
		tableData.data = data.map(row => {
			let mappedRow = {
				key: `ticket-row-${row['id']}`,
				value: []
			};
			Object.keys(columns).forEach((key) => {
				let value = '';
				if (key === 'Actions') {
					value = (
						<div>
							{actions.show ? <Button color="primary" onClick={(e) => onShow(e, row['id'])}>View</Button> : null}
							{actions.delete ? <Button color="danger" onClick={(e) => onDelete(e, row['id'])}>Delete</Button> : null}
						</div>
					);
				} else if (columns[key] === 1) {
					value = row[key];
				} else if (isString(columns[key])) {
					if (row[key]) {
						value = row[key][columns[key]];
					}
				}
				mappedRow.value.push({
					key: `${name}-key-${row['id']}-${key}`,
					value
				});
			});
			return mappedRow;
		});
		tableData.columns = Object.keys(columns).map(column => ({
			key: `${name}-header-${column}`,
			value: column
		}));
		return tableData;
	}

	render() {
		const {
			props: { data }
		} = this;
		let tableData = {};

		let alert = null;
		if (isNull(data)) {
			alert = (<Alert color="info">Loading...</Alert>);
		} else if (isEmpty(data)) {
			alert = (<Alert color="warning">No data available</Alert>);
		} else {
			tableData = this.getMappedData();
		}

		return (
			<div>
				{alert}
				{!isEmpty(data) && (
					<BootstrapTable striped responsive>
						<thead>
							<tr>
								{tableData.columns.map(column => <th key={column.key}>{column.value}</th>)}
							</tr>
						</thead>
						<tbody>
							{tableData.data.map(row =>
								<tr key={row.key}>
									{ row.value.map(item => <td key={item.key}>{item.value}</td>) }
								</tr>
							)}
						</tbody>
					</BootstrapTable>
				)}
			</div>
		);
	}
}

Table.propTypes = {
	actions: PropTypes.shape({
		show: PropTypes.bool,
		delete: PropTypes.bool
	}),
	data: PropTypes.array,
	columns: PropTypes.object,
	name: PropTypes.string.isRequired,
	onShow: PropTypes.func,
	onDelete: PropTypes.func,
};

Table.defaultProps = {
	actions: {show: false, delete: false},
	onShow: () => {},
	onDelete: () => {}
};

export default Table;
