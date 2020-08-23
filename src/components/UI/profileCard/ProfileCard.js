import React from 'react';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	IconButton,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';

import profileImage from '../../../images/profileImage.jpg';

const ProfileCard = (props) => {
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
				<Typography variant='body2' color='textSecondary' component='p'>
					Email: ......
					<IconButton color='inherit' onClick={() => alert(200)}>
						<Edit fontSize='small' />
					</IconButton>
				</Typography>
				<Typography variant='body2' color='textSecondary' component='p'>
					Username: ......
					<IconButton color='inherit' onClick={() => alert(200)}>
						<Edit fontSize='small' />
					</IconButton>
				</Typography>
				<Typography variant='body2' color='textSecondary' component='p'>
					Password: .......
					<IconButton color='inherit' onClick={() => alert(200)}>
						<Edit fontSize='small' />
					</IconButton>
				</Typography>
			</CardContent>
			<CardActions style={{ justifyContent: 'space-around' }}>
				<Button size='small' color='primary' variant='outlined'>
					Save
				</Button>
				<Button size='small' color='secondary' variant='outlined'>
					Delete Account
				</Button>
			</CardActions>
		</Card>
	);
};

export default ProfileCard;
