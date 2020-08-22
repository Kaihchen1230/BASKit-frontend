import React, { useState } from 'react';
import { Container, FormControl, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Input from '../../components/UI/Input';

const SignUp = (props) => {
	const [signUpFormControls, setSignUpFormControls] = useState({
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
		email: {
			elementType: 'email',
			elementConfig: {
				label: 'Email',
				type: 'email',
				helperText: '',
			},
			value: '',
			validation: {
				required: true,
				isEmail: true,
			},
			valid: false,
			touched: false,
		},
		password: {
			elementType: 'input',
			elementConfig: {
				label: 'Password',
				type: 'password',
				helperText: 'Password has to be at least 8 characters long',
			},
			value: '',
			validation: {
				required: true,
				minLength: 8,
			},
			valid: false,
			touched: false,
		},
		confirmPassword: {
			elementType: 'input',
			elementConfig: {
				label: 'Confirm Password',
				type: 'password',
				helperText: 'Password has to be at least 8 characters long',
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

	const [isValidSignUpForm, setIsValidSignUpForm] = useState(false);

	const checkValidity = (value, rules) => {
		let isValid = true;

		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = isValid.length >= rules.minLength && isValid;
		}

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;
	};

	const inputChangedHandler = (event, controlName) => {
		event.persist();
		console.log('this is vent.target.value: ', event.target.value);
		setSignUpFormControls((prevState) => ({
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

	const handleSignUp = (event) => {
		event.preventDefault();
		console.log('this is signupform: ', signUpFormControls);
		alert('sign up clicked');
	};

	const formElements = [];

	for (let key in signUpFormControls) {
		formElements.push({
			id: key,
			config: signUpFormControls[key],
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
			<form onSubmit={handleSignUp}>
				{form}
				<Button variant='contained' color='primary' type='submit'>
					Sign Up
				</Button>
			</form>
			<Typography variant='p' component='p'>
				Already have account? <Link to='/login'>Login Here</Link>
			</Typography>
		</Container>
	);
};

export default SignUp;
