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

const localStorageSearch = () => {
	let localStorageUsersData = localStorage.getItem('usersData');
	localStorageUsersData = JSON.parse(localStorageUsersData);

	return localStorageUsersData;
};

export const auth = (username, password) => {
	return (dispatch) => {
		dispatch(authStart());

		const usersData = localStorageSearch();
		let userExist = null;

		if (usersData) {
			userExist = usersData.find(
				(user) => user.username === username && user.password === password,
			);
		}

		if (!userExist) {
			// console.log('there is no userExisted');
			dispatch(authFail('You Have Entered Invalid Username and/or Password'));
		} else {
			// console.log(`${username} existed and this is userExist: `, userExist);
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

export const updateUserStart = () => {
	return {
		type: actionTypes.UPDATE_USER_START,
	};
};

export const updateUserSuccess = (username, password, email) => {
	return {
		type: actionTypes.UPDATE_USER_SUCCESS,
		username: username,
		password: password,
		email: email,
	};
};

export const updateUserFail = (error) => {
	return {
		type: actionTypes.UPDATE_USER_FAIL,
		error: error,
	};
};

export const updateUser = (
	oldUsername,
	oldPassword,
	oldEmail,
	newUsername,
	newPassword,
	newEmail,
) => {
	return (dispatch) => {
		dispatch(updateUserStart);

		// api call here
		const usersData = localStorageSearch();
		let userExist = null;

		// make sure the newUsername and newEmail dones't exist

		if (usersData) {
			userExist = usersData.find((user) => {
				if (user.username === newUsername || user.email === newEmail) {
					return user;
				}
			});
		}

		if (!userExist) {
			let updateUsersData = [];
			updateUsersData = usersData.map((user) => {
				if (
					user.username === oldUsername &&
					user.password === oldPassword &&
					user.email === oldEmail
				) {
					return {
						username: newUsername,
						password: newPassword,
						email: newEmail,
					};
				} else {
					return user;
				}
			});
			console.log('this is updateUsersData: ', updateUsersData);
			localStorage.setItem('usersData', JSON.stringify(updateUsersData));

			const currentUser = localStorage.getItem('user');
			let updateCurrentUser = JSON.parse(currentUser);
			updateCurrentUser = {
				username: newUsername,
				password: newPassword,
				email: newEmail,
			};
			console.log('this is currentUser in redux: ', updateCurrentUser);
			localStorage.setItem('user', JSON.stringify(updateCurrentUser));
			dispatch(updateUserSuccess(newUsername, newPassword, newEmail));
		} else {
			dispatch(updateUserFail('Username and/or Email Already Existed'));
		}

		if (!userExist) {
			// console.log('there is no userExisted');
			dispatch(authFail('You Have Entered Invalid Username and/or Password'));
		} else {
			// console.log(`${username} existed and this is userExist: `, userExist);
			dispatch(
				authSuccess(userExist.username, userExist.email, userExist.password),
			);
			localStorage.setItem('user', JSON.stringify(userExist));
		}
	};
};
