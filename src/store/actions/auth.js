import * as actionTypes from './actionTypes';

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
				authSuccess(
					userExist.username,
					userExist.email,
					userExist.password,
					userExist.gallery,
				),
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

export const deleteUserStart = () => {
	return {
		type: actionTypes.DELETE_USER_START,
	};
};

export const deleteUser = (username, password, email) => {
	return (dispatch) => {
		dispatch(deleteUserStart);

		const usersData = localStorageSearch();
		let updateUsersData = [];
		if (usersData) {
			updateUsersData = usersData.filter(
				(user) => user.username === username && user.email === password,
			);

			localStorage.setItem('usersData', JSON.stringify(updateUsersData));
			dispatch(logout());
		}
	};
};

export const addPhotoStart = () => {
	return {
		type: actionTypes.ADD_PHOTO_START,
	};
};

export const addPhotoSuccess = (username, imgUrl) => {
	const usersData = localStorageSearch();

	console.log('this is username: ', username);
	const updateUsersData = usersData.map((user) => {
		if (user.username === username) {
			user.gallery = user.gallery.concat(imgUrl);
			console.log('this is user: ', user);
		}
		return user;
	});

	console.log('this is updateUsersData: ', updateUsersData);
	localStorage.setItem('usersData', JSON.stringify(updateUsersData));

	let user = localStorage.getItem('user');
	user = JSON.parse(user);
	user.gallery = user.gallery.concat(imgUrl);
	localStorage.setItem('user', JSON.stringify(user));

	return {
		type: actionTypes.ADD_PHOTO_SUCCESS,
		imgUrl: imgUrl,
	};
};

export const addPhoto = (username, imgUrl) => {
	return (dispatch) => {
		// dispatch(addPhotoStart);

		//  api call here

		dispatch(addPhotoSuccess(username, imgUrl));
	};
};

export const deletePhotoSuccess = (username, imgUrl) => {
	const usersData = localStorageSearch();

	console.log(
		'this is username in delete: ',
		username,
		' this is img: ',
		imgUrl,
	);

	const updateUsersData = usersData.map((user) => {
		if (user.username === username) {
			const updateGallery = user.gallery.filter(
				(photoUrl) => photoUrl !== imgUrl,
			);
			user.gallery = updateGallery;
		}
		return user;
	});

	console.log('this is updateUsersData in deletE: ', updateUsersData);

	localStorage.setItem('usersData', JSON.stringify(updateUsersData));

	let user = localStorage.getItem('user');
	user = JSON.parse(user);
	const updateGallery = user.gallery.filter((photoUrl) => photoUrl !== imgUrl);
	user.gallery = updateGallery;
	localStorage.setItem('user', JSON.stringify(user));

	return {
		type: actionTypes.DELETE_PHOTO_SUCCESS,
		imgUrl: imgUrl,
	};
};

export const deletePhoto = (username, imgUrl) => {
	return (dispatch) => {
		// api call
		// deletePhotoStart

		dispatch(deletePhotoSuccess(username, imgUrl));
	};
};
