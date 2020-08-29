import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import HeaderBar from './containers/headerBar/HeaderBar';
import SignUp from './containers/auth/signUp/SignUp';
import Login from './containers/auth/login/Login';
import Logout from './containers/auth/logout/logout';
import Home from './containers/home/Home';
import Profile from './containers/profile/Profile';
import * as actions from './store/actions/auth';

function App(props) {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		props.onTryAuthLogin();
		setLoading(false);
	}, []);

	let authRoutes = null;

	if (props.isAuthenticated) {
		authRoutes = (
			<Switch>
				<Route exact path={('/', '/home')} component={Home} />
				<Route path='/profile' component={Profile} />
				<Route path='/logout' component={Logout} />
				<Redirect from='/login' to='/home' />
				<Redirect exact from='/*' to='/home' />
			</Switch>
		);
	} else {
		authRoutes = (
			<Switch>
				<Route exact path={('/', '/home')} component={Home} />
				<Route path='/login' component={Login} />
				<Route path='/sign-up' component={SignUp} />
				<Redirect exact from='/' to='/home' />
			</Switch>
		);
	}

	if (loading) {
		console.log('goes to here');
		return <div>loading</div>;
	} else {
		return (
			<div>
				<HeaderBar />
				{authRoutes}
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.username !== null,
		loading: state.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAuthLogin: () => dispatch(actions.authCheckState()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
