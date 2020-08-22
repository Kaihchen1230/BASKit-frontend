import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import SignUp from './containers/signUp/SignUp';
import Login from './containers/login/Login';
import Home from './containers/home/Home';
import HeaderBar from './components/headerBar/HeaderBar';

function App() {
	const [isAuth, setIsAuth] = useState(true);

	useEffect(() => {
		setIsAuth(true);
	}, []);

	return (
		<div>
			<HeaderBar />
			<Switch>
				{/* {isAuth ? <Route exact path='/' component={Home} /> : null} */}
				<Route path='/sign-up' component={SignUp} />
				<Route path='/login' component={Login} />
				<Route path='/home' component={Home} />
				{/* <Redirect from='/' to='/login' /> */}
			</Switch>
		</div>
	);
}

export default App;
