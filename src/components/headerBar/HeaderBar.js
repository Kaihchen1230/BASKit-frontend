import React from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Menu,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import logo from '../../baskitLogo.jpeg';

const HeaderBar = (props) => {
	return (
		<AppBar position='static'>
			<Toolbar>
				<img
					src={logo}
					alt='Baskit Logo'
					style={{
						width: '70px',
						borderRadius: '80%',
					}}
				/>
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
