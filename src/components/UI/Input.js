import React from 'react';
import { TextField, requirePropFactory } from '@material-ui/core';

const Input = (props) => {
	return (
		<TextField
			{...props.elementConfig}
			defaultValue={props.value}
			onChange={props.changed}
			error={props.invalid && props.touched}
		/>
	);
};

export default Input;
