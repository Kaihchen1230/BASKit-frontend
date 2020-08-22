import React, { useState } from 'react';
import { Container, FormControl, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Input from '../../components/UI/Input';

const Login = () => {
	const [loginFormControls, setLoginFormControl] = useState({
		username: {
			elementType: 'input',
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
			elementType: 'input',
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

		console.log('this is logincontrols: ', loginFormControls);
		alert('login clicked');
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
				<Button variant='contained' color='primary' type='submit'>
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
