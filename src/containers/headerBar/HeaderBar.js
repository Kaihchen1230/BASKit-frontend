import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

import LogoArea from '../../components/headerBar/logoArea/LogoArea';
import ProfileArea from '../../components/headerBar/profileArea/ProfileArea';

const HeaderBar = (props) => {
	return (
		<AppBar position='static'>
			<Toolbar>
				<LogoArea />

				<ProfileArea />
			</Toolbar>
		</AppBar>
	);
};

export default HeaderBar;
