import colors from "./colors.js";

let allSockets = [];
let colorIncrementor = 1;

const getUserString = room => {
	let usersString = "";

	allSockets.forEach(socket => {
		if (socket.room === room) {
			usersString += socket.username + ", ";
		}
	});

	return usersString.trim().slice(0, usersString.length - 1); // to not send the trailing comma
};

const getPieceColor = game => {
	let chessColor = "white",
		checkersColor = "red";

	allSockets.forEach(socket => {
		if (game === "chess" && socket.room === game) {
			if (socket.chessPieceColor === "white") {
				chessColor = "black";
				return chessColor;
			}
		} else if (game === "checkers" && socket.room === game) {
			if (socket.checkersPieceColor === "white") {
				checkersColor = "black";
				return checkersColor;
			}
		}
	});

	return game === "chess" ? chessColor : game === "checkers" ? checkersColor : null;
};

const socketController = socket => {
	socket.on("newConnection", ({ username, room }) => {
		// set username and name color for the joined user
		console.log(username);
		socket.username = username;
		socket.color = colors[colorIncrementor];
		socket.room = room;
		socket.join(room);

		if (room === "chess") {
			socket.chessPieceColor = getPieceColor("chess");
		}

		// add user to the connected sockets
		allSockets.push({
			id: socket.id,
			username: socket.username,
			color: socket.color,
			chessPieceColor: socket.chessPieceColor,
			room: socket.room
		});

		colorIncrementor =
			colorIncrementor + 1 === colors.length ? 1 : colorIncrementor + 1;
	});

	// ===================== for Chat ======================================
	socket.on("newUserJoinsChat", ({ username }) => {
		socket.to(socket.room).broadcast.emit("newMessageReceived", {
			newMessage: `${username} just joined the chat!`,
			username: "Bot",
			color: colors[0]
		});

		const allUsersString = getUserString(socket.room);

		// no need to do socket.to() here as we're sending message to only one socket
		socket.emit("newMessageReceived", {
			newMessage: `Currently in the chat -\n ${allUsersString}`,
			username: "Bot",
			color: colors[0]
		});
	});

	// for sending a new message to all users
	socket.on("newMessage", ({ inputMessage }) => {
		console.log("server newMessage = ", inputMessage);

		socket.to(socket.room).broadcast.emit("newMessageReceived", {
			newMessage: inputMessage,
			username: socket.username,
			color: socket.color
		});
	});
	// ===================== for Chat ======================================

	// ================== for chess ===================================
	socket.on("getChessPieceColor", () => {
		socket.emit("setChessPieceColor", { chessPieceColor: socket.chessPieceColor });
	});

	socket.on("movePlayed", ({ cellsClicked }) => {
		console.log("opponentPlayedAMove", cellsClicked);
		socket.broadcast.emit("opponentPlayedAMove", { cellsClicked });
	});
	// ================== for chess ===================================

	// ================ for sketchIO ===============================
	socket.on("startedFilling", ({ color }) => {
		socket.broadcast.emit("someoneFilled", { color });
	});

	socket.on("beganPath", ({ x, y }) => {
		socket.broadcast.emit("someoneBeganPath", { x, y });
	});

	socket.on("strokedPath", ({ x, y, color }) => {
		socket.broadcast.emit("someoneStrokedPath", { x, y, color });
	});
	// ================ for sketchIO ===============================

	socket.on("disconnect", () => {
		let socketThatLeftRoom = allSockets.filter(s => s.id === socket.id)[0];
		allSockets = allSockets.filter(s => s.id !== socket.id);

		socket.to(socketThatLeftRoom.room).broadcast.emit("newMessageReceived", {
			newMessage: `${socket.username} just left the chat.`,
			username: "Bot",
			color: colors[0]
		});
	});
};

export default socketController;
