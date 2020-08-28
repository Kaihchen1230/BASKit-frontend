import React, { useState } from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	CircularProgress,
} from '@material-ui/core';

import Input from '../input/Input';
import AlertMessage from '../alert/AlertMessage';

const ConfirmDialog = (props) => {
	const [confirmFormControl, setConfirmFormControl] = useState({
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
		setConfirmFormControl((prevState) => ({
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

	const confirmField = (
		<Input
			elementConfig={confirmFormControl.password.elementConfig}
			value={confirmFormControl.password.value}
			invalid={!confirmFormControl.password.valid}
			touched={confirmFormControl.password.touched}
			fullWidth={true}
			changed={(event) => inputChangedHandler(event, 'password')}
		/>
	);

	return (
		<Dialog
			disableBackdropClick
			open={props.open}
			onClose={props.handleClose}
			aria-labelledby='responsive-dialog-title'>
			{props.message && props.severity ? (
				<AlertMessage severity={props.severity} message={props.message} />
			) : null}
			<DialogTitle id='responsive-dialog-title'>
				Are You Absolutely Sure?
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					This action cannot be undone. This will permanently delete{' '}
					<b>
						{props.username}/{props.email}
					</b>
					. Please type your <b>password</b> to confirm.
				</DialogContentText>
				{confirmField}
			</DialogContent>
			<DialogActions>
				<Button
					autoFocus
					onClick={props.handleDelete}
					color='secondary'
					variant='outlined'
					disabled={
						!(
							confirmFormControl.password.value === props.password &&
							confirmFormControl.password.touched &&
							confirmFormControl.password.valid
						)
					}>
					Confirm
				</Button>
				{props.message && props.severity ? <CircularProgress /> : null}
				<Button
					onClick={props.handleClose}
					color='primary'
					autoFocus
					variant='outlined'>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDialog;
