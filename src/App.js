import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import SignUp from './components/signUp/SignUp';
import Login from './components/login/Login';
import Home from './components/home/Home';

function App() {
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		setIsAuth(true);
	}, []);

	return (
		<div>
			<Switch>
				{isAuth ? <Route exact path='/' component={Home} /> : null}
				<Route path='/sign-up' component={SignUp} />
				<Route path='/login' component={Login} />
				<Redirect from='/' to='/login' />
			</Switch>
		</div>
	);
}

export default App;
