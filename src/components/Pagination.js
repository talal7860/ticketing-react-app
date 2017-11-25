import React from 'react';
import { Pagination as BootstrapPagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types';

const Pagination = ({ onPageChange, meta  }) => {
	let previousDisabled = true;
	let nextDisabled = true;
	if (meta) {
		if (meta.total_pages === 1) {
			nextDisabled = true;
			previousDisabled = true;
		} else if (meta.total_pages === meta.current_page) {
			nextDisabled = true;
			previousDisabled = false;
		} else if (meta.current_page === 1) {
			nextDisabled = false;
			previousDisabled = true;
		} else {
			nextDisabled = false;
			previousDisabled = false;
		}
	}
	return (
		<BootstrapPagination className='float-right'>
			<PaginationItem disabled={previousDisabled}>
				<PaginationLink previous href="#" onClick={(e) => onPageChange(e, meta.current_page - 1)} />
			</PaginationItem>
			<PaginationItem disabled={nextDisabled}>
				<PaginationLink next href="#" onClick={(e) => onPageChange(e, meta.current_page + 1)} />
			</PaginationItem>
		</BootstrapPagination>
	);
};

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  meta: PropTypes.object,
};

Pagination.defaultProps = {
  meta: {},
};

export default Pagination;
