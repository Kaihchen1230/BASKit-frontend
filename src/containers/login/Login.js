import React, { useState } from 'react';
import { Container, FormControl, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Input from '../../components/UI/input/Input';

const Login = (props) => {
	const [loginFormControls, setLoginFormControl] = useState({
		username: {
			elementConfig: {
				label: 'Username',
				type: 'text',
				helperText: '',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		password: {
			elementConfig: {
				label: 'Password',
				type: 'password',
			},
			value: '',
			validation: {
				required: true,
				minLength: 8,
			},
			valid: false,
			touched: false,
		},
	});

	const checkValidity = (value, rules) => {
		let isValid = true;

		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		return isValid;
	};

	const inputChangedHandler = (event, controlName) => {
		event.persist();
		setLoginFormControl((prevState) => ({
			...prevState,
			[controlName]: {
				...prevState[controlName],
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					prevState[controlName].validation,
				),
				touched: true,
			},
		}));
	};

	const handleLogin = (event) => {
		event.preventDefault();
		props.history.push('/home');
	};

	const formElements = [];

	for (let key in loginFormControls) {
		formElements.push({
			id: key,
			config: loginFormControls[key],
		});
	}

	const form = formElements.map((formElement) => (
		<FormControl
			fullWidth
			key={formElement.id}
			style={{ marginBottom: '20px' }}>
			<Input
				elementType={formElement.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				touched={formElement.config.touched}
				changed={(event) => inputChangedHandler(event, formElement.id)}
			/>
		</FormControl>
	));
	return (
		<Container fixed>
			<form onSubmit={handleLogin}>
				{form}
				<Button
					variant='contained'
					color='primary'
					type='submit'
					disabled={
						!(
							loginFormControls.username.touched &&
							loginFormControls.username.valid &&
							loginFormControls.password.touched &&
							loginFormControls.password.valid
						)
					}>
					Login
				</Button>
			</form>
			<Typography variant='p' component='p'>
				Don't have an account? <Link to='/sign-up'>Sign Up Here</Link>
			</Typography>
		</Container>
	);
};

export default Login;
