export const userReducer = (state = {}, action) => {
	switch (action.type) {
		case "SET_USERNAME":
			const toReturn = { ...state, username: action.payload };
			// localStorage.setItem("user", JSON.stringify(toReturn));
			return toReturn;

		case "SET_CHESS_PIECE_COLOR":
			const toReturn1 = { ...state, chessPieceColor: action.payload };
			// localStorage.setItem("user", JSON.stringify(toReturn1));
			return toReturn1;

		default:
			return state;
	}
};
