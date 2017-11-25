import React from 'react';
import { Alert } from 'reactstrap';

const AlertError = ({ error }) => {
	let returnVal = null;
	if (error) {
		returnVal = (
			<Alert color="danger">
				{error}
			</Alert>
		);
	}
	return returnVal;
};

export default AlertError;
