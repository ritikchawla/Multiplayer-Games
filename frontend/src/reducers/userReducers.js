export const userReducer = (state = {}, action) => {
	switch (action.type) {
		case "SET_USERNAME":
			return { ...state, username: action.payload };

		case "SET_CHESS_PIECE_COLOR":
			return { ...state, chessPieceColor: action.payload };

		default:
			return state;
	}
};
