import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HeaderBar from './containers/headerBar/HeaderBar';
import SignUp from './containers/signUp/SignUp';
import Login from './containers/login/Login';
import Home from './containers/home/Home';
import Profile from './containers/profile/Profile';

function App() {
	console.log('this is app');

	return (
		<div>
			<HeaderBar />
			<Switch>
				{/* {isAuth ? <Route exact path='/' component={Home} /> : null} */}
				<Route path='/sign-up' component={SignUp} />
				<Route path='/login' component={Login} />
				<Route path='/profile' component={Profile} />
				<Route eact path='/' component={Home} />
				{/* <Redirect from='/' to='/login' /> */}
			</Switch>
		</div>
	);
}

export default App;
