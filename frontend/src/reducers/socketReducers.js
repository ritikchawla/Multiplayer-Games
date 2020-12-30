export const socketReducer = (state = {}, action) => {
	switch (action.type) {
		case "SET_SOCKET":
			// localStorage.setItem("socket", action.payload);
			return { socket: action.payload };

		default:
			return state;
	}
};

export const sketchIOSocketsReducer = (state = [], action) => {
	switch (action.type) {
		case "UPDATE_PAINTERS":
			return action.payload;

		case "UPDATE_PAINTER_INFO":
			return state.map(s => {
				console.log(s);
				if (s.id === action.payload.id) {
					return action.payload;
				} else {
					return s;
				}
			});

		default:
			return state;
	}
};

export const checkersSocketsReducer = (state = [], action) => {
	switch (action.type) {
		case "UPDATE_CHECKERS_PLAYERS":
			return action.payload;

		case "UPDATE_CHECKERS_PLAYERS_INFO":
			return state.map(s => {
				if (s.id === action.payload.id) {
					return action.payload;
				} else {
					return s;
				}
			});

		default:
			return state;
	}
};
