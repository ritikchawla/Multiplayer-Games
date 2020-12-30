export const getUserString = (allSockets, room) => {
	let usersString = "";

	allSockets[room].forEach(socket => {
		if (socket.room === room) {
			usersString += socket.username + ", ";
		}
	});

	return usersString.trim().slice(0, usersString.length - 1); // to not send the trailing comma
};

export const getPieceColor = (allSockets, roomId) => {
	let chessColor = "white",
		checkersColor = "red";

	allSockets[roomId].forEach(socket => {
		if (game === "chess" && socket.room === roomId) {
			if (socket.chessPieceColor === "white") {
				chessColor = "black";
				return chessColor;
			}
		} else if (game === "checkers" && socket.room === roomId) {
			if (socket.checkersPieceColor === "white") {
				checkersColor = "black";
				return checkersColor;
			}
		}
	});

	return game === "chess" ? chessColor : game === "checkers" ? checkersColor : null;
};

export const randIndex = length => {
	return Math.floor(Math.random() * length);
};
