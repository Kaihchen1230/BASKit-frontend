import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (username, email, password, gallery) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		username: username,
		email: email,
		password: password,
		gallery: gallery,
	};
};

const localStorageSearch = () => {
	let localStorageUsersData = localStorage.getItem('usersData');
	localStorageUsersData = JSON.parse(localStorageUsersData);

	return localStorageUsersData;
};

export const auth = (username, password) => {
	return async (dispatch) => {
		dispatch(authStart());

		try {
			const { data } = await axios({
				method: 'POST',
				url: 'http://localhost:5000/login',
				data: {
					username: username,
					password: password,
				},
			});
			console.log('this is data in auth success: ', data);
			dispatch(
				authSuccess(data.username, data.email, data.password, data.gallery),
			);
			const user = {
				username: data.username,
				password: data.password,
				email: data.email,
				gallery: data.gallery,
			};
			localStorage.setItem('user', JSON.stringify(user));
		} catch (err) {
			console.log('eror in login: ', err.response.data.message);
			// dispatch(authFail(err.response.data.message));
		}
	};
};

export const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		let user = localStorage.getItem('user');
		user = JSON.parse(user);

		if (user) {
			dispatch(
				authSuccess(user.username, user.email, user.password, user.gallery),
			);
		} else {
			dispatch(logout());
		}
	};
};

export const updateUserStart = () => {
	return {
		type: actionTypes.UPDATE_USER_START,
	};
};

export const updateUserSuccess = (username, password, email) => {
	let user = localStorage.getItem('user');
	user = JSON.parse(user);
	user.username = username;
	user.email = email;
	user.pasword = password;
	localStorage.setItem('user', JSON.stringify(user));

	return {
		type: actionTypes.UPDATE_USER_SUCCESS,
		newUsername: username,
		newPassword: password,
		newEmail: email,
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
			// dispatch(authFail('You Have Entered Invalid Username and/or Password'));
		} else {
			// console.log(`${username} existed and this is userExist: `, userExist);
			dispatch(
				authSuccess(userExist.username, userExist.email, userExist.password),
			);
			localStorage.setItem('user', JSON.stringify(userExist));
		}
	};
};

export const deleteUserStart = () => {
	return {
		type: actionTypes.DELETE_USER_START,
	};
};

export const deleteUser = () => {
	return (dispatch) => {
		dispatch(logout());
	};
};

export const addPhotoStart = () => {
	return {
		type: actionTypes.ADD_PHOTO_START,
	};
};

export const addPhotoSuccess = (photoUrl) => {
	let user = localStorage.getItem('user');
	user = JSON.parse(user);
	user.gallery = user.gallery.concat(photoUrl);
	localStorage.setItem('user', JSON.stringify(user));

	return {
		type: actionTypes.ADD_PHOTO_SUCCESS,
		photoUrl: photoUrl,
	};
};

export const addPhoto = (username, imgUrl) => {
	return (dispatch) => {
		// dispatch(addPhotoStart);
		//  api call here
		// dispatch(addPhotoSuccess(username, imgUrl));
	};
};

export const deletePhotoSuccess = (updatedGallery) => {
	let user = localStorage.getItem('user');
	user = JSON.parse(user);
	user.gallery = updatedGallery;
	localStorage.setItem('user', JSON.stringify(user));

	return {
		type: actionTypes.DELETE_PHOTO_SUCCESS,
		updatedGallery: updatedGallery,
	};
};

export const deletePhoto = (username, imgUrl) => {
	return (dispatch) => {
		// api call
		// deletePhotoStart

		dispatch(deletePhotoSuccess(username, imgUrl));
	};
};
