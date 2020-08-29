import React from 'react';
import { AppBar, Toolbar, Link } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import LogoArea from '../../components/headerBar/logoArea/LogoArea';
import ProfileArea from '../../components/headerBar/profileArea/ProfileArea';

const HeaderBar = (props) => {
	let showProfileArea = null;

	if (props.isAuth) {
		showProfileArea = <ProfileArea />;
	}

	return (
		<AppBar position='static' style={{ marginBottom: '40px' }}>
			<Toolbar>
				<LogoArea />
				{props.isAuth ? (
					<ProfileArea />
				) : (
					<Link
						component={RouterLink}
						to='/login'
						underline='hover'
						style={{ color: 'white' }}>
						Login Here
					</Link>
				)}
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
