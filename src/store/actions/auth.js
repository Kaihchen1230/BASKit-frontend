import * as actionTypes from './actionTypes';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (username, email, password) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		username: username,
		email: email,
		password: password,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const auth = (username, password) => {
	return (dispatch) => {
		dispatch(authStart());
		let localStorageUsersData = localStorage.getItem('usersData');
		localStorageUsersData = JSON.parse(localStorageUsersData);

		let userExist = null;

		if (localStorageUsersData) {
			userExist = localStorageUsersData.find(
				(user) => user.username === username && user.password === password,
			);
		}

		if (!userExist) {
			console.log('there is no userExisted');
			dispatch(authFail('You Have Entered Invalid Username and/or Password'));
		} else {
			// props.getUserInfo(userExist);
			// props.history.push('/home');
			console.log(`${username} existed and this is userExist: `, userExist);
			dispatch(
				authSuccess(userExist.username, userExist.email, userExist.password),
			);
			localStorage.setItem('user', JSON.stringify(userExist));
		}
	};
};

export const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};
