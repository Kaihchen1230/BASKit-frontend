import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import HeaderBar from './containers/headerBar/HeaderBar';
import SignUp from './containers/signUp/SignUp';
import Login from './containers/login/Login';
import Home from './containers/home/Home';
import Profile from './containers/profile/Profile';
import * as actions from './store/actions';

function App(props) {
	let user = localStorage.getItem('user');
	// let usersData = localStorage.getItem('usersData');

	user = JSON.parse(user);
	console.log('this is in app');
	// usersData = JSON.parse(usersData);

	// if (usersData) {
	// 	usersData = usersData.map((user) => JSON.parse(user));
	// } else {
	// 	usersData = [];
	// }

	let authRoutes = (
		<Switch>
			<Route path='/login' component={Login} />
			<Route path='/sign-up' component={SignUp} />
			<Redirect to='/login' />
		</Switch>
	);

	if (user) {
		authRoutes = (
			<Switch>
				<Route exact path='/home' component={Home} />
				<Route path='/profile' component={Profile} />
				<Redirect to='/home' />
			</Switch>
		);
	}

	props.getUserInfo(user);

	return (
		<div>
			<HeaderBar />
			{authRoutes}
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		getUserInfo: (userInfo) =>
			dispatch({
				type: actions.GET_USER,
				payload: { userInfo: userInfo },
			}),
	};
};

export default connect(null, mapDispatchToProps)(App);
