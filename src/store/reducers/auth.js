import * as actionTypes from '../actions/actionTypes';

const initialState = {
	username: null,
	email: null,
	password: null,
	gallery: [],
	message: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SIGN_UP_SUCCESS:
			return {
				...state,
				message: action.message,
			};

		case actionTypes.AUTH_SUCCESS:
			return {
				...state,
				username: action.username,
				password: action.password,
				email: action.email,
				gallery: action.gallery,
				error: null,
				loading: false,
			};

		case actionTypes.AUTH_LOGOUT:
			localStorage.removeItem('user');
			return {
				...state,
				username: null,
				password: null,
				gallery: [],
				email: null,
			};

		case actionTypes.UPDATE_USER_SUCCESS:
			return {
				...state,
				username: action.newUsername,
				password: action.newPassword,
				email: action.newEmail,
			};

		case actionTypes.ADD_PHOTO_SUCCESS:
			return {
				...state,
				gallery: state.gallery.concat(action.photoUrl),
			};

		case actionTypes.DELETE_PHOTO_SUCCESS:
			return {
				...state,
				gallery: action.updatedGallery,
			};

		default:
			return state;
	}
};

export default reducer;
