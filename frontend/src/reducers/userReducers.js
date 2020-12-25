export const userReducer = (state = {}, action) => {
	switch (action.type) {
		case "SET_USERNAME":
			return { username: action.payload };

		default:
			return state;
	}
};
