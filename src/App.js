import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import HeaderBar from './containers/headerBar/HeaderBar';
import SignUp from './containers/auth/signUp/SignUp';
import Login from './containers/auth/login/Login';
import Logout from './containers/auth/logout/logout';
import Home from './containers/home/Home';
import Profile from './containers/profile/Profile';
import NotFound from './components/notFound/NotFound';
import * as actions from './store/actions/auth';

function App(props) {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		console.log('in here');
		props.onTryAuthLogin();
		setLoading(false);
	}, []);

	let authRoutes = null;

	if (props.isAuthenticated) {
		console.log('in if');
		authRoutes = (
			<Switch>
				<Route exact path={['/', '/home']} component={Home} />
				<Route path='/profile' component={Profile} />
				<Route path='/logout' component={Logout} />
				<Route path='/404' component={NotFound} />
				<Redirect exact from='/*' to='/404' />
			</Switch>
		);
	} else {
		console.log('in else');
		authRoutes = (
			<Switch>
				<Route exact path={['/', '/home']} component={Home} />
				<Route path='/login' component={Login} />
				<Route path='/sign-up' component={SignUp} />
				<Route component={NotFound} />

				{/* <Route path='/404' component={NotFound} />
				<Redirect exact from='/*' to='/404' /> */}
			</Switch>
		);
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
