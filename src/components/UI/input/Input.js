import React from 'react';
import { TextField } from '@material-ui/core';

const Input = (props) => {
	return (
		<TextField
			{...props.elementConfig}
			defaultValue={props.value}
			fullWidth={props.fullWidth}
			onChange={props.changed}
			error={props.invalid && props.touched}
		/>
	);
};

export default Input;
