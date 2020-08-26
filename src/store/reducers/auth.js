import * as actionTypes from '../actions/actionTypes';

const initialState = {
	username: null,
	email: null,
	password: null,
	error: null,
	loading: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return {
				...state,
				error: null,
				loading: true,
			};

		case actionTypes.AUTH_SUCCESS:
			return {
				...state,
				username: action.username,
				password: action.password,
				email: action.email,
				error: null,
				loading: false,
			};

		case actionTypes.AUTH_FAIL:
			return {
				...state,
				error: action.error,
				loading: false,
			};

		case actionTypes.AUTH_LOGOUT:
			localStorage.removeItem('user');
			return {
				...state,
				username: null,
				password: null,
				email: null,
			};

		case actionTypes.UPDATE_USER_START:
			return {
				...state,
				error: null,
				loading: true,
			};

		case actionTypes.UPDATE_USER_SUCCESS:
			return {
				...state,
				username: action.newUsername,
				password: action.newPassword,
				email: action.newEmail,
				error: null,
				loading: false,
			};

		case actionTypes.UPDATE_USER_FAIL:
			return {
				...state,
				error: action.error,
				loading: false,
			};

		default:
			return state;
	}
};

export default reducer;
