export const socketReducer = (state = {}, action) => {
	switch (action.type) {
		case "SET_SOCKET":
			// localStorage.setItem("socket", action.payload);
			return { socket: action.payload };

		default:
			return state;
	}
};
