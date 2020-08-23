import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../images/baskitLogo.jpeg';

const LogoArea = () => {
	return (
		<div style={{ flexGrow: 1 }}>
			<Link to='/'>
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

export default LogoArea;
