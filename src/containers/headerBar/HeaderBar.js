import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { connect } from 'react-redux';

import LogoArea from '../../components/headerBar/logoArea/LogoArea';
import ProfileArea from '../../components/headerBar/profileArea/ProfileArea';

const HeaderBar = (props) => {
	let showProfileArea = null;

	console.log('this is props: ', props);
	if (props.isAuth) {
		showProfileArea = <ProfileArea />;
	}

	return (
		<AppBar position='static' style={{ marginBottom: '40px' }}>
			<Toolbar>
				<LogoArea />
				{showProfileArea}
			</Toolbar>
		</AppBar>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuth: state.username !== null,
	};
};
export default connect(mapStateToProps)(HeaderBar);
