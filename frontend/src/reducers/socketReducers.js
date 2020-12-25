export const socketReducer = (state = {}, action) => {
	switch (action.type) {
		case "SET_SOCKET":
			return { socket: action.payload };

		default:
			return state;
	}
};
