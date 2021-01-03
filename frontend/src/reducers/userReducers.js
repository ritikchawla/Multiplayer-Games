export const userReducer = (state = {}, action) => {
	switch (action.type) {
		case "SET_USERNAME":
			const toReturn = { username: action.payload };
			return toReturn;

		case "SET_CHESS_PIECE_COLOR":
			const toReturn1 = { ...state, chessPieceColor: action.payload };
			console.log(toReturn1);
			return toReturn1;

		case "SET_CHECKERS_PIECE_COLOR":
			const toReturn2 = { ...state, checkersPieceColor: action.payload };
			return toReturn2;

		default:
			return state;
	}
};
