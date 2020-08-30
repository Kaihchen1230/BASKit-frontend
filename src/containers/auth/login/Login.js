import React, { useState } from 'react';
import { Container, FormControl, Button, Typography } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Input from '../../../components/UI/input/Input';
import AlertMessage from '../../../components/UI/alert/AlertMessage';
import * as actions from '../../../store/actions/auth';
import Spinner from '../../../components/UI/spinner/Spinner';

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

	const [loading, setLoading] = useState(false);
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

	const handleLogin = async (event) => {
		event.preventDefault();
		props.signUpSucccess(null);

		try {
			setLoading(true);
			const { data } = await axios({
				method: 'POST',
				url: 'http://localhost:5000/login',
				data: {
					username: loginFormControls.username.value,
					password: loginFormControls.password.value,
				},
			});

			const user = {
				username: data.data.username,
				password: data.data.password,
				email: data.data.email,
				gallery: data.data.gallery,
			};
			props.authSuccess(user.username, user.email, user.password, user.gallery);

			localStorage.setItem('user', JSON.stringify(user));
			// props.history.push('/');
			setLoading(false);
		} catch (err) {
			setAlertMessage(err.response.data.message);
		}
	};

	const formElements = [];

	for (let key in loginFormControls) {
		formElements.push({
			id: key,
			config: loginFormControls[key],
		});
	}

	let form = formElements.map((formElement) => (
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

	if (props.message) {
		alertComponent = (
			<AlertMessage severity={props.severity} message={props.message} />
		);
	}

	if (alertMessage) {
		alertComponent = <AlertMessage severity={'error'} message={alertMessage} />;
	}

	let authRedirect = null;

	if (props.isAuthenticated) {
		console.log('this is inside authenticated: ', props.username);
		authRedirect = <Redirect to='/home' />;
	}

	const loginFormSection = (
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

			<Typography variant='p' component='p'>
				Don't have an account? <Link to='/sign-up'>Sign Up Here</Link>
			</Typography>
		</form>
	);

	return (
		<Container fixed>
			{authRedirect}
			{alertComponent}
			{loading ? <Spinner /> : loginFormSection}
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		username: state.username,
		isAuthenticated: state.username !== null,
		severity: state.severity,
		message: state.message,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		authSuccess: (username, email, password, gallery) =>
			dispatch(actions.authSuccess(username, email, password, gallery)),
		signUpSucccess: (message) => dispatch(actions.signUpSuccess(message)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
