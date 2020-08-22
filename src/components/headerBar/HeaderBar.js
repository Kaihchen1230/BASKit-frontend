import React from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Menu,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

const HeaderBar = (props) => {
	return (
		<AppBar position='static'>
			<Toolbar>
				<IconButton edge='start' color='inherit' aria-label='menu'>
					Our logo
				</IconButton>
				<Typography variant='h6' style={{ flexGrow: 1 }}>
					{/* Photos */}
				</Typography>
				<div>
					<IconButton
						aria-label='account of current user'
						aria-controls='menu-appbar'
						aria-haspopup='true'
						// onClick={handleMenu}
						color='inherit'>
						<AccountCircle fontSize='large' />
					</IconButton>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default HeaderBar;
