import React, { useState } from 'react';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	FormControl,
	CircularProgress,
} from '@material-ui/core';
import { connect } from 'react-redux';
import axios from 'axios';

import profileImage from '../../../images/profileImage.jpg';
import Input from '../input/Input';
import ConfirmDialog from '../confirmDialog/ConfirmDialog';
import Spinner from '../spinner/Spinner';
import * as actions from '../../../store/actions/auth';

const ProfileCard = (props) => {
	const initialProfileFromControls = {
		username: {
			elementConfig: {
				label: 'Username',
				type: 'text',
				disabled: true,
			},
			value: props.username,
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
			unique: true,
		},
		password: {
			elementConfig: {
				label: 'Password',
				type: 'password',
				disabled: true,
			},
			value: props.password,
			validation: {
				required: true,
				minLength: 8,
			},
			valid: false,
			touched: false,
		},
		email: {
			elementConfig: {
				label: 'Email',
				type: 'email',
				disabled: true,
			},
			value: props.email,
			validation: {
				required: true,
				isEmail: true,
			},
			valid: false,
			touched: false,
			unique: true,
		},
	};

	const [isEditMode, setIsEditMode] = useState(false);

	const [profileFromControls, setProfileFormControls] = useState(
		JSON.parse(JSON.stringify(initialProfileFromControls)),
	);

	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		console.log('this is props: ', props);
		if (isEditMode) {
			setLoading(true);
			setIsEditMode(false);
			console.log(
				'this is initialProfileFromControls: ',
				initialProfileFromControls,
			);
			setProfileFormControls(initialProfileFromControls);
			setLoading(false);
			console.log('this is profileFromControls: ', profileFromControls);
			window.location.reload();
		} else {
			setOpen(true);
		}
	};

	const handleClickClose = () => {
		setOpen(false);
	};

	const handleDelete = async () => {
		console.log('delete press and this is props: ', props);

		setLoading(true);
		try {
			const { data } = await axios({
				method: 'POST',
				url: 'http://localhost:5000/delete-account',
				data: {
					username: props.username,
					password: props.password,
				},
			});

			console.log('this is the data after delete: ', data);

			props.deleteUser();
			props.props.history.push('/login');
		} catch (err) {
			console.log('there is an error to delete to account: ', err);
		}
		setLoading(false);
	};

	const checkValidity = (value, rules) => {
		let isValid = true;

		if (!rules) {
			return true;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;
	};

	const inputChangedHandler = (event, controlName) => {
		event.persist();
		setProfileFormControls((prevState) => ({
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

	const updateEditModeForProfileForm = (editMode, profileFrom) => {
		setLoading(true);
		console.log('this is profileFrom in the func: ', profileFrom);
		console.log(
			'this is the profilFromcontrol before update: ',
			profileFromControls,
		);
		const updateProfileFormControls = { ...profileFrom };
		for (const key of Object.keys(profileFrom)) {
			// console.log('key:', key);
			updateProfileFormControls[key] = {
				...profileFrom[key],
				elementConfig: { ...profileFrom[key].elementConfig },
			};
			updateProfileFormControls[key].elementConfig.disabled = editMode;
			if (key === 'password' && !editMode) {
				// console.log('this is password: ', key);
				updateProfileFormControls[key].elementConfig.type = 'text';
			} else if (key === 'password' && editMode) {
				updateProfileFormControls[key].elementConfig.type = 'password';
			}
		}

		console.log(
			'updateProfileFormControls in the function: ',
			updateProfileFormControls,
		);
		setProfileFormControls(updateProfileFormControls);
		console.log(
			'profileFormControl after update in the function: ',
			profileFromControls,
		);
		setLoading(false);
	};

	const handleEdit = async () => {
		let updateProfileFormControls = null;
		if (isEditMode) {
			setIsEditMode(false);

			setLoading(true);

			try {
				const { data } = await axios({
					method: 'POST',
					url: 'http://localhost:5000/update-account',
					data: {
						oldUsername: props.username,
						oldPassword: props.password,
						oldEmail: props.email,
						newUsername: profileFromControls.username.value,
						newPassword: profileFromControls.password.value,
						newEmail: profileFromControls.email.value,
					},
				});
				console.log('this is the data from update: ', data.updatedAccount);
				const updatedAccount = data.updatedAccount;

				props.updateUserSuccess(
					updatedAccount.username,
					updatedAccount.password,
					updatedAccount.email,
				);
				updateProfileFormControls = { ...profileFromControls };
				for (const key of Object.keys(profileFromControls)) {
					// console.log('key:', key);
					updateProfileFormControls[key] = {
						...profileFromControls[key],
						elementConfig: { ...profileFromControls[key].elementConfig },
					};
					updateProfileFormControls[key].elementConfig.disabled = isEditMode;
					if (key === 'password' && !isEditMode) {
						updateProfileFormControls[key].elementConfig.type = 'text';
					} else if (key === 'password' && isEditMode) {
						updateProfileFormControls[key].elementConfig.type = 'password';
					}
				}
				setProfileFormControls(updateProfileFormControls);
				props.handleShowAlert('success', data.message);
			} catch (err) {
				console.log(
					'there is an error to update the account: ',
					err.response.data.message,
				);
				updateProfileFormControls = { ...initialProfileFromControls };
				for (const key of Object.keys(initialProfileFromControls)) {
					// console.log('key:', key);
					updateProfileFormControls[key] = {
						...initialProfileFromControls[key],
						elementConfig: {
							...initialProfileFromControls[key].elementConfig,
						},
					};
					updateProfileFormControls[key].elementConfig.disabled = false;
					if ('unique' in updateProfileFormControls[key]) {
						updateProfileFormControls[key].unique = false;
						console.log(
							'this is invalid unique: ',
							updateProfileFormControls[key].unique,
						);
					}
					if (key === 'password' && !isEditMode) {
						updateProfileFormControls[key].elementConfig.type = 'text';
					} else if (key === 'password' && isEditMode) {
						updateProfileFormControls[key].elementConfig.type = 'password';
					}
				}
				setProfileFormControls(updateProfileFormControls);

				// setProfileFormControls(initialProfileFromControls);
				setIsEditMode(true);
				// console.log('inside of the error case: ');

				props.handleShowAlert('error', err.response.data.message);
			}
			setLoading(false);
		} else {
			setIsEditMode(true);
			// console.log('inside of the else case: ');
			updateProfileFormControls = { ...profileFromControls };
			for (const key of Object.keys(profileFromControls)) {
				// console.log('key:', key);
				updateProfileFormControls[key] = {
					...profileFromControls[key],
					elementConfig: { ...profileFromControls[key].elementConfig },
				};
				updateProfileFormControls[key].elementConfig.disabled = isEditMode;
				if (key === 'password' && !isEditMode) {
					updateProfileFormControls[key].elementConfig.type = 'text';
				} else if (key === 'password' && isEditMode) {
					updateProfileFormControls[key].elementConfig.type = 'password';
				}
			}
			setProfileFormControls(updateProfileFormControls);
		}
	};

	let formElements = [];
	let form = null;
	for (let key in profileFromControls) {
		formElements.push({
			id: key,
			config: profileFromControls[key],
		});
	}

	form = formElements.map((formElement) => {
		// console.log('this is formElement: ', formElement);
		return (
			<FormControl
				key={formElement.id}
				style={{ marginBottom: '20px', maxWidth: '315px', width: '100%' }}>
				<Input
					// elementType={formElement.elementType}
					elementConfig={formElement.config.elementConfig}
					value={formElement.config.value}
					invalid={!formElement.config.valid}
					touched={formElement.config.touched}
					changed={(event) => inputChangedHandler(event, formElement.id)}
				/>
			</FormControl>
		);
	});

	return (
		<Card>
			<CardActionArea style={{ padding: '20px' }}>
				<CardMedia
					component='img'
					alt='User Profile Image'
					height='140'
					image={profileImage}
				/>
			</CardActionArea>

			<CardContent style={{ paddingLeft: '40px' }}>
				{loading ? <Spinner /> : form}
			</CardContent>
			<CardActions style={{ justifyContent: 'space-around' }}>
				<Button
					size='small'
					color='primary'
					variant='outlined'
					onClick={handleEdit}
					disabled={
						isEditMode &&
						((profileFromControls.email.touched &&
							!profileFromControls.email.valid) ||
							(profileFromControls.username.touched &&
								!profileFromControls.username.valid) ||
							(profileFromControls.password.touched &&
								!profileFromControls.password.valid))
					}>
					{isEditMode ? 'Save' : 'Edit'}
				</Button>

				<Button
					size='small'
					color='secondary'
					variant='outlined'
					onClick={handleClickOpen}>
					{isEditMode ? 'Cancel' : 'Delete'}
				</Button>
			</CardActions>

			<ConfirmDialog
				open={open}
				handleClose={handleClickClose}
				handleDelete={handleDelete}
				username={props.username}
				email={props.email}
				password={profileFromControls.password.value}
				props={props}
			/>
		</Card>
	);
};

const mapStateToProps = (state) => {
	return {
		username: state.username,
		password: state.password,
		email: state.email,
		gallery: state.gallery,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateUserSuccess: (newUsername, newPassword, newEmail) =>
			dispatch(actions.updateUserSuccess(newUsername, newPassword, newEmail)),

		deleteUser: () => dispatch(actions.deleteUser()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);
