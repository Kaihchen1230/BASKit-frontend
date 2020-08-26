import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from '../../../images/baskitLogo.jpeg';

const LogoArea = (props) => {
	return (
		<div style={{ flexGrow: 1 }}>
			<Link to={props.isAuthenticated ? '/home' : '/login'}>
				<img
					src={logo}
					alt='Baskit Logo'
					style={{
						width: '70px',
						borderRadius: '80%',
					}}
				/>
			</Link>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.username !== null,
	};
};

export default connect(mapStateToProps)(LogoArea);
