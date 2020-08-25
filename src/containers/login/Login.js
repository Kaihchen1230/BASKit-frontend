import React, { useState } from 'react';
import { Container, FormControl, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../components/UI/input/Input';
import AlertMessage from '../../components/UI/alert/AlertMessage';
import * as actions from '../../store/actions';

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

	const [alertSeverity, setAlertSeverity] = useState('');
	const [alertMessage, setAlertMessage] = useState('');

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

		let localStorageUsersData = localStorage.getItem('usersData');
		localStorageUsersData = JSON.parse(localStorageUsersData);

		let userExist = null;

		if (localStorageUsersData.length > 0) {
			userExist = localStorageUsersData.find(
				(user) =>
					user.username === loginFormControls.username.value &&
					user.password === loginFormControls.password.value,
			);
		}
		console.log('this is userExist: ', userExist);

		if (!userExist) {
			setAlertSeverity('error');
			setAlertMessage('You Have Entered Invalid Username and/or Password');
		} else {
			// localStorageUsersData.push(newUser);
			props.getUserInfo(userExist);
			props.history.push('/home');
			localStorage.setItem('user', JSON.stringify(userExist));
		}
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

	let alertComponent = null;

	if (alertMessage) {
		alertComponent = (
			<AlertMessage severity={alertSeverity} message={alertMessage} />
		);
	}

	return (
		<Container fixed>
			{alertComponent}
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

const mapDispatchToProps = (dispatch) => {
	return {
		getUserInfo: (userInfo) =>
			dispatch({
				type: actions.GET_USER,
				payload: { userInfo: userInfo },
			}),
	};
};

export default connect(null, mapDispatchToProps)(Login);
