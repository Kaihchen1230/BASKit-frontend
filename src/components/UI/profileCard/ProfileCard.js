import React, { useState } from 'react';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	FormControl,
} from '@material-ui/core';
import { connect } from 'react-redux';

import profileImage from '../../../images/profileImage.jpg';
import Input from '../input/Input';

const ProfileCard = (props) => {
	const [isEditMode, setIsEditMode] = useState(false);

	const [profileFromControls, setProfileFormControls] = useState({
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

	const updateEditModeForProfileForm = (editMode) => {
		const updateProfileFormControls = { ...profileFromControls };
		for (const key of Object.keys(updateProfileFormControls)) {
			console.log('key:', key);
			updateProfileFormControls[key] = {
				...profileFromControls[key],
				elementConfig: { ...profileFromControls[key].elementConfig },
			};
			updateProfileFormControls[key].elementConfig.disabled = editMode;
			if (key === 'password' && !editMode) {
				console.log('this is password: ', key);
				updateProfileFormControls[key].elementConfig.type = 'text';
			} else if (key === 'password' && editMode) {
				updateProfileFormControls[key].elementConfig.type = 'password';
			}
		}

		console.log('updateProfileFormControls: ', updateProfileFormControls);
		setProfileFormControls(updateProfileFormControls);
	};

	const handleEdit = () => {
		updateEditModeForProfileForm(isEditMode);
		if (isEditMode) {
			setIsEditMode(false);
		} else {
			setIsEditMode(true);
		}
	};

	const formElements = [];

	for (let key in profileFromControls) {
		formElements.push({
			id: key,
			config: profileFromControls[key],
		});
	}

	const form = formElements.map((formElement) => (
		<FormControl
			key={formElement.id}
			style={{ marginBottom: '20px', maxWidth: '315px', width: '100%' }}>
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
				{form}
				{/* <Typography
					variant='body2'
					color='textSecondary'
					component='p'
					style={{ paddingBottom: '20px' }}>
					Email: {email}
				</Typography>

				<Typography
					variant='body2'
					color='textSecondary'
					component='p'
					style={{ paddingBottom: '20px' }}>
					Username: {username}
				</Typography>
				<Typography
					variant='body2'
					color='textSecondary'
					component='p'
					style={{ paddingBottom: '20px' }}>
					Password: {profilePassword}
				</Typography> */}
			</CardContent>
			<CardActions style={{ justifyContent: 'space-around' }}>
				<Button
					size='small'
					color='primary'
					variant='outlined'
					onClick={handleEdit}>
					{isEditMode ? 'Save' : 'Edit'}
				</Button>
				<Button size='small' color='secondary' variant='outlined'>
					Delete Account
				</Button>
			</CardActions>
		</Card>
	);
};

const mapStateToProps = (state) => {
	return {
		username: state.username,
		password: state.password,
		email: state.email,
	};
};

export default connect(mapStateToProps)(ProfileCard);
