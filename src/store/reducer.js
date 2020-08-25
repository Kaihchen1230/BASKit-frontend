import * as actions from './actions';

const initialState = {
	userInfo: {
		username: '',
		email: '',
		password: '',
		gallery: [],
	},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.GET_USER:
			console.log('this is reducer action.userInfo: ', action.payload.userInfo);
			return {
				...state,
				userInfo: action.payload.userInfo,
			};

		case actions.USER_SIGN_UP:
			// let updateUsers = [];
			// if (state.users.length > 0) {
			// 	updateUsers = state.users.filter(
			// 		(user) => user.username !== action.payload.userInfo.username,
			// 	);
			// } else {
			// 	updateUsers.push(action.payload.userInfo);
			// }

			// console.log('this is updateUsers: ', updateUsers);

			// localStorage.setItem('usersData', );

			// return {
			// 	...state,
			// 	users: updateUsers,
			// };
			console.log('sign up in reducer');
			return state;

		default:
			return state;
	}
};

export default reducer;
