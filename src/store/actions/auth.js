import * as actionTypes from './actionTypes';

export const signUpSuccess = (message) => {
	return {
		type: actionTypes.SIGN_UP_SUCCESS,
		message: message,
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
