import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import HeaderBar from './containers/headerBar/HeaderBar';
import SignUp from './containers/auth/signUp/SignUp';
import Login from './containers/auth/login/Login';
import Logout from './containers/auth/logout/logout';
import Home from './containers/home/Home';
import Profile from './containers/profile/Profile';
import PageNotFound from './containers/pageNotFound/pageNotFound';
import * as actions from './store/actions/auth';

function App(props) {
	const [isLoggedIn, setIsLogged] = useState(false);

	useEffect(() => {
		props.onTryAuthLogin();
		setIsLogged(true);
	});

	let authRoutes = (
		<Switch>
			{/* <Route exact path={('/', '/home')} component={Home} />
			 */}
			<Route exact path='/' component={Home} />
			<Route path='/login' component={Login} />
			<Route path='/sign-up' component={SignUp} />
		</Switch>
	);

	if (props.isAuthenticated) {
		authRoutes = (
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/profile' component={Profile} />
				<Route path='/logout' component={Logout} />
				<Route path='/404' component={PageNotFound} />
				<Redirect to='/404' />
			</Switch>
		);
	}

	if (!isLoggedIn) {
		console.log('here');
		return <div>Loading</div>;
	}

	return (
		<div>
			<HeaderBar />
			{authRoutes}
		</div>
	);
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
