import React from 'react';
import { Alert } from '@material-ui/lab';

const AlertMessage = (props) => {
	return (
		<Alert severity={props.severity} style={{ marginBottom: '20px' }}>
			{props.message}
		</Alert>
	);
};

export default AlertMessage;
