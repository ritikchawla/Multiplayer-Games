export const getUserString = (allSockets, room) => {
	let usersString = "";

	allSockets[room].forEach(socket => {
		if (socket.room === room) {
			usersString += socket.username + ", ";
		}
	});

	return usersString.trim().slice(0, usersString.length - 2); // to not send the trailing comma
};

export const getPieceColor = (allSockets, roomId, game) => {
	let chessColor = "white",
		checkersColor = "red";

	console.log("inside get piece color = ", allSockets);

	for (let i = 0; i < allSockets[roomId].length; i++) {
		let socket = allSockets[roomId][i];
		if (game === "chess" && socket.room === roomId) {
			if (!socket.chessPieceColor) {
				return chessColor;
			} else if (socket.chessPieceColor === "white") {
				chessColor = "black";
				return chessColor;
			}
		}

		if (game === "checkers" && socket.room === roomId) {
			if (!socket.checkersPieceColor) {
				return checkersColor;
			} else if (socket.checkersPieceColor === "red") {
				checkersColor = "white";
				return checkersColor;
			}
		}
	}
};

export const randIndex = length => {
	return Math.floor(Math.random() * length);
};
