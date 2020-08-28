import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Spinner = () => {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<CircularProgress size={100} />
		</div>
	);
};

export default Spinner;
