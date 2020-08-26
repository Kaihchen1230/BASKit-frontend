import React from 'react';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
} from '@material-ui/core';

import profileImage from '../../../images/profileImage.jpg';

const ProfileCard = (props) => {
	const { username, password, email, isEditMode } = { ...props };

	let profilePassword = '';
	if (isEditMode) {
		profilePassword = password;
	} else {
		profilePassword = '*'.repeat(password.length);
	}

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
				<Typography
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
				</Typography>
			</CardContent>
			<CardActions style={{ justifyContent: 'space-around' }}>
				<Button size='small' color='primary' variant='outlined'>
					{isEditMode ? 'Save' : 'Edit'}
				</Button>
				<Button size='small' color='secondary' variant='outlined'>
					Delete Account
				</Button>
			</CardActions>
		</Card>
	);
};

export default ProfileCard;
