import React, { useState } from 'react';
import {
	Container,
	FormControl,
	Button,
	Typography,
	CircularProgress,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import Input from '../../../components/UI/input/Input';
import AlertMessage from '../../../components/UI/alert/AlertMessage';
import Spinner from '../../../components/UI/spinner/Spinner';
import * as actions from '../../../store/actions/auth';

const initialSignUpFormControls = {
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
	email: {
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
		elementConfig: {
			label: 'Confirm Password',
			type: 'password',
			helperText: 'Password has to be matched',
		},
		value: '',
		validation: {
			required: true,
			minLength: 8,
			passwordMatched: true,
		},
		valid: false,
		touched: false,
	},
};

const SignUp = (props) => {
	const [signUpFormControls, setSignUpFormControls] = useState({
		...initialSignUpFormControls,
	});

	const [loading, setLoading] = useState(false);
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

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.passwordMatched) {
			isValid = value === signUpFormControls.password.value && isValid;
		}
		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;
	};

	const inputChangedHandler = (event, controlName) => {
		event.persist();
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

	const handleSignUp = async (event) => {
		event.preventDefault();

		setLoading(true);
		try {
			const { data } = await axios({
				method: 'POST',
				url: 'http://localhost:5000/sign-up',
				data: {
					username: signUpFormControls.username.value,
					password: signUpFormControls.password.value,
					email: signUpFormControls.email.value,
				},
			});

			setAlertSeverity('success');
			setAlertMessage(data.message);
			props.signUpSucccess('success', data.message);
			setLoading(false);

			props.history.push('/login');
		} catch (err) {
			setAlertSeverity('error');
			setAlertMessage(err.response.data.message);
			setLoading(false);
		}
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

	const formSection = (
		<form onSubmit={handleSignUp}>
			{form}
			<Button
				variant='contained'
				color='primary'
				type='submit'
				disabled={
					!(
						signUpFormControls.username.valid &&
						signUpFormControls.username.touched &&
						signUpFormControls.email.valid &&
						signUpFormControls.email.touched &&
						signUpFormControls.password.valid &&
						signUpFormControls.password.touched &&
						signUpFormControls.confirmPassword.valid &&
						signUpFormControls.confirmPassword.touched
					)
				}>
				Sign Up
			</Button>
			{loading ? <CircularProgress /> : null}
			<Typography variant='p' component='p'>
				Already have account? <Link to='/login'>Login Here</Link>
			</Typography>
		</form>
	);

	return (
		<Container fixed>
			{alertComponent}
			{loading ? <Spinner /> : formSection}
		</Container>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		signUpSucccess: (severity, message) =>
			dispatch(actions.signUpSuccess(severity, message)),
	};
};

export default connect(null, mapDispatchToProps)(SignUp);
