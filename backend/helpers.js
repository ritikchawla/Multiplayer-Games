export const getUserString = (allSockets, room) => {
	let usersString = "";

	allSockets[room].forEach(socket => {
		if (socket.room === room) {
			usersString += socket.username + ", ";
		}
	});

	return usersString.trim().slice(0, usersString.length - 1); // to not send the trailing comma
};

export const getPieceColor = (allSockets, roomId, game) => {
	let chessColor = "white",
		checkersColor = "red";

	for (let i = 0; i < allSockets[roomId].length; i++) {
		let socket = allSockets[roomId][i];
		if (game === "chess" && socket.room === roomId) {
			if (!socket.chessPieceColor) {
				socket.chessPieceColor = chessColor;
				return chessColor;
			}
			if (socket.chessPieceColor === "white") {
				chessColor = "black";
				return chessColor;
			}
		} else if (game === "checkers" && socket.room === roomId) {
			if (!socket.checkersPieceColor) {
				socket.checkersPieceColor = checkersColor;
				return checkersColor;
			}

			if (socket.checkersPieceColor === "red") {
				checkersColor = "white";
				socket.checkersPieceColor = checkersColor;
				return checkersColor;
			}
		}
	}
};

export const randIndex = length => {
	return Math.floor(Math.random() * length);
};
